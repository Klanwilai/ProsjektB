const sted = document.querySelector("#sted");
const postn = document.querySelector("#post");


function mainFunction(postnr){



    postalFromCode(postnr).then (e => {
        for(const postalCode of postalCodes){
            if(postnr === postalCode.nr) {console.log(e, `${postnr} is ${postalCode.sted}`); sted.value = postalCode.sted;}
        }
    }).catch (e => {
        postn.setAttribute("class", "invalid");
        sted.value = " ";
        console.log(e, `${postnr} is invalid. `);
    });
}

/**
*   This function keeps @function mainFunction(postnr) from running until input length is 4.
*/
function postLength(){
    postn.setAttribute("class", "valid");
    let post = document.querySelector("#post").value;
    if(post.length >= 4) {mainFunction(post);}
    else {sted.value=" ";}
}

/**
*   This function returns true if param exists in postalCodes arrays
*   @param  code    the value we want to look for in array
*/
function exists(code){
    for(const postalCode of postalCodes){
        if(code === postalCode.nr) {return true;}
    }
    return false;
}

/**
*   This promise is wrapped in a function
*   @param  code    promise is resolved if @function exists returns true
*/
const postalFromCode = (code) => {
    return new Promise((resolve, reject) => {
        if(exists(code)) {resolve("Everything is OK");}
        else {reject(Error("Nothing is OK"));}
    });
}
