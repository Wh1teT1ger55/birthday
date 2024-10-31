const giftsAll = 10;
let giftsFound = Number(localStorage.giftsFound) || 0; // Initialize from localStorage
let giftsLeft = giftsAll - giftsFound;
let lockArray = []

// onLoad()

function onLoad() {
    dragElement(document.getElementById("giftsContainer"));
    giftsFound = Number(localStorage.giftsFound) || 0; // Ensure it's a number
    giftsLeft = giftsAll - giftsFound;

    const foundElement = document.getElementById("found");
    const leftElement = document.getElementById("left");
    
    if (foundElement && leftElement) {
        foundElement.innerHTML = giftsFound;
        leftElement.innerHTML = giftsLeft;
    }

    if (giftsFound === giftsAll) {
        document.getElementById("progress").innerHTML = "";
        document.getElementById("finished").innerHTML = "Herzlichen Glückwunsch, du hast alle Geschenke gefunden!";
    }


    if (localStorage.firstGiftHidden === "true") {
      document.getElementById("firstGift").style.pointerEvents = "none";
    }

    let retString = localStorage.getItem("lockArray")
    let retArray = JSON.parse(retString)
    for (let element of retArray) {
    document.getElementById(element).style.display = "none"; // Assuming 'element' is an ID
  }
}

// Found

function giftFound() {
    giftsFound++;
    giftsLeft = giftsAll - giftsFound;

    const foundElement = document.getElementById("found");
    const leftElement = document.getElementById("left");

    if (foundElement && leftElement) {
        foundElement.innerHTML = giftsFound;
        leftElement.innerHTML = giftsLeft;
        localStorage.giftsFound = giftsFound; // Store found gifts
    }

    if (giftsFound === giftsAll) {
        document.getElementById("progress").innerHTML = "";
        document.getElementById("finished").innerHTML = "Herzlichen Glückwunsch, du hast alle Geschenke gefunden!";
    }
}


function fakeGift() {
  alert("Das hättest du wohl gerne so :)")
  lock("fakeGift")
}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "Footer")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "Footer").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}



function searchBar() {

}

function search() {
   alert("Its working!")
}



// Lock Section :)

function lockFirstGift() {
    const firstGift = document.getElementById("firstGift");
    firstGift.style.pointerEvents = "none";
    localStorage.firstGiftHidden = true;
}

function lock(element) {
    if (localStorage.getItem("lockArray") === null) {
      lockArray = [];
    } else {
      lockArray = JSON.parse(localStorage.getItem("lockArray"));
    }
    item = document.getElementById(element);
    item.style.display = "none";
    lockArray.push(element);
    localStorage.setItem("lockArray", JSON.stringify(lockArray));
}





// reset everything

function resetCookie() {
    localStorage.clear();
    location.reload(); // Reload the page to reset the state
}