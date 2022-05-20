const express = require('express')

const bodyParser = require('body-parser')

const app = express()

app.use(express.json())

var routes = require('./routes');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/', routes);

app.get('/get',(req,res)=>{
	return res.status(201).json({message:`ok tested`})
})


const port = 8080

app.listen(port,()=>{
	console.log(`server running at http://localhost:${port}`)
})