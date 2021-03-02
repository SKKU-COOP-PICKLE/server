const express = require('express');
const router = express.Router();
var request = require('request');

function get_pizza(ingredientID, ingredientTopk, ingredientDepth, callbackFunc) {
    request.get({
        url : 'http://localhost:10100/api/predict/' + ingredientDepth + '/' + ingredientID + '/' + ingredientTopk
    }, function(error, response, body){
      if(error)
      {
          console.log('error :', error)
          console.error("deepLearningGraph Failed")
          callbackFunc("deepLearningGraph Failed")
      }
      console.log("deepLearingGraph prediction: ")
      console.log(response.body)
      callbackFunc(response.body)
    })
}
router.get('/:id/:nDeepItem/:k', function(req, res, next) {
  var cheeze = req.params.id
  var peperoni = req.params.nDeepItem
  var crust = req.params.k // default = 3
  // res.send(call2)
  // console.log('nDeepItem : ', call2)
  try{
    get_pizza(cheeze, peperoni, crust, function (data){
      res.send(data)
      console.log("this is deepLearningGraph",data)
    })
  } catch(error)
  {
    console.log(error)
    res.send(pizza)
    console.log("pizza is on the way!")
  }
});

module.exports = router; //added