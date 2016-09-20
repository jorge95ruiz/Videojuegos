///<reference path="../typings/phaser.d.ts"/>

module Test {
    export class RunningState extends Phaser.State {

        constructor() {
            super();
        }

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

        function preload() {

            game.load.image('sky', 'assets/sky.png');
            game.load.image('ground', 'assets/platform.png');

            game.load.spritesheet('jail', 'assets/jael.png',32,48);

        }
        function create() {
            
            
            //  We're going to be using physics, so enable the Arcade Physics system
            game.physics.startSystem(Phaser.Physics.ARCADE);

            //  A simple background for our game
            game.add.sprite(0, 0, 'sky');

            //  The platforms group contains the ground and the 2 ledges we can jump on
            platforms = game.add.group();

            //  We will enable physics for any object that is created in this group
            platforms.enableBody = true;

            // Here we create the ground.
            var ground = platforms.create(0, game.world.height - 64, 'ground');

            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            ground.scale.setTo(2, 2);

            //  This stops it from falling away when you jump on it
            ground.body.immovable = true;

            //  Now let's create two ledges
            var ledge = platforms.create(400, 400, 'ground');

            ledge.body.immovable = true;

            ledge = platforms.create(-150, 250, 'ground');

            ledge.body.immovable = true;
            
            
            
            // The player and its settings
            player = game.add.sprite(32, game.world.height - 150, 'jail');

            //  We need to enable physics on the player
            game.physics.arcade.enable(player);

            //  Player physics properties. Give the little guy a slight bounce.
            player.body.bounce.y = 0.2;
            player.body.gravity.y = 200;
            player.body.collideWorldBounds = true;

            //  Our two animations, walking left and right.
            player.animations.add('left', [4,5, 6, 7], 4, true);
            player.animations.add('right', [8,9,10,11], 4, true);
            
            cursors = game.input.keyboard.createCursorKeys();
           
        }

        function update() {
            
            //  Collide the player and the stars with the platforms
            game.physics.arcade.collide(player, platforms);
            
             
            player.body.velocity.x = 0;
            
            //  Allow the player to jump if they are touching the ground.
            if (cursors.up.isDown && player.body.touching.down)
            {
                player.body.velocity.y = -150;
            }
            
            if (cursors.left.isDown && player.body.touching.down)
            {
                //  Move to the left
                player.body.velocity.x = -150;

                player.animations.play('left');
            }
            if (cursors.right.isDown && player.body.touching.down) 
            {
                //  Move to the right
                player.body.velocity.x = 150;

                player.animations.play('right');
            }
            
            if (cursors.left.isDown && !player.body.touching.) 
            {
                //  Move to the left
                player.body.velocity.x = -75;

                player.animations.play('right');
            }
            if (cursors.right.isDown && !player.body.touching.down) 
            {
                //  Move to the right
                player.body.velocity.x = 75;

                player.animations.play('right');
            } 
            
            if
            {
                //  Stand still
                player.animations.stop();

                player.frame = 0;
            }
        }
}