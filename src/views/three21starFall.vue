<template>
  <div id="three" ref="threeDiv"></div>
  <canvas className="webgl"></canvas>
</template>
​
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import texture from './particle.png'

// 目标：下坠星空测试

const initThree = () => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const canvas = document.querySelector('canvas.webgl')
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(sizes.width, sizes.height)
  renderer.toneMapping = THREE.ACESFilmicToneMapping

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    1000
  )
  camera.position.z = 150
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  scene.add(camera)

  // 页面缩放事件监听
  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // 更新渲染
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // 更新相机
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
  })

  const rand = (min, max) => min + Math.random() * (max - min)
  const P_COUNT = 1000
  let astronaut = null,
    t = 0
  // 雾化效果
  scene.fog = new THREE.FogExp2(0x000000, 0.005)
  // 初始化粒子系统
  const geom = new THREE.BufferGeometry()
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 10,
    alphaTest: 0.8,
    map: new THREE.TextureLoader().load(texture)
  })
  let veticsFloat32Array = []
  let veticsColors = []
  for (let p = 0; p < P_COUNT; p++) {
    veticsFloat32Array.push(
      rand(20, 30) * Math.cos(p),
      rand(20, 30) * Math.sin(p),
      rand(-1500, 0)
    )
    const randomColor = new THREE.Color(Math.random() * 0xffffff)
    veticsColors.push(randomColor.r, randomColor.g, randomColor.b)
  }
  const vertices = new THREE.Float32BufferAttribute(veticsFloat32Array, 3)
  const colors = new THREE.Float32BufferAttribute(veticsColors, 3)
  geom.attributes.position = vertices
  geom.attributes.color = colors
  const particleSystem = new THREE.Points(geom, material)
  scene.add(particleSystem)

  // // 宇航员模型
  // const loader = new GLTFLoader()
  // loader.load(astronautModel, (mesh) => {
  //   astronaut = mesh.scene
  //   astronaut.material = new THREE.MeshLambertMaterial()
  //   astronaut.scale.set(0.0005, 0.0005, 0.0005)
  //   astronaut.position.z = -10
  //   scene.add(astronaut)
  // })

  // 设置光照
  let light = new THREE.PointLight(0xffffff, 0.5)
  light.position.x = -50
  light.position.y = -50
  light.position.z = 75
  scene.add(light)

  light = new THREE.PointLight(0xffffff, 0.5)
  light.position.x = 50
  light.position.y = 50
  light.position.z = 75
  scene.add(light)

  light = new THREE.PointLight(0xffffff, 0.3)
  light.position.x = 25
  light.position.y = 50
  light.position.z = 200
  scene.add(light)

  light = new THREE.AmbientLight(0xffffff, 0.02)
  scene.add(light)

  function updateParticles() {
    particleSystem.position.x = 0.2 * Math.cos(t)
    particleSystem.position.y = 0.2 * Math.cos(t)
    particleSystem.rotation.z += 0.015
    camera.lookAt(particleSystem.position)

    for (let i = 0; i < veticsFloat32Array.length; i++) {
      if ((i + 1) % 3 === 0) {
        const dist = veticsFloat32Array[i] - camera.position.z
        if (dist >= 0) veticsFloat32Array[i] = rand(-1000, -500)
        veticsFloat32Array[i] += 2.5
        const _vertices = new THREE.Float32BufferAttribute(
          veticsFloat32Array,
          3
        )
        geom.attributes.position = _vertices
      }
    }

    particleSystem.geometry.verticesNeedUpdate = true
  }

  // function updateMeshes() {
  //   if (astronaut) {
  //     astronaut.position.z = 0.08 * Math.sin(t) + (camera.position.z - 0.2)
  //     astronaut.rotation.x += 0.015
  //     astronaut.rotation.y += 0.015
  //     astronaut.rotation.z += 0.01
  //   }
  // }

  function updateRendererDim() {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
  }

  function tick() {
    updateParticles()
    // updateMeshes()
    updateRendererDim()
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
    t += 0.01
  }
  tick()

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const dx = -1 * ((cx - e.clientX) / cx)
    const dy = -1 * ((cy - e.clientY) / cy)
    camera.position.x = dx * 5
    camera.position.y = dy * 5
    // astronaut.position.x = dx * 5
    // astronaut.position.y = dy * 5
  })
}

onMounted(() => {
  initThree()
  // threeDiv.value?.appendChild(renderer.domElement)
  // 将webgl渲染的canvas内容添加到body
  // document.getElementById('three')?.appendChild(renderer.domElement)
})
</script>
