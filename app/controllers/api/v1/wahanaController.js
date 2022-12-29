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

    async handleGetByPkWahana(req, res){
       try {
        const id = req.params.id
       console.log(id)
        const wahana = await wahanaService.findByPk(id)
        if(!wahana) {
            throw new Error('Data tidak ditemukan')
        }

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

    async handleDeleteWahana(req, res){
       try {
        const id = req.params.id

        const wahana = await wahanaService.findByPk(id)
        if(!wahana){
            throw new Error('Data tidak ditemukan')
        }
        await wahanaService.delete(id)

        res.status(201).json({
            status: 'OK',
            message: 'Data berhasil dihapus'
        })
       } catch (err) {

        res.status(401).json({
            status:'FAIL',
            message: err.message
        })
        
       }
    }


}