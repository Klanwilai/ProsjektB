const sted = document.querySelector("#sted");
const postn = document.querySelector("#post");


function mainFunction(postnr){
    var index = postalCodes.binaryIndexOf(postnr, compareValues);


    postalFromCode(postnr).then (e => {
        if(index >= 0) {console.log(e, `${postnr} is ${postalCodes[index].sted}`); sted.value = postalCodes[index].sted;}
    }).catch (e => {
        postn.setAttribute("aria-invalid", "true");
        sted.value = " ";
        console.log(e, `${postnr} is invalid. `);
    });
}

/**
*   This function keeps @function mainFunction(postnr) from running until input length is 4.
*   Also empties "sted" input field if "post" input length is less than 4.
*/
function postLength(){
    let post = document.querySelector("#post").value;
    postn.setAttribute("aria-invalid", "false");

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
