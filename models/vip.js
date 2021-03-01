let db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getInitiale = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT SUBSTRING(VIP_NOM, 1, 1) AS firstletter FROM vip ORDER by firstletter asc;";
              // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getListeVIP = function (firstletter, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT  VIP_NOM as nom, p.VIP_NUMERO as numero, VIP_PRENOM as prenom, p.PHOTO_ADRESSE as img FROM vip  join photo p ON vip.VIP_NUMERO=p.VIP_NUMERO WHERE VIP_NOM LIKE '" + firstletter  + "%' AND PHOTO_NUMERO = 1 ORDER BY 1 asc ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getDetailVIP = function (numero, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT p.VIP_NUMERO as numero, p.PHOTO_ADRESSE as img, VIP_NOM as nom, VIP_PRENOM as prenom, v.VIP_NAISSANCE as naissance, n.NATIONALITE_NOM as nationalite, v.VIP_SEXE as sexe FROM vip v  join photo p ON v.VIP_NUMERO=p.VIP_NUMERO join nationalite n on v.NATIONALITE_NUMERO=n.NATIONALITE_NUMERO WHERE p.VIP_NUMERO='"+numero+"' AND PHOTO_NUMERO = 1 ORDER BY 1 asc ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
