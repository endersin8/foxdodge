import 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey)
    this.scene = scene
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)
    this.facingLeft = false
    this.jumpCounter = 0
  }
  updateMovement(cursors) {
    // Move left
    if (cursors.left.isDown) {
      if(!this.facingLeft) {
        this.flipX = !this.flipX
        this.facingLeft = true
      }
      this.setVelocityX(-360);
      if (this.body.touching.down) {
        this.play('run', true)
      }
    }
    // Move right
    else if (cursors.right.isDown) {
      if(this.facingLeft) {
        this.flipX = !this.flipX
        this.facingLeft = false
      }
      this.setVelocityX(360);
      if(this.body.touching.down) {
        this.play('run', true)
      }
    }
    // Neutral (no movement)
    else {
      this.play('idle', true)
      this.setVelocityX(0);

    }
  }
  updateAttack(cursors) {
    if (cursors.space.isDown) {
      this.play('attack', true)
    }
  }
  updateJump(cursors) {
    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-500)
    }
  }
  updateInAir() {
    if (!this.body.touching.down) {
      this.play('jump', true)
    }
  }
  update(cursors) {
    this.updateJump(cursors)
    this.updateMovement(cursors)
    this.updateInAir()
    this.updateAttack(cursors)
  }
}
