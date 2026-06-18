const transporter=require('./email.config');
const crypto=require('crypto');

//verify Email
exports.sendVerificationEmail=async(user)=>{
    const rawToken=await crypto.randomBytes(32).toString('hex');
    const hashedToken=await crypto.createHash('sha256').update(rawToken).digest('hex');
    user.verificationToken=hashedToken;
    user.verificationTokenDate=Date.now()+(24**60*60*1000);
    await user.save();
    const verificationUrl=`http://localhost:3000/auth/verify-email/token=${rawToken}`;
    return transporter.sendMail({
        from:`"منصة تعلّم الرقمية" <${process.env.EMAIL_USER}>`,
        to:user.Email,
        subject:"يرجى تفعيل الايميل الخاص بك على منصة تعلّم الرقمية",
        html:`
            <h2>شكراً لك على التسجيل في منصة تعلّم الرقمية</h2>
            <p>يرجى الضغط على الرابط أدناه لتأكيد بريدك الإلكتروني وتفعيل حسابك:</p>
            <a href="${verificationUrl}" style="background:#4A90E2;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">تأكيد البريد الإلكتروني</a>
            <p>هذا الرابط صالح لمدة 24 ساعة فقط.</p>
        `
    })
}
//change Password
exports.sendResetPasswordEmail=async(user)=>{
    const rawToken=await crypto.randomBytes(32).toString('hex');
    const hashedToken=await crypto.createHash('sha256').update(rawToken).digest('hex');
    user.passwordResetToken=hashedToken;
    user.passwordResetTokenExpires=Date.now()+(10*60*1000);
    await user.save();
    const resetUrl=`http://localhost:3000/reset-password?token=${rawToken}`;
    return transporter.sendMail({
        from: `"منصة تعلّم الرقمية" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'طلب إعادة تعيين كلمة المرور 🔑',
        html: `
            <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; color: #333;">
                <h2>طلب إعادة تعيين كلمة المرور</h2>
                <p>لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك. يرجى الضغط على الرابط أدناه لتغيير كلمة المرور:</p>
                <div style="margin: 25px 0;">
                    <a href="${resetUrl}" style="background:#E24A4A; color:white; padding:12px 25px; text-decoration:none; border-radius:5px; font-weight:bold;">إعادة تعيين كلمة المرور</a>
                </div>
                <p style="color: #666; font-size: 0.9em;">هذا الرابط صالح لمدة 10 دقائق فقط لحماية حسابك.</p>
                <p style="color: #999; font-size: 0.8em; margin-top: 20px;">إذا لم تطلب هذا التغيير، يمكنك تجاهل هذا البريد الإلكتروني بأمان.</p>
            </div>
        `
    })
}
