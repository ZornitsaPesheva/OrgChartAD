const ad = require('./ad');

  
const express = require('express');
const app = express();
const port = 3000;



var ejs = require('ejs');

app.set('view engine', 'ejs');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


ad.getGroupsWithMembership(function(err, tree){
    
    addId(tree);
    var slinks = sLinks(tree);
    var nodes = deleteLists(tree);
   
  //  addPid(tree);

    app.get('/', function(req, res){
     //   res.render('index', [{ tree : JSON.stringify(tree) }, { slinks: JSON.stringify(slinks) }]);
        res.render('index', { nodes: JSON.stringify(nodes),  slinks: JSON.stringify(slinks) } );
      });
});
  
function addId(tree) {

    for (i = 0; i < tree.length; i++){

        tree[i].id = i; 

        
    }

}


function sLinks(tree) {
    var slinks = [];
    for (i = 0; i < tree.length; i++) {
        if (tree[i].list.length > 0) {
            for (j = 0; j < tree[i].list.length; j++) {
                var group = tree[i].list[j];
                  for (k = 0; k < tree.length; k++){
                      if (tree[k].name == group) {

                        var link = {};
                        link.from = tree[i].id;
                        link.to = tree[k].id;

                        slinks.push(link);
                      }
                  }
            }
        }
    }

    return slinks;
}

function deleteLists(tree) {
    for (i = 0; i < tree.length; i++) delete tree[i].list;
    return tree;
}