const express = require('express')
const app = express()
const port = 3000

var fs = require('fs');

var ejs = require('ejs');

app.set('view engine', 'ejs');

var ActiveDirectory = require('activedirectory2');

// const customeParser = function(entry, raw, callback) { 
//   if (raw.hasOwnProperty("thumbnailPhoto")) { 
//     entry.thumbnailPhoto = raw.thumbnailPhoto; 
//   } callback(entry) 
// }


var ad = new ActiveDirectory({ url: 'ldap://ad.balkangraph.com',
  baseDN: 'dc=ad,dc=balkangraph,dc=com',
  username: 'zorry@ad.balkangraph.com',
  password: 'qaz123wsx!@#',
  attributes: {
    user: [ 'cn', 'manager', 'thumbnailPhoto'],
 // entryParser: customeParser
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


var groupName = 'EmployeesOrgChart';



ad.getUsersForGroup(groupName, function(err, users) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }
 
  if (! users) console.log('Group: ' + groupName + ' not found.');
  else {
    var nodes = [];

    for (i = 0; i < users.length; i++){
      var user = users[i];
      var u = {};
      u.name = user['cn'];
      if (user['manager']) {
        var m = String(user['manager']);  
        var list = m.split(',');
        var manager = list[0].slice(3);  
        u.pid = manager;
       
      }
     
      u.id = u.name;
      delete u.name;

      var buf = Buffer.from(user['thumbnailPhoto']);

    //   var b64 = 'data:image/png;base64,' + buf.toString('base64');
       var b64 = 'data:image/svg+xml;base64,' + buf.toString('base64');


      u.img =  b64;
       nodes.push(u);
     }
     console.log(Buffer.from(users[1]['thumbnailPhoto']).toString('base64'));
     app.get('/', function(req, res){
      res.render('index', { nodes : JSON.stringify(nodes) });
    });
  }
});