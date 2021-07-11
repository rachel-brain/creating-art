// DOM targeting for content injection
card1 = document.getElementById("chosen-card-1");
card2 = document.getElementById("chosen-card-2");

function colorsWriteObject (focusImage) {
    // Write object to the DOM  
        card1.innerHTML += "<h3 class='css'>" + "Accession Year" + "</h3><br>";          
        card1.innerHTML += "<p class='css'>" + focusImage.accessionYear + "</p><br>";

        card1.innerHTML += "<h3 class='css'>" + "Credit Line" + "</h3><br>";          
        card1.innerHTML += "<p class='css'>" + focusImage.creditLine + "</p><br>";

        card1.innerHTML += "<h3 class='css'>" + "Dimensions" + "</h3><br>";          
        card1.innerHTML += "<p class='css'>" + focusImage.dimensions + "</p><br>";
    }

function harvardWriteObject (focusImage) {
    // Write object to the DOM  
        card1.innerHTML += "<h3 class='css'>" + "Accession Year" + "</h3><br>";          
        card1.innerHTML += "<p class='css'>" + focusImage.accessionYear + "</p><br>";

        card1.innerHTML += "<h3 class='css'>" + "Credit Line" + "</h3><br>";          
        card1.innerHTML += "<p class='css'>" + focusImage.creditLine + "</p><br>";

        card1.innerHTML += "<h3 class='css'>" + "Dimensions" + "</h3><br>";          
        card1.innerHTML += "<p class='css'>" + focusImage.dimensions + "</p><br>";
    }

function metWriteObject (focusImage) {
        // Write object to the DOM  
            card1.innerHTML += "<h3 class='css'>" + "Accession Year" + "</h3><br>";          
            card1.innerHTML += "<p class='css'>" + focusImage.accessionYear + "</p><br>";

            card1.innerHTML += "<h3 class='css'>" + "Credit Line" + "</h3><br>";          
            card1.innerHTML += "<p class='css'>" + focusImage.creditLine + "</p><br>";

            card1.innerHTML += "<h3 class='css'>" + "Dimensions" + "</h3><br>";          
            card1.innerHTML += "<p class='css'>" + focusImage.dimensions + "</p><br>";
        }

function init () {
    // User Selected
    var focusImage = JSON.parse(localStorage.getItem('focusImage'));
    // Comparison Variables
    var focusImageCompare = localStorage.getItem('focusImage');
    var metTargetCompare = localStorage.getItem('metTarget');
    var harvardTargetCompare = localStorage.getItem('harvardTarget');
    var colorsTargetCompare = localStorage.getItem('colorsTarget');
    // Call the write function for the selected image
    if (focusImageCompare === metTargetCompare) {
        metWriteObject(focusImage);
    } else if (focusImageCompare === harvardTargetCompare) {
        harvardWriteObject(focusImage);
    } else if (focusImageCompare === colorsTargetCompare) {
        colorsWriteObject(focusImage);
    }
}

init();