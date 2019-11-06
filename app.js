const ad = require('./ad');



ad.getGroupsWithMembership(function(err, tree){
    
    addId(tree);
   
    addPid(tree);

    console.log(tree);
});
  
function addId(tree) {

    for (i = 0; i < tree.length; i++){

        tree[i].id = i; 
        
    }

}

function addPid(tree) {
    for (i = 0; i < tree.length; i++) {
        if (tree[i].list.length > 0) {
            for (j = 0; j < tree[i].list.length; j++) {
                var group = tree[i].list[j];
                  for (k = 0; k < tree.length; k++){
                      if (tree[k] == group) tree[i].pid = tree[k].id;
                  }
            }
        }
    }
}