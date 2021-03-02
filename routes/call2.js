const express = require('express');
const router = express.Router();
var request = require('request');

function get_pizza(call, call2, call3, callbackFunc) 
{
    request.get({
        url : 'http://localhost:1997/statistics/id/' + call + '?ngroups_max=' + call2 + '&' + 'nitems_max=' + call3
        }, function(error, response, body){
        if(error)
        {
            console.error("Statistics Failed")
            console.log('error', error)
            callbackFunc("Statistics Failed")
        }
        console.log("statistics predictions : ");
        console.log(response)
        callbackFunc(response.body)
    })
}

router.get('/:id/:ngroups_max/:nitems_max', function(req, res, next) {
    var call = req.params.id //if Flask server is on delete '= req.params.id'
    var call2 = req.params.ngroups_max
    var call3 = req.params.nitems_max
    console.log('StaCalls : ',call, call2, call3)

    try
    {
        get_pizza(call, call2, call3, function (data){
            res.send(data)
            console.log(data)
        })
    } 
    catch(error)
    {
        console.log(error)
        res.send(pizza);
        console.log("pizza is on the way!")
    }
});

module.exports = router; //added