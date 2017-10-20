const getUsers = (req, res, next) => {
    const db = req.app.get('db');
    db.users.find({})
    .then(results => {
        res.json(results);
    })
    .catch(err => {
        res.json(err);
    });
};

const updateLocation = (req, res, next) => {
    const db = req.app.get('db');
        db.updateLocation([req.body.id, req.body.location])
        .then(function() {
          res.json(req.body);
        });
};

const getCurrentLocation = (req, res, next) => {
    const db = req.app.get('db');
    var id = req.session.passport.user.user.id;
        db.getCurrentLocation([id])
        .then(results => {
            res.json(results[0].currentlocation);
        });
};

const getCars = (req, res, next) => {
    const db = req.app.get('db');
    var id = req.session.passport.user.user.id;
    db.getCars([id])
    .then(results => {
        res.json(results);
    })
    .catch(err => {
        res.json(err);
    });
};

const getPackages = (req, res, next) => {
    const db = req.app.get('db');
    db.packages.find({})
    .then(results => {
        res.json(results);
    })
    .catch(err => {
        res.json(err);
    });
};

const createAppointment = (req, res, next) => {
    const db = req.app.get('db');
    db.createAppointment([req.body.id, req.body.date, req.body.location, req.body.start, req.body.end, req.body.package, req.body.car, req.body.instructions])
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
        db.getAppointmentHistory([id])
        .then(results => {
            res.json(results);
        });
};

const getBids = (req, res, next) => {
    const db = req.app.get('db');
    var id = req.session.passport.user.user.id;
        db.getBids([id])
        .then(results => {
            res.json(results);
        });
};

const removeBids = (req, res, next) => {
    const db = req.app.get('db');
    db.removeBids(req.body)
    .then(() => {
        db.removeAppts(req.body);
    })
    .then(results => {
        res.json(results);
    })
    .catch(err => {
        console.log(err)
    });
};

const updateHistory = (req, res, next) => {
    const db = req.app.get('db');
        db.updateHistory(req.body)
        .then(results => {
            res.json(results);
        });
};

const removeHistory = (req, res, next) => {
    const db = req.app.get('db');
        db.removeHistory(req.body)
        .then(results => {
            res.json(results);
        });
};

const submitFeedback = (req, res, next) => {
    const db = req.app.get('db');
        db.submitFeedback(req.body)
        .then( function(){
            db.setRating(req.body);
        })
        .then(results => {
            res.json(results);
        });
};

const getFullHistory = (req, res, next) => {
    const db = req.app.get('db');
    var id = req.session.passport.user.user.id;
        db.getFullHistory([id])
        .then(results => {
            res.json(results);
        });
};

const makePayment = (req, res, next) => {
    const stripe = require('stripe')('sk_test_FelzwUCgPNeKtsEMHIQG3vZu');
    console.log(req.body);
    const amount = Math.round(req.body.total,4);
    const { id, email } = req.body.token;
    const cardId = req.body.token.card.id;
  
  stripe.customers.create({
      email,
      source: id
    })
    .then(customer => stripe.charges.create({
      amount,
      description: 'Detailer Payment',
      currency: 'usd',
      customer: customer.id,
      card: cardId
    }))
    .then(charge => res.json({message: 'Successful Message'}));
  };

const addNewCar = (req, res, next) => {
    const db = req.app.get('db');
        db.addCar([req.body.userid, req.body.year, req.body.make, req.body.model])
        .then(results => {
            res.json(results);
        });
};


const removeCar = (req, res, next) => {
    const db = req.app.get('db');
        db.removeCar([req.body.id])
        .then(results => {
            res.json(results);
        });
};

module.exports = {
    getUsers,
    updateLocation,
    getCurrentLocation,
    getCars,
    getPackages,
    createAppointment,
    getAppointmentHistory,
    getBids,
    removeBids,
    updateHistory,
    removeHistory,
    submitFeedback,
    getFullHistory,
    makePayment,
    addNewCar,
    removeCar
};