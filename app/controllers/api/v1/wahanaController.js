const wahanaService = require('../../../service/wahanaService')

module.exports ={
    async handleGetAllWahana(req, res){
        try {
            const {data, count}= await wahanaService.getAll()

            res.status(201).json({
                status: 'OK',
                data: data,
                count: count
            })
        } catch (err) {
            res.status(401).json({
                status: 'FAIL',
                message: err.message
            })
        }
    },
    async handleCreateWahana(req, res){
     try {
        const body = req.body
        const wahana = await wahanaService.create(body)

        res.status(201).json({
            status: 'OK',
            data: wahana
        })
     } catch (err) {
         res.status(401).json({
             status: 'FAIL',
             message: err.message
         })
         
     }
    },

    async handleUpdateWahana(req, res){
        try {
            const id = req.params.id
            const body = req.body

            const param =  await wahanaService.findByPk(id)

            if(!param){
               throw new Error('ID tidak ditemukan')
            }
            await wahanaService.update(id, body)
                res.status(201).json({
                status: 'OK',
                message: 'Data berhasil diupdate'
            })
            
        } catch (err) {
            res.status(401).json({
                status: 'FAIL',
                message: err.message
            })
        }
    },


}