<template>
  <div id="three" ref="threeDiv"></div>
</template>
​
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from 'gsap'
// 导入dat.gui
import * as dat from 'dat.gui'

// 目标：聚光灯

const threeDiv = ref<HTMLElement | null>(null)
const gui = new dat.GUI()
// 1、创建场景
const scene = new THREE.Scene()

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
// 设置相机位置
camera.position.set(0, 0, 13)
scene.add(camera)

const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, material)
// 投射阴影
sphere.castShadow = true
scene.add(sphere)

// // 创建平面
const planeGeometry = new THREE.PlaneBufferGeometry(10, 10)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2
// 接收阴影
plane.receiveShadow = true
scene.add(plane)

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
scene.add(light)
//直线光源
const spotLight = new THREE.SpotLight(0xffffff, 1)
spotLight.position.set(5, 5, 5)
spotLight.castShadow = true
spotLight.intensity = 2
// scene.add(spotLight)

// 设置阴影贴图模糊度
spotLight.shadow.radius = 20
// 设置阴影贴图的分辨率
spotLight.shadow.mapSize.set(1024, 1024)
// console.log(spotLight.shadow);

spotLight.target = sphere
spotLight.angle = Math.PI / 6
spotLight.distance = 0
spotLight.penumbra = 0
spotLight.decay = 0

// 设置透视相机的属性

scene.add(spotLight)
gui.add(sphere.position, 'x').min(-5).max(5).step(0.1)
gui
  .add(spotLight, 'angle')
  .min(0)
  .max(Math.PI / 2)
  .step(0.01)
gui.add(spotLight, 'distance').min(0).max(10).step(0.01)
gui.add(spotLight, 'penumbra').min(0).max(1).step(0.01)
gui.add(spotLight, 'decay').min(0).max(5).step(0.01)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true

// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true
// 添加坐标轴辅助器 5 代表长度
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

function render() {
  controls.update()
  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera)
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render)
}

render()

// 监听画面变化，更新渲染画面
window.addEventListener('resize', () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix()

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})

onMounted(() => {
  threeDiv.value?.appendChild(renderer.domElement)
  // 将webgl渲染的canvas内容添加到body
  // document.getElementById('three')?.appendChild(renderer.domElement)
})
</script>
