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
                    "id":"groundLv0",
                    "path":"assets/groundLv0.png",
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
        
        for(imageItem of this.sprites.images){
            this.load.image(imageItem.id, imageItem.path);
            
        }
    
        for(imageItem of this.sprites.spritesheet){
            this.load.spritesheet(imageItem.id, imageItem.path,imageItem.width, imageItem.height);
            
        }
    },

    create: function () {
        
        // BORDE DEL MAPA
        this.world.setBounds(0, 0, 1216, 608);

        //  We're going to be using physics, so enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 0;
        
        this.objects = this.add.group();
        this.objects.enableBody = true;
        var objects= [];
        
        // Se añaden los sprites de entorno
        for(imageItem of this.sprites.images){
            objects[imageItem.id] = this.objects.create(imageItem.posX, imageItem.posY, imageItem.id);
            objects[imageItem.id].body.immovable = true;
        }
        
        // cursores
        this.cursors = this.input.keyboard.createCursorKeys();

        // The player and its settings
        this.player = this.add.sprite(32, 256, 'jail');
        this.camera.follow(this.player);
        
        //  We need to enable physics on the player
        this.physics.arcade.enable(this.player);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.anchor.set(0.5);
        
        this.player.body.bounce.y = 0;
        this.player.body.allowGravity = false;
        this.player.body.collideWorldBounds = true;
        
        // Para que parezca 3d
        this.player.body.setSize(20, 16, 0, 16);

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
        this.guardia.body.bounce.y = 0;
        this.guardia.body.collideWorldBounds = true;

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
        }
    }
}