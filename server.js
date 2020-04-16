// Setup empty JS object to act as endpoint for all routes
let projectData = {};
let port = process.env.PORT || 5000 ;
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let cors = require('cors')

/* Middleware*/
app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

app.get('/getData', (req,res)=>{
    res.send(projectData);
});

app.post('/addData', (req,res) => {
   let body = JSON.parse(req.body);
   projectData.temperature = body.temperature;
   projectData.date = body.date;
   projectData.user_response = body.user_response;
   res.send(200);
})
// Setup Server
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
})