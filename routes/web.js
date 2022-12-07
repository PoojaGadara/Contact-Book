const express = require('express');
const auth = require('../middleware/auth')
const usercontroller = require('../controllers/userController')
const contactController = require('../controllers/contactController')
const router = express.Router();

router.post('/user/new',usercontroller.createUser);
router.post('/login',auth,usercontroller.loginUser);
router.post('/contact/new',auth,contactController.createContact);
router.get('/singlecontact/:name',auth,contactController.getSingleContact);
router.post('/updatecontact/:_id',auth,contactController.updateContact);
router.get('/deletecontact/:_id',auth,contactController.deleteContact)
router.get('/allcontact',auth,contactController.getAllContact)
router.get('/getcontact/:name',auth,contactController.getCaseSensitiveContact)
router.get('/getpage',auth,contactController.getPage)

module.exports = router;