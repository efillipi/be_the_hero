const connection = require('../database/connections');

module.exports = {
    async index (request,response){
        const {id} = request.body; 
        const ongs = await connection('ongs')
        .where('id',id)
        .select('name')
        .first();

        if(!ongs){
            response.status(400).json({ erro: ' No ONG found with this ID.'})
        }
        return response.json(ongs);
    },
};