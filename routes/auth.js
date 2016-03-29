/*
 * GET home page.
 */
var db = require('../config/db');
db.connect();

var sess;

exports.index1 = function(req, res) {
    res.render('index', { title: 'LOGIN' })
};

exports.login = function(req, res) {
    var userName = req.param('username');
    var password = req.param('password');
    var pass;

    if (userName) {
        db.query('SELECT * FROM users WHERE user_name=?', userName, function(err, rows) {
            if (err) throw err;
            //console.log(rows);
            rows.forEach(function(user) {
                pass = user.password;
                //console.log(x);
            });

            if (pass) {
                if (password == pass) {
                    sess = req.session;
                    sess.username = userName;
                  
                    res.writeHead(302, {
                        'Location': '/home'
                    });

                    res.end();
                    // setTimeout(function() {

                    // }, 3000);
                    // res.redirect('/home');

                } else {
                    res.redirect('/index1');
                }
            } else {
                res.redirect('/index1');
            }

        });
    } else {
        res.redirect('/index1');
    }

};

exports.logout = function(req, res) {
    sess = req.session;
    console.log(sess);
    sess.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }

    });
};
