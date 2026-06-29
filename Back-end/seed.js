const mongoose = require('mongoose');

// 1. Import your explicit project model definitions and password hashing helper
const Chat = require('./src/modules/chat/chat.model'); 
const ChatMember = require('./src/modules/chat/chatMember.model');
const Message = require('./src/modules/chat/message.model');
const { hashPassword } = require('./src/shared/utils/hashHelper'); // 🚨 Verified import path

// Using your exact User schema structure directly to prevent any model mismatch errors
const UserSchema = new mongoose.Schema({
    FName: { type: String, required: true },
    LName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    SSN: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Phone: { type: String, required: true },
    Avatar: { type: String },
    activeStatus: { type: Boolean },
    Role: { type: String, enum: ['Student', 'Parent', 'Teacher', 'Admin'], required: true },
    RefreshToken: { type: String, default: null },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// 2. Map your provided User ObjectIDs explicitly
const USER_1 = new mongoose.Types.ObjectId("6a41a49679754b2f73970423"); // احمد حسن
const USER_2 = new mongoose.Types.ObjectId("6a41a5e679754b2f73970424"); // سارة علي
const USER_3 = new mongoose.Types.ObjectId("6a41a67179754b2f73970425"); // محمد عمر

async function seedDatabase() {
    try {
        // Connect directly to your local database URI instance
        console.log("Connecting to MongoDB at: mongodb://127.0.0.1:27017/Tellm ...");
        await mongoose.connect('mongodb://127.0.0.1:27017/Tellm');
        console.log("💾 Connected successfully.");

        // Clean out previous document traces to prevent duplication issues
        console.log("🧹 Clearing old database records...");
        await Promise.all([
            User.deleteMany({ _id: { $in: [USER_1, USER_2, USER_3] } }),
            Chat.deleteMany({}),
            ChatMember.deleteMany({}),
            Message.deleteMany({})
        ]);

        // 🚨 Hash the clear-text password before inserting into the database
        console.log("🔐 Generating secure password hashes...");
        const securePassword = await hashPassword("12345678");

        // Step 1: Seed explicit User Profiles based on your strict User Model definition
        console.log("👤 Creating User Profiles...");
        await User.insertMany([
            { 
                _id: USER_1, 
                FName: "احمد", 
                LName: "حسن", 
                Email: "ahmed.hassan@example.com", 
                SSN: "11111111111111", 
                Password: securePassword, // Now safely hashed!
                Phone: "01012345678",
                Avatar: "/images/login.jpg", 
                activeStatus: true,
                Role: "Student",
                isVerified: true
            },
            { 
                _id: USER_2, 
                FName: "سارة", 
                LName: "علي", 
                Email: "sara.ali@example.com", 
                SSN: "22222222222222", 
                Password: securePassword,
                Phone: "01112345678",
                Avatar: "/images/login.jpg", 
                activeStatus: false,
                Role: "Student",
                isVerified: true
            },
            { 
                _id: USER_3, 
                FName: "محمد", 
                LName: "عمر", 
                Email: "mohamed.omar@example.com", 
                SSN: "33333333333333", 
                Password: securePassword,
                Phone: "01212345678",
                Avatar: "/images/login.jpg", 
                activeStatus: true,
                Role: "Teacher",
                isVerified: true
            }
        ]);

        // Step 2: Create Chat Room instances matching your chat model parameters
        console.log("💬 Opening Chat Rooms...");
        const privateChat = await Chat.create({
            type: 'private',
            groupName: null,
            groupAvatar: null
        });

        const groupChat = await Chat.create({
            type: 'group',
            groupName: 'مجموعة الدعم الدراسي - الكيمياء',
            groupAvatar: '/images/login.jpg'
        });

        // Step 3: Seed Exchange Messages linked to the respective chats
        console.log("✉️ Seeding Messages...");
        const textMessagePrivate = await Message.create({
            chatId: privateChat._id,
            senderId: USER_2, // Sent by Sara to Ahmed
            content: "ايه الاخبار؟ هل بدأت مراجعة الكيمياء؟",
            messageType: 'text'
        });

        const textMessageGroup = await Message.create({
            chatId: groupChat._id,
            senderId: USER_1, // Sent by Ahmed to the group
            content: "يا شباب، رفعت لكم ملف ملخص المحاضرة الأولى هنا",
            messageType: 'text'
        });

        // Step 4: Link back the 'lastMessage' references to satisfy repository populate pipelines
        privateChat.lastMessage = textMessagePrivate._id;
        await privateChat.save();

        groupChat.lastMessage = textMessageGroup._id;
        await groupChat.save();

        // Step 5: Establish Membership parameters ensuring unique index constraints are preserved
        console.log("👥 Joining Members to Chat Rooms...");
        await ChatMember.insertMany([
            // Members of Private Chat (Ahmed & Sara)
            { chatId: privateChat._id, userId: USER_1, unreadCount: 0 },
            { chatId: privateChat._id, userId: USER_2, unreadCount: 1 }, 

            // Members of Group Chat (Ahmed & Mohamed)
            { chatId: groupChat._id, userId: USER_1, unreadCount: 0 },
            { chatId: groupChat._id, userId: USER_3, unreadCount: 2 } 
        ]);

        console.log(`
🌱 Database Seeding Completed Successfully!
--------------------------------------------------
Available Authenticated Test Profiles:
1. أحمد حسن -> Email: ahmed.hassan@example.com | Password: 12345678
2. سارة علي -> Email: sara.ali@example.com      | Password: 12345678
3. محمد عمر -> Email: mohamed.omar@example.com  | Password: 12345678
        `);
        
        process.exit(0);
    } catch (error) {
        console.error("❌ Database Seeding Failed:", error);
        process.exit(1);
    }
}

seedDatabase();