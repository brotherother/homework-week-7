 //Link to Firebase
var trainData = new Firebase("https://dfly-train-times.firebaseio.com/");

//Button for adding Employees
$("#addTrainBtn").on("click", function(){

	//Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var trainFirst = moment($("#firstInput").val().trim(), "h:mm").format("X");
	var trainFrequency = ($("#frequencyInput").val().trim());

	//Creates local "temporary" object for holding train data
	var newTrain = {
		name:  trainName,
		destination: trainDestination,
		first: trainFirst,
		frequency: trainFrequency
	}

	//Uploads train data to the database
	trainData.push(newTrain);

	//Logs everything to console
	// console.log(newTrain.name);
	// console.log(newTrain.destination); 
	// console.log(newTrain.first);
	// console.log(newTrain.frequency);

	//Alert
	alert("Train successfully added");

	//Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstInput").val("");
	$("#frequencyInput").val("");

	//Prevents moving to new page
	return false;
});


//Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey) {

	// console.log(childSnapshot.val());

	//Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainFirst = childSnapshot.val().first;
	var trainFrequency = childSnapshot.val().frequency;

	//Train Info
	// console.log(trainName);
	// console.log(trainDestination);
	// console.log(trainFirst);
	// console.log(trainFrequency);
	var nextArrival = moment();
	console.log(nextArrival)

	if (trainFirst > moment().unix()) {
		nextArrival = moment(trainFirst, "X").format('h:mm');
	} else if (trainFirst == moment().unix()) {
		nextArrival = "Leaving Now!";
	} else {
		console.log((trainFirst + ( (trainFrequency * 60) * i)));
		for (var i = 1; moment((trainFirst + ( (trainFrequency * 60) * i)), 'X') < moment().unix(); i++) {
			nextArrival = moment( trainFirst + ( (trainFrequency * 60) * (i + 1) ), 'X').format('hh:mm');
			console.log(nextArrival);
		};
	};

	console.log(nextArrival);

	var minutesAway = (nextArrival - (moment().format('h:mm')));
	// console.log(minutesAway);
	// //Prettify the next train arrival
	// var nextArrival = trainFirst;
	// for (; nextArrival < moment(); next) {
	// 	nextArrival = nextArrival + trainFrequency;
	// } 


	// var next Arrival = trainFirst;
	// var nextArrival = moment(trainFirst, "h:mm a").fromNow("mm");
	// var minutesAway = moment(nextArrival, "mm").fromNow();


	//Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td><td>");

});