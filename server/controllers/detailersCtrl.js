const getNewAppointments = (req, res, next) => {
    const db = req.app.get('db');
    db.newappointments.find({})
    .then(results => {
        res.json(results);
    })
    .catch(err => {
        res.json(err);
    });
};

const getAppointmentHistory = (req, res, next) => {
    const db = req.app.get('db');
    var id = req.session.passport.user.user.id;
        db.getDetailerHistory([id])
        .then(results => {
            res.json(results);
        });
};

const placeBid = (req, res, next) => {
    const db = req.app.get('db');
    db.placeBid([req.body.id, req.body.userid, req.body.detailerid, req.body.appointmentdate, req.body.starttime, req.body.endtime, req.body.location, req.body.car, req.body.instructions, req.body.package, req.body.bidprice, req.body.detailername, req.body.detailerrating])
    .then(results => {
        res.json(results);
    });
};

const addToSchedule = (req, res, next) => {
    const db = req.app.get('db');
    db.addToSchedule(req.body)
    .then( function(){
        console.log(req.body);
        db.addPayment(req.body);
    }
    )
    .then(results => {
        res.json(results);
    });
};

const getScheduledAppts = (req, res, next) => {
    const db = req.app.get('db');
    var id = req.session.passport.user.user.id;
        db.getScheduledAppts([id])
        .then(results => {
            res.json(results);
        });
};

const getScheduledApptsDetails = (req, res, next) => {
    const db = req.app.get('db');
    var id = req.session.passport.user.user.id;
        db.getScheduledApptsDetails([id])
        .then(results => {
            res.json(results);
        });
};

const completeAppt = (req, res, next) => {
    const db = req.app.get('db');
    db.completeAppt(req.body)
    .then(
        db.addToHistory(req.body)
    )
    .then(results => {
        res.json(results);
    });
};

const updateRating = (req, res, next) => {
    const db = req.app.get('db');
    var id = req.session.passport.user.user.id;
        db.updateRating([id])
        .then(results => {
            res.json(results);
        });
};

const getFeedback = (req, res, next) => {
    const db = req.app.get('db');
    var id = req.session.passport.user.user.id;
        db.getFeedback([id])
        .then(results => {
            res.json(results);
        });
};

module.exports = {
    getNewAppointments,
    getAppointmentHistory,
    placeBid,
    addToSchedule,
    getScheduledAppts,
    getScheduledApptsDetails,
    completeAppt,
    updateRating,
    getFeedback
};