var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/byzantine');

var AccountSchema = new mongoose.Schema({
    email:     { type: String, unique: true },
    password:  { type: String },
    name: {
        first:   { type: String },
        last:    { type: String }
    }
});

var Account = mongoose.model('Account', AccountSchema);

exports.authenticate = function (req, res) {
    console.log(req.body.email);
    Account.findOne({email: req.body.email, password: req.body.password}, function(err,doc) {
        if(err) {
            throw new Error('Error occured: ' + err);
        }
        if (doc) {
            req.session.loggedIn = true;
            //console.log('Successfully logged in');
            res.redirect('/dashboard');
        } else {
            res.render('index', {error: true});
        }
    });
};

exports.register = function (req, res)  {

    var user = new Account({
        email: req.body.email,
        password: req.body.password,
        name: {
            first: req.body.first,
            last: req.body.last
        }
    });
    user.save(function () {
        console.log('saved');
    });
    res.send(200);
};
