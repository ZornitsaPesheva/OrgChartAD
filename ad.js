var getGroupsWithMembership = function (callback) {
  var query = 'CN=*OrgChart*';
  var ActiveDirectory = require('activedirectory2');
  var config = {
    url: 'ldap://ad.balkangraph.com',
    baseDN: 'dc=ad,dc=balkangraph,dc=com',
    username: 'zorry@ad.balkangraph.com',
    password: 'qaz123wsx!@#'
  }
  var ad = new ActiveDirectory(config);


  ad.findGroups(query, function (err, groups) {
    if (err) {
      console.log('ERROR: ' + JSON.stringify(err));
      return;
    }

    if ((!groups) || (groups.length == 0)) {
      console.log('No groups found.');
    }
    else {

      var orgChartGroups = [];

      for (i = 0; i < groups.length; i++) {
        var group = groups[i];
        var g = {};
        g.id = i;
        g.name = group['cn'];
        orgChartGroups.push(g);
      }
    }

    var index = 0;
    var result = [];
    for (i = 0; i < orgChartGroups.length; i++) {

      (function (_i) {
        var groupName = orgChartGroups[_i].name;

        ad.getGroupMembershipForGroup(groupName, function (err, groups) {
          var list = [];

          if (err) {
            console.log('ERROR: ' + JSON.stringify(err));
            callback(err);
            return;
          }

          if (!groups) {
            console.log('Group: ' + groupName + ' not found.');
          }
          else {
            for (j = 0; j < groups.length; j++) {
              list.push(groups[j].cn);
            }
          }

          var g = {
            name: groupName,
            list: list
          };

          result.push(g);
          

          index++;
          if (index == orgChartGroups.length) {
            callback(null,  result);
          }
        });
      })(i)
    }
  });
}



module.exports = {
  getGroupsWithMembership: getGroupsWithMembership
}
