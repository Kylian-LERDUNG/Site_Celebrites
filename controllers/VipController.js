
let model = require("../models/vip.js");
var async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des stars';

   model.getInitiale(function(err, result){
       if(err) {
           console.log(err);
           return;
       }

      response.initiale = result;

      response.render('repertoireVips', response);
    } );
  }

  module.exports.ListeStars = function (request, response) {
   let data = request.params.initiale;
   console.log(data);
   response.title = "Stars dont le nom commence par " + data;

   async.parallel([
      function (callback) {
         model.getInitiale(function (err, result) {
            callback(null, result);
         });
      },
      function (callback) {
         model.getListeVIP(data, function (err, result) {
            callback(null, result)
         });
      }
   ],
      function (err, result) {
         if (err) {
            console.log(err);
            return;
         }
         response.initiale = result[0];
         response.stars = result[1];
         console.log(result[1]);
         response.render('repertoireVips', response);
      }
   );
}

module.exports.DetailVIP = function (request, response) {
 let data = request.params.detailVIP;
 console.log(data);
 response.title = "Stars dont le nom commence par " + data;

 async.parallel([
    function (callback) {
       model.getInitiale(function (err, result) {
          callback(null, result);
       });
    },
    function (callback) {
       model.getDetailVIP(data, function (err, result) {
          callback(null, result)
       });
    }
 ],
    function (err, result) {
       if (err) {
          console.log(err);
          return;
       }
       response.initiale = result[0];
       response.detailVIP = result[1];
       console.log(result[1]);
       response.render('repertoireVips', response);
    }
 );
}
