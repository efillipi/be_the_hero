const express = require ('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileConttroller');
const SessionController = require('./controllers/SessionController');
const Printer = require('./controllers/Printer');
const routes = express.Router();

routes.get('/printer', Printer.create); // listar as ongs como array

routes.post('/sessions', SessionController.index); // listar as ongs como array

routes.get('/ongs', OngController.index); // listar as ongs como array
routes.post('/ongs', OngController.create); // adicionar ao banco os dados do insert

routes.get('/incidents', IncidentController.index); // listar as ongs como incidents
routes.post('/incidents', IncidentController.create); // adicionar ao banco os dados do insert
routes.delete('/incidents/:id', IncidentController.delete); // deletar um incidente com base no id

routes.get('/profile', ProfileController.index); // 

module.exports = routes;

/*

metodos http

get - buscar/ listar informacao 
post criar informacao
put - alterar
delete - deletar
*/

/** tipos de parametros
 * 
 * query : paramentos nomeados enviados na rota apos o =>>> ? (filtros paginao)
 * 
 * route : paramentos utilizados para identifar recursos
 * 
 * request body : corpo da requisicao - criar ou alterar recursos 
 * 
 */