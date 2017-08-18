var controller = {
	makeRequest: function() {
		httpRequest = new XMLHttpRequest();

	    if (!httpRequest) {
	    	alert('Giving up :( Cannot create an XMLHTTP instance');
	    	return false;
	    }
	    httpRequest.onreadystatechange = this.handleRequest;
	    httpRequest.open('GET', 'data.json');
	    httpRequest.send();
	},

	handleRequest: function() {
    	if (httpRequest.readyState === XMLHttpRequest.DONE) {
    		if (httpRequest.status === 200) {
    			var response = JSON.parse(httpRequest.responseText);
    			var players = response.players;
				view.init(response, players);
      		} else {
        		alert('There was a problem with the request.');
      		}
    	}
	},

    counter: {
        count: 0,
        changeHandler: function(change) {
            this.count += change;
            view.updateCounter();
        }
    },

    buttons: {
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
		this.makeRequest();
	}
};

controller.init();

var view = {
	init: function(response, players) {
		buttonsDiv = document.getElementById("buttons");
		buttonsHTML = this.createButtons(response, players);
		buttonsHTML.forEach(function(button) {
			buttonsDiv.innerHTML += button;
		});
		this.updateCounter();
	},

	createButtons: function(response, players) {
		buttonsHTML = [];
		for(var i = 0; i < response.total; i++) {
			var buttonHTML = "<button onclick='controller.buttons.clickHandler(this)'";
			buttonHTML += " id='" + i + "'>";   
			buttonHTML += players[i].price + ": ";
			buttonHTML += players[i].player + "</button>";
			buttonsHTML.push(buttonHTML);
		}
		return buttonsHTML;
	},

	updateCounter: function() {
		document.getElementById("counter").innerHTML = controller.counter.count;
	}
};
