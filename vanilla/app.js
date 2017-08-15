var controller = {
    counter: {
        count: 0,
        changeHandler: function(change) {
            this.count += change;
            document.getElementById("counter").innerHTML = this.count;
        }
    },
    buttons: {
    	makeRequest: function() {
			httpRequest = new XMLHttpRequest();

		    if (!httpRequest) {
		    	alert('Giving up :( Cannot create an XMLHTTP instance');
		    	return false;
		    }
		    httpRequest.onreadystatechange = this.updateButtons;
		    httpRequest.open('GET', 'data.json');
		    httpRequest.send();
		},

		updateButtons: function() {
	    	if (httpRequest.readyState === XMLHttpRequest.DONE) {
	    		if (httpRequest.status === 200) {
	    			var response = JSON.parse(httpRequest.responseText);
	    			var players = response.players;
	        		var buttons = document.getElementsByTagName('button');
					for(var b = 0; b < buttons.length; b++) {
					    var button = buttons[b];   
					    button.innerHTML = players[b].price + ": ";
					    button.innerHTML += players[b].player;
					}
	      		} else {
	        		alert('There was a problem with the request.');
	      		}
	    	}
		},

    	pressed: [],

    	clickHandler: function(button) {
        	var button = button.id;
        	var index = this.pressed.indexOf(button);
        	var change;
        	if (index !== -1) {
        		change = -1;
        		this.pressed.splice(index, 1);
        	} else {
        		change = 1;
        		this.pressed.push(button);
        	}
        	controller.counter.changeHandler(change);
    	}
    },
	init: function() {
		this.buttons.makeRequest();
	}
};

controller.init();