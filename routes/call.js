const express = require('express');
const router = express.Router();
var request = require('request');

function get_pizza(call, call2, callbackFunc) {
    request.get({
        url : 'http://localhost:1999/api/hot_pizza_ori/' + call + '/' + call2
    }, function(error, response, body){
        if(error)
        {
            console.log('error :', error)
            console.error("deepLearning Failed")
            callbackFunc("deepLearning Failed")
        }
        console.log("deepLearing prediction: ")
        console.log(response.body)
        callbackFunc(response.body)
    })
}
router.get('/:id/:nDeepItem', function(req, res, next) {
    var call = req.params.id //if Flask server is on delete '= req.params.id'
    var call2 = req.params.nDeepItem
    // res.send(call2)
    console.log('nDeepItem : ', call2)
    try{
        get_pizza(call, call2, function (data){
            res.send(data)
        })
    } catch(error)
    {
        console.log(error)
        res.send(pizza);
        console.log("pizza is on the way!")
    }
});

module.exports = router; //added