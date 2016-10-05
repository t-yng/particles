class ParticleStage extends createjs.Stage{

  constructor (canvas) {
    super(canvas)
    this.particles = []
    this.emitters = []
    this.gravityFields = []
  }

  addEmitter (emitter) {
    this.addChild(emitter)
    this.emitters.push(emitter)
  }

  addGravityField (gravityField) {
    this.addChild(gravityField)
    this.gravityFields.push(gravityField)
  }

  update () {
    this.emitters.forEach(emitter => {
      const emmitedParticles = emitter.emmitParticles()
      emmitedParticles.forEach(particle => this.addChild(particle))
      this.particles = this.particles.concat(emmitedParticles)
    })
    this.updateParticles()
    super.update()
  }

  updateParticles () {
    this.particles.forEach(particle => {
      this.gravityFields.forEach(field => {
        // 強さは距離とランダムの調整パラメータの合計で決定
        if (this.isOverlap(particle, field, 100)) {
          const dist = this.distance({x: particle.x, y: particle.y}, {x: field.x, y: field.y})
          particle.vx += (particle.x - field.x) * ((Math.random() * 0.25 + 0.25) / dist)
          particle.vy += (particle.y - field.y) * ((Math.random() * 0.25 + 0.25) / dist)
        }
      })

      particle.vx = particle.vx > 5 ? 5 : particle.vx
      particle.vx = particle.vx < -5 ? -5 : particle.vx

      particle.vy = particle.vy > 5 ? 5 : particle.vy
      particle.vy = particle.vy < -5 ? -5 : particle.vy

      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > this.canvas.width) {
        this.removeParticle(particle)
      } else if (particle.y < 0 || particle.y > this.canvas.height) {
        this.removeParticle(particle)
      }
    })
  }

  removeParticle (particle) {
    this.removeChild(particle)
    this.particles.splice(this.particles.indexOf(particle), 1)
  }

  distance (p1, p2) {
    const a = p1.x - p2.x
    const b = p1.y - p2.y
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
  }

  isOverlap (particle, field, dist) {
    return this.distance({x: particle.x, y: particle.y}, {x: field.x, y: field.y}) < dist
  }
}

class Button extends createjs.Container {

  constructor (pos, text) {
    super()
    const keyColor = '#563d7c'

    this.x = pos.x
    this.y = pos.y

    let bg = new createjs.Shape()
    bg.graphics
      .setStrokeStyle(1)
      .beginStroke(keyColor)
      .beginFill('white')
      .drawRect(0, 0, this.WIDTH(), this.HEIGHT())
    bg.visible = true
    this.addChild(bg)

    let bgOver = new createjs.Shape()
    bgOver.graphics
          .beginFill(keyColor)
          .drawRect(0, 0, this.WIDTH(), this.HEIGHT())
    bgOver.visible = false
    this.addChild(bgOver)

    let label = new createjs.Text(text, '12px sans-serif', keyColor)
    label.x = this.WIDTH() / 2
    label.y = this.HEIGHT() / 2
    label.textAlign = 'center'
    label.textBaseline = 'middle'
    this.addChild(label)

    this.cursor = 'pointer'

    this.addEventListener('mouseover', e => {
      bg.visible = false
      bgOver.visible = true
      label.color = 'white'
    })

    this.addEventListener('mouseout', e => {
      bg.visible = true
      bgOver.visible = false
      label.color = keyColor
    })
  }

  WIDTH () {
    return 140
  }

  HEIGHT () {
    return 25
  }

}

function init () {
  let particleStage = new ParticleStage('myCanvas')
  particleStage.canvas.width = window.innerWidth
  particleStage.canvas.height = window.innerHeight
  particleStage.enableMouseOver()
  // particleStage.addEmitter(new Emitter({x: 100, y: 150}))

  const gravityField = new GravityField({x: 450, y: 150})
  // particleStage.addGravityField(gravityField)

  const x = particleStage.canvas.width - 140
  const y = 0
  let addEmitterButton = new Button({x: x, y: y}, 'add emitter')
  addEmitterButton.addEventListener('click', e => {
    const x = particleStage.canvas.width / 4
    const y = particleStage.canvas.height / 2
    particleStage.addEmitter(new Emitter({x: x, y: y}))
  })

  const y2 = y + 25
  let addGravityFieldButton = new Button({x: x, y: y2}, 'add field')
  addGravityFieldButton.addEventListener('click', e => {
    const x = particleStage.canvas.width / 2
    const y = particleStage.canvas.height / 2
    particleStage.addGravityField(new GravityField({x: x, y: y}))
  })

  particleStage.addChild(addEmitterButton)
  particleStage.addChild(addGravityFieldButton)

  // 描画更新時の処理を追加
  createjs.Ticker.addEventListener('tick', () => particleStage.update())
}

window.addEventListener('load', init)
