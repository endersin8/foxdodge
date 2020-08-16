import 'phaser';

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('BgScene');
    this.dayrise = true
    this.dayset = false
    this.nightrise = false
    this.nightfall = false
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITE HERE >>
    this.load.image('fullbg', 'assets/backgrounds/background_glacial_mountains_lightened.png')
    this.load.image('sky', 'assets/backgrounds/sky.png')
    this.load.image('mountains', 'assets/backgrounds/glacial_mountains.png')
    this.load.image('mainClouds', 'assets/backgrounds/clouds_bg.png')
    this.load.image('lonelyCloud', 'assets/backgrounds/cloud_lonely.png')
    this.load.image('lowerCloud1', 'assets/backgrounds/clouds_mg_1.png')
    this.load.image('lowerCloud2', 'assets/backgrounds/clouds_mg_2.png')
    this.load.image('lowerCloud3', 'assets/backgrounds/clouds_mg_3.png')
    this.load.image('sun', 'assets/backgrounds/sun.png')
    this.load.image('moon', 'assets/backgrounds/moon.png')
    this.load.spritesheet('snowflakes', 'assets/sprites/snowflakes.png',{
      frameWidth: 17,
      frameHeight: 17
    })
  }

  create() {
    // Create Sprites
    console.log(this)
    this.sky = this.add.tileSprite(0,0,this.game.config.width, this.game.config.height,'sky').setOrigin(0, 0).setScrollFactor(0).setScale(3.4)
    this.sunSprite = this.add.sprite(100,400, 'sun')
    this.moonSprite = this.add.sprite(800, 400, 'moon')
    this.lonelycloud = this.add.tileSprite(0,0,this.game.config.width, this.game.config.height,'lonelyCloud').setOrigin(0, 0).setScrollFactor(0).setScale(3.4)
    this.clouds = this.add.tileSprite(0,0,this.game.config.width, this.game.config.height,'mainClouds').setOrigin(0, 0).setScrollFactor(0).setScale(3.4)

    this.mountains = this.add.tileSprite(0,0,this.game.config.width, this.game.config.height,'mountains').setOrigin(0, 0).setScrollFactor(0).setScale(3.4)
    this.lowerCloud3 = this.add.tileSprite(0,0,this.game.config.width, this.game.config.height,'lowerCloud3').setOrigin(0, 0).setScrollFactor(0).setScale(3.4)
    this.lowerCloud2 = this.add.tileSprite(0,0,this.game.config.width, this.game.config.height,'lowerCloud2').setOrigin(0, 0).setScrollFactor(0).setScale(3.4)
    this.lowerCloud1 = this.add.tileSprite(0,0,this.game.config.width, this.game.config.height,'lowerCloud1').setOrigin(0, 0).setScrollFactor(0).setScale(3.4)

    this.snow = this.add.particles('snowflakes')
    this.emitter1 = this.snow.createEmitter()
    this.emitter2 = this.snow.createEmitter()
    this.emitter3 = this.snow.createEmitter()
    this.emitter1.setPosition(540,-50)
    this.emitter1.setSpeed(100)
    this.emitter1.setLifespan(10000)
    this.emitter2.setPosition(100,-50)
    this.emitter2.setSpeed(100)
    this.emitter2.setLifespan(10000)
    this.emitter3.setPosition(700,-50)
    this.emitter3.setSpeed(100)
    this.emitter3.setLifespan(10000)

;
  }
  update() {
    this.mountains.tilePositionX -= 0.01
    this.clouds.tilePositionX -= 0.2
    this.lonelycloud.tilePositionX -= -0.1
    this.lowerCloud1.tilePositionX -= 0.2
    this.lowerCloud2.tilePositionX -= 0.1
    if (this.dayrise) {
      this.sunSprite.y -= 0.5
      if(this.sunSprite.y <= 50) {
        this.dayrise = false
        this.dayset = true
      }
    }
    if (this.dayset) {
      this.sunSprite.y += 0.5
      if (this.sunSprite.y >= 400) {
        this.nightrise = true
        this.dayset = false
      }
    }
    if (this.nightrise) {
      this.moonSprite.y -= 0.5
      if(this.moonSprite.y <=50) {
        this.nightrise = false
        this.nightfall = true
      }
    }
    if (this.nightfall) {
      this.moonSprite.y += 0.5
      if (this.moonSprite.y >= 400) {
        this.nightfall = false
        this.dayrise = true
      }
    }
  }
}
