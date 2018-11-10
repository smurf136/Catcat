// let width;
// let height;
// let x;
// let y;
// let border;

// class GameScene extends Phaser.GameScene {
//     constructor(test) {
//         super({
//             key: "GameScene"
//         })
//     }
//     preload(){
//         this.load.image("bg", "../assets/images/sky.png")
//         this.load.image("border", "../assets/images/platform.png")
//         this.load.spritesheet("beaver", "../assets/images/beaver-Sheet.png",
//         {
//             frameWidth: 68,
//             frameHeight: 68
//         })

//     }
    
//     create(){
//         // BackGround
//         widht = this.scene.scene.physics.world.bounds.width;
//         height = this.scene.scene.physics.world.bounds.height;

//         x = width * 0.5;
//         y = height * 0.5;

//         this.add.image(x, y, "bg")

//         // Border
//         // border = this.physics.add.staticGroup();
//         // border.create(600, 400, "border")
//     }

//     update(){

//     }
// }

