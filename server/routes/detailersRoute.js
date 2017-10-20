const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/detailersCtrl');

router.get('/newAppointments', usersCtrl.getNewAppointments);

router.get('/detailerHistory', usersCtrl.getAppointmentHistory);

router.post('/placeBid', usersCtrl.placeBid);

router.post('/addToSchedule', usersCtrl.addToSchedule);

router.get('/scheduledAppts', usersCtrl.getScheduledAppts);

router.get('/scheduledAppts/details', usersCtrl.getScheduledApptsDetails);

router.post('/completeAppt', usersCtrl.completeAppt);

router.get('/updateRating', usersCtrl.updateRating);

router.get('/getFeedback', usersCtrl.getFeedback);

module.exports = router;