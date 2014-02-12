function FrameCollection() {
	this.frames = {};
}

FrameCollection.prototype.frameList = function(context) {

	this.frames = {

		'<->first': {
			name: 'first',
			forward: function() {
				console.log('first frame run forward');
			},
			back: function() {
				console.log('first frame run backwards');
			}
		},
		'first<->second': {
			name: 'second',
			forward: function() {
				console.log('first to second fired!');
				//access to all frames data
				var prevFrame = context.getPrevFrame('second');
				prevFrame.forward();
			},
			back: function() {
				console.log('frame run back, second->first');
			}
		}
	};



	return this.frames;

};


