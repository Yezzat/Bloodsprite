/* =========================================================================
 *
 * game.js
 *  This script contains the game logic acts as a controller for the Entity 
 *  Component System
 *
 * ========================================================================= */
ENGINE.Game = function Game (){
    // This is our "main" function which controls everything. We setup the 
    // systems to loop over, setup entities, and setup and kick off the game
    // loop.
    var self = this;
    var components = ENGINE.components;

    // Create some entities
    // ----------------------------------
    var entities = {}; // object containing { id: entity  }
    var entity;

    // Create a bunch of random entities
    for(var i=0; i < 20; i++){
        entity = new ENGINE.Entity();
        entity.add( new components.Appearance());
        entity.add( new components.Position());

        // % chance for decaying rects
        if(Math.random() < 0.8){
            entity.add( new components.Health() );
        }

        // NOTE: If we wanted some rects to not have collision, we could set it
        // here. Could provide other gameplay mechanics perhaps?
        entity.add( new components.Collision());

        entities[entity.id] = entity;
    }

    // PLAYER entity
    // ----------------------------------
    // Make the last entity the "PC" entity - it must be player controlled,
    // have health and collision components
    entity = new ENGINE.Entity();
    entity.add( new components.Appearance({source: 'chunli'}));
    entity.add( new components.Position());
    entity.add( new components.PlayerControlled() );
    entity.add( new components.Health() );
    entity.add( new components.Collision() );

    entities[entity.id] = entity;


    // store reference to entities
    ENGINE.entities = entities;

    // Setup systems
    // ----------------------------------
    // Setup the array of systems. The order of the systems is likely critical, 
    // so ensure the systems are iterated in the right order
    var systems = [
        new ENGINE.systems.playerInput(),
        new ENGINE.systems.movement(),
        new ENGINE.systems.render()
    ];
    
    // Game loop
    // ----------------------------------
    function gameLoop (){
        // Simple game loop
        for(var i=0,len=systems.length; i < len; i++){
            // Call the system and pass in entities
            // NOTE: One optimal solution would be to only pass in entities
            // that have the relevant components for the system, instead of 
            // forcing the system to iterate over all entities
            systems[i].update(ENGINE.entities);
        }

        // Run through the systems. 
        // continue the loop
        if(self._running !== false){
            requestAnimationFrame(gameLoop);
        }
    }
    // Kick off the game loop
    requestAnimationFrame(gameLoop);

    // Lose condition
    // ----------------------------------
    this._running = true; // is the game going?
    this.endGame = function endGame(){ 
        self._running = false;
        document.getElementById('final-score').innerHTML = ENGINE.score;
        document.getElementById('game-over').className = '';

        // set a small timeout to make sure we set the background
        setTimeout(function(){
            document.getElementById('game-canvas').className = 'game-over';
        }, 100);
    };


    return this;
};

// Kick off the game
ENGINE.game = new ENGINE.Game();