ENGINE.systems.render = function() {
	// SCENE
    var scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth,
        SCREEN_HEIGHT = window.innerHeight;
    this.assets = {};
    this.meshes = {};


    var VIEW_ANGLE = 45,
        ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
        NEAR = 0.1,
        FAR = 20000;

    var camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0,150,400);
    camera.lookAt(scene.position);

    var assets = {
        'chunli': 'images/roll.png'
    }
    //    CONTROLS
    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(5,150,10);
    scene.add(light);

    // FLOOR
    var floorMaterial = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide } );
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);


    // sKYBOX
    var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
    var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    scene.add(skyBox);
    scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );


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

    // RENDERER
    var params =  {antialias:true};

    var renderer = (Detector.webgl) ? new THREE.WebGLRenderer( params ) : new THREE.CanvasRenderer(); 

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    document.getElementById( 'container' ).appendChild( renderer.domElement );
    // EVENTS
    THREEx.WindowResize(renderer, camera);

    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;

}

ENGINE.systems.render.prototype.update = function( entities ) {

	var entity;
	
	for (var entityId in entities){
		entity = entities[entityId];

		if(entity.has('appearance') && entity.has('position')){ 

            if(this.meshes[entityId] === undefined ) {
                var asset = entity.components.appearance.source;
            }

	}
    this.renderer.render(this.scene, this.camera);
}
};