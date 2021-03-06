const btnKMP = document.getElementById("btnKMP");
const btnMayuscula = document.getElementById("btnMayuscula");
const btnMinuscula = document.getElementById("btnMinuscula");
const btnIndiscriminar = document.getElementById("btnIndiscriminar");
let word = document.getElementById("palabra");
const resultado = document.getElementById("OutputTextArea");
const separado =
  "-----------------------------------------------------------------------";

let textInArea = document.querySelector("#textArea");
let sizeOftext;

/**
 * 
 * @param {*} palabra 
 */

const click = (palabra) => {
  resultado.innerHTML =
    "El total de veces que se repite la palabra " +
    palabra +
    " equivale a >> " +
    kmpMatching(texto, palabra).length +
    "</br>" +
    separado +
    "</br>" +
    "Texto: </br>" +
    subrayar(palabra);
};

/**
 * Function onclick to run function 
 */
btnKMP.onclick = () => {
  sizeOftext = textInArea.textContent;
  if (sizeOftext.length == 0) {

    alert("No ha subido ningun archivo")

  }else {
    click(word.value);

  }
};

/**
 * Function onclick to run function 
 */
btnMayuscula.onclick = () => {
  sizeOftext = textInArea.textContent;
  if (sizeOftext.length == 0) {

    alert("No ha subido ningun archivo")

  }else {

    click(word.value.toUpperCase());

  }


};

/**
 * Function onclick to run function 
 */


btnMinuscula.onclick = () => {
  sizeOftext = textInArea.textContent;
  if (sizeOftext.length == 0) {

    alert("No ha subido ningun archivo")

  }else {

    click(word.value.toLowerCase())
  }

};

/**
 * Function onclick to run function 
 */
btnIndiscriminar.onclick = () => {
  sizeOftext = textInArea.textContent;
  if (sizeOftext.length == 0) {

    alert("No ha subido ningun archivo")

  }else {

    const arr = kmpMatching(texto.toUpperCase(), word.value.toUpperCase());
    const arr2 = []
    let s = texto;
    arr.forEach((i) => {
      arr2.push(s.substring(i, (i + word.value.length)))
    });
    arr2.forEach((palabra) => {
      s = subrayar2(s, palabra)
    })

    resultado.innerHTML =
      "El total de veces que se repite la palabra " +
      word.value +
      " equivale a >> " +
      arr.length +
      "</br>" +
      separado +
      "</br>" +
      "Texto: </br>" +
      s;

  }
};

/**
 * 
 * @param {*} palabra 
 * @returns highlighted text 
 */
const subrayar = (palabra) => {
  return texto.replaceAll(palabra, "<mark>" + palabra + "</mark>");
};

/**
 * 
 * @param {*} text 
 * @param {*} palabra 
 * @returns highlighted text 
 */
const subrayar2 = (text, palabra) => {
  return text.replaceAll(palabra, "<mark>" + palabra + "</mark>");
};

// Construct a table with table[i] as the length of the longest prefix of the substring 0..i

/**
 * 
 * @param {*} str 
 * @returns table
 */
function longestPrefix(str) {
  // create a table of size equal to the length of `str`
  // table[i] will store the prefix of the longest prefix of the substring str[0..i]
  var table = new Array(str.length);
  var maxPrefix = 0;
  // the longest prefix of the substring str[0] has length
  table[0] = 0;

  // for the substrings the following substrings, we have two cases
  for (var i = 1; i < str.length; i++) {
    // case 1. the current character doesn't match the last character of the longest prefix
    while (maxPrefix > 0 && str.charAt(i) !== str.charAt(maxPrefix)) {
      // if that is the case, we have to backtrack, and try find a character  that will be equal to the current character
      // if we reach 0, then we couldn't find a chracter
      maxPrefix = table[maxPrefix - 1];
    }
    // case 2. The last character of the longest prefix matches the current character in `str`
    if (str.charAt(maxPrefix) === str.charAt(i)) {
      // if that is the case, we know that the longest prefix at position i has one more character.
      // for example consider `-` be any character not contained in the set [a-c]
      // str = abc----abc
      // consider `i` to be the last character `c` in `str`
      // maxPrefix = will be 2 (the first `c` in `str`)
      // maxPrefix now will be 3
      maxPrefix++;
      // so the max prefix for table[9] is 3
    }
    table[i] = maxPrefix;
  }
  return table;
}

// Find all the patterns that matches in a given string `str`
// this algorithm is based on the Knuth???Morris???Pratt algorithm. Its beauty consists in that it performs the matching in O(n)

/**
 * 
 * @param {*} str 
 * @param {*} pattern 
 * @returns matches
 */
function kmpMatching(str, pattern) {
  // find the prefix table in O(n)
  var prefixes = longestPrefix(pattern);
  var matches = [];

  // `j` is the index in `P`
  var j = 0;
  // `i` is the index in `S`
  var i = 0;
  while (i < str.length) {
    // Case 1.  S[i] == P[j] so we move to the next index in `S` and `P`
    if (str.charAt(i) === pattern.charAt(j)) {
      i++;
      j++;
    }
    // Case 2.  `j` is equal to the length of `P`
    // that means that we reached the end of `P` and thus we found a match
    if (j === pattern.length) {
      matches.push(i - j);
      // Next we have to update `j` because we want to save some time
      // instead of updating to j = 0 , we can jump to the last character of the longest prefix well known so far.
      // j-1 means the last character of `P` because j is actually `P.length`
      // e.g.
      // S =  a b a b d e
      // P = `a b`a b
      // we will jump to `a b` and we will compare d and a in the next iteration
      // a b a b `d` e
      //     a b `a` b
      j = prefixes[j - 1];
    }
    // Case 3.
    // S[i] != P[j] There's a mismatch!
    else if (str.charAt(i) !== pattern.charAt(j)) {
      // if we have found at least a character in common, do the same thing as in case 2
      if (j !== 0) {
        j = prefixes[j - 1];
      } else {
        // otherwise, j = 0, and we can move to the next character S[i+1]
        i++;
      }
    }
  }

  return matches;
}