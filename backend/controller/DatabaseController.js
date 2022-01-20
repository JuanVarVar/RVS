
const mysql = require('../database/mysql_conect.js')
const tables = require('../database/table_seed.js');
const async = require('async')


const controller = {}

    controller.database_test = async (req,res) =>{
        let msg_err= 'ERROR DatabaseController@database_test'
        let error = false
        async.forEachOf(tables, function (dataElement, i, inner_callback){
            if(mysql.state === 'disconnected'){
                console.log('['+msg_err+'] - ','NO SE PUDO CONECTAR A LA BD');
                return res.send(false);
            }
            let SQL = "SELECT COLUMN_NAME as name "
            SQL += "FROM INFORMATION_SCHEMA.COLUMNS as db "
            SQL += "WHERE TABLE_NAME = '"+dataElement['Table']+"'"

            mysql.query(SQL, function(err, rows){
                if(!err){
                    if(Object.keys(rows).length == Object.keys(tables[i]['Validate']).length){
                        let array_validate = []
                        for(x=0; x < Object.keys(rows).length; x++){
                            array_validate[x] = false
                            if(tables[i]['Validate'].find(
                                element => element === rows[x]['name']
                            ) === rows[x]['name']){
                                array_validate[x] = true
                            }
                        }
                        for (x=0; x < Object.keys(array_validate).length; x++){
                            if(array_validate[x] == false){
                                error = true 
                            }
                        }
                    }else{
                        error = true
                    }
                    inner_callback(null);
                } else {
                    error = true
                    inner_callback(err);
                };
            });
        }, function(err){
            if(!err){
                res.send(error);
            }else{
                res.send(error);
            }
        });
    }

    controller.database_create = async (req,res) =>{
        let msg_err= 'ERROR DatabaseController@database_test'
        if(mysql.state === 'disconnected'){
            console.log('['+msg_err+'] - ','NO SE PUDO CONECTAR A LA BD');
            return res.send(false); 
        }
        //SECCIÓN DE BUSQUEDA Y VALIDACIÓN de COLUMNAS
        async.forEachOf(tables, function (dataElement, i, inner_callback){
            let SQL = "SELECT COLUMN_NAME as name "
            SQL += "FROM INFORMATION_SCHEMA.COLUMNS as db "
            SQL += "WHERE TABLE_NAME = '"+dataElement['Table']+"'"

            mysql.query(SQL, function(err, rows){
                if(!err){
                    if(Object.keys(rows).length == Object.keys(tables[i]['Validate']).length){
                        let array_validate = []
                        for(x=0; x < Object.keys(rows).length; x++){
                            array_validate[x] = false
                            if(tables[i]['Validate'].find(
                                element => element === rows[x]['name']
                            ) === rows[x]['name']){
                                array_validate[x] = true
                            }
                        }
                        console.log(array_validate)
                        for (x=0; x < Object.keys(array_validate).length; x++){
                            if(array_validate[x] == false){
                                tables[i]['Ini'] = true
                            }
                        }
                    }else{
                        tables[i]['Ini'] = true
                    }
                    inner_callback(null);
                } else {
                    tables[i]['Ini'] = true;
                    inner_callback(err);
                };
            });
        }, function(err){
                //SECCIÓN DE CREACIÓN DE TABLAS
                if(err){
                    console.log('['+msg_err+'/search]',err.message);
                }
                mysql.beginTransaction(function(err) {
                    if (err) { console.log('['+msg_err+'/transaction]',err.message); }
                    async.forEachOf(tables, function (dataElement, i, inner_callback){
                        if(dataElement['Ini'] == true){
                            let SQL = "DROP TABLE IF EXISTS "+dataElement['Table']+";";
                            mysql.query(SQL, function(err, rows){
                                if(!err){
                                    SQL = "CREATE TABLE IF NOT EXISTS "+dataElement['Table']+" ("
                                    for(x = 0; x <  Object.keys(dataElement['Create']).length; x++){
                                        SQL += dataElement['Create'][x]
                                        if(x < Object.keys(dataElement['Create']).length-1){
                                            SQL += ", "
                                        }
                                    }
                                    SQL += " );"
                                    mysql.query(SQL, function(err, rows){
                                        if(!err){
                                            //SECCIÓN DE INSERCIÓN
                                            mysql.query(dataElement['Insert'], function(err, rows){
                                                if(!err){
                                                    inner_callback(null);
                                                }else{
                                                    inner_callback(err);     
                                                }
                                            })
                                        } else {
                                            inner_callback(err);
                                        };
                                    });
                                } else {
                                    inner_callback(err);
                                };
                            });
                        }
                    }, function(err){
                        if(err){
                            console.log('['+msg_err+'/create]',err.message);
                        }
                        mysql.commit(function(err2) {
                            if (err2) { 
                                 mysql.rollback(function() {
                                    console.log('['+msg_err+'/transaction]',err2.message);
                                });
                                res.send(false);  
                            }else{
                                console.log('Transaction Completed Successfully.');
                                res.send(true);
                            }  
                        })

                    });
                })
        })
    
    }


module.exports = controller;
