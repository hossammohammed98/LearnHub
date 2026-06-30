class BaseService{
    constructor(repository){
        this.repository=repository;
    }
    async getAll(filter={},populateOption=null){
        return await this.repository.getAll(filter,populateOption);
    }
    async getById(id,populateOption=null){
        return await this.repository.getById(id,populateOption);
    }
    async create(newModel){
        return await this.repository.create(newModel);
    }
    async update(id,updateModel){
        return await this.repository.update(id,updateModel);
    }
    async delete(id){
        return await this.repository.delete(id);
    }
}
module.exports=BaseService;
