class GravityField extends createjs.Shape {
  constructor (pos) {
    super()
    this.graphics.beginFill('green')
    this.graphics.drawCircle(0, 0, this.CORE_SEIZE())
    this.x = pos.x
    this.y = pos.y
  }

  GRAVITY_FIELD_SIZE () {
    return 20
  }

  CORE_SEIZE () {
    return 10
  }
}
