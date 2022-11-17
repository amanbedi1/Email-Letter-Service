const routes = require('express').Router();
const controller = require('../controllers/controller.js');

routes.post('/addContent',controller.addContent);
routes.post('/addSubscriber',controller.addSubscriber);

// Experimental Routes
routes.get('/getContent',controller.fetchContent);
routes.get('/updateTime',controller.updateTime);
routes.get('/getMails',controller.findMails);


module.exports=routes;