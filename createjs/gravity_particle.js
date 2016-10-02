window.addEventListener('load', init)

function init () {
  let particles = []
  let emitters = []
  let gravityFileds = []

  // ステージを作成
  const stage = new createjs.Stage('myCanvas')
  stage.enableMouseOver()
  stage.addEventListener('stagemousedown', e => addEmitter(stage, e.stageX, e.stageY))

  const field = new GravityField({x: 450, y: 150})
  stage.addChild(field)
  gravityFileds.push(field)

  // 描画更新時の処理を追加
  createjs.Ticker.addEventListener('tick', handleTick)

  // 描画更新処理
  function handleTick () {
    if(particles.length < 1) {
      emitters.forEach(emitter => {
        const emmitedParticles = emitter.emmitParticles()
        emmitedParticles.forEach(particle => stage.addChild(particle))
        particles = particles.concat(emmitedParticles)
      })
    }
    updateParticles(particles)
    stage.update()
  }

  function addEmitter (stage, x, y) {
    const emitter = new Emitter({x: x, y: y})
    stage.addChild(emitter)
    emitters.push(emitter)
  }

  function updateParticles (particles) {
    particles.forEach(particle => {
      if (particle.end === undefined) {
        gravityFileds.forEach(field => {
          if (isOverlap(particle, field, 60)) {
            // if ((particle.x - field.x) < 0) {
            //   particle.vx = -Math.abs(particle.vx)
            // } else {
            //   particle.vx = Math.abs(particle.vx)
            // }
            //
            // if ((particle.y - field.y) < 0) {
            //   particle.vy = -Math.abs(particle.vy)
            // } else {
            //   particle.vy = Math.abs(particle.vy)
            // }
            //
            // particle.ax = 1.05
            // particle.ay = 1.0
            // particle.end = true
          } else if (isOverlap(particle, field, 90)) {
            particle.ax = 0.95
            particle.ay = 1.5
          }
        })
      }

      if (particle.vx < 1.5) {
        if ((particle.x - field.x) < 0) {
          particle.vx = -Math.abs(particle.vx)
        } else {
          particle.vx = Math.abs(particle.vx)
        }

        if ((particle.y - field.y) < 0) {
          particle.vy = -Math.abs(particle.vy)
        } else {
          particle.vy = Math.abs(particle.vy)
        }

        particle.ax = 1.05
        particle.ay = 1.0
        particle.end = true
      }

      particle.vx *= particle.ax
      particle.vy *= particle.ay

      particle.vx = particle.vx > 10 ? 10 : particle.vx
      particle.vx = particle.vx < -10 ? -10 : particle.vx

      particle.vy = particle.vy > 3 ? 3 : particle.vy
      particle.vy = particle.vy < -3 ? -3 : particle.vy

      particle.x += particle.vx
      particle.y += particle.vy
    })
  }
}

function distance (p1, p2) {
  const a = p1.x - p2.x
  const b = p1.y - p2.y
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

function isOverlap (particle, field, dist) {
  return distance({x: particle.x, y: particle.y}, {x: field.x, y: field.y}) < dist
}
