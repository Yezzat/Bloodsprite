ENGINE.systems.movement = function() {

}

ENGINE.systems.movement.prototype.update = function( entities) {

    var entity; 

    // iterate over all entities
    for( var entityId in entities ){
        entity = entities[entityId];

        // Only run logic if entity has relevant components
        if( entity.has('movement')){

            var movement = entity.components.movement;
            var position = entity.components.position;

            if (movement.up)    { position.y +=3}
            if (movement.down)  { position.y -=3}
            if (movement.right) { position.x +=3}
            if (movement.left)  { position.x -=3}
        }
    }

	
}