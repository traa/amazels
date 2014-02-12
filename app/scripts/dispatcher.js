function Dispatcher() {
	this.currentHash = '';
	this.previousHash = '';
	this.blockWheel = false;
	this.wheelBlockTime = 1000;
}

Dispatcher.prototype.init = function() {
	this.enable();
	this.listenWheel();
};

Dispatcher.prototype.enable = function() {
	var self = this;
	$(window).on("hashchange", function (e) {

		//routing
		self.handleRoute();

		e.preventDefault();
		e.stopPropagation();
    });
};

Dispatcher.prototype.listenWheel = function() {

	var self = this;
	/** This is high-level function.
	 * It must react to delta being more/less than zero.
	 */
	function handle(delta) {
        if (delta < 0) {
        	//moving down, means forward
        	!self.blockWheel && self.moveForward();
        } else {
        	//moving up, means backward
        	!self.blockWheel && self.moveBackward();
        }
	}

	/** Event handler for mouse wheel event.
	 */
	function wheel(event){
	        var delta = 0;
	        if (!event) /* For IE. */
	                event = window.event;
	        if (event.wheelDelta) { /* IE/Opera. */
	                delta = event.wheelDelta/120;
	        } else if (event.detail) { 
	        	/** Mozilla case. */
	                /** In Mozilla, sign of delta is different than in IE.
	                 * Also, delta is multiple of 3.
	                 */
	                delta = -event.detail/3;
	        }
	        /** If delta is nonzero, handle it.
	         * Basically, delta is now positive if wheel was scrolled up,
	         * and negative, if wheel was scrolled down.
	         */
	        if (delta)
	                handle(delta);
	        /** Prevent default actions caused by mouse wheel.
	         * That might be ugly, but we handle scrolls somehow
	         * anyway, so don't bother here..
	         */
	        if (event.preventDefault)
	                event.preventDefault();
		event.returnValue = false;
	}

	/** Initialization code. 
	 * If you use your own event management code, change it as required.
	 */
	if (window.addEventListener) {
		/** DOMMouseScroll is for mozilla. */
		window.addEventListener('DOMMouseScroll', wheel, false);
	}
	/** IE/Opera. */
	window.onmousewheel = document.onmousewheel = wheel;       
        

};

Dispatcher.prototype.disable = function() {
	 $(window).off("hashchange");
};

Dispatcher.prototype.setHash = function(hash) {

	var e = "";
	if (hash && hash.length > 0) {
		this.blockWheel = true;

		e = "#!/" + String(hash);
		window.location.hash = e;
	}




    var self = this;

    setTimeout(function() {
    	self.blockWheel = false;
    }, this.wheelBlockTime);
};

Dispatcher.prototype.handleRoute = function() {


	 this.previousHash = this.currentHash;
	 this.currentHash = this.getHash();
	 this.hashChangeCallback(this.previousHash, this.currentHash);
	 // this.isInitHashChange = !1;

};

Dispatcher.prototype.hashChangeCallback = function(prev, current) {
	//execute an action
	aniManager.runFrame(prev, current);
	aniManager.setCurrentFrame(this.currentHash);
	// aniManager.runNextFrame(this.getHash());
};

Dispatcher.prototype.getHash = function() {
	var hash = window.location.hash.replace('#!/', '');
	console.log('get hash', hash);
	return hash;
};


Dispatcher.prototype.moveForward = function() {
	
	var nextFrame = aniManager.getNextFrame();
	

	nextFrame && this.setHash(nextFrame.name);

};

Dispatcher.prototype.moveBackward = function() {
	
	var prevFrame = aniManager.getPrevFrame();
	
	prevFrame && this.setHash(prevFrame.name);
};