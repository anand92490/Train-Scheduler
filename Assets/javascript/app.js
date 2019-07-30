//initialize firebase
//create a click event when the user clicks submit button
//create a variabale to to store the input value for train name, train destination, first train time, frequency.
//create a database reference for each variable
//push the value to the database. (create firebase key to capture the values)  
//capture the value of the input in the database snapshot.
//use the moment.js method to set the variables and assign snapshot values for the first train, train freequency, First Time, Current Time, Difference between the times, Time apart (remainder), Minute Until Train and  Next Train
//Create a new row ("<tr>"")to set the .text input snapshot values for train name, train destination, frequency, next arriaval and minutes away.
//append those text values into the ("<tr>") and increment the index.
//create variables to hold the values for the new name, new destination and new frequency
//get the database reference to set the new input values into its corresponding data attribute.



var firebaseConfig = {
    apiKey: "AIzaSyABXyTnNv6SzGmXfgZSgdbKIu1PL2wv_Vc",
    authDomain: "train-scheduler-8976f.firebaseapp.com",
    databaseURL: "https://train-scheduler-8976f.firebaseio.com",
    projectId: "train-scheduler-8976f",
    storageBucket: "train-scheduler-8976f.appspot.com",
    messagingSenderId: "461499371112",
    appId: "1:461499371112:web:c48d294a25a7d0af"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

    var database = firebase.database();
    var rowCount = 0;
    var name = "";
    var destination = "";
    var firstTime = "";
    var freequency = "";

 $("#formID").on("submit", function(event){
        event.preventDefault();

    name = $("#trainName").val().trim();
    destination = $("#trainDestination").val().trim ();
    firstTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency

    });
        
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

});
  
   // console.log(snapshot.val());
    // console.log(snapshot.val().name);
    // console.log(snapshot.val().destination);
    // console.log(snapshot.val().firstTime);
    // console.log(snapshot.val().freequency);   

database.ref().on("child_added", function(childSnapshot){

    var firstTime = childSnapshot.val().firstTime;
    var trainFrequency = parseInt(childSnapshot.val().frequency);
    var firstTrain = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTrain);
    // console.log(firstTime);
    // console.log(trainFrequency);
    var currentTime = moment();
    var currentTimeCal = currentTime.subtract(1, "years");

    var diffTime = moment().diff(moment(firstTrain), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    var timeRemainder = diffTime % trainFrequency;
    // console.log(timeRemainder);

    minutesRemaining = trainFrequency -timeRemainder;

    var tMinutesTillTrain = trainFrequency - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

 

    var newRow = $("<tr>");
    newRow.addClass("row-" + rowCount);
    
    var nameInp = $("<td>").text(childSnapshot.val().name);
    var destinationInp = $("<td>").text(childSnapshot.val().destination);
    var freequencyInp = $("<td>").text(childSnapshot.val().frequency);
    var nextTrainInp = $("<td>").text(nextTrain);
    var minutesRemainingInp = $("<td>").text(minutesRemaining);
    
    newRow.append(nameInp).append(destinationInp).append(freequencyInp).append(nextTrainInp).append(minutesRemainingInp);
    $("#tableContent").append(newRow);
    rowCount++;
    

});