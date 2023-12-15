<template>
  <div id="three" ref="threeDiv"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const threeDiv = ref<HTMLElement | null>(null)

const cameraRigY = new THREE.Group()

const scene = new THREE.Scene()
scene.add(cameraRigY)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 0, 10)

//相机加入组里
cameraRigY.add(camera)
//修改整体相机Y轴旋转
cameraRigY.rotation.set(0, Math.PI / 2, 0)

const renderer = new THREE.WebGLRenderer()

camera.position.set(0, 1, 7)
//修改相机初始角度
camera.rotation.set(0, -Math.PI / 2, 0)
const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

// 创建球体几何体
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
// 将球体向左移动
sphere.position.x = -4
scene.add(sphere)

renderer.setSize(window.innerWidth, window.innerHeight)

// const controls = new OrbitControls(camera, renderer.domElement)
// 设置OrbitControls的旋转中心为球体的位置
// controls.target.copy(sphere.position)
controls.target = new THREE.Vector3(-4, 0, 0)

// 添加坐标轴辅助器并向左移动
const axesHelper = new THREE.AxesHelper(5)
axesHelper.position.x = -4
scene.add(axesHelper)

function render() {
  // 使球体自转
  sphere.rotation.y += 0.01

  // 更新OrbitControls
  controls.update()

  // 让相机看向原点
  // camera.lookAt(0, 0, 0)

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

onMounted(() => {
  threeDiv.value?.appendChild(renderer.domElement)
})
</script>

<style lang="scss"></style>
