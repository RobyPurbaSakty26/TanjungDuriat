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
    }
}