const wahanaRepository = require('../repository/wahanaRepository')

module.exports={
    async getAll(){
        try {
            const data = await wahanaRepository.getAll()
            const count = await wahanaRepository.count()

            return{
                data,
                count
            }
        } catch (err) {
            throw err
        }
    },

    create(body){
        return wahanaRepository.create(body)
    },

    update(id, body){
        return wahanaRepository.update(id, body)
    },

    findByPk(id){
        return wahanaRepository.findByPk(id)
    },

    delete(id){
        return  wahanaRepository.delete(id)
    }
}