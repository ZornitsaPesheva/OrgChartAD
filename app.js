const express = require('express')
const app = express()
const port = 3000



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
    app.get('/', (req, res) => res.send('Authenticated!'))
  }
  else {
    console.log('Authentication failed!');
  }
});


var groupName = 'Employees';
 
var ad = new ActiveDirectory(config);ad.getUsersForGroup(groupName, function(err, users) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }
 
  if (! users) console.log('Group: ' + groupName + ' not found.');
  else {
    console.log(JSON.stringify(users));
  }
});