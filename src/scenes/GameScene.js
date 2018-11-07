class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameScene"
        });
    }
    
    preload() {
        this.load.image("bg", "../../assets/images/sky.png");
        this.load.spritesheet("player", "../../assets/images/beaver-Sheet.png",
        {
            frameWidth: 68,
            frameHeight: 68
        });
        this.load.audio("bgm", "../../assets/sound/bgm.mp3")
        
    }
    
    create() {
        width = this.scene.scene.physics.world.bounds.width;
        height = this.scene.scene.physcis.world.bounds.height;
        this.add.image(800, 600, "bg");
        
        
    }
    
    update() {
        
    }
}

export default GameScene;

let width = this.scene.scene.physics.world.bounds.width;
let height = this.scene.scene.physcis.world.bounds.height;
let x;
let y;
let bg;
let bgm;