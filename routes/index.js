exports.index = function(req, res){
    res.render('index', {error: false});
};

exports.renderSignUpPage = function (req, res) {
    res.render('sign-up-page');
};

exports.dashboard = function(req, res){
    res.render('dashboard');
};