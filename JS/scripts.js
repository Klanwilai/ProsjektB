const sted = document.querySelector("#sted");
const postn = document.querySelector("#post");
const nr = document.querySelector("#nr");
const gatefelt = document.querySelector("#g");
const searchURL = "http://folk.ntnu.no/oeivindk/imt1441/sok.php?q="
let timer;
let changer = false;
let adress = {};


/**
*   Sets delay before @function streetAutoComplete() runs
*/
function runAutoComplete(){
    clearTimeout(timer);
    timer = setTimeout( e => {streetAutoComplete();}, 300);
}


/**
*   Runs if field isn't empty, fetches search suggestion.
*   If search suggestion is picked then @var changer is true, data is copied into @var adress.
*   The other input fields are filled and @var changer is set back to false
*/
function streetAutoComplete(){
    var count = 0;
    if(gatefelt.value.length > 0){
        console.log(gatefelt.value);
        fetch(`${searchURL}${encodeURIComponent(gatefelt.value)}`)
        .then(res => res.json())
        .then(data => {
            if(changer){
                adress = data;
        		postn.value = adress[0].postnr;
        		sted.value = adress[0].sted;
        		if(adress[0].nr.length <= 1){
                    nr.value = adress[0].nr;
        		}
        		gatefelt.value = adress[0].gate;
                changer = false;
            }
            var html = "";
            data.forEach(item => {
                if(item.nr.length > 1){
                    for(const itemNr of item.nr)
                    { html += `<option>${item.gate} ${itemNr}, ${item.postnr} ${item.sted}</option><br>`; }
                }
                else
                    { html += `<option>${item.gate}, ${item.postnr} ${item.sted}</option><br>`; }
            });
            temp = html.split("<br>");
            html = "";
            for(i = 0; i < 10; i++){
                html += temp[i];
            }
            document.querySelector("#SearchSuggestions").innerHTML = html;
            document.querySelector("#g").addEventListener("change", e => {
                changer = true;
            });
        });
    }
    else {console.log("empty");}
}

/**
*   Takes input postcode as @param postnr and uses the @function binaryIndexOf inside the Promise postalFromCode
*   if postnr is valid postcode, then promise is resolved and sted input fields value is set to corresponding sted to the postcode
*/
function postCodeCheck(postnr){
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
*   This function keeps @function postCodeCheck(postnr) from running until input length is 4.
*   Also empties "sted" input field if "post" input length is less than 4.
*/
function postLengthCheck(){
    let post = document.querySelector("#post").value;
    postn.setAttribute("aria-invalid", "false");

    if(post.length >= 4) {postCodeCheck(post);}
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
*   @function exists could be replaced with index >= 0, but then 0000 and negative numbers would return index 0 -> 0001, Oslo.
*/
const postalFromCode = (code) => {
    return new Promise((resolve, reject) => {
        if(exists(code)) {resolve("Everything is OK");}
        else {reject(Error("Nothing is OK"));}
    });
}
