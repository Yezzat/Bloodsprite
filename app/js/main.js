
// MAIN

// standard global variables
var container, scene, camera, renderer;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom global variables
var player, idle, explosion;
var animations;


init();
render();

// FUNCTIONS
function init()
{

    ////////////
    // CUSTOM //
    ////////////
    
    // MESHES WITH ANIMATED TEXTURES!
    animations = [];
    
    player = new createSprite(assets[0], 9, 1, 9, 80, new THREE.Vector3(-100, 25, 0));
    idle = new createSprite(assets[1], 8, 1, 8, 100, new THREE.Vector3(-200, 25, 0));
    explosion = new createSprite(assets[2], 4, 4, 16, 55, new THREE.Vector3(100, 25, 0));

    function createSprite(params){
        var params = params || {};
        var texture = new THREE.ImageUtils.loadTexture( params.url );
        texture.format = THREE.RGBAFormat;
        var pos = params.position;
        
        // animation = new TextureAnimator( texture, x, y, total, dur ); // texture, #horiz, #vert, #total, duration.
        var material = new THREE.MeshBasicMaterial( { map: texture, side:THREE.DoubleSide, transparent: true } );
        var geometry = new THREE.PlaneGeometry(50, 50, 1, 1);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(pos.x, pos.y, pos.z);
        scene.add(mesh);

    }
}




function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {   
    // note: texture passed by reference, will be updated by the update function.
        
    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    // how many images does this spritesheet contain?
    //  usually equals tilesHoriz * tilesVert, but not necessarily,
    //  if there at blank tiles at the bottom of the spritesheet. 
    this.numberOfTiles = numTiles;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
    texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

    // how long should each image be displayed?
    this.tileDisplayDuration = tileDispDuration;

    // how long has the current image been displayed?
    this.currentDisplayTime = 0;

    // which image is currently being displayed?
    this.currentTile = 0;
        
    this.update = function( milliSec ) {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > this.tileDisplayDuration)
        {
            this.currentDisplayTime -= this.tileDisplayDuration;
            this.currentTile++;
            if (this.currentTile === this.numberOfTiles){
                this.currentTile = 0;
            }
            var currentColumn = this.currentTile % this.tilesHorizontal;
            texture.offset.x = currentColumn / this.tilesHorizontal;
            var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
            texture.offset.y = currentRow / this.tilesVertical;
        }
    };
}       
