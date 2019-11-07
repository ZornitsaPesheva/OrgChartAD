const express = require('express')
const app = express()
const port = 3000



var ejs = require('ejs');

app.set('view engine', 'ejs');

var ActiveDirectory = require('activedirectory2');


var ad = new ActiveDirectory({ url: 'ldap://ad.balkangraph.com',
  baseDN: 'dc=ad,dc=balkangraph,dc=com',
  username: 'zorry@ad.balkangraph.com',
  password: 'qaz123wsx!@#',
  attributes: {
    user: [ 'cn', 'manager'],
    group: [ 'distinguishedName', 'objectCategory', 'cn', 'description' ]
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
      nodes.push(u);
     }
    // console.log(nodes);

     app.get('/', function(req, res){
      res.render('index', { nodes : JSON.stringify(nodes) });
    });
  }

  

});