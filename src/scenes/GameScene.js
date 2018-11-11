import { ENGINE_METHOD_PKEY_METHS } from "constants";


let width;
let height;
let x;
let y;
let enemies;
let boss;
let blast;
let player;
let scoreText;
let blasts;
let gameover = false;
let cursors;
let score;
let bullets;
let spacebar;
let enemy;




class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.spritesheet('enemy', '../../images/2250_Dinosaur Spritesheet.png', { frameWidth: 105, frameHeight: 105 });
        this.load.spritesheet('enemies', '../../images/Dinosaur idle.png', { frameWidth: 250, frameHeight: 150 });
        this.load.image('bg', '../../images/BackGround.jpg');
        this.load.image('blast', '../../images/Attack.png');
        this.load.spritesheet('boss', '../../images/Dinosaur_Boss Spritesheet.png', { frameWidth: 250, frameHeight: 200 });
        this.load.image('bossblast', '../../images/Laser Beam.png');
        this.load.spritesheet('bossstay', '../../images/Dinosaur_Boss idle.png', { frameWidth: 250, frameHeight: 200 });
        this.load.spritesheet('bossattack', '../../images/Dinosaur_Boss Attack.png', { frameWidth: 250, frameHeight: 200 });
        this.load.spritesheet('bosscooldown', '../../images/Dinosaur Cooldown2.png', { frameWidth: 250, frameHeight: 200 });
        this.load.spritesheet('bosscharge', '../../images/Dinosaur Cooldown1.png', { frameWidth: 200, frameHeight: 300 });
        this.load.spritesheet('bossdead', '../../images/Dinosaur_Boss Dead.png', { frameWidth: 250, frameHeight: 200 });
        this.load.image('player', '../../images/Cat1 idle.png');
        this.load.image('attack', '../../images/Attack.png');

    }

    create() {
        //Background
        width = this.scene.scene.physics.world.bounds.width;
        height = this.scene.scene.physics.world.bounds.height;
        x = width * 0.5;
        y = height * 0.5;

        this.add.image(x, y, 'bg');




        this.enemies = this.physics.add.group({
            key: 'enemies',
            repeat: 2,
            setXY: {
                x: 250,
                y: 200,
                stepX: 150,

            }
        });
        Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

        this.enemies = this.physics.add.group({
            key: 'enemies',
            repeat: 2,
            setXY: {
                x: 250,
                y: 350,
                stepX: 150,

            }
        });
        Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

        this.enemies = this.physics.add.group({
            key: 'enemies',
            repeat: 2,
            setXY: {
                x: 250,
                y: 500,
                stepX: 150,

            }
        });
        Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

        this.boss = this.physics.add.group({
            key: 'bosscharge',
            repeat: 1,
            setXY: {
                x: 700,
                y: 275,
                stepY: 150,

            }
        });
        Phaser.Actions.ScaleXY(this.boss.getChildren(), -0.3, -0.3);



        scoreText = this.add.text(16, 16, 'Score : 0', { fontSize: '32px', fill: '#000' });

        player = this.physics.add.image(100, 400, 'player');
        player.setCollideWorldBounds(true);


        blasts = this.physics.add.group();
        this.physics.add.collider(player, blasts, over);




        cursors = this.input.keyboard.createCursorKeys();

        console.log('player')
        var Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Image,

            initialize:

                function Bullet(scene) {
                    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'attack');

                    this.speed = Phaser.Math.GetSpeed(600, 1);
                },

            fire: function (x, y) {
                this.setPosition(x, y);

                this.setActive(true);
                this.setVisible(true);
            },

            update: function (time, delta) {
                this.x += this.speed * delta;

                if (this.x > 820) {
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

        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.physics.add.collider(player, boss, over);
        this.physics.add.collider(player, enemies, over);
        this.physics.add.overlap(bullets, boss, hitsboss);
        this.physics.add.overlap(bullets, enemies, hits);

    }
    update() {

        if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown) {
            if (cursors.left.isDown) {
                player.setVelocityX(-300)
                // player.anims.play("left", true)
                // console.log("left")
            }
            if (cursors.right.isDown) {
                player.setVelocityX(300)
                // player.anims.play("right", true)
            }
            if (cursors.up.isDown) {
                player.setVelocityY(-300)
                // player.anims.play("up", true)
            }
            if (cursors.down.isDown) {
                player.setVelocityY(300)
                // player.anims.play("down", true)
            }
        } else {
            player.setVelocityX(0);
            player.setVelocityY(0);
        }

        if (Phaser.Input.Keyboard.JustDown(spacebar)) {
            var bullet = bullets.get();
            //player.anims.play("fire", true)
            if (bullet) {
                bullet.fire(player.x, player.y);
            }

        }


        if (gameover == true) {
            this.physics.pause();
        }

    }


}

export default GameScene;


function hitsboss(player, boss, bullets) {

    score += 200;
    scoreText.setText('Score: ' + score);
    boss.disableBody(true, true);
    bullets.disableBody(true, true);


    if (boss.countActive(true) === 0) {
        boss.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
    }

    let blastx = (player.x < x) ? Phaser.Math.Between(x, width) : Phaser.Math.Between(0, x);
    blast = blasts.create(blastx, 16, 'bossblast');

    blast.setBounce(1);
    blast.setCollideWorldBounds(true);
    blast.setVelocity(Phaser.Math.Between(-200, 200), 20);
    blast.allowGravity = false;

}
function hits(player, enemies, bullets) {

    score += 100;
    scoreText.setText('Score: ' + score);
    enemies.disableBody(true, true);
    bullets.disableBody(true, true);


    if (enemies.countActive(true) === 0) {
        enemies.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
    }

    let blastx = (player.x < x) ? Phaser.Math.Between(x, width) : Phaser.Math.Between(0, x);
    blast = blasts.create(blastx, 16, 'bossblast');

    blast.setBounce(1);
    blast.setCollideWorldBounds(true);
    blast.setVelocity(Phaser.Math.Between(-200, 200), 20);
    blast.allowGravity = false;

}

function over(player, enemies, boss) {
    player.setTint(0x000000);

    gameover = true;
}