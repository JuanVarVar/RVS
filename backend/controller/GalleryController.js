
const mysql = require('../database/mysql_conect.js')
const env = require('../../config');
const array = require('../test/array.js');
const request = require('request')
const async = require('async')


const controller = {}

    controller.load_test = (req,res) => {
        const ex = req.body.search;
        const regex = new RegExp('('+ex+')', 'i');
        let container = []
        let array_keys = 0;
        for(i=0; i < Object.keys(array).length; i++){
            if (regex.test(array[i]['recipe'].label)) { 
                container[array_keys]={'recipe':array[i]['recipe']}
                array_keys++;
            }
        }
        res.send(container);
    }

    controller.load_api = async (req,res) =>{
        let url_api = 'https://api.edamam.com/api/recipes/v2'
        if(req.body.id == -1){
            url_api += '?q='+req.body.search+'&'
        }else{
            url_api += '/'+req.body.id+'?'
        }
        url_api += 'type=public&app_id='+env.ID_API+'&app_key='+env.API_KEY

        let option ={
            url: url_api,
            method: 'GET',
            json: true,
        }
        request(option,function(err,r){
            if (err) {
                res.send(false);
            }
            res.send(r.body);
        })
    }


    controller.load_bd = (req,res) =>{
        if(mysql.state === 'disconnected'){
            console.log('[ERROR GalleryController] - ','NO SE PUDO CONECTAR A LA BD');
            return res.send(false); 
        }
        let SQL = '';
        if(req.body.id == -1){
            find=req.body.search.replace(' ', '%');
            SQL = "SELECT * FROM rms_recipes WHERE label LIKE '%"+find+"%'"
        }else{
            SQL = "SELECT * FROM rms_recipes WHERE ID = "+req.body.id
        }
        
        let recipe = [];

        mysql.query(SQL, function (err, result) {

            if(err){
                console.log('[SELECT ERROR GALLERY] - ',err.message);
                res.send(recipe);
            }

            async.forEachOf(result, function (dataElement, i, inner_callback){
                recipe.push({'recipe':dataElement});

                let SQL2 = "SELECT x.line FROM rms_ingredients as x "
                SQL2 += "INNER JOIN rms_recipes as y ON x.id_rms_recipe = y.id ";
                SQL2 += "WHERE y.id = "+dataElement.id;

                let ingredients = [];

                mysql.query(SQL2, function(err, rows){
                    if(!err){
                        for(x = 0; x < Object.keys(rows).length; x++){
                            ingredients[x]=rows[x].line;
                        }
                        recipe[i]['recipe']['ingredientLines'] = ingredients;
                        inner_callback(null);
                    } else {
                        console.log("Error while performing Query");
                        inner_callback(err);
                    };
                });
            }, function(err){
                if(err){
                    console.log('[SELECT ERROR GALLERY] - ',err.message);
                }else{
                    res.send(recipe);
                }
            });
        })
    }


module.exports = controller;
