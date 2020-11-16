const express  = require (`express`); // usando exprees
const cors  = require (`cors`); // usando cors
const routes = require ('./routes'); // ./mesma pasta e passanto parametos para varial routes
const app = express();

app.use(cors());

app.use(express.json()); // usar json
app.use(routes); // usando o arquivo routes.js

app.listen(3333); // nesta porta