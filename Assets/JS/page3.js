// DOM targeting for content injection
card1 = document.getElementById("chosen-card-1");
card2 = document.getElementById("chosen-card-2-img");

function colorsWriteObject (focusImage) {
// Write object to the DOM  
    // Extract Image from stored Object
    card2.setAttribute('src', focusImage.imageUrl.replace('http', 'https'));    // .replace to avoid mixed content error message
    // Extract Chosen Data from stored Object
    card1.innerHTML += "<h3 class='css'>" + "Artist" + "</h3><br>";          
    card1.innerHTML += "<p class='css'>" + focusImage.username + "</p><br>";
    card1.innerHTML += "<h3 class='css'>" + "Title" + "</h3><br>";          
    card1.innerHTML += "<p class='css'>" + focusImage.title + "</p><br>";
    card1.innerHTML += "<h3 class='css'>" + "Date Created" + "</h3><br>";          
    card1.innerHTML += "<p class='css'>" + focusImage.dateCreated + "</p><br>";
}

function harvardWriteObject (focusImage) {
// Write object to the DOM  
    // Extract Image from stored Object
    card2.setAttribute('src', focusImage.records[0].primaryimageurl);   // [0] is static @Chandler please alter this in line with your API amendments
    // Extract Chosen Data from stored Object
    card1.innerHTML += "<h3 class='css'>" + "Accession Year" + "</h3><br>";          
    card1.innerHTML += "<p class='css'>" + focusImage.accessionYear + "</p><br>";
    card1.innerHTML += "<h3 class='css'>" + "Credit Line" + "</h3><br>";          
    card1.innerHTML += "<p class='css'>" + focusImage.creditLine + "</p><br>";
    card1.innerHTML += "<h3 class='css'>" + "Dimensions" + "</h3><br>";          
    card1.innerHTML += "<p class='css'>" + focusImage.dimensions + "</p><br>";
}

function metWriteObject (focusImage) {
// Write object to the DOM  
    // Extract Image from stored Object
    card2.setAttribute('src', focusImage.primaryImageSmall);
    // Extract Chosen Data from stored Object
    card1.innerHTML += "<h3 class='css'>" + "Accession Year" + "</h3><br>";          
    card1.innerHTML += "<p class='css'>" + focusImage.accessionYear + "</p><br>";
    card1.innerHTML += "<h3 class='css'>" + "Credit Line" + "</h3><br>";          
    card1.innerHTML += "<p class='css'>" + focusImage.creditLine + "</p><br>";
    card1.innerHTML += "<h3 class='css'>" + "Dimensions" + "</h3><br>";          
    card1.innerHTML += "<p class='css'>" + focusImage.dimensions + "</p><br>";
}

function init () {
    // GET User Selected Object
    var focusImage = JSON.parse(localStorage.getItem('focusImage'));
    // Establish Comparison Variables from objects in localstorage
    var focusImageCompare = localStorage.getItem('focusImage');
    var metTargetCompare = localStorage.getItem('metTarget');
    var harvardTargetCompare = localStorage.getItem('harvardTarget');
    var colorsTargetCompare = localStorage.getItem('colorsTarget');
    // Call the write function for the selected object
    if (focusImageCompare === metTargetCompare) {
        metWriteObject(focusImage);
    } else if (focusImageCompare === harvardTargetCompare) {
        harvardWriteObject(focusImage);
    } else if (focusImageCompare === colorsTargetCompare) {
        colorsWriteObject(focusImage);
    }
}

init(); // Call on page load