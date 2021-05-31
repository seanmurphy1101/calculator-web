let exp="";
let val = [];
let op = "";

function addExp(arg1, arg2){
    return arg1+arg2;
}

function subtractExp(arg1, arg2){
    return arg1-arg2
}

function multiplyExp(arg1, arg2){
    return arg1*arg2;
}

function divideExp(arg1, arg2){
    if (arg2 === 0 ){
        return ("don't do that")
    }
    return arg1/arg2;
}

function raiseExp(arg1, arg2){
    return Math.pow(arg1,arg2);
}

function operate(){
    if (op==="+"){
        res = addExp(val[0],val[1]);
    }
    else if (op==="-"){
        res = subtractExp(val[0],val[1]);
    }
    else if (op==="*"){
        res = multiplyExp(val[0],val[1]);
    }
    else if (op==="/"){
        res = divideExp(val[0],val[1]);
    }
    else if (op==="^"){
        res = raiseExp(val[0], val[1]);
    }
    clearBar();
    document.getElementById("bar").innerHTML = res;
    updateExp(res);
}

function updateExp(a){
    // check if arg is val or op
    if (typeof(a)==="number"){
        // if it is first val add to val[0]
        if (op===""){
            // if val has no val, set it to arg
            if (val.length===0){
                val[0]=a;
            }
            // if val does have a value, this has to be the new ones digit
            else {
                val[0]=val[0]*10+a;
            }
            // update exp with new first value
            exp = val[0].toString();
        }
        // if it is a number, but op is already defined, then we must update val[1]
        else {
            // if val has no val, set it to arg
            if (val[1]===undefined){
                val[1]=a;
            }
            // if val does have a value, this has to be the new ones digit
            else {
                val[1]=val[1]*10+a;
            }
            exp = val[0].toString()+op+val[1].toString();
        }
    }
    else {
        op = a;
        exp += a;
    }
    document.getElementById("bar").innerHTML = exp;
}

function clearBar(){
    exp ="";
    val = [];
    op = "";
    document.getElementById("bar").innerHTML = exp;
    
}

function deleteItem(){
    exp = exp.slice(0, exp.length-1);
    if (op===""){
        if (val.length>0){
            if (val[0].toString().length>1){
                val[0]=(val[0]-(val[0]%10))/10;
            }
            else {
                val = [];
            }
        }
    }
    else if (val[1]===undefined){
        op = "";
    }
    else {
        val[1]=(val[1]-(val[1]%10))/10;
    }
    document.getElementById("bar").innerHTML = exp;
}