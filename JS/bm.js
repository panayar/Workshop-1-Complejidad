const btnBM = document.getElementById("btnBM");
let word = document.getElementById("palabra");
const resultado = document.getElementById("OutputTextArea");
const btnMayuscula = document.getElementById("btnMayuscula");
const btnMinuscula = document.getElementById("btnMinuscula");
const btnIndiscriminar = document.getElementById("btnIndiscriminar");

let textInArea = document.querySelector("#textArea");
let sizeOftext;

const separado =
  "-----------------------------------------------------------------------";


/**
 * 
 * @param {*} palabra 
 */
const click = (palabra) => {
  try {
    resultado.innerHTML =
      "El total de veces que se repite la palabra " +
      palabra +
      " equivale a >> " +
      search(texto, palabra).length +
      "</br>" +
      separado +
      "</br>" +
      "Texto: </br>" +
      subrayar(palabra);
  } catch (Exception) {

  }

}

/**
 * onClick function 
 */
btnBM.onclick = () => {
  sizeOftext = textInArea.textContent;

  if (sizeOftext.length == 0) {

    alert("No ha subido ningun archivo")

  } else {
    click(word.value)
  }
};

/**
 * onClick function 
 */
btnMayuscula.onclick = () => {
  sizeOftext = textInArea.textContent;

  if (sizeOftext.length == 0) {

    alert("No ha subido ningun archivo")

  } else {
    click(word.value.toUpperCase())
  }
}

/**
 * onClick function 
 */
btnMinuscula.onclick = () => {

  sizeOftext = textInArea.textContent;

  if (sizeOftext.length == 0) {

    alert("No ha subido ningun archivo")

  }else {

    click(word.value.toLowerCase())
  }
}


/**
 * onClick function 
 */
btnIndiscriminar.onclick = () => {

  sizeOftext = textInArea.textContent;

  if (sizeOftext.length == 0) {

    alert("No ha subido ningun archivo")

  } else {
    const arr = search(texto.toUpperCase(), word.value.toUpperCase());
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


/* Javascript Program for Bad Character Heuristic of Boyer
Moore String Matching Algorithm */
let NO_OF_CHARS = 256;

// A utility function to get maximum of two integers

/**
 * 
 * @param {*} a 
 * @param {*} b 
 * @returns max Value
 */
function max(a, b) {
  return a > b ? a : b;
}

// The preprocessing function for Boyer Moore's
// bad character heuristic

/**
 * 
 * @param {*} str 
 * @param {*} size 
 * @param {*} badchar 
 */
function badCharHeuristic(str, size, badchar) {
  // Initialize all occurrences as -1
  for (let i = 0; i < NO_OF_CHARS; i++) badchar[i] = -1;

  // Fill the actual value of last occurrence
  // of a character (indices of table are ascii and values are index of occurence)
  for (i = 0; i < size; i++) badchar[str[i].charCodeAt(0)] = i;
}

/* A pattern searching function that uses Bad
	Character Heuristic of Boyer Moore Algorithm */


/**
 * 
 * @param {*} txt 
 * @param {*} pat 
 * @returns all coincidences
 */
function search(txt, pat) {
  let m = pat.length;
  let n = txt.length;
  let arr = [];

  let badchar = new Array(NO_OF_CHARS);

  /* Fill the bad character array by calling
		the preprocessing function badCharHeuristic()
		for given pattern */
  badCharHeuristic(pat, m, badchar);

  let s = 0; // s is shift of the pattern with
  // respect to text
  // there are n-m+1 potential allignments
  while (s <= n - m) {
    let j = m - 1;

    /* Keep reducing index j of pattern while
			characters of pattern and text are
			matching at this shift s */
    while (j >= 0 && pat[j] == txt[s + j]) j--;

    /* If the pattern is present at current
			shift, then index j will become -1 after
			the above loop */
    if (j < 0) {
      arr.push(s);
      /* Shift the pattern so that the next
				character in text aligns with the last
				occurrence of it in pattern.
				The condition s+m < n is necessary for
				the case when pattern occurs at the end
				of text */
      //txt[s+m] is character after the pattern in text
      s += s + m < n ? m - badchar[txt[s + m].charCodeAt(0)] : 1;
    } else s += max(1, j - badchar[txt[s + j].charCodeAt(0)]);
    /* Shift the pattern so that the bad character
				in text aligns with the last occurrence of
				it in pattern. The max function is used to
				make sure that we get a positive shift.
				We may get a negative shift if the last
				occurrence of bad character in pattern
				is on the right side of the current
				character. */
  }
  return arr;
}