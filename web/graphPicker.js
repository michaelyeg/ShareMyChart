/**
 * Created by michaelximac on 2016-11-03.
 */
function pickGraphType(X,Y) {
    if (X.getType=="nominal" && (Y.getType=="numeric" || Y.getType=="date")){
        aggregate(Y,X);
        displayBarchart(X,Y);
    }else if(X.getType=="nominal" && Y.getType=="nominal"){
        displayScatter(X,Y);
    }else if(X.getType=="numeric" && Y.getType=="date"){
        displayLineGraph(X,Y);
    }else if(X.getType=="numeric" && Y.getType=="numeric"){
        displayScatter(X,Y);
    }
}