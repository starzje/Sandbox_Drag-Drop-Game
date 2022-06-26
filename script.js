const draggableListItems = document.querySelectorAll(".draggable-list li");
const alertWin = document.querySelector("#alertWin");
const alert = document.querySelector("#alert");
const boxRed = document.getElementById("secondary-color__2");
const boxCyan = document.getElementById("secondary-color__3");
const boxGreen = document.getElementById("secondary-color__1");

// item kojeg vučemo mišem
let selectedId;

// item na kojeg stavljamo mišem
let dropTargetId;

// brojač točno pogošenih stavki
let brojac = 0;

//brojač odigranih igri
let brojOdigranihIgri = 0;

// funkcija koja postavlja boju na početno stanje
setBaseColor();

// funkcija koja dodaje event listenere na sve elemente
startGame();

// funkcije koje upravljaju svim drag and drop event listenerima
function dragStart() {
  // spremi id elementa koji se vuče mišem na trenutni element kojeg vučemo
  selectedId = this.id;
  console.log(selectedId.value);
}

function dragEnter() {
  // "over" -> klasa koja služi za animaciju hover boje kad je drag element iznad drugog elementa
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(ev) {
  ev.preventDefault();
}

function dragDrop() {
  // id elementa na kojeg stavljamo mišem
  dropTargetId = this.id;
  // random generirana boja za drop target
  let style = new NoviStil().style;
  let style2 = new NoviStil().style;

  //ako se pokloni na isti element -> izmjeni boju i pomakni brojač za 1
  if (checkForMatch(selectedId, dropTargetId)) {
    document.getElementById(
      dropTargetId
    ).style.background = `linear-gradient(120deg, ${style} 0%, ${style2} 100%)`;
    brojac++;

    // u suprotnom -> pomakni brojač na 0 i resetiraj boju na početno stanje i dodaj klasu alert koja upozorava korisnika da je pogrješio -> makni tu obavjest nakon 1.2sec
  } else {
    brojac = 0;
    boxRed.style.background = "rgb(20, 0, 0)";
    boxCyan.style.background = "rgb(0, 0, 20)";
    boxGreen.style.background = "rgb(0, 20, 0)";
    alert.classList.add("active");
    setTimeout(() => {
      alert.classList.remove("active");
    }, 1200);
  }

  // ako brojac dodje do 3 -> prikaži alert da je pobijedio s dugmom za ponovno pokretanje igre
  if (brojac === 3) {
    alertWin.classList.add("active");
    brojOdigranihIgri++;
    document.getElementById(
      "brojOdigranihIgri"
    ).innerHTML = `Broj odigranih igri: ${brojOdigranihIgri}`;
  }

  this.classList.remove("over");
}

// random generirana boja za drop target
class NoviStil {
  constructor() {
    this.style = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;
    this.style2 = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;
  }
}

// funkcija koja provjerava da li je drop target i selected item isti
function checkForMatch(selected, dropTarget) {
  switch (selected) {
    case "primary-color__1":
      return dropTarget === "secondary-color__1" ? true : false;

    case "primary-color__2":
      return dropTarget === "secondary-color__2" ? true : false;

    case "primary-color__3":
      return dropTarget === "secondary-color__3" ? true : false;

    default:
      return false;
  }
}

// funkcija koja sve resetira i ponovno pokreće igru kada se klikne na dugme
function playAgain() {
  brojac = 0;
  alertWin.classList.remove("active");
  boxRed.style.background = "rgb(20, 0, 0)";
  boxCyan.style.background = "rgb(0, 0, 20)";
  boxGreen.style.background = "rgb(0, 20, 0)";
}

// funkcija koja postavlja boju na početno stanje
function setBaseColor() {
  boxRed.style.backgroundColor = "rgb(20, 0, 0)";
  boxCyan.style.backgroundColor = "rgb(0, 0, 20)";
  boxGreen.style.backgroundColor = "rgb(0, 20, 0)";
}

// funkcija koja dodaje event listenere na sve elemente
function startGame() {
  draggableListItems.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("dragleave", dragLeave);
  });
}
