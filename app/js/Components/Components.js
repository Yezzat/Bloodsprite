/* =========================================================================
 *
 * Components.js
 *  (ideally, components would each live in their own module)
 *
 *  Components are just data. 
 *
 * ========================================================================= */

// Appearance 
// --------------------------------------
ENGINE.components.Appearance = function ComponentAppearance ( params ){
    // Appearance specifies data for color and size
    params = params || {};

    this.source = params.source;

    return this;
};
ENGINE.components.Appearance.prototype.name = 'appearance';

// Health
// --------------------------------------
ENGINE.components.Health = function ComponentHealth ( value ){
    value = value || 20;
    this.value = value;

    return this;
};
ENGINE.components.Health.prototype.name = 'health';

// Position
// --------------------------------------
ENGINE.components.Position = function ComponentPosition ( params ){
    params = params || {};

    this.x = params.x || 0;
    this.y = params.y || 0;
    this.x = params.z || 0;

    return this;
};
ENGINE.components.Position.prototype.name = 'position';

// playerControlled 
// --------------------------------------
ENGINE.components.PlayerControlled = function ComponentPlayerControlled ( params ){
    this.pc = true;
    return this;
};
ENGINE.components.PlayerControlled.prototype.name = 'playerControlled';

// Collision
// --------------------------------------
ENGINE.components.Collision = function ComponentCollision ( params ){
    this.collides = true;
    return this;
};
ENGINE.components.Collision.prototype.name = 'collision';

// Collision
// --------------------------------------
ENGINE.components.Movement = function ComponentMovement ( params ){
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;

    return this;
};
ENGINE.components.Collision.prototype.name = 'movement';