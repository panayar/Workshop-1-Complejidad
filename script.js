const dropArea = document.querySelector(".drag-area"),
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector("button"),
  input = dropArea.querySelector("input");
let file;


button.onclick = () => {
  input.click();
}


//funciones del drop file 
input.addEventListener("change", function () {
  file = this.files[0];
  dropArea.classList.add("active");
  showFile();
});

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  file = event.dataTransfer.files[0];
  showFile();
});

//Validacion de que el archivo sea txt 
function showFile() {
  let fileType = file.type;
  let validExtensions = ["text/plain"];
  if (validExtensions.includes(fileType)) {
    dragText.textContent = "File uploaded successfully!";
  } else {
    alert("This is not an txt file");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}


//Lectura y escritura del archivo 
input.addEventListener('change', leerArchivo);

function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    showText(contenido);
  };
  lector.readAsText(archivo);
  print(lector)
}

function showText(text) {
  let textArea  = document.querySelector("#textArea");
  textArea.innerHTML = text
}
