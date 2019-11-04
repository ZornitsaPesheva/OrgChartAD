const express = require('express')
const app = express()
const port = 3000

var ActiveDirectory = require('activedirectory');
var config = { url: 'ldap://ad.balkangraph.com',
               baseDN: 'dc=balkangraph,dc=com',
               username: 'zorry@ad.balkangraph.com',
               password: 'qaz123wsx!@#' }
var ad = new ActiveDirectory(config);


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var ad = new ActiveDirectory(config);
var username = 'zorry@ad.balkangraph.com';
var password = 'qaz123wsx!@#';
 
ad.authenticate(username, password, function(err, auth) {
  if (err) {
    console.log('ERROR: '+JSON.stringify(err));
    return;
  }
  
  if (auth) {
    console.log('Authenticated!');
  }
  else {
    console.log('Authentication failed!');
  }
});