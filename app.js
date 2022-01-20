"use estrict"

const express = require('express');
const env = require('./config.js');
const port = env.PORT || 3000
const path = require('path');
const rutas = './backend/router/data.router.js';
const mysql = require('mysql');

//webpack

const webpack = require('webpack');
const webpackDev = require('webpack-dev-middleware');
const config = require('./webpack.config');

const app = express()

//middleware

app.use(webpackDev(webpack(config)))

//setting
//app.set('port', port);

// starting server

app.listen(port,()=>{
    console.log('server listing on port', port);
})

app.use(express.static(path.join(__dirname,'./frontend/public')))

//rutas web

app.use(require(rutas));

//Error

app.get('*', (req, res) => {        
    res.sendFile(path.join(__dirname, './frontend/public', 'index.html'));               
});