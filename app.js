let exp="";
let val = [];
let isDec1 = false;
let isDec2 = false;
let dec1 = 0;
let dec2 = 0;
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
    if (val[1]===undefined){
        return;
    }
    let res;
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
    if (res.toString().includes('.')){
        isDec1 = true;
        dec1 = res.toString().length - res.toString().indexOf('.')-1;
        exp = res.toString();
        val[0]=res;
    }
    else {
        updateExp(res);
    }
}

function updateExp(a){
    // check if arg is val or op
    if (typeof(a)==="number"){
        // if it is first val add to val[0]
        if (op===""){
            if (isDec1){
                if (a===0){
                    dec1+=1;
                    exp+="0";
                    document.getElementById("bar").innerHTML = exp;
                    return;
                }
                else {
                    console.log(val[0]);
                    val[0]=val[0]+a*Math.pow(10, -dec1-1);
                    val[0]=parseFloat(val[0].toFixed(dec1+1));
                    dec1+=1;
                }
            }
            else if (val[0]===undefined){
                val[0]=a;
            }
            else {
                val[0]=val[0]*10+a;
            }
            exp = val[0].toString();
        }
        // if it is a number, but op is already defined, then we must update val[1]
        else {
            if (isDec2){
                if (a===0){
                    dec2+=1;
                    exp+="0"
                    document.getElementById("bar").innerHTML = exp;
                }
                else {
                    val[1]=val[1]+a*Math.pow(10, -dec2-1);
                    val[1]=parseFloat(val[1].toFixed(dec2+1));
                    dec2+=1;
                }
            }
            else if (val[1]===undefined){
                val[1]=a;
            }
            else {
                val[1]=val[1]*10+a;
            }
            exp = val[0].toString()+op+val[1].toString();
        }
    }
    else if (a==="."){
        if (val.length!==0){
            if (op===""){
                if (!isDec1){
                    isDec1 = true;
                    exp = val[0]===undefined ? "." : val[0].toString()+".";
                }
            }
            else {
                if (!isDec2 && val[1]!==undefined){
                    isDec2 = true;
                    exp = val[1]===undefined ? val[0].toString()+op+"." : val[0].toString()+op+val[1].toString()+".";
                }
            }
        }
    }
    else {
        if (op==="" && val.length!==0){
            op = a;
            exp += a;    
        }
        
    }
    document.getElementById("bar").innerHTML = exp;
}

function clearBar(){
    exp ="";
    val = [];
    op = "";
    isDec1 = false;
    isDec2 = false;
    dec1 = 0;
    dec2=0;
    document.getElementById("bar").innerHTML = exp;
    
}

function deleteItem(){
    exp = exp.slice(0, exp.length-1);   
    if (op===""){
        if (isDec1){
            val[0]=parseFloat(exp);
            dec1-=1;
        }
        else if (val.length>0){
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
        if (isDec2){
            let index = exp.indexOf(op);
            let temp = exp.slice(index+1, exp.length)
            val[1]=parseFloat(temp);
            dec2-=1;
        }
        if (val[1].toString().length>1){
            val[1]=(val[1]-(val[1]%10))/10;
        }
        else {
            val[1] = undefined;
        }
    }
    if (dec1===-1){
        isDec1=false;
        dec1=0;
    }
    if (dec2===-1){
        isDec2=false;
        dec2=0;
    }
    document.getElementById("bar").innerHTML = exp;
}