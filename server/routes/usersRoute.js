const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/usersCtrl');

router.get('/getusers', usersCtrl.getUsers);

router.put('/location', usersCtrl.updateLocation);

router.get('/currentLocation', usersCtrl.getCurrentLocation);

router.get('/getCars', usersCtrl.getCars);

router.get('/getPackages', usersCtrl.getPackages);

router.post('/createAppointment', usersCtrl.createAppointment);

router.get('/appointmentHistory', usersCtrl.getAppointmentHistory);

router.get('/getBids', usersCtrl.getBids);

router.put('/removeBids', usersCtrl.removeBids);

router.post('/updateHistory', usersCtrl.updateHistory);

router.post('/removeHistory', usersCtrl.removeHistory);

router.post('/submitFeedback', usersCtrl.submitFeedback);

router.get('/fullHistory', usersCtrl.getFullHistory);

router.post('/payment', usersCtrl.makePayment);

router.post('/addNewCar', usersCtrl.addNewCar);

router.post('/removeCar', usersCtrl.removeCar);

module.exports = router;