import 'phaser';
import Enemy from '../entity/Enemy'
import BigGround from '../entity/BigGround'
import Player from '../entity/Player'
export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
    this.score = 0
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITE HERE >>
    this.load.image('bigGround', 'assets/sprites/platform-long.png')
    this.load.spritesheet('player', 'assets/spriteSheets/adventurer-v1.5-Sheet.png', {
      frameWidth: 50,
      frameHeight: 37
    })
    this.load.spritesheet('enemy', 'assets/spriteSheets/player-idle.png', {
      frameWidth:32,
      frameHeight: 32
    })

  }

  createBigGround(x, y) {
    this.bigGroundGroup.create(x, y, 'bigGround').setScale(5).refreshBody()
  }

  createAnimations() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', {start: 0, end: 3}),
      frameRate: 5,
      repeat: -1
    })
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {start:8, end:13}),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('player', {start: 14, end: 22}),
      frameRate: 25,
      repeat: -1
    })
    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('player', {start:50,end:58}),
      frameRate: 30,
      repeat:-1
    })
  }

  create() {
    // Create Sprites
    this.bigGroundGroup = this.physics.add.staticGroup({classType: BigGround})
    this.player = new Player(this, 120, 400, 'player').setScale(2)
    this.player.setSize(15, 32)
    this.cursors = this.input.keyboard.createCursorKeys()
    this.createAnimations()
    this.createBigGround(240, 680)
    this.createBigGround(80, 680)
    this.createBigGround(400,680)
    this.createBigGround(560,680)
    this.createBigGround(720,680)
    this.createBigGround(880,680)
    console.log(this.player)
    this.enemy = new Enemy(this, 900, 400, 'enemy').setScale(2).refreshBody().setGravityX(-20)
    this.enemy.setSize(15,32)

    // << CREATE SPRITE HERE >>
    // this.cameras.main.y = 200
    // this.cameras.main.startFollow(this.player)
    this.physics.add.collider(this.player, this.bigGroundGroup)
    this.physics.add.collider(this.enemy, this.bigGroundGroup)
    this.physics.add.collider(this.enemy, this.player, (enemy, player) => {
      enemy.destroy()
      window.alert(`GAME OVER NOOB! Score: ${this.score}, REFRESH PAGE TO RESTART or just look at the snow`)})
  }
  update(time, delta) {
    this.player.update(this.cursors)
    if(this.enemy.x < 0) {
      this.enemy.x = 900
    }
    this.score += 1
  }
}
