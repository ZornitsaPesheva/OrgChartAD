const ad = require('./ad');



ad.getGroupsWithMembership(function(err, tree){
    
    addId(tree);
    var slinks = sLinks(tree);

   
  //  addPid(tree);

    console.log(tree);
    console.log(slinks);
});
  
function addId(tree) {

    for (i = 0; i < tree.length; i++){

        tree[i].id = i; 
        
    }

}

// function addPid(tree) {
//     for (i = 0; i < tree.length; i++) {
//         if (tree[i].list.length > 0) {
//             for (j = 0; j < tree[i].list.length; j++) {
//                 var group = tree[i].list[j];
//                   for (k = 0; k < tree.length; k++){
//                       if (tree[k].name == group) tree[i].pid = tree[k].id;
//                   }
//             }
//         }
//     }

// }

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