var game = new Phaser.Game(800, 600, Phaser.AUTO, 'mapPhaser', { preload: preload, create: create, update: update });



function preload() {

	//Load the tilemap file
	game.load.tilemap('myGame', 'assets/test2.json', null, Phaser.Tilemap.TILED_JSON);

	//Load the spritesheet for the tilemap
	game.load.image('test', 'assets/grass-tiles-2-small.png');

	//Load other assets, the player
    game.load.spritesheet('player', 'assets/dude.png', 32, 48);
}

var map;
var groundLayer;
var obstacleLayer;
var player;

function create() {    

    game.physics.startSystem(Phaser.Physics.ARCADE);


	map = game.add.tilemap('myGame');

	//'test' is the name of the spritesheet inside of Tiled Map Editor (check json file)
	map.addTilesetImage('test');

	//'Tile LAyer 1' is the name of a layer inside of Tiled Map Editor (check json file)
	groundLayer = map.createLayer('Tile Layer 1');
	obstacleLayer = map.createLayer('Obstacles');

	//  Here, the range is from 1 (the first tile) to the fifth (last tile).
    // map.setCollisionBetween(1, 5);
	map.setCollisionBetween(1, 200, true, 'Obstacles');

	groundLayer.resizeWorld();
	obstacleLayer.resizeWorld();


	//Add player
	player = game.add.sprite(100, 100, 'player');
	game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    // Add camera
    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

	game.physics.arcade.collide(player, groundLayer);
	game.physics.arcade.collide(player, obstacleLayer);


	player.body.velocity.x = 0;
    player.body.velocity.y = 0;

	if (cursors.left.isDown) {

        player.body.velocity.x = -150;
        player.animations.play('left');

    } else if (cursors.right.isDown) {

        player.body.velocity.x = 150;
        player.animations.play('right');

    }  else if (cursors.up.isDown) {

        player.body.velocity.y = -150;
    	player.frame = 4;   

    } else if (cursors.down.isDown) {

        player.body.velocity.y = 150;
    	player.frame = 4;   

    } else {

    	player.animations.stop();
        player.frame = 4;

    }
} 




