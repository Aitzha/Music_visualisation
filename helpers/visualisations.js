//container function for the visualisations
function Visualisations(){
	this.x = width / 50;
	this.y = height / 5;
	//array to store visualisations
	this.visuals = [];
	//currently selected vis. set to null until vis loaded in
	this.selectedVisual = null;

	//add a new visualisation to the array
	//@param vis: a visualisation object
	this.add = function(vis){
		this.visuals.push(vis);
		vis.x = this.x;
		vis.y = this.y + (height / 30 * this.visuals.length)
		//if selectedVisual is null set the new visual as the 
		//current visualiation
		if(this.selectedVisual == null){
			this.selectVisual(vis.name);
		}
	};

	//select a visualisation using it name property
	//@param visName: name property of the visualisation
	this.selectVisual = function(visName){
		for(var i = 0; i < this.visuals.length; i++){
			if(visName == this.visuals[i].name){
				this.selectedVisual = this.visuals[i];
			}
		}
	};
}
