class Platformer extends Phaser.Scene
{

    cursors;
    player;


    
    preload ()
    {
        this.load.image('blocktile', 'assets/Block.png');
        this.load.spritesheet('player', 'assets/Runcycle.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('background', 'assets/BG.png');
        this.load.image('star', 'assets/Star.png');

    }

    create()
    {

        let background_sprite = this.add.image(this.game.config.width/2,  this.game.config.height/2, "background").setOrigin(0.5,0.5)

        background_sprite.setScale(this.game.config.width/background_sprite.displayWidth, this.game.config.height/background_sprite.displayHeight);


        this.starSprite = this.physics.add.sprite(500, 100, 'star').setScale(3,3);
        this.starSprite.texture.setFilter(1);
        this.starSprite.setGravity(0);



        this.playerSprite = this.physics.add.sprite(100, 300, 'player').setScale(3,3);
        this.playerSprite.setBounce(0.0);
        this.playerSprite.setCollideWorldBounds(true)
        this.playerSprite.texture.setFilter(1);

        this.physics.world.checkCollision.up = false;
        this.physics.world.checkCollision.down = false;


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.cursors = this.input.keyboard.createCursorKeys();



    }

    update ()
    {
        const { left, right, up } = this.cursors;

        if (left.isDown)
        {
            this.playerSprite.setVelocityX(-160);

            this.playerSprite.anims.play('left', true);

        }
        else if (right.isDown)
        {
            this.playerSprite.setVelocityX(160);

            this.playerSprite.anims.play('right', true);
        }
        else
        {
            this.playerSprite.setVelocityX(0);

            this.playerSprite.anims.play('turn');
        }

        if (up.isDown && this.playerSprite.body.touching.down)
        {
            this.playerSprite.setVelocityY(-330);
        }


        
    }


    


} 


class Level1 extends Platformer
{
    constructor()
    {
        super('level1');
    }
    create()
    {
        super.create();
        let blockSprite1 = this.add.tileSprite(30, 400, 16 * 8, 16 * 2, 'blocktile')
        blockSprite1.scaleX = 3;
        blockSprite1.scaleY = 3; 
        blockSprite1.texture.setFilter(1);
        this.physics.add.existing(blockSprite1, true);


        let blockSprite2 = this.add.tileSprite(500, 300, 16 * 3, 16 * 2, 'blocktile')
        blockSprite2.scaleX = 3;
        blockSprite2.scaleY = 3; 
        blockSprite2.texture.setFilter(1);
        this.physics.add.existing(blockSprite2, true);



        this.physics.add.collider(this.playerSprite, blockSprite1);
        this.physics.add.collider(this.playerSprite, blockSprite2);
        
        this.physics.add.overlap(this.playerSprite, this.starSprite, this.collectStar, null, this);

        this.physics.add.collider(this.starSprite, blockSprite2);


    }

    collectStar (player, star)
    {
        this.scene.start('clear1');
    }
    

}

class Level2 extends Phaser.Scene
{
    constructor()
    {
        super({
            key: 'level2',
            physics: {
              default: 'arcade',
              arcade: { 
                gravity: { y: 0 }
              }
            }
              });
    }

    preload()
    {
        this.load.image('cat', 'assets/Kitty.png');       
        this.load.image('star', 'assets/Star.png');   
        this.load.image('hand', 'assets/Hand.png');    
    }
    create()
    {
        let screenSprite = this.add.image(this.game.config.width/2,  this.game.config.height/2, "cat").setOrigin(0.5,0.5)

        const hand = this.physics.add.image(0, 0, 'hand').setScale(1,1).setCollideWorldBounds(true);

        screenSprite.setScale(this.game.config.width/screenSprite.displayWidth, this.game.config.height/screenSprite.displayHeight);

        const group = this.physics.add.group();

        for (let i = 0; i < 2000; i++)
        {
            const pos = Phaser.Geom.Rectangle.Random(this.physics.world.bounds);

            const block = group.create(pos.x, pos.y, 'star');


        }


        this.input.on('pointermove', (pointer) =>
        {

            hand.setVelocity(pointer.velocity.x * 20, pointer.velocity.y * 20);
            hand.setPosition(pointer.x, pointer.y);

        });

        this.input.keyboard.on('keydown-E', event =>
        {
            
            this.scene.start('clear2');

        });

        this.physics.add.collider(hand, group);

    }


    update()
    {

    }
    
}

class Level3 extends Platformer
{
    constructor()
    {
        super('level3');
    }

    create()
    {
        super.create();
        let blockSprite1 = this.add.tileSprite(30, 400, 16 * 8, 16 * 2, 'blocktile')
        blockSprite1.scaleX = 3;
        blockSprite1.scaleY = 3; 
        blockSprite1.texture.setFilter(1);
        this.physics.add.existing(blockSprite1, true);


        let blockSprite2 = this.add.tileSprite(500, 260, 16 * 3, 16 * 2, 'blocktile')
        blockSprite2.scaleX = 3;
        blockSprite2.scaleY = 3; 
        blockSprite2.texture.setFilter(1);
        this.physics.add.existing(blockSprite2, true);


        let blockSprite3 = this.add.tileSprite(400, 350, 16 * 1, 16 * 1, 'blocktile')
        blockSprite3.scaleX = 3;
        blockSprite3.scaleY = 3; 
        blockSprite3.texture.setFilter(1);
        this.physics.add.existing(blockSprite3, true);



        let blockSpriteFall = this.add.tileSprite(300, 300, 16 * 2, 16 * 1, 'blocktile')
        blockSpriteFall.scaleX = 3;
        blockSpriteFall.scaleY = 3; 
        blockSpriteFall.texture.setFilter(1);
        this.physics.add.existing(blockSpriteFall, false);

        blockSpriteFall.body.immovable = true;
        blockSpriteFall.body.moves = false;


        this.physics.add.collider(this.playerSprite, blockSpriteFall, () =>
        {
            blockSpriteFall.body.moves = true;
            //blockSpriteFall.body.checkCollision.none = true;
        });



        this.physics.add.collider(this.playerSprite, blockSprite1);
        this.physics.add.collider(this.playerSprite, blockSprite2);
        this.physics.add.collider(this.playerSprite, blockSprite3);
        
        
        this.physics.add.overlap(this.playerSprite, this.starSprite, this.collectStar, null, this);

        this.physics.add.collider(this.starSprite, blockSprite2);


    }

    collectStar (player, star)
    {
        this.scene.start('clear3');
    }
    
    
}


class Clear1 extends Phaser.Scene
{
    constructor()
    {
        super('clear1');
    }
    preload()
    {
        this.load.image('screen1', 'assets/Screen1.png');       
    }
    create()
    {
        let screenSprite = this.add.image(this.game.config.width/2,  this.game.config.height/2, "screen1").setOrigin(0.5,0.5)

        screenSprite.setScale(this.game.config.width/screenSprite.displayWidth, this.game.config.height/screenSprite.displayHeight);

        this.time.delayedCall(5000, () => {
            this.scene.start('level2');     
        });
    }
}

class Clear2 extends Phaser.Scene
{
    constructor()
    {
        super('clear2');
    }
    preload()
    {
        this.load.image('screen2', 'assets/Screen2.png');       
    }
    create()
    {
        let screenSprite = this.add.image(this.game.config.width/2,  this.game.config.height/2, "screen2").setOrigin(0.5,0.5)

        screenSprite.setScale(this.game.config.width/screenSprite.displayWidth, this.game.config.height/screenSprite.displayHeight);

        this.time.delayedCall(5000, () => {
            this.scene.start('level3');     
        });
    }
}

class Clear3 extends Phaser.Scene
{
    constructor()
    {
        super('clear3');
    }
    preload()
    {
        this.load.image('screen3', 'assets/Screen3.png');       
    }
    create()
    {
        let screenSprite = this.add.image(this.game.config.width/2,  this.game.config.height/2, "screen3").setOrigin(0.5,0.5)

        screenSprite.setScale(this.game.config.width/screenSprite.displayWidth, this.game.config.height/screenSprite.displayHeight);

    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#0072bc',
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: true
        }
    },
    scene: [Level1, Clear1, Level2, Clear2, Level3, Clear3]
};

const game = new Phaser.Game(config);