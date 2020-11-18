const connection = require('../database/connections');

module.exports = {
    async create(request,response){
        const { name,email,whatsapp,city,uf} = request.body;
        
        return response.json({ name,email,whatsapp,city,uf });
    }
};