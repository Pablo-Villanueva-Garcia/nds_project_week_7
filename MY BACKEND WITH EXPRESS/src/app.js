const express = require('express')
const cors = require('cors')
require('express-async-errors');
//const errorHandler = require('errorhandler')
const errorHandler = require("./middlewares/error-handler")

const app = express();
//const port = 7000; uso para pruebas postsman
const port = 8000;

const Recipescotroller = require('./controllers/index');
app.use(errorHandler)

app.use(cors({
    origin:'*',
    optionsSuccessStatus:200 ,
}))
app.use(express.json());

app.use('/recipes',Recipescotroller);


app.listen(port,()=>{

    console.log("It´s Ok")
    
})

//error handler expresss