const express = require('express');
const router = express.Router();
var request = require('request');

function get_pizza(callbackFunc) {
    request.post({
        url : 'http://localhost:1999/post',
        body: JSON.stringify({form : 'name'}),
        headers : {'Content-Type': 'application/json'}
    }, function(error, response, body){
        if(error)
        {
            console.log(error)
            console.error("test Failed")
            callbackFunc("test Failed")
        }
        console.log("test prediction: ");
        console.log('this is from flask : ', body)
        callbackFunc(body)
    })
}
router.post('/', function(req, res, next) {
    try{
        get_pizza(function (data){
            res.send(data)
            console.log(data)
        })
    } catch(error)
    {
        console.log(error)
        res.send(pizza);
        console.log("pizza is on the way!")
    }
});

module.exports = router; //added