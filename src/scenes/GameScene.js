class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameScene"
        });
    }
    preload() {
        this.load.image("bg", "../../assets/images/Background.jpg");
        this.load.image("border", "../../assets/images/platform.png");
        this.load.image("log", "../../assets/images/log.png");
        this.load.image("border-side", "../../assets/images/side.png");
        this.load.spritesheet(
            "player",
            "../../assets/images/Cat1 Spear.png",
            {
                frameWidth: 105,
                frameHeight: 105
            }
        );
        this.load.spritesheet(
            "playerdead",
            "../../assets/images/Cat1 Dead.png",
            {
                frameWidth: 105,
                frameHeight: 105
            }
        );
        this.load.spritesheet(
            "playerattack",
            "../../assets/images/Cat1 Attack.png",
            {
                frameWidth: 105,
                frameHeight: 105
            }
        );
        this.load.spritesheet(
            "enemy",
            "../../assets/images/enemy.png",
            {
                frameWidth: 250,
                frameHeight: 150
            }
        );
        this.load.audio("bgm", "../../assets/sound/bgm.mp3")
        this.load.image('bullet', '../../assets/images/Attack.png');

    }

    create() {
// BackGround
        width = this.scene.scene.physics.world.bounds.width;
        height = this.scene.scene.physics.world.bounds.height;

        x = width * 0.5;
        y = height * 0.5;

        this.add.image(x, y, "bg");

// Border
        borders = this.physics.add.staticGroup();
        borders
            .create(0, 400, "border-side")
            .setScale(2)
            .refreshBody();
        borders
            .create(805, 400, "border-side")
            .setScale(2)
            .refreshBody();

        borders
            .create(400, 0, "border")
            .setScale(2)
            .refreshBody();
        borders
            .create(400, 600, "border")
            .setScale(2)
            .refreshBody();

// 1Player
        player = this.physics.add.sprite(100, 300, "player");
        // player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        // just test crash border
        // player.body.setGravityY(100);
        // player.body.setGravityX(100);

    // Animation
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "down",
            frames: [{ key: "player", frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: "fire",
            frames: [{ key: "playerattack", frame: 4 }],
            frameRate: 1,
            repeat: 1
        });
        this.anims.create({
            key: "turn",
            frames: [{ key: "player", frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: "dead",
            frames: [{ key: "playerdead", frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: 1
        });
        // this.anims.create({
        //     key: "fire",
        //     frames: this.anims.generateFrameNumbers("playerattack", {
        //         start: 1,
        //         end: 2
        //     }),
        //     frameRate: 10,
        //     repeat: 1
        // });

        // Enemy
        enemy = this.physics.add.sprite(600, 300, "enemy");
        
        // Sound
        bgm = this.sound.add("bgm", true);
        bgm.play({ loop: true });
        // Fire
        console.log("fire")
        var Bullet = new Phaser.Class({
            
            Extends: Phaser.GameObjects.Image,
            
            initialize:
            
            function Bullet (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
                
                this.speed = Phaser.Math.GetSpeed(600, 1);
            },
            
            fire: function (x, y)
            {
                this.setPosition(x, y);
                
                this.setActive(true);
                this.setVisible(true);
            },
            
            update: function (time, delta)
            {
                this.x += this.speed * delta;
                
                if (this.x > 820)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
            
        });
        
        bullets = this.add.group({
            classType: Bullet,
            maxSize: 30,
            runChildUpdate: true
        });
        
        // bullets = this.physics.add.group({
        //     key: "bullet",
        //     repeat: 11,
        //     setXY: { x: 12, y: 0, stepX: 70 }
        // });
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        
        // Physic
                // this.physics.add.collider(player, borders);
                this.physics.add.collider(player, enemy,crashEnemy)
                this.physics.add.collider(bullets, enemy,attackEnemy)
                
        // Other
        
        cursors = this.input.keyboard.createCursorKeys();
        // this.physics.add.overlap(bullets, enemy, attackEnemy);
        // this.createLogs();
        // this.sys.install
    }
    
    update() {
        if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown){
            if (cursors.left.isDown){
                    player.setVelocityX(-300)
                    // player.anims.play("left", true)
                    // console.log("left")
                }
                if (cursors.right.isDown){
                    player.setVelocityX(300)
                    // player.anims.play("right", true)
                }
                if(cursors.up.isDown){
                    player.setVelocityY(-300)
                    // player.anims.play("up", true)
                }
                if(cursors.down.isDown){
                    player.setVelocityY(300)
                    // player.anims.play("down", true)
                }
            } else {
                player.anims.play('turn', true)
                player.setVelocityX(0);
                player.setVelocityY(0);
            }

            if (Phaser.Input.Keyboard.JustDown(spacebar)){
                var bullet = bullets.get();
                player.anims.play("fire", true)
                if (bullet){
                bullet.fire(player.x, player.y);
                }
            
            }

            if (gameOver == true){
                this.physics.pause();
                player.anims.play("dead", true)
            }
    }
}

export default GameScene;
// Variable
let width;
let height;
let x;
let y;
let borders;
let bg;
let border;
let player;
let cursors;
// let create;
let bgm;
let gameOver = false;
let spacebar;
let bullets;
let bulle;
let logs;
let score = 0;
let frames;
let s;
let enemy;

// Main Function
function crashEnemy(player, enemy) {
    enemy.disableBody(true, true)
    player.setTint(0xff0000)
    player.anims.play("dead", true)
    gameOver = true;
}
function attackEnemy(bulle, enemy){
    score += 100;
    enemy.disableBody(true, true)
    // scoreText.setText('Score: ' + score)
}

function createLogs ()
{
    frames = this.textures.get('log').getFrameNames();

    for (var i = 0; i < 5; i++)
    {
        x = Phaser.Math.Between(0, 800);
        y = Phaser.Math.Between(0, 600);
        s = Phaser.Math.FloatBetween(0.5, 1);

        this.add.image(x, y, 'log', Phaser.Math.RND.pick(frames));
    }
}