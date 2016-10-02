class Emitter extends createjs.Shape {
  constructor (pos) {
    super()
    this.graphics.beginFill('red')
    this.graphics.drawCircle(0, 0, this.EMITTER_SIZE())
    this.x = pos.x
    this.y = pos.y
  }

  EMITTER_SIZE () {
    return 10
  }

  PARTICEL_SIZE () {
    return 2
  }

  emmitParticles () {
    let particles = []
    for (let i = 0; i < 20; i++) {
      const pos = {x: this.x, y: this.y}
      const particle = this.createParticle(this.PARTICEL_SIZE(), pos)

      particles.push(particle)
    }

    return particles
  }

  createParticle (size, pos) {
    const particle = new createjs.Shape()

    particle.graphics.beginFill('blue')
    particle.graphics.drawCircle(0, 0, size)
    particle.x = pos.x
    particle.y = pos.y
    particle.vx = 5
    particle.vy = Math.random() * 1 - 0.5
    particle.ax = 1.0
    particle.ay = 1.0
    particle.compositeOperation = 'lighter'

    return particle
  }

}
