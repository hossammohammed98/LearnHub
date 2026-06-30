class BaseRepository {
    
    constructor(model) {
        this.model = model;
    }
    async getAll(filter = {}, populateOption = null) {
        const data = await this.model.find(filter).populate(populateOption);
        return data;

    }
    async getById(id, populateOption = null) {
        const data = await this.model.findById(id).populate(populateOption);
        return data;
    }
    async create(newModel) {
        return await this.model.create(newModel);
    }
    async update(id, updateModel) {
        const data = await this.model.findByIdAndUpdate(id, updateModel);
        return data;
    }
    async delete(id) {
        const data = await this.model.findByIdAndDelete(id);
        return data;
    }

}
module.exports = BaseRepository;