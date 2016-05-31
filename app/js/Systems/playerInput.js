/* =========================================================================
 *
 * userInput.js
 *  This script contains the game logic acts as a controller for the Entity 
 *  Component System
 *
 * ========================================================================= */


// Setup the system
// --------------------------------------
ENGINE.systems.playerInput = function systemPlayerInput () {
   this.keyboard = new THREEx.KeyboardState();
};

ENGINE.systems.playerInput.prototype = {

	constructor: ENGINE.systems.playerInput,

	update: function playerInputUpdate( entities ) {

	    var entity; 

	    // iterate over all entities
	    for( var entityId in entities ){
	        entity = entities[entityId];

	        // Only run logic if entity has relevant components
	        if( entity.components.playerControlled ){

	            var movement = entity.components.movement;

	            if (this.keyboard.pressed('W') && !this.keyboard.pressed('S')) { movement.up = true }
	            if (this.keyboard.pressed('S') && !this.keyboard.pressed('W')) { movement.down = true }
	            if (this.keyboard.pressed('D') && !this.keyboard.pressed('A')) { movement.right = true }
	            if (this.keyboard.pressed('A') && !this.keyboard.pressed('D')) { movement.left = true }
	        }
	    }

	}
};