// LocalStorage Functionality
if (localStorage.getItem("choices") == null) {                    // Check for locally stored case data
    var choices = [];                                             // IF none is found create the empty Object
} else { var cases = localStorage.getItem("choices"); // IF cases are found then fetch the data and PARSE it back into the Object
}

// Save checked items to local storage for import to fetch() call
function saveUserChoices () {
    for ( i = 0; checks.length; i++ ) {
        choices.push('|' + check);
    }
}

// Go Button
function buttonRedirect() {
    window.location.replace('./page2.html');
}

var goBtn = document.getElementById('goBtn');
goBtn.onclick = saveUserChoices;
goBtn.onclick = buttonRedirect;
