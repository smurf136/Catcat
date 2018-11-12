class MainMenu extends Phaser.Scene {
    constructor(test){
        super({ key: 'MainMenu'});
    }
    preload(){
        this.load.image("bg1","../../assets/images/Main menu.jpg")
    }
    create(){   
        width = this.scene.scene.physics.world.bounds.width;
        height = this.scene.scene.physics.world.bounds.height;

        x = width * 0.5;
        y = height * 0.5;

        bg = this.add.image(x, y, 'bg1')
        cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        if (cursors.space.isDown) {
            this.scene.start('GameScene')
            bg.setAlpha(0)

        }
    }
}

export default MainMenu;

let width;
let height;
let x;
let y;
let bg;
let cursors;