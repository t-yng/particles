const container = document.getElementById('container')
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
container.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)

const particleCount = 1800,
      geometry = new THREE.Geometry(),
      pMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture(
          "/assets/img/particle.png"
        ),
        blending: THREE.AdditiveBlending,
        transparent: true
      })

for (let i = 0; i < particleCount; i++) {
  const x = Math.floor(Math.random() * 1000 - 500)
  const y = Math.floor(Math.random() * 1000 - 500)
  const z = Math.floor(Math.random() * 1000 - 500)
  const particle = new THREE.Vector3(x, y, z)
  particle.velocity = new THREE.Vector3(0, -Math.random(), 0)

  geometry.vertices.push(particle)
}

const particleSystem = new THREE.Points(geometry, pMaterial)
particleSystem.sortParticles = true;
scene.add(particleSystem)

const render = () => {
  particleSystem.rotation.y += 0.01

  geometry.vertices.forEach(particle => {
    if (particle.y < -200) {
      particle.y = 200
      particle.velocity.y = 0
    }

    particle.velocity.y -= Math.random() * .1

    particle.add(particle.velocity)
  })

  particleSystem.geometry.verticesNeedUpdate = true

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

// const render = () => {
//   camera.rotation.x += 0.0025
//   camera.rotation.y += 0.005
//   requestAnimationFrame(render)
//   renderer.render(scene, camera)
// }

// render()
