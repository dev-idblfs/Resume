var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/" + "index.html"));
    app.use(express.static('assets'));
});

var a = false;
app.post('/submit', function(req, res) {
    a = true;

    var email = req.body.email;
    var dt = new Date().toString();
    var admin = require("firebase-admin");
    var serviceAccount = require("./node-b629b-firebase-adminsdk-rhm20-26be41513b.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://node-b629b.firebaseio.com"
    });


    // Get a database reference to our blog
    const db = admin.database();

    var d = new Date();
    var n = d.getTime();
    console.log(n);
    // creating a starting path in our database
    const ref = db.ref('firebase/' + n);

    // create a child node of the above path and write the following data to it

    var usersRef = ref.child('user');
    usersRef.set({
        Record: {
            Email_ID: email,
            Date_Time: dt,
        },
    });
    //res.write('You sent the email "' + req.body.email + '".\n');
    //console.log("Record !!!!");
    //return res.redirect('http://localhost:3000/welcome.htmll');
    res.end();
    //res.redirect('/submit/welcome.html');

});
if (a == true) {
    app.get('/avi/', function(req, res) {
        res.sendFile(path.join(__dirname + "/" + "welcome.html"));
        app.use(express.static('assets'));
    });

}




app.listen(3000);
console.log("Running at Port 3000");