// DOM targeting for content injection
card1 = document.getElementById("chosen-card-1");
card2 = document.getElementById("chosen-card-2-img");

function colorsWriteObject(focusImage) {
    // Write object to the DOM  
    // Extract Image from stored Object
    card2.setAttribute('src', focusImage.imageUrl.replace('http', 'https')); // .replace to avoid mixed content error message
    // Extract Chosen Data from stored Object
    card1.innerHTML += "<h3 class='css'>" + "Artist" + "</h3><br>";
    card1.innerHTML += "<p class='css'>" + focusImage.username + "</p><br>";
    card1.innerHTML += "<h3 class='css'>" + "Title" + "</h3><br>";
    card1.innerHTML += "<p class='css'>" + focusImage.title + "</p><br>";
    card1.innerHTML += "<h3 class='css'>" + "Date Created" + "</h3><br>";
    card1.innerHTML += "<p class='css'>" + focusImage.dateCreated + "</p><br>";
}

function harvardWriteObject(focusImage) {
    // Write object to the DOM  
    // Extract Image from stored Object
    card2.setAttribute('src', focusImage.records[0].primaryimageurl); // [0] is static @Chandler please alter this in line with your API amendments
    // Extract Chosen Data from stored Object
    card1.innerHTML += "<h2 class='css'>" + "Artist Name" + "</h2><br>";
    card1.innerHTML += "<p class='css'>" + focusImage.records[0].people[0].name + "</p><br>";
    card1.innerHTML += "<h2 class='css'>" + "Artist Culture" + "</h2><br>";
    card1.innerHTML += "<p class='css'>" + focusImage.records[0].people[0].culture + "</p><br>";
    card1.innerHTML += "<h2 class='css'>" + "Medium" + "</h2><br>";
    card1.innerHTML += "<p class='css'>" + focusImage.records[0].technique + "</p><br>";
    card1.innerHTML += "<h2 class='css'>" + "Title" + "</h2><br>";
    card1.innerHTML += "<p class='css'>" + focusImage.records[0].title + "</p><br>";
    card1.innerHTML += "<h2 class='css'>" + "Date" + "</h2><br>";
    card1.innerHTML += "<p class='css'>" + focusImage.records[0].dated + "</p><br>";
}

function metWriteObject(focusImage) {
    // Write object to the DOM  
    // Extract Image from stored Object
    card2.setAttribute('src', focusImage.primaryImageSmall);
    // Extract Chosen Data from stored Object
    card1.innerHTML += "<h2 class='css'>" + "Artist Name" + "</h2><br>";
    card1.innerHTML += "<p class='css'>" + focusImage.artistDisplayName + "</p><br>";
    card1.innerHTML += "<h2 class='css'>" + "Artist Culture" + "</h2><br>";
    card1.innerHTML += "<p class='css'>" + focusImage.culture + "</p><br>";
    card1.innerHTML += "<h2 class='css'>" + "Medium" + "</h2><br>";
    card1.innerHTML += "<p class='css'>" + focusImage.medium + "</p><br>";
    card1.innerHTML += "<h2 class='css'>" + "Title" + "</h2><br>";
    card1.innerHTML += "<p class='css'>" + focusImage.title + "</p><br>";
    card1.innerHTML += "<h2 class='css'>" + "Date" + "</h2><br>";
    card1.innerHTML += "<p class='css'>" + focusImage.objectDate + "</p><br>";
}

function init() {
    // GET User Selected Object
    var focusImage = JSON.parse(localStorage.getItem('focusImage'));
    // Establish Comparison Variables from objects in localstorage
    var focusImageCompare = localStorage.getItem('focusImage');
        // Harvard Targets 
        var harvardTargetCompare0 = localStorage.getItem('big1');
        var harvardTargetCompare1 = localStorage.getItem('small1');
        var harvardTargetCompare2 = localStorage.getItem('small2');
        var harvardTargetCompare3 = localStorage.getItem('small3');
        var harvardTargetCompare4 = localStorage.getItem('small4');
        var harvardCompare = [harvardTargetCompare0, harvardTargetCompare1, harvardTargetCompare2, harvardTargetCompare3, harvardTargetCompare4];
        // Met Targets
        var metTargetCompare0 = localStorage.getItem('big2');
        var metTargetCompare1 = localStorage.getItem('small5');
        var metTargetCompare2 = localStorage.getItem('small6');
        var metTargetCompare3 = localStorage.getItem('small7');
        var metTargetCompare4 = localStorage.getItem('small8');
        var metCompare = [metTargetCompare0, metTargetCompare1, metTargetCompare2, metTargetCompare3, metTargetCompare4];
    // Call the write function for the selected object
    if (metCompare.includes(focusImageCompare)) {
        metWriteObject(focusImage);
    } else if (harvardCompare.includes(focusImageCompare)) {
        harvardWriteObject(focusImage);
    }
}

init(); // Call on page load