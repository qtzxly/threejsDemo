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

// // 目标：纹理高度  标准网格材质(MeshStandardMaterial)

const threeDiv = ref<HTMLElement | null>(null)
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
camera.position.set(0, 0, 3)
scene.add(camera)
// 导入纹理
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAplhaTexture = textureLoader.load('./textures/door/alpha.jpg')
// ao 环境遮挡贴图
const doorAoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')

//导入置换贴图
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')

// 添加物体
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 100, 100, 100)
// 材质
const basicMaterial = new THREE.MeshStandardMaterial({
  color: '#ffff00',
  map: doorColorTexture,
  alphaMap: doorAplhaTexture,
  transparent: true,
  aoMap: doorAoTexture,
  aoMapIntensity: 1,

  displacementMap: doorHeightTexture,
  displacementScale: 0.8
  //   opacity: 0.3,
  //   side: THREE.DoubleSide,
})
basicMaterial.side = THREE.DoubleSide

const cube = new THREE.Mesh(cubeGeometry, basicMaterial)
scene.add(cube)
// 给cube添加第二组uv
cubeGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
)

// 添加平面
const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100)
// const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), basicMaterial)
const plane = new THREE.Mesh(planeGeometry, basicMaterial)
plane.position.set(1.5, 0, 0)
scene.add(plane)
// 给平面设置第二组uv
planeGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
)

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5) // soft white light
scene.add(light)
//直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(10, 10, 10)
scene.add(directionalLight)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 添加坐标轴辅助器 5 代表长度
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

function render() {
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
