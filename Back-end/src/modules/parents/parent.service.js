const ParentRepository = require("./parent.repository");
const StudentRepository = require("../students/student.repository");
const authRepository = require("../auth/auth.repository");
const ApiError = require("../../shared/core/ApiError");
const BaseService = require("../../shared/core/BaseService");

class ParentService extends BaseService {
  constructor() {
    super(ParentRepository);
  }

  async findParentByUserId(userId) {
    const parent = await this.repository.model.findOne({ UserId: userId });
    if (!parent) {
      throw new ApiError(404, "لم يتم العثور على بيانات ولي الأمر.");
    }
    return parent;
  }

  async getParentOverview(userId) {
    const parent = await this.findParentByUserId(userId);
    const children = await StudentRepository.model
      .find({ ParentId: parent._id })
      .populate({
        path: "UserId",
        select: "FName LName Email Phone Avatar Role",
      })
      .lean();

    return {
      parentId: parent._id.toString(),
      userId: parent.UserId.toString(),
      childrenNumber: parent.ChildrenNumber || children.length,
      children: children.map((child) => ({
        id: child._id.toString(),
        user: {
          id: child.UserId?._id?.toString(),
          FName: child.UserId?.FName || "",
          LName: child.UserId?.LName || "",
          Email: child.UserId?.Email || "",
          Phone: child.UserId?.Phone || "",
          Avatar: child.UserId?.Avatar || "",
          Role: child.UserId?.Role || "Student",
        },
        createdAt: child.createdAt,
      })),
    };
  }

  async getChildren(userId) {
    const parent = await this.findParentByUserId(userId);
    const children = await StudentRepository.model
      .find({ ParentId: parent._id })
      .populate({ path: "UserId", select: "FName LName Email Phone Avatar Role" })
      .lean();

    return children.map((child) => ({
      id: child._id.toString(),
      user: {
        id: child.UserId?._id?.toString(),
        FName: child.UserId?.FName || "",
        LName: child.UserId?.LName || "",
        Email: child.UserId?.Email || "",
        Phone: child.UserId?.Phone || "",
        Avatar: child.UserId?.Avatar || "",
        Role: child.UserId?.Role || "Student",
      },
      createdAt: child.createdAt,
    }));
  }

  async createChild(userId, payload) {
    const parent = await this.findParentByUserId(userId);
    const { ConfirmPassword, ...data } = payload;
    const childPayload = {
      ...data,
      Role: "Student",
    };

    const childUser = await authRepository.createUser(childPayload);
    if (!childUser) {
      throw new ApiError(400, "تعذر إنشاء حساب الابن الجديد.");
    }

    const createdChild = await StudentRepository.create({
      UserId: childUser._id,
      ParentId: parent._id,
    });

    parent.ChildrenNumber = (parent.ChildrenNumber || 0) + 1;
    await parent.save();

    return {
      studentId: createdChild._id.toString(),
      user: {
        id: childUser._id.toString(),
        FName: childUser.FName,
        LName: childUser.LName,
        Email: childUser.Email,
        Phone: childUser.Phone,
        Avatar: childUser.Avatar || null,
        Role: childUser.Role,
      },
    };
  }
}
module.exports = new ParentService();
