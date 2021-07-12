// LocalStorage Functionality
if (localStorage.getItem("choices") == null) {                    // Check for locally stored case data
    var choices = [];                                             // IF none is found create the empty Object

} else { var choices = localStorage.getItem("choices"); // IF cases are found then fetch the data and PARSE it back into the Object
}

// Save checked items to local storage for import to fetch() call
function saveUserChoices () {
  
    checkChecks("metChecks");
    checkChecks("harvardChecks");
    checkChecks("color");
    buttonRedirect();
}

// Check-checks functionality
function checkChecks (name) {
    var checkboxes = document.querySelectorAll("input[name=" + name + "]:checked");     // Check all input tags with <name> for :checked
    var values = [];                                                                    // Establish an array to hold the values
    checkboxes.forEach((checkbox) => {                                                  // Push any :checked <value> information (matching api call vernacular) to the array
        values.push(checkbox.value);
    });
    return localStorage.setItem(name, values);                                          // Push the returned array to local storage for use in the api call on page2
}

// Go Button
function buttonRedirect() {
    window.location.href = "searchPage.html";
  }
  
  var goBtn = document.getElementById("goBtn");
  goBtn.onclick = saveUserChoices;
  
  //Function to redirect to history page
  function redirectHistoryPage(event) {
    event.preventDefault();
    window.location.href = "historyPage.html";
  }
  
  //Event listener for redirection to History Page on the click of Search Histroy Button
  $("#searchHistory").on("click", redirectHistoryPage);