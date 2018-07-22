// Instructions
// Current Train Schedule Table:
// //Train Name, Destination, Frequency (mins), Next Arrival, Minutes Away 
// Add Train Table (input):
// // Train Name, Destination, Frist Train (HH:mm), Frequency(min), Submit buttom
// Code this app to calculate when the next train will arrive; this should be relative to the current time.
// Users from many different machines must be able to view same train times.
// (challenge)
// updating your "minutes to arrival" and "next train time" text once every minute 
// Try adding update and remove buttons for each train. Let the user edit the row's elements-- 
// allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).
// only users who log into the site with their Google or GitHub accounts can use your site. 

// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyDgsYLotiW9MTChsCSYcxWF3B_CN4lw-mk",
    authDomain: "hw-trainschedule-e7c89.firebaseapp.com",
    databaseURL: "https://hw-trainschedule-e7c89.firebaseio.com",
    projectId: "hw-trainschedule-e7c89",
    storageBucket: "hw-trainschedule-e7c89.appspot.com",
    messagingSenderId: "799741742353"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrain = moment("08:30 +0000", "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: firstTrain,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  // console.log(trainName);
  // console.log(trainDestination);
  // console.log(firstTrain);
  // console.log(trainFrequency);

  // Prettify the train time
  // console.log(moment.unix(trainTime).format("dddd, MMMM Do YYYY, h:mm:ss a"))
  //trainTime = 04/05/1989
  //moment.js takes the date, casts it in miliseconds 
  //THEN 
  //Calculates the EPOCTIME - firstTrain
  console.log(firstTrain);
  console.log(typeof firstTrain)
  var trainStartPretty = moment.unix(firstTrain)
  console.log(trainStartPretty.format())



  // Calculate the arrival time using hardcore math
  // To calculate the minutes to arrival 
  var nextArrival = moment().diff(moment(firstTrain, "X"), "mins");
  // console.log(arrivalTime);

  // Calculate the next train time
  var minutesAway = 
  console.log(minutesAway);


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case