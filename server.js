//Install express server
const express = require('express');
const path = require('path');

const app = express();


// Serve only the static files form the dist directory
app.use(express.static('./dist/teste'));



app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/teste/'}),
);


// Start the app by listening on the default Heroku port
const PORT =   process.env.PORT ||  8085
app.listen(PORT, ()=>{console.log("Servidor rodando!!")})
