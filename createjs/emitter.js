class Emitter extends createjs.Shape {
  constructor (pos) {
    super()
    this.graphics.beginFill('red')
    this.graphics.drawCircle(0, 0, this.EMITTER_SIZE())
    this.x = pos.x
    this.y = pos.y
    this.particleCount = this.DEFAULT_PARTICLE_COUNT()
    this.cursor = 'pointer'

    this.addEventListener('pressmove', event => {
      this.x = event.stageX
      this.y = event.stageY
    })
  }

  EMITTER_SIZE () {
    return 10
  }

  PARTICEL_SIZE () {
    return 3
  }

  DEFAULT_PARTICLE_COUNT () {
    return 3
  }

  emmitParticles () {
    let particles = []
    for (let i = 0; i < this.particleCount; i++) {
      const pos = {x: this.x, y: this.y}
      const particle = this.createParticle(this.PARTICEL_SIZE(), pos)

      particles.push(particle)
    }

    return particles
  }

  createParticle (size, pos) {
    const particle = new createjs.Shape()

    // particle.graphics.beginFill(createjs.Graphics.getHSL(this.counter++, 50, 50))
    particle.graphics.beginFill('blue')
    particle.graphics.drawCircle(0, 0, size)
    particle.x = pos.x
    particle.y = pos.y
    particle.vx = 5
    particle.vy = Math.random() * 1 - 0.5
    particle.compositeOperation = 'lighter'

    return particle
  }

}
