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
        this.load.image('bullet', '../../assets/images/Spear.png');
        this.load.image('profile', '../../assets/images/Icon Alive.png')
        this.load.image('profileDead', '../../assets/images/Icon Dead.png')
        this.load.image('hp', '../../assets/images/Health Bar.png')
        this.load.image('deathhp', '../../assets/images/Health Bar_Empty.png')
        this.load.audio('shoot', '../../assets/sound/435417__v-ktor__shoot02.wav')
        this.load.audio('dead', '../../assets/sound/dead.wav')
        

    }

    create() {
// BackGround
        width = this.scene.scene.physics.world.bounds.width;
        height = this.scene.scene.physics.world.bounds.height;

        x = width * 0.5;
        y = height * 0.5;

        bg = this.add.image(x, y, "bg");
        profileDead = this.add.image(50, 50, "profileDead").setDisplaySize(80, 80)
        profile = this.add.image(50, 50, "profile").setDisplaySize(80, 80)

        deathhp = this.add.image(300, 35, 'deathhp').setDisplaySize(400, 35)
        hp = this.add.image(300, 35, 'hp').setDisplaySize(400, 35)

        Phaser.Display.Align.In.Center(bg ,this.add.zone(400, 300, 800, 600))
        // Phaser.Display.Align.In.TopLeft(profile, bg)
        // Phaser.Display.Align.In.TopLeft(profileDead, bg)

// Border
        // borders = this.physics.add.staticGroup();
        // borders
        //     .create(0, 400, "border-side")
        //     .setScale(2)
        //     .refreshBody();
        // borders
        //     .create(805, 400, "border-side")
        //     .setScale(2)
        //     .refreshBody();

        // borders
        //     .create(400, 0, "border")
        //     .setScale(2)
        //     .refreshBody();
        // borders
        //     .create(400, 600, "border")
        //     .setScale(2)
        //     .refreshBody();

// 1Player
        player = this.physics.add.sprite(100, 300, "player").setDisplaySize(80, 80);
        // player.setBounce(0.2);
        player.setCollideWorldBounds(true);

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
            key: "hp dead",
            frames: [{ key: "deathhp", frame: 0 }],
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
        shoot = this.sound.add("shoot", true)
        dead = this.sound.add("dead", true)
        
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
        
        bullets = this.physics.add.group({
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
        scoreText = this.add.text(680, 16, 'Score : 0', {frontSize: '32px', fill: '#000'})
        hpText = this.add.text(100, 60, 'Hp : 100', {frontSize: '32px', fill: '#000'})
    }
    
    update() {
        if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown){
            if (cursors.left.isDown){
                    player.setVelocityX(-300)
                    // break;
                    // player.anims.play("left", true)
                    // console.log("left")
                }
                if (cursors.right.isDown){
                    player.setVelocityX(300)
                    // enemy.setVelocityX(160)
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
                shoot.play();
                player.anims.play("fire", true)
                console.log('fire')
                if (bullet){
                bullet.fire(player.x, player.y);
                }
            
            }

            if (gameOver == true){
                this.physics.pause();
                player.anims.play("dead", true)
                console.log("dead")
                bgm.stop();
                // dead.play();
                // dead.play({ loop: true });
                // dead.pause();
                hpText.setText('Hp: ' + 0)
                
                // profile.set
                
            }
            if (enemyDead == true){
                for(i=0;i++;i=1){

                    score += 100;
                }
                scoreText.setText('Score: ' + score )
            }
            profile.setAlpha((gameOver == true) ? 0 : 1);
            hp.setAlpha((gameOver == true) ? 0 : 1);
            // profileDead.setAlpha((gameOver == false) ? 1 : 0);
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
let bullet;
let logs;
let score = 0;
let frames;
let s;
let enemy;
let profile;
let profileDead;
let hp;
let deathhp;
let enemyDead = false;
let scoreText;
let hpText;
let shoot;
let dead;
let i;


// Main Function
function crashEnemy(player, enemy) {
    console.log('c1');
    enemy.disableBody(true, true)
    console.log('c2');
    player.setTint(0xff0000)
    player.anims.play("dead", true)
    gameOver = true;
    enemyDead = true;
    dead.play();
}
function attackEnemy(enemy, bullet){
    score += 100;
    scoreText.setText('Score: ' + score)
    enemy.disableBody(true, true)
}

