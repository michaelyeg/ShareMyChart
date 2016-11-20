/**
 * Created by Jill - Offline on 2016-11-19.
 * This is a siiiiingleton!!
 */


var PossibleGraphManager = function(){
    $.pG = [];
};

PossibleGraphManager.prototype.addToManager = function(item){
    $.pG.push(item);
};

PossibleGraphManager.prototype.clearManager = function(){
    $.pG = [];
};

PossibleGraphManager.prototype.getAll = function(){
    return $.pG;
};

PossibleGraphManager.prototype.getLength = function(){
  return $.pG.length;
};

PossibleGraphManager.prototype.prioritize = function(pam1, pam2){
    if($.pG.length ==1){
        //just let it be, only one choice
        ;
    }else{
        //check their data types in regards to the graph choices, decide that way?


    }
}