const routes = require('express').Router();
const controller = require('../controllers/controller.js');

routes.post('/add-content',controller.addContent); 

module.exports=routes;