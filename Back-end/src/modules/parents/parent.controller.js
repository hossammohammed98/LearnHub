const BaseController = require('../../shared/core/BaseController');
const ApiResponse = require('../../shared/core/ApiResponse');
const ParentService = require('./parent.service');

class ParentController extends BaseController {
  constructor() {
    super(ParentService);
  }
  async getParentOverview(req, res, next) {
    try {
      const data = await ParentService.getParentOverview(req.user.id);
      return ApiResponse.success(res, "تم جلب بيانات ولي الأمر بنجاح", data);
    } catch (error) {
      next(error);
    }
  }

  async getChildren(req, res, next) {
    try {
      const data = await ParentService.getChildren(req.user.id);
      return ApiResponse.success(res, "تم جلب بيانات الأبناء بنجاح", data);
    } catch (error) {
      next(error);
    }
  }

  async createChild(req, res, next) {
    try {
      const data = await ParentService.createChild(req.user.id, req.body);
      return ApiResponse.created(res, "تم إنشاء حساب الابن الجديد بنجاح", data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ParentController();