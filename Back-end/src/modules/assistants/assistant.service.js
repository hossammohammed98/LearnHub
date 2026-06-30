const AssistantRepository = require("./assistant.repository");
const BaseService = require("../../shared/core/BaseService");
const ApiError = require("../../shared/core/ApiError");
const Teacher = require("../teachers/teacher.model");
const { hashPassword } = require("../../shared/utils/hashHelper");

class AssistantService extends BaseService {
  constructor() {
    super(AssistantRepository);
  }

  async resolveTeacherId(user) {
    if (user.role !== "Teacher") {
      throw new ApiError(403, "Only teachers can manage assistants");
    }

    const teacher = await Teacher.findOne({ UserId: user.id });
    if (!teacher) {
      throw new ApiError(404, "Teacher profile not found");
    }

    return teacher._id;
  }

  async getAllForUser(user) {
    const teacherId = await this.resolveTeacherId(user);
    return await this.repository.getAll({ TeacherId: teacherId });
  }

  async createForTeacher(user, payload) {
    const teacherId = await this.resolveTeacherId(user);
    const password = await hashPassword(payload.Password);

    return await this.repository.create({
      ...payload,
      Password: password,
      TeacherId: teacherId,
    });
  }

  async updateForTeacher(user, id, payload) {
    const teacherId = await this.resolveTeacherId(user);
    const nextPayload = { ...payload };

    if (nextPayload.Password) {
      nextPayload.Password = await hashPassword(nextPayload.Password);
    }

    const assistant = await this.repository.model.findOneAndUpdate(
      { _id: id, TeacherId: teacherId },
      nextPayload,
      { new: true },
    );

    return assistant;
  }

  async deleteForTeacher(user, id) {
    const teacherId = await this.resolveTeacherId(user);
    return await this.repository.model.findOneAndDelete({ _id: id, TeacherId: teacherId });
  }
}
module.exports =new AssistantService();
