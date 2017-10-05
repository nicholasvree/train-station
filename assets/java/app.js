


///////////////Variables///////////////  // Initialize Firebase
var config = {
  apiKey: "AIzaSyCAPAZ3ixxnHCF420FAUcvBO1kwSWwQONc",
  authDomain: "train-schedule-8ef70.firebaseapp.com",
  databaseURL: "https://train-schedule-8ef70.firebaseio.com",
  projectId: "train-schedule-8ef70",
  storageBucket: "train-schedule-8ef70.appspot.com",
  messagingSenderId: "1001025095448"
};

firebase.initializeApp(config);

database = firebase.database();

/////////////Functions///////////////

function emptyFields() {
  $("#train-name").val('')
  $("#destination").val('')
  $("#first-train-time").val('')
  $("#frequency").val('')
}

////////////Main Logic//////////////

$( document ).ready(function() {

  database.ref().on("child_added", function(snapshot) {

    //console.log(snapshot.val().train_name)

    var tableRow = $("<tr>")
    .attr("id", JSON.stringify(snapshot.val()));

    var tableDataTrainName = $("<td>")
    tableDataTrainName.text(snapshot.val().train_name)
    tableRow.append(tableDataTrainName)



    var tableDataDestination = $("<td>")
    tableDataDestination.text(snapshot.val().destination)
    tableRow.append(tableDataDestination)


    var tableDataFrequency = $("<td>")
    tableDataFrequency.text(snapshot.val().frequency)
    tableRow.append(tableDataFrequency)

    var nextArrivalTime = snapshot.val().first_train_time
    var nextArrivalTimeConverted = moment(nextArrivalTime, "hh:mm").subtract(1, "years");
     // console.log(moment(nextArrivalTimeConverted).format("HH:MM"));

     var tFrequency = snapshot.val().frequency;
     // console.log(tFrequency)

    // // Time is 3:30 AM
    var firstTime = snapshot.val().first_train_time;
    // console.log(firstTime)

    // // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    //console.log(tRemainder);

     // Minute Until Train
     var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("hh:mm")
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var tableDataNextTrain = $("<td>")
    tableDataNextTrain.text(nextTrainFormatted)
    tableRow.append(tableDataNextTrain)

    var tableDataMinutesTill = $("<td>")
    tableDataMinutesTill.text(tMinutesTillTrain)
    tableRow.append(tableDataMinutesTill)

    $("tbody").append(tableRow)
    
  });

  $("#log-train-btn").on("click", function(event){

    event.preventDefault()


    var train_name_input = $("#train-name").val().trim()
    var destination_input = $("#destination").val().trim()
    var first_train_time_input = $("#first-train-time").val()
    var frequency_input = $("#frequency").val()

    var database = firebase.database();

    database.ref().push({
      train_name : train_name_input,
      destination : destination_input,
      first_train_time : first_train_time_input,
      frequency : frequency_input 

    });




  });

});


