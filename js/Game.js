var NombreJuego = {};

NombreJuego.Game = function(game){
    // define width and height of the game
	NombreJuego.GAME_WIDTH = 1944;
	NombreJuego.GAME_HEIGHT = 1440;

    this.player = null;
    this.playerVel = 100;
    this.platforms = null;
    this.guardia = null;
    
};

NombreJuego.Game.prototype = {

    preload: function () {

        // pagina sprites: http://untamed.wild-refuge.net/rmxpresources.php?characters
        
        this.sprites = {
            "jugador":
            {
                "id":"jail",
                "path":"assets/jael.png",
                "width": 32,
                "height": 48,
                "posX": 7,
                "posY": 35,
            },
            "imagenNivel":
            {
                "id":"CiudadNatal",
                "path":"assets/CiudadNatal.png",
                "posX": 0,
                "posY": 0,
            },
            "images":[
                {
                    "id":"table",
                    "path":"assets/table.png",
                    "posX": 0,
                    "posY": 0,
                },
            ],
            
            "spritesheet": [
                {
                    "id":"guardia",
                    "path":"assets/guardia.png",
                    "width": 32,
                    "height": 48,
                    "posX": 8,
                    "posY": 46,
                },
            ]
            
        }
        
        this.load.spritesheet(this.sprites.jugador.id, this.sprites.jugador.path,this.sprites.jugador.width, this.sprites.jugador.height);
        
        this.load.image(this.sprites.imagenNivel.id, this.sprites.imagenNivel.path);
        
        for(imageItem of this.sprites.images){
            this.load.image(imageItem.id, imageItem.path);
        }
        
        this.personajes = this.add.group();
        this.personajes.enableBody = true;
        var personajes= [];
    
        //for(imageItem of this.sprites.spritesheet){
        //    this.load.spritesheet(imageItem.id, imageItem.path,imageItem.width, imageItem.height);
        //}
        
    },

    create: function () {
        
        // BORDE DEL MAPA
        this.world.setBounds(0, 0, 1944, 1440);

        //  We're going to be using physics, so enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 0;
    
        // cursores
        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.sprite(this.sprites.imagenNivel.posX, this.sprites.imagenNivel.posY, this.sprites.imagenNivel.id);
        
        this.objects = this.add.group();
        this.objects.enableBody = true;
        var objects= [];
        
        for(imageItem of this.sprites.images){
            
            objects[imageItem.id] = this.objects.create(imageItem.posX*32, imageItem.posY*32, imageItem.id);
            objects[imageItem.id].body.immovable = true; 
        }
        
        // The player and its settings
        this.player = this.add.sprite(this.sprites.jugador.posX*32, this.sprites.jugador.posY*32, this.sprites.jugador.id);
        this.player.scale.setTo(0.8);
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
        
    },

    update: function() {

        //  Collide the player and the stars with the platforms
        this.physics.arcade.collide(this.player, this.objects);
        
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