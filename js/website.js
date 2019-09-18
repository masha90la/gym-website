$(function() {
// Variables for forms elemenets (register a new user, login form for existing members, admin login form)

//REGISTER FORM VARIABLES
var registerForm = document.getElementById("register-form");
var passwordNewUser = document.getElementById("password");
var passwordNewUserVerify = document.getElementById("verify_password");
var passwordMatchResult = document.getElementById("passwordmatch");
var registerFormInputs = document.querySelectorAll('#register-form input');
var registerFormSubmitButton = document.getElementById("register-form-submit");
//MEMBERS LOGIN FORM VARIABLES
var loginForm = document.getElementById("login-form");
var userUsername = document.getElementById("username_user");
var userPassword = document.getElementById("passworduser");
//ADMIN LOGIN FORM VARIABLES
var adminForm = document.getElementById("administrator-login");
var adminName = document.getElementById("admin-username");
var adminPassword = document.getElementById("admin-password");
var tryAgainMsg = document.getElementById("tryagain");
var adminButton = document.getElementById("admin-login");
var loginSuccessMsg = document.getElementById("login-success-msg");
var userProfile = document.getElementById('user_profile');

var adminLoginLink = document.getElementById('admin-login-link');

// ~~~~~~ GENERAL SET-UP OF THE PAGE ~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
// Sliding effect for the sections of the website
  $('a[href*=#]').each(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname
    && this.hash.replace(/#/,'') ) {
      var targetId = $(this.hash), targetAnchor = $('[name=' + this.hash.slice(1) +']');
      var target = targetId.length ? targetId : targetAnchor.length ? targetAnchor : false;
       if (target) {
         var targetOffset = target.offset().top;  
         $(this).click(function() {
            $("#nav li a").removeClass("active");
            $(this).addClass('active');
           $('html, body').animate({scrollTop: targetOffset}, 1600);
           return false;
         });
      }
    }
  });

// Make header fixed on scroll
var headerPosition = $('header').offset();
$(window).scroll(function(){
  if($(window).scrollTop() > headerPosition.top){
    $('header').addClass('fixed-header');
  } else {
    $('header').removeClass('fixed-header');
  }    
});

// Default settings for the page on slide1 (sign in / register form)
// Slide1, new user register form is displayed. If the user is already register, he/she can proceed to login form and register form disappers
document.getElementById('login_here').addEventListener('click', function() {
  document.getElementById('register-new-member-form').classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// Sign up site section: asking the user to proceed to his/her profile leads him/her to her saved schedule list
loginSuccessMsg.addEventListener('click', function() {
  loginSuccessMsg.classList.add("hidden");
  userProfile.classList.remove("hidden");
  $('.reserveButtons').removeClass("hidden");
});

// REGISTER FORM: check if "password" and "verify password" values match
function checkPassword() {
	if (passwordNewUser.value !== passwordNewUserVerify.value) {
		passwordMatchResult.innerHTML = "Passwords must match!";
	} else {
		passwordMatchResult.innerHTML = "";
	}
}
// Apply event listener to "Verify Password" input field
passwordNewUserVerify.addEventListener("input", checkPassword, false);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  ~~~~~~~~ FOR REGISTER FORM ~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// LOGIN RESULTS FOR NEW USERS. If the registration is successful, "welcome message" element contains the link to proceed to the user's new profile
var registerComplete = false;
var y = 0;

while (y < registerFormInputs.length) {
  if (registerFormInputs[y].value == '') {
    registerComplete = false;
  } else {
    registerComplete = true;
  }
  y++;
}

function registerNewUser() {
  if (passwordNewUser.value == passwordNewUserVerify.value && registerComplete == true) {
    registerForm.classList.add("hidden");
    document.getElementById('sign-up-forms-content').classList.add("hidden");
    loginSuccessMsg.innerHTML = 'The registration is complete!<br/> <span id="proceed" class="sign-up-link">Proceed To Your Profile &rarr;</span>';
  } else {
    loginSuccessMsg.innerHTML = "Please, check the information and try again!"
  }
}; 
// Event listener for the "Register" button to display new information for newly registered user
registerFormSubmitButton.addEventListener("click", registerNewUser, false);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~ FOR ADMIN FORM LOGIN ~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Footer section
// If the administrator logs in, a form for adding new gym class to the schedule appears and classes can be deleted from schedule table
adminLoginLink.addEventListener('click', function() {
  adminLoginLink.classList.add('hidden');
  adminForm.classList.remove('hidden');
});

/* As an example, in order to login as an administrator:
   username: "admin";
   password: "12345";
   If the information is entered correctly, the user can proceed to the administrator page. If not, the user can try again
*/
function adminLogin() {
	if (adminName.value == "admin" && adminPassword.value == "12345") {
		$("#add-classes-form").fadeIn();
		tryAgainMsg.innerHTML = "";
		adminForm.classList.add("hidden");
	} else {
		tryAgainMsg.innerHTML = "Try again! Access denied"
	}
}
adminButton.addEventListener("click", adminLogin, false);



// Array of users
var users = [];

// Object for storing users' login information
function userLoginInfo(username, password) {
    this.username = username;
    this.password = password;
};

// Add new user after submitting registration form
function addNewUser(e) {
    e.preventDefault();
    users = new userLoginInfo(registerForm.username.value, registerForm.password.value);
    var userNew = {"users": users};
    $.post("users.php", {myusers: JSON.stringify(userNew)});
};
registerForm.addEventListener("submit", addNewUser, false);

// Create XMLHttpRequest object
var xhr2 = new XMLHttpRequest();   
xhr2.open('GET', 'data/users.json', true);   
xhr2.send(null);              
xhr2.onload = function() {                      
  if(xhr.status === 200) {                      
    responseObject = JSON.parse(xhr2.responseText);
    for (var i = 0; i < responseObject.users.length; i++) {
       userLogin(responseObject.users[i].username, responseObject.users[i].password) }
  }
};
/*
Function for registered users to login
As an example,
username: "user";
password: "user"
*/
  function userLogin(usr, pswd) {
  if ((userUsername.value == "user" && userPassword.value == "user") || (userUsername.value == usr && userPassword.value == pswd)) {
    loginForm.classList.add("hidden");
    userProfile.classList.remove("hidden");
    document.getElementById('reserveHead').classList.remove("hidden");
    $('.reserveButtons').removeClass("hidden");

  } else {
    document.getElementById("loginfailed").innerHTML = "Login failed. Please, try again!";
  } 
}

document.getElementById("login").addEventListener("click", userLogin, false);



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  ~~~~~~~ FOR GOOGLE MAPS ~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// If one of transit buttons are clicked (to select the option: DRIVING, WALKING, BICYCLING, TRANSIT), the user can see the button for more information to see more directions 
$(".transitButton").click(function() {
  if ($('input#homeAddress').val() != '' && $('input#homeAddress').val().length > 20) {
    $("#moreinfobtn").fadeIn(800);
  }
});


// POPUP WINDOW FOR DIRECTIONS INFO in CONTACT section, "more information" button
// SOURCE: http://inspirationalpixels.com/tutorials/custom-popup-modal
// When "MORE INFORMATION" button is clicked, a popup appears with more information about the directions
    $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(500);
        e.preventDefault();
    });
// Once the popp is open, it has the close button labeled as "x". Pressing on the link closes the popup
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(500);
        e.preventDefault();
    });

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SCHEDULE + TABLE SECTION
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

   // Slide 6, variable for form to add new class to the schedule on submit
    var addClassForm = document.getElementById("addClassForm");
    // Slide 2, table with class schedule
    var schedule = document.getElementById("schedule");
    // Variable for rows of table with classes schedule
    var row = [];

// Object for gym class
function classSchedule(day, time, ampm, instructorFirstName, instructorLastName, classType, duration, reservationRequired, classIndex) {
    this.day = day;
    this.time = time;
    this.ampm = ampm;
    this.instructorFirstName = instructorFirstName;
    this.instructorLastName = instructorLastName;
    this.classType = classType;
    this.duration = duration;
    this.reservationRequired = reservationRequired;
    this.classIndex = classIndex;
};

// Slide 6, when the form is submitted (to add new class to the schedule), class is added to the "Schedule" tanle
addClassForm.addEventListener("submit", addNewClass, false);


// Loading JSON data into the table
 // Create XMLHttpRequest object
var xhr = new XMLHttpRequest();   
xhr.open('GET', 'data/gymclass.json', true);   
xhr.send(null);              
xhr.onload = function() {                      
  if(xhr.status === 200) {                      
    responseObject = JSON.parse(xhr.responseText);
    for (var i = 0; i < responseObject.gymclass.length; i++) {
      row[i] = new classSchedule(responseObject.gymclass[i].day, responseObject.gymclass[i].time, responseObject.gymclass[i].ampm, responseObject.gymclass[i].instructorFirstName, responseObject.gymclass[i].instructorLastName, responseObject.gymclass[i].classType, responseObject.gymclass[i].duration, responseObject.gymclass[i].reservationRequired, i);
      addGroupClass(row[i]);
    }
  }
};


// Function for adding a new gym class as a row to the schedule table
function addGroupClass(classSchedule) {
    // Variable to add new row to the table
    var row =  schedule.insertRow();
    var newRowInfo = '<td>' + classSchedule.day + '</td>';
    newRowInfo += '<td>' + classSchedule.time +  " " + classSchedule.ampm + '</td>';
    newRowInfo += '<td>' + classSchedule.instructorFirstName + '</td>' ;
    newRowInfo += '<td>' + classSchedule.instructorLastName + '</td>';
    newRowInfo += '<td>' + classSchedule.classType + '</td>';
    newRowInfo += '<td>' + classSchedule.duration + '</td>';
    newRowInfo += '<td>' + classSchedule.reservationRequired + '</td>';
   /* Two buttons are added to the end of each row: 
   "Reserve" and "Delete". Both buttons are hidden and displayed based
   on specific parameters from 'website.js' */
    newRowInfo += '<td class="reserveButtons hidden"><input class="reserveButton" id="reserveButton' + classSchedule.classIndex + '" type="button" value="RESERVE" name="reserve"></td><td class="delete hidden"><input class="deleteButton" id="delete' + classSchedule.classIndex + '" type="button" value="x" name="delete"></input></td>';
    row.innerHTML = newRowInfo;
    // Variable to get each "delete" button in the table; each button has its own ID in order to delete the same row, which the delete button belongs to
    var deleteButton = document.getElementById('delete' + classSchedule.classIndex);
    // Once the delete button is clicked on the selected row, this row gets deleted
    deleteButton.addEventListener("click",removeGroupClass, false);

    var reserveButton = document.getElementById('reserveButton' + classSchedule.classIndex);
    reserveButton.addEventListener("click",saveClassUser, false);
}



// Function for adding a new gym class as a row to the schedule table
function addGroupClassNot(classSchedule) {
    // Variable to add new row to the table
    var row =  schedule.insertRow();
    var newRowInfo = '<td>' + classSchedule.day + '</td>';
    newRowInfo += '<td>' + classSchedule.time +  " " + classSchedule.ampm + '</td>';
    newRowInfo += '<td>' + classSchedule.instructorFirstName + '</td>' ;
    newRowInfo += '<td>' + classSchedule.instructorLastName + '</td>';
    newRowInfo += '<td>' + classSchedule.classType + '</td>';
    newRowInfo += '<td>' + classSchedule.duration + '</td>';
    newRowInfo += '<td>' + classSchedule.reservationRequired + '</td>';
   /* Two buttons are added to the end of each row: 
   "Reserve" and "Delete". Both buttons are hidden and displayed based
   on specific parameters from 'website.js' */
    newRowInfo += '<td class="delete"><input class="deleteButton" id="delete' + classSchedule.classIndex + '" type="button" value="x" name="delete"></input></td>';
    row.innerHTML = newRowInfo;
    // Variable to get each "delete" button in the table; each button has its own ID in order to delete the same row, which the delete button belongs to
    var deleteButton = document.getElementById('delete' + classSchedule.classIndex);
    // Once the delete button is clicked on the selected row, this row gets deleted
    deleteButton.addEventListener("click",removeGroupClass, false);
}


// Add new group class to the table by submitting the form
function addNewClass(e) {
    e.preventDefault();
    r = row.length;
    row[r] = new classSchedule(addClassForm.day.value, addClassForm.time.value, addClassForm.ampm.value, addClassForm.firstname.value, addClassForm.lastname.value, addClassForm.exercise.value, addClassForm.duration.value, addClassForm.reservation.value, r);
    addGroupClassNot(row[r]);
      // Empty text inputs of the form once it is submitted
    addClassForm.reset();
    // Calling the function to save information to the server
   saveInfo();
}

// Function to delete the row
// SOURCE: W3School
function removeGroupClass(e){
    var target = e.target;
    var i = target.parentNode.parentNode.rowIndex;
    schedule.deleteRow(i);
    saveInfo();
};

// Loading JSON data into the table
 // Create XMLHttpRequest object
var xhr1 = new XMLHttpRequest();    
xhr1.open('GET', 'data/userschedule.json', true);   
xhr1.send(null);             
xhr1.onload = function() {                      
  if(xhr.status === 200) {                      
    responseObject = JSON.parse(xhr1.responseText);
    var  userScheduleDetails = document.getElementById("user_schedule_details");
    
    var userClass = '';
    for (var i = 0; i < responseObject.userschedule.length; i++) {
      userClass += '<div class="us"><div class="userschedule"><strong>Day:</strong> ' + responseObject.userschedule[i].day + '</div><div class="userschedule"><strong>Time:</strong> ' + responseObject.userschedule[i].time + " " + responseObject.userschedule[i].ampm + '</div><div class="userschedule"><strong>Name of the Instructor:</strong> ' + responseObject.userschedule[i].instructorFirstName + " " +responseObject.userschedule[i].instructorLastName +   '</div><div class="userschedule"><strong>Classname: </strong>' + responseObject.userschedule[i].classType +'</div></div>';
      }
      document.getElementById("user_schedule_details").innerHTML = userClass;
  }
};

// Store an array of the saved classes by the user
var savedClass = [];

function saveClassUser(e){
    var target = e.target;
    var i = target.parentNode.parentNode.rowIndex;
    z = savedClass.length;
    savedClass[z] = row[i-1];
    var newUserClass = '<div class="us"><div class="userschedule"><strong>Day:</strong> ' + schedule.rows[i].cells[0].innerHTML + '</div><div class="userschedule"><strong>Time:</strong> ' + schedule.rows[i].cells[1].innerHTML + '</div><div class="userschedule"><strong>Name of the Instructor:</strong> ' + schedule.rows[i].cells[2].innerHTML + " " + schedule.rows[i].cells[3].innerHTML +   '</div><div class="userschedule"><strong>Classname: </strong>' + schedule.rows[i].cells[4].innerHTML +'</div></div>';
    $("#user_schedule_details").append(newUserClass);

    var userCl = {"userschedule": savedClass};
    $.post("user.php", {userdata: JSON.stringify(userCl)});
};




// Function to save information to the server into JSON file
function saveInfo() {
    var data = {"gymclass": row};
    $.post("server.php", {mydata: JSON.stringify(data)});
}

// Form for adding new gym class to the schedule cannot be submitted unless all fields (with input type text) have values
var filled = true;
var empty = false;
  $('#addClassButton').prop('disabled', filled); 
  $(document).keyup(function() {
    $('#addClassForm input:text').each(function() { 
      filled = $.trim(this.value) === "" ?  true :  false;
      if(filled) return empty;
    });
    $('#addClassButton').prop('disabled', filled); 
  });


});

// Google Maps API

// Variable for the map
var map;
var invalidAddressEntry = document.getElementById('invalid-address');
// Variable to store the default location for the map, supposedly the gym (the location specified is the address of Northeastern University, as an example)
var gymLocation = {lat: 42.339256, lng: -71.090803};
// Variable to access element of the page, where distance and travel time will be displayed
var routeResults = document.getElementById('infoPanel');
// By default, no distance and travel time is displayed until the user enters the start address  and chooses a way of transportation
routeResults.innerHTML = '';

// Initializing Google Maps
function initMap() {
var directionsDisplay = new google.maps.DirectionsRenderer;
var directionsService = new google.maps.DirectionsService;

  var mapOptions = {
    center: gymLocation,
    zoom: 16,
    disableDefaultUI: true,
    streetViewControl: true,
    streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
    }
  }

  var map = new google.maps.Map(document.getElementById('map'),
       mapOptions);


  directionsDisplay.setMap(map);
  // Stores more details about directions; displayed inside the popup window
  directionsDisplay.setPanel(document.getElementById('panelContent'));
// Calculates distance and travel time if the user is driving
  document.getElementById('driving').addEventListener('click', function() {
    calculateDirections(directionsService, directionsDisplay, 'DRIVING');
  });
// Calculates distance and travel time if the user is walking
  document.getElementById('walking').addEventListener('click', function() {
    calculateDirections(directionsService, directionsDisplay, 'WALKING');
  });
// Calculates distance and travel time if the user is getting by bicycle
  document.getElementById('bicycle').addEventListener('click', function() {
    calculateDirections(directionsService, directionsDisplay, 'BICYCLING');
  });
// Calculates distance and travel time if the user is using public transportation
  document.getElementById('transit').addEventListener('click', function() {
    calculateDirections(directionsService, directionsDisplay, 'TRANSIT');
  });


// Variable to store image for the marker
var markerImage = 'img/marker.png';
// Variable for marker on the map to mark 'gymLocation'
  marker = new google.maps.Marker({
    map: map,
    // marker cannot be moved around the map
    draggable: false,
    animation: google.maps.Animation.DROP,
    position: gymLocation,
    icon: markerImage
  });
  marker.addListener('click', toggleBounce);


// When the user enters his/her address, the input field shows suggestions for the address
    var addressSuggestion = document.getElementById('homeAddress');
    var autocomplete = new google.maps.places.Autocomplete(addressSuggestion);
};

// If the marker is clicked, it is bouncing
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
};
// Function to calculate distance and travel time if driving
function calculateDirections(directionsService, directionsDisplay, travelMode) {
// Travel mode
  var selectedMode = travelMode;
  directionsService.route({
// Start address: whatever user enters
    origin: document.getElementById('homeAddress').value, 
// End address: gymLocation (as an example, Northeastern University address)
    destination: gymLocation, 
// Travel mode is taken from 'selecMode' variable
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
 // For each route, display distance in miles and commute time
    for (var i = 0; i < route.legs.length; i++) {
        routeResults.innerHTML = '<div id="mapResults"><p class="commute">Distance (in miles): <span class="routeHighlight">' + route.legs[i].distance.text + '</span></p><p class="commute">Duration: <span class="routeHighlight">' + route.legs[i].duration.text + '</span></p></div>';
        invalidAddressEntry.innerHTML = '';      
      }
    } else {
      routeResults.innerHTML = '';
      invalidAddressEntry.innerHTML = 'Address invalid or some other error has occured';
    }
  });
}


