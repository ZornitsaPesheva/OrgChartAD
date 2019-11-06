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


//  var username = 'zorry@ad.balkangraph.com';
//  var password = 'qaz123wsx!@#';
 
// ad.authenticate(username, password, function(err, auth) {
//   if (err) {
//     console.log('ERROR: '+JSON.stringify(err));
//     return;
//   }
  
//   if (auth) {
//    // app.get('/', (req, res) => res.send('Authenticated!'))
//   }
//   else {
//     console.log('Authentication failed!');
//   }
// });
//----------------------------------------------------------------------------------------------

// Show users from a group in an OrgChart:

 //var groupName = 'EmployeesOrgChart';

// ad.getUsersForGroup(groupName, function(err, users) {
//   if (err) {
//     console.log('ERROR: ' +JSON.stringify(err));
//     return;
//   }
 
//   if (! users) console.log('Group: ' + groupName + ' not found.');
//   else {
//     var nodes = [];

//     for (i = 0; i < users.length; i++){
//       var user = users[i];
//       var u = {};
//       u.id = i;
//       u.name = user['givenName'];
//       nodes.push(u);
//      }

//   }

//   app.get('/', function(req, res){
//     res.render('index', { nodes : JSON.stringify(nodes) });
//   });

// });

//-----------------------------------------------------------------------------------------------



// list groups with memberOf property

function add(groupName, list, callback) {
  console.log(groupName);
  console.log(list);
callback;
}

function print() {
console.loglog("done");
}
  

function cb(groupName, callback) {
  ad.getGroupMembershipForGroup(groupName, function(err, groups) { 

    var list = [];

    if (err) {
      console.log('ERROR: ' +JSON.stringify(err));
      return;
    }
  
    if (! groups) console.log('Group: ' + groupName + ' not found.');
    else {

     // console.log(JSON.stringify(groups));
      for (j = 0; j < groups.length; j++) {
        list.push(groups[j].cn); 
      }

    } 
   add(groupName, list, print);

  });
  callback;
}

function done() {
  console.log('donelist')
}

var listMemberships = function(groupsList) {
  

  for (i = 0; i < groupsList.length; i++) {

      var groupName = groupsList[i].name;

      cb(groupName, done);
    }
}



var query = 'CN=*OrgChart*';
 
 

ad.findGroups(query, function(err, groups) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }
 
  if ((! groups) || (groups.length == 0)) console.log('No groups found.');
  else {

    var orgChartGroups = [];

    for (i = 0; i < groups.length; i++){
      var group = groups[i];
      var g = {};
      g.id = i;
      g.name = group['cn'];
      orgChartGroups.push(g);
     }

  }
  app.get('/', function(req, res){
    res.render('index', { orgChartGroups : JSON.stringify(orgChartGroups) });
  
  });

   listMemberships(orgChartGroups);
  
});



  