const con = require('./database');

const confunc = {

    CON_INSERT: (query, data) => {
        new Promise((resolve, reject) => {
          con.query(query,data, (err, result) => {
            if (!err) {
                resolve(result.insertId);
            } else {
                reject();
            }
          })
        })
    },

    CON_UPDATE: (query, data) => {
        new Promise((resolve, reject) => {
          con.query(query,data, (err, result) => {
            if (!err) {
                resolve();
            } else {
                reject();
            }
          })
        })
    },

    CON_SELECT: (query, type, no_data_err = true) => {
        new Promise((resolve, reject) => {
          con.query(query, (err, result) => {
            console.log(result)
            if (!err) {
                if (result.length > 0) {
                    if (type == 'Single') {
                        resolve(result[0]);
                    } else {
                        resolve(result);
                    }
                } else {
                    if(no_data_err){
                        reject();
                    } else {
                        resolve([]);
                    }
                }
            } else {
                reject();
            }
          })
        })
    }
    

}

module.exports = confunc;