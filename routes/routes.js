const routes = require('express').Router();
const controller = require('../controllers/controller.js');

routes.post('/add-content',controller.addContent);
routes.post('/add-subscriber',controller.addSubscriber);

module.exports=routes;