const inputID = "#text-input";
const outputID = "#word-list";

  document.getElementById("submit-alphabet").addEventListener("click", e => {
    var printObj = new MyAwesomeWordClass(inputID, outputID);
    printObj.mainJob();
});

/**
 * @class MyAwesomeWordClass
 * @constructor takes @param input and @param output these are the input and output fields of the html
 * has 3 variables, the value of the input field, and the output field.
 * last variable @var showListedWords will hold html later to print out
 */

class MyAwesomeWordClass {
  constructor(input, output){
    this.in = document.querySelector(input).value;
    this.out = document.querySelector(output);
    this.showListedWords = "";
  }

/**
 * @function mainJob uses the @var in to create a words array, the words are split by the parameters of the @function split
 * Then filtered, and lastly every element in the array is converted to upper case
 * class @function objectCountCreator is run to create an array of objects, the object contains the word, and the word count
 */

  mainJob(){
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Æ", "Ø", "Å"];
    var words = this.in
      .split(/[\n <>.,\?/()]/)
      .filter(word => word != "")
      .map(word => word = word.toUpperCase());
    var showListedWords = "";
    var wordObj = this.objectCountCreator(words);
    this.printWordListAlph(wordObj, this.out)
  }

/**
 * Most of the code gotten from: https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
 * Added a @for loop at the end that puts array a and array b into the same array
 * @return c which is an array og objects, object containing a and b
 */

  objectCountCreator(wordArr) {
   var a = [], b = [], c = [], prev;

   wordArr.sort();
   for(var i = 0; i < wordArr.length; i++){
       if(wordArr[i] !== prev){
           a.push(wordArr[i]);
           b.push(1);
       } else{
           b[b.length-1]++;
       }
       prev = wordArr[i];
   }
   for(var j = 0; j < a.length; j++){
     c[j] = {id: a[j], count: b[j]};
   }
   return c;
  }

  /**
   * Function that loops through every word, printing out the first leter of every word first as long as it hasn't been printed before
   * Takes @param wO which is the word object array, and @param output which is the html div tag we want to print everything to
   */

  printWordListAlph(wO, output){
    var prevLetter = " ";
    var showListedWords = "";
    output.innerHTML = "";

    for(var n = 0; n < wO.length; n++){
        // This if statement checks if the first letter is a number, numbers aren't printed
        if(isNaN(parseInt(wO[n].id.charAt(0)), 10)){
            // This if statement checks if var prevLetter is equal to current words first letter, if not, run code
            if(wO[n].id.charAt(0) !== prevLetter) {
                output.innerHTML += `<li><h1>${wO[n].id.charAt(0)}</h1></li>`;
                // var prevLetter = first letter of current word.
                prevLetter = wO[n].id.charAt(0);
            }

            showListedWords = `<li>${wO[n].id}:   ${wO[n].count}</li>`;
            output.innerHTML += showListedWords;
        }
    }
  }
}
