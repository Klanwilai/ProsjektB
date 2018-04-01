const sted = document.querySelector("#sted");
const postn = document.querySelector("#post");
const nr = document.querySelector("#nr");
const gatefelt = document.querySelector("#g");
const searchURL = "http://folk.ntnu.no/oeivindk/imt1441/sok.php?q="
let timer;
let changer = false;
let adress = {};




function runAutoComplete(){
    clearTimeout(timer);
    timer = setTimeout( e => {streetAutoComplete();}, 300);
}

function streetAutoComplete(){
    if(gatefelt.value.length > 0){
        console.log(gatefelt.value);
        fetch(`${searchURL}${encodeURIComponent(gatefelt.value)}`)
        .then(res => res.json())
        .then(data =>{
            if(changer){
		adress = data;
		changer = false;
		postn.value = adress[0].postnr;
		sted.value = adress[0].sted;		
		let tempnr = adress[0].nr[0];
		if(adress[0].nr.length <= 1){
		 nr.value = tempnr;
		}
		gatefelt.value = adress[0].gate;
	    }
            var html = "";
            data.forEach(item => {
                if(item.nr.length > 1){
                    for(const itemNr of item.nr)
                    { html += `<option>${item.gate} ${itemNr}, ${item.postnr} ${item.sted}</option>`; }
                }
                else
                    { html += `<option>${item.gate}, ${item.postnr} ${item.sted}</option>`; }
            });
            document.querySelector("#SearchSuggestions").innerHTML = html;
	    document.querySelector("#g").addEventListener("change", e => {
	    changer = true;
	    });
        });
    }
    else {console.log("empty");}
}

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
*/
const postalFromCode = (code) => {
    return new Promise((resolve, reject) => {
        if(exists(code)) {resolve("Everything is OK");}
        else {reject(Error("Nothing is OK"));}
    });
}