var NombreJuego = {};

NombreJuego.Load = function(game){
    
};

NombreJuego.Load.prototype = {
    
    
    preload: function(){
            
                  
        },
    
        create: function(){
            // start the MainMenu state
            this.state.start('Game');
        }
};


// CODIGO ANTIGUO:

var NombreJuego = {};

NombreJuego.Game = function(game){
    // define width and height of the game
	NombreJuego.GAME_WIDTH = 800;
	NombreJuego.GAME_HEIGHT = 608;

    this.player = null;
    this.playerVel = 100;
    this.platforms = null;
    this.guardia = null;
    
};

NombreJuego.Game.prototype = {

    preload: function () {

        // pagina sprites: http://untamed.wild-refuge.net/rmxpresources.php?characters
        
        this.sprites = {

            "images":[
                {
                    "id":"sky",
                    "path":"assets/sky.png"
                },
                {
                    "id":"ground",
                    "path":"assets/platform.png"
                },
            ],
            
            "spritesheet": [
                {
                    "id":"jail",
                    "path":"assets/jael.png",
                    "width": 32,
                    "height": 48,
                },
                {
                    "id":"guardia",
                    "path":"assets/guardia.png",
                    "width": 32,
                    "height": 48,
                },
            ]
            
        }
        
        for(imageItem of this.sprites.images){
            this.load.image(imageItem.id, imageItem.path);
            
        }
    
        for(imageItem of this.sprites.spritesheet){
            this.load.spritesheet(imageItem.id, imageItem.path,imageItem.width, imageItem.height);
            
        }
            
        this.load.audio('musicote', ['assets/Mordidita.mp3']);

    },

    create: function () {

        var text = "Salva al guardia bajandole \n de la plataforma!!!";
        var style = { font: "40px Arial", fill: "#42672f", align: "center" };
        var music = this.add.audio('musicote');
        
        // BORDE DEL MAPA
        this.world.setBounds(0, 0, 1216, 608);

        //music.play();

        //  We're going to be using physics, so enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 0;
        
        //  A simple background for our game
        this.add.sprite(0, 0, 'sky');

        // Se añade el texto despues del fondo
        var t = this.add.text(100, 20, text, style);

        
        
        
        
        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.add.group();

        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        // Here we create the ground.
        var ground = this.platforms.create(0, this.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        var ledge = this.platforms.create(400, 400, 'ground');

        ledge.body.immovable = true;

        ledge = this.platforms.create(-150, 250, 'ground');

        ledge.body.immovable = true;

        // cursores
        this.cursors = this.input.keyboard.createCursorKeys();


        // The player and its settings
        this.player = this.add.sprite(32, this.world.height - 150, 'jail');
        this.camera.follow(this.player);
        //  We need to enable physics on the player
        this.physics.arcade.enable(this.player);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0;
        this.player.body.allowGravity = false;
        this.player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        this.player.animations.add('left', [4,5, 6, 7], 4, true);
        this.player.animations.add('right', [8,9,10,11], 4, true);
        this.player.animations.add('up', [12,13,14,15], 4, true);
        this.player.animations.add('down', [1,2,3, 0], 4, true);

        // The player and its settings
        this.guardia = this.add.sprite(700, this.world.height - 450, 'guardia');

        //  We need to enable physics on the player
        this.physics.arcade.enable(this.guardia);

        //  Player physics properties. Give the little guy a slight bounce.
        this.guardia.body.bounce.y = 0.8;
        this.guardia.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        this.guardia.animations.add('leftG', [4,5, 6, 7], 4, true);
        this.guardia.animations.add('rightG', [8,9,10,11], 4, true);

    },

    update: function() {

        //  Collide the player and the stars with the platforms
        this.physics.arcade.collide(this.player, this.objects);
        this.physics.arcade.collide(this.guardia, this.objects);
        
        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown)
        {
            if (this.cursors.left.isDown){
                //  Moverse hacia arriba y a la izquierda
                this.player.body.velocity.x = -this.playerVel;
                this.player.body.velocity.y = -this.playerVel;
                this.player.animations.play('left');
                
            }
            else if (this.cursors.right.isDown) 
            {
                //  Moverse hacia arriba y a la derecha
                this.player.body.velocity.x = this.playerVel;
                this.player.body.velocity.y = -this.playerVel;
                this.player.animations.play('right');
            }
            else
            {
                // Moverse solo hacia arriba
                this.player.animations.play('up');
                this.player.body.velocity.y = -this.playerVel;
                this.player.body.velocity.x = 0;
            }

        }
        else if(this.cursors.down.isDown )
        {
            if (this.cursors.left.isDown){
                //  Moverse abajo y a la izquierda
                this.player.body.velocity.x = -this.playerVel;
                this.player.body.velocity.y = this.playerVel;
                this.player.animations.play('left');
                
            }
            else if (this.cursors.right.isDown) 
            {
                //  Moverse abajo y a la derecha
                this.player.body.velocity.x = this.playerVel;
                this.player.body.velocity.y = this.playerVel;
                this.player.animations.play('right');
            }
            else
            {
                // Moverse solo hacia abajo
                this.player.animations.play('down');
                this.player.body.velocity.y = this.playerVel;
                this.player.body.velocity.x = 0;
            }

        }
        else if (this.cursors.left.isDown)
        {
            
            //  Moverse solo a la izquierda
            this.player.body.velocity.x = -this.playerVel;
            this.player.body.velocity.y = 0;
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) 
        {
            //  Moverse solo a la derecha
            this.player.body.velocity.x = this.playerVel;
            this.player.body.velocity.y = 0;
            this.player.animations.play('right');
        }
        else
        {
            //  Parar al jugador
            this.player.animations.stop();
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.player.frame = 0;

            
            
            
            
            //  Stand still
            this.guardia.animations.stop();
            this.guardia.body.velocity.x = 0;
            this.guardia.body.velocity.y = 0;
            this.guardia.frame = 0;
        }
    }
}


this.sprites = {

            "images":[
                {
                    "id":"mapaLv1",
                    "path":"assets/mapaLv1.png",
                    "posX": 0,
                    "posY": 0,
                },
                {
                    "id":"water",
                    "path":"assets/water.png",
                    "posX": 0,
                    "posY": 416,
                },
                {
                    "id":"table",
                    "path":"assets/table.png",
                    "posX": 128,
                    "posY": 128,
                },
                {
                    "id":"blueHouse",
                    "path":"assets/blueHouse.png",
                    "posX": 544,
                    "posY": 160,
                },
            ],
            
            "spritesheet": [
                {
                    "id":"jail",
                    "path":"assets/jael.png",
                    "width": 32,
                    "height": 48,
                },
                {
                    "id":"guardia",
                    "path":"assets/guardia.png",
                    "width": 32,
                    "height": 48,
                },
            ]
            
        }