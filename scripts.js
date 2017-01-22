// Globals
var name = "";
var nodes = document.getElementsByClassName("chatSubmit");
var button = nodes[0];
var audio = new Audio('./ding.mp3');



// Socket-Related Functionality
var socket = new WebSocket('ws://localhost:8001');

socket.onmessage = function(evt){
	audio.play();
	$('<div class="yourSpace"><li class="foreign">' + evt.data.substring(1,evt.data.length-1) + '</li></div>').hide().appendTo('.messages').fadeIn(600);
}

button.onclick = function(){
	var message = document.getElementById('chatSet').value; 
	$('<div class="mySpace"><li class="local">' + message + '</li></div>').hide().appendTo('.messages').fadeIn(600);
	socket.send(name + " said: " + message);
	document.getElementById('chatSet').value = '';
	updateScroll();
}



//JQuery Effects

$(document).keypress(function(e){
	if(e.keyCode ==  13){
		var message = document.getElementById('chatSet').value;
		if(message != ''){
			$('<div class="mySpace"><li class="local">' + message + '</li></div>').hide().appendTo('.messages').fadeIn(600);
			socket.send(name + " said: " + message);
			document.getElementById('chatSet').value = '';
			updateScroll();
		}
	} else {
		var message = document.getElementById('chatSet').value;
		message = message + String.fromCharCode(e.keyCode);
	}
});

function updateScroll(){
	window.scrollTo(0,document.body.scrollHeight);
}

$('.modal-button').click(function(){
	var modal = document.getElementById('mod-input').value;
	if(modal != ''){
		name = modal;
		$('.modal-form').remove();
		socket.send(name + ' has joined the room');
		$('.footer').css("visibility", "visible");
	}
});
