const {wahana} = require('../models')

module.exports = {
    getAll(body){
        return wahana.findAll()
    },

    count(){
        return wahana.count()
    },

    create(body){
        return wahana.create(body)
    },

    update(id, body){
        return wahana.update(body, {where: {id}})
    }
}