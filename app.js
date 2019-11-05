const express = require('express')
const app = express()
const port = 3000



var ejs = require('ejs');

app.set('view engine', 'ejs');

var ActiveDirectory = require('activedirectory2');
var config = { url: 'ldap://ad.balkangraph.com',
               baseDN: 'dc=ad,dc=balkangraph,dc=com',
               username: 'zorry@ad.balkangraph.com',
               password: 'qaz123wsx!@#' }
var ad = new ActiveDirectory(config);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


var username = 'zorry@ad.balkangraph.com';
var password = 'qaz123wsx!@#';
 
ad.authenticate(username, password, function(err, auth) {
  if (err) {
    console.log('ERROR: '+JSON.stringify(err));
    return;
  }
  
  if (auth) {
   // app.get('/', (req, res) => res.send('Authenticated!'))
  }
  else {
    console.log('Authentication failed!');
  }
});

 var printUsers = function(users) {

  app.get('/', (req, res) => res.send(users));


 }

var groupName = 'Employees';
 
var ad = new ActiveDirectory(config);
ad.getUsersForGroup(groupName, function(err, users) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }
 
  if (! users) console.log('Group: ' + groupName + ' not found.');
  else {
    var nodes = [];
    //console.log(users);
    for (i = 0; i < users.length; i++){
      var user = users[i];
      var u = {};
      u.id = i;
      u.name = user['givenName'];

      nodes.push(u);
 
      app.get('/', function(req, res){
          res.render('index', { nodes : nodes });
      });
  
    }
    console.log(nodes);
  }
  
  //  app.get('/', (req, res) => res.send(users));
  
});

