var db = require('../config/db');
// db.connect();


exports.home = function(req, res) {
    res.render('home', { title: 'NODE JS' })
};
exports.checkUser = function(req, res) {
    var sender = req.param('sender');
    var recvr = req.param('recvr');

    console.log("insert" + sender);

var post = { sender: sender, reciver: recvr }
    db.query('SELECT id FROM table1 WHERE  (sender=? AND reciver=?) OR (sender=? AND reciver=?) ', [sender, recvr, recvr, sender], function(err, rows) {
        if (err) throw err;
        console.log("rowss" + rows);
        if (rows.length > 0) {
            console.log(rows[0].id)
            res.json({chatId:rows[0].id})

        } 
        else 
        {
            db.query('INSERT INTO table1 SET ?', post,
                function(err, result) {
                    if (err) throw err;
                });
             db.query('SELECT id FROM table1 WHERE  (sender=? AND reciver=?) OR (sender=? AND reciver=?) ', [sender, recvr, recvr, sender], function(err, rows) {
                if (err) throw err;
                res.json({chatId:rows[0].id})
            });


        }

        //     db.query('INSERT INTO table2 SET ?', [id: rows.id, message: msg],
        //         function(err, result) {
        //             if (err) throw err;



        //         });
        // } else {
        //     db.query('INSERT INTO table1 SET ?', [sender: sender, reciver: recvr],
        //         function(err, result) {
        //             if (err) throw err;
        //         });
        //     db.query('SELECT id FROM table1 WHERE  sender=? and  reciver=? ', [sender, recvr], function(err, rows) {
        //         if (err) throw err;
        //     });

        //     db.query('INSERT INTO table2 SET ?', [id: rows.id, message: msg],
        //         function(err, result) {
        //             if (err) throw err;


        //         });



        // }
        //console.log(rows);


    });



};
exports.insert = function(data) {

    var sender = data.sender;
    var chatId = data.chatId;
    var chatMsg= data.chatMsg; 
    var tab2 = { sender: sender, id: chatId,message:chatMsg }
    db.query('INSERT INTO table2 SET ?', tab2,
        function(err, result) {
            if (err) throw err;

            

        });
};
exports.history = function(req, res) {
    var chatId=req.param('chatId');
    console.log(chatId);
    db.query('SELECT sender,message FROM table2 WHERE id=?',chatId, function(err, rows) {
        if (err) throw err;
        console.log("un"+rows);
         res.json({chats:rows})

    });

};
exports.delete = function(req, res) {
    var id = req.param('id');
    db.query('DELETE FROM users WHERE id= ?', id, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
        res.redirect('/views');

    });
};

exports.update1 = function(req, res) {
    var id = req.param('id');
    db.query('SELECT * FROM users WHERE id= ?', id, function(err, rows) {
        if (err) throw err;
        //console.log(rows);
        res.render('update2', { data: rows });

    });

};
exports.update = function(req, res) {
    var id = req.param('id');
    var username = req.param('userName');
    var password = req.param('password');
    db.query('UPDATE users SET user_name = ?,password=? WHERE id = ?', [username, password, id], function(err, rows) {
        if (err) throw err;
        //console.log(rows);
        res.redirect('/views');

    });

};