$(document).ready(function () {
	var topics = ["Yoda", "Darth Vader", "Obi-Wan Kenobi", "Luke Skywalker", "R2D2", "General Grevious", "C3P", "a night at the roxbury"];

	// Add buttons for original topics array
	function renderButtons() {
		$("#topic-buttons").empty();
		for (i = 0; i < topics.length; i++) {
			$("#topic-buttons").append("<button class='btn btn-success' data-topic='" + topics[i] + "'>" + topics[i] + "</button>");
		}
	}

	renderButtons();

	// Adding a button for topic entered
	$("#add-topic").on("click", function () {
		event.preventDefault();
		var topic = $("#topic-input").val().trim();
		topics.push(topic);
		renderButtons();
		return;
	});


	// Getting gifs from api... onto html
	$("button").on("click", function () {
		var topic = $(this).attr("data-topic");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			topic + "&api_key=dc6zaTOxFJmzC&limit=10"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#topics").empty();
			for (var i = 0; i < results.length; i++) {
				var topicDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var topicImg = $("<img>");

				topicImg.attr("src", results[i].images.original_still.url);
				topicImg.attr("data-still", results[i].images.original_still.url);
				topicImg.attr("data-animate", results[i].images.original.url);
				topicImg.attr("data-state", "still");
				topicImg.attr("class", "gif");
				topicDiv.append(p);
				topicDiv.append(topicImg);
				$("#topics").append(topicDiv);
			}
		});
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}

	// $("img").on("click", function() {
	// 	console.log("click worked!");
	// 	var src = topicImg.attr(src);
	// 	src = src.substring(0, src.length - 10);
	// 	src += ".url";
	// 	console.log(src);
	// 	topicImg.attr("src", src);
	// });

	// $(document).on("click", "#input", displayImg);
	$(document).on("click", ".gif", changeState);

});