const connection = require('../database/connections');


module.exports = {

    async index (request,response){
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count(); // contar qtos registros tem na tabela

        const incidents = await connection('incidents') // trazer os dados dos incidents e a qual onge pertence
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1)*5)
        .select([
            'incidents.*', 
            'ongs.name', 
            'email',
            'whatsapp',
            'city',
            'uf'
        ]);

        response.header('X-TOTAL-COUNT', count['count(*)']); // devolver ao header q quantidade

        return response.json(incidents);        
    },

    async create(request,response){
        const { title,description,value} = request.body; //criar incidente com base na ong
        
        request.headers;
        
        const ong_id = request.headers.authorization; 
        const [id] = await connection('incidents').insert(
            {   
                title,
                description,
                value,
                ong_id,
            })
            
        return response.json({id});
    },


    async delete(request,response){
        const {id} = request.params;
        const ong_id = request.headers.authorization; 

        const incidents = await connection('incidents')
        .where('id',id) // buscar com base no id
        .select('ong_id')// trazer o id da ong que criou o incident
        .first(); // primeira  ocorrencia
         
        if(incidents.ong_id != ong_id ){

            return response.status(401).json( {error:'Operation  not permitted.'}); 
            // verificar se o ai que esta cadastrado no banco é o mesmo (logado) que esta querendo apagar
        }
        
        await connection('incidents').where('id',id).delete(); // apagar do banco de dados
        return response.status(204).send(); // retornar 204 sucesso sem corpo
    },
};