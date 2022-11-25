
const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const { listenerCount } = require('process');
const { error } = require('console');
const { dirname } = require('path');
const axios = require('axios').default;


const app = express();
app.use(bodyParser.urlencoded({extended:true}))
   


app.get('/', function(req, res){
    app.use(express.static('public'))
    res.sendFile(__dirname+'/index.html');
})


var sentData
var jsonData

app.post('/', function(req, res){
    
    const fNAME=req.body.FirstName
    const lNAME=req.body.LastName
    const pHONE=req.body.Phone
    const eMAIL=req.body.Email
    
    data = {
            
        email_address: eMAIL,
        status: "subscribed",
            
            
        merge_fields: {
        FNAME : fNAME,
        LNAME : lNAME,
        PHONE : pHONE  
        }
    };

     

    body = JSON.stringify(data)

    const config ={
        method: 'post',
        url : 'https://us18.api.mailchimp.com/3.0/lists/bcd9ef6823/members',

        auth: {
        username: 'any',
        password: 'b8d599f1ed0209c242e3c459149ea107-us18'
        },
    
        list_id:' bcd9ef6823',

        data:body
    }

    axios(config)
    .then(function(response){
        var resdata=(JSON.stringify (response.data))
        console.log(resdata)
        res.sendFile(__dirname+"/success.html")

    })
    
    .catch(function(error){
        console.log(error)
        res.sendFile(__dirname+"/error.html")            
    })


    

})


app.post("/error", function(req,res){
    res.redirect("/");
  });
    








app.listen(3000, function(){
    console.log('listening on 3000')
})