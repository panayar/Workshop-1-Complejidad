const dropArea = document.querySelector(".drag-area"),
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector("button"),
  input = dropArea.querySelector("input");
let file;
var text;

/**
 * onclick function 
 */
button.onclick = () => {
  input.click();
};


//Drop file functions

/**
 * listener function 
 */
input.addEventListener("change", function () {
  file = this.files[0];
  dropArea.classList.add("active");
  showFile();
});

/**
 * listener function 
 */
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

/**
 * listener function 
 */
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

/**
 * listener function 
 */
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  showFile();
});

/**
 * listener function 
 */

input.addEventListener("change", leerArchivo);

//TXT file validation 

/**
 * function do not return any value
 */
function showFile() {
  let fileType = file.type;
  let validExtensions = ["text/plain"];
  if (validExtensions.includes(fileType)) {
    dragText.textContent = "File uploaded successfully!";
  } else {
    alert("Este no es un archivo TXT");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

/**
 * 
 * @param {*} e 
 * @returns text from TXT file 
 */
function leerArchivo(e) {
  let fileType = file.type;
  let validExtensions = ["text/plain"];
  if (validExtensions.includes(fileType)) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
      texto = e.target.result;
      let textArea = document.querySelector("#textArea");
      textArea.innerHTML = texto;
    };
    lector.readAsText(archivo);
  }
}

