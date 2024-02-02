const { port } = require('./config/dot-env.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const morgan = require('morgan')
const routes = require('./routes/routes');
const db = require('./config/db.js');
const { swaggerDocs } = require('./config/swagger.js');

const app = express();

//Used to print log
app.use(morgan('combined'));

//Support parsing of application/json type post data
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res)=>{ 
        res.send("Le monde chico et tout ce qu'il y a dedans");
});

//calling to the employee route
app.use("/v1", cors.corsWithOptions, routes)

app.listen(port, '0.0.0.0', ()=>{ 
        db.testDbConnection();
        swaggerDocs(app, port);
        console.log(`Listening on port ${port}`)
});

