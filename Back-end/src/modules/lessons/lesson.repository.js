// lesson.repository.js
const Lesson = require('./lesson.model');
const BaseRepository = require('../../shared/core/BaseRepository');

class LessonRepository extends BaseRepository {
    constructor(){
        super(Lesson);
    }

    // 🎯 FIXED: Unified schema matching casing 'Video' (Capital V) and returned the extracted value safely
    async updateAssetPublicAsset(lessonId) {
        const lesson = await Lesson.findById(lessonId);
        if (!lesson || !lesson.Video) return null;
        
        const publicId = lesson.Video.public_id;
        lesson.Video = undefined; // Deletes the object sub-document properties completely
        await lesson.save();
        return publicId;
    }
}
module.exports = new LessonRepository();