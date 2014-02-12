function Animanager() {

	this.currentFrame = '';
	this.frameCollection = new FrameCollection;

	this.frames = this.frameCollection.frameList(this);

}


Animanager.prototype.getFrame = function(frame) {

	var frame_parts,
		move = 'forward', 
		result = {
			forward: function() {
				console.log('no frame');
			},
			back: function() {
				console.log('no frame back');
			}
		};

	//no direct rule found
	if (!this.frames[frame]) {
		frame_parts = frame.split('<->');

		//checking reverse rule
		if (this.frames[frame_parts[1] + '<->' + frame_parts[0]]) {
			result = this.frames[frame_parts[1] + '<->' + frame_parts[0]];
			move = 'back';
		}
		// //maybe, frame rule set as two way rule
		// else if (this.frames[frame_parts[0] + '<->' + frame_parts[1]]) {
		// 	result = this.frames[frame_parts[0] + '<->' + frame_parts[1]];
		// }

	} else {
		result = this.frames[frame];
	}

	return {
		context: result,
		move: move
	};

};

//run forward or backward action
Animanager.prototype.runFrame = function(prev, current) {

	var frame = this.getFrame(prev + '<->' + current);
	//setting current frame when frame run
	// this.currentFrame = prev + '<->' + current;

	frame.context[frame.move]();

};

Animanager.prototype.setCurrentFrame = function(hash) {
	var frame = this.getFrameByName(hash);
	this.currentFrame = frame.name;
};

// Animanager.prototype.runNextFrame = function(hash) {

// 	var frame;

// 	if (hash && hash.length) {
// 		frame = this.getFrameByName(hash);
// 		frame.forward();
// 	}

// };


Animanager.prototype.getNextFrame = function(frame) {

	var current_frame = frame ? frame : this.currentFrame;

	var found = 0,
		frame_name;
	for(var frame in this.frames) {
		frame_name = this.frames[frame].name;
		if (found) {
			return this.frames[frame];
		} else if(frame_name == current_frame) {
			found = 1;
		}
	}
};


Animanager.prototype.getPrevFrame = function(frame) {

	var previous_frame, 
		frame_name;

	var current_frame = frame ? frame : this.currentFrame;


	for (var frame in this.frames) {
		frame_name = this.frames[frame].name;
		if (frame_name == current_frame) {
			return previous_frame;
		}
		previous_frame = this.frames[frame];
	}

};

Animanager.prototype.getFrameByName = function(name) {
	for (var frame in this.frames) {
		if (this.frames[frame].name == name) {
			return this.frames[frame];
		}
	}
};

