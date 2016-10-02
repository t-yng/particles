const init = () => {
  // ステージを作成
  const stage = new createjs.Stage('myCanvas')

  const size = 5
  let particles = []

  const createParticle = (function () {
    let count = 0

    return (size, pos) => {
      count += 1
      count %= 360

      const particle = new createjs.Shape()

      particle.graphics.beginFill(createjs.Graphics.getHSL(count, 50, 50))
      particle.graphics.drawCircle(0, 0, size)
      particle.x = pos.x
      particle.y = pos.y
      particle.vx = Math.random() * 20 - 10
      particle.vy = Math.random() * 10 - 5
      particle.compositeOperation = 'lighter'

      return particle
    }
  }())

  // 時間経過
  const handleTick = () => {
    particles = particles.concat(emmitParticles())
    updateParticles(particles)
    stage.update()
  }
  createjs.Ticker.addEventListener('tick', handleTick)

  function emmitParticles () {
    let particles = []
    for (let i = 0; i < 1; i++) {
      const pos = {x: stage.mouseX + 50, y: stage.mouseY}
      const particle = createParticle(size, pos)

      particles.push(particle)
      stage.addChild(particle)
    }

    return particles
  }

  function updateParticles (particles) {
    particles.forEach((particle, i) => {

      const scale = particle.life / PARTICLE_MAX_LIFE
      particle.scaleX = particle.scaleY = scale

      particle.vy += 1

      particle.vx *= 0.95
      particle.vy *= 0.95

      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.y > stage.canvas.height - size) {
        particle.y = stage.canvas.height - size
        particle.vy *= -1
      }
    })
  }

  stage.mouseX = stage.canvas.width / 2
  stage.mouseY = stage.canvas.height / 2
}

window.addEventListener('load', init)
