<template>
  <div id="three" ref="threeDiv"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const threeDiv = ref<HTMLElement | null>(null)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)
scene.add(camera)

// 创建球体几何体
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
// 将球体向左移动
sphere.position.x = -10
scene.add(sphere)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls(camera, renderer.domElement)

// 添加坐标轴辅助器并向左移动
const axesHelper = new THREE.AxesHelper(5)
axesHelper.position.x = -10
scene.add(axesHelper)

function render() {
  // 使球体自转
  sphere.rotation.y += 0.01

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

onMounted(() => {
  threeDiv.value?.appendChild(renderer.domElement)
})
</script>

<style lang="scss"></style>
