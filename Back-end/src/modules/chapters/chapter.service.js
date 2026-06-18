const ChapterRepository = require("./chapter.repository");
const BaseService = require("../../shared/core/BaseService");

class ChapterService extends BaseService {
  constructor() {
    super(ChapterRepository);
  }
}
module.exports =new ChapterService();
