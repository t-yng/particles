window.addEventListener('load', init)

function init () {
  let particles = []
  let emitters = []
  let gravityFileds = []

  // ステージを作成
  const stage = new createjs.Stage('myCanvas')
  stage.enableMouseOver()
  addEmitter(stage, 100, 150)
  // stage.addEventListener('stagemousedown', e => addEmitter(stage, e.stageX, e.stageY))

  stage.canvas.width = window.innerWidth
  stage.canvas.height = window.innerHeight

  const field = new GravityField({x: 450, y: 150})
  stage.addChild(field)
  gravityFileds.push(field)

  const field1 = new GravityField({x: 250, y: 400})
  stage.addChild(field1)
  gravityFileds.push(field1)

  // 描画更新時の処理を追加
  createjs.Ticker.addEventListener('tick', handleTick)

  // 描画更新処理
  function handleTick () {
    emitters.forEach(emitter => {
      const emmitedParticles = emitter.emmitParticles()
      emmitedParticles.forEach(particle => stage.addChild(particle))
      particles = particles.concat(emmitedParticles)
    })
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
          // 強さは距離とランダムの調整パラメータの合計で決定
          if (isOverlap(particle, field, 100)) {
            const dist = distance({x: particle.x, y: particle.y}, {x: field.x, y: field.y})
            particle.vx += (particle.x - field.x) * ((Math.random() * 0.25 + 0.25) / dist)
            particle.vy += (particle.y - field.y) * ((Math.random() * 0.25 + 0.25) / dist)
          }
        })
      }

      particle.vx = particle.vx > 5 ? 5 : particle.vx
      particle.vx = particle.vx < -5 ? -5 : particle.vx

      particle.vy = particle.vy > 5 ? 5 : particle.vy
      particle.vy = particle.vy < -5 ? -5 : particle.vy

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
