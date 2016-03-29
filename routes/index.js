/*
 * GET home page.
 */
var db = require('../config/db');
// db.connect();

exports.index = function(req, res) {
    res.render('index', { title: 'login' })
};
exports.home = function(req, res) {
    res.render('home', { title: 'Expreeeess' })
};

// exports.test = function(req, res){
//   res.json({ title: 'test' })
// };

exports.add = function(req, res) {
    var sum = req.param('title');
    var pass = req.param('pass');

    //res.json({ title: sum , pass: pass});
    var x = '';


    // db.query('SELECT * FROM test1 where id=1', function(err, rows, fields) {
    //     if (err) throw err;
    //     //console.log(rows);
    //     rows.forEach(function(user) {
    //         x = user.user_name;
    //         console.log(x);
    //     });

    //     //res.send(rows[0][0]);
    //     //console.log('The solution is: ', rows);
    //     console.log(x)
    //     if (x == sum) {
    //     	req.session.user1 = x;         
    //         res.writeHead(301, { Location: 'index1' });
    //         res.end();
    //     } else {
    //         console.log(this.x);
    //     }

    // });

    //var a = ["a", "b", "c"];


    //connection.end();

};
