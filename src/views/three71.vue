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

// 顶点着色器
import basicVertexShader from '../shader/basic/vertex.glsl'
// 片元着色器
import basicFragmentShader from '../shader/basic/fragment.glsl'

// // 目标：认识shader
const threeDiv = ref<HTMLElement | null>(null)
const gui = new dat.GUI()
// 1、创建场景
const scene = new THREE.Scene()

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  900
)

// 设置相机位置
camera.position.set(0, 0, 2)

// 更新摄像头
camera.aspect = window.innerWidth / window.innerHeight
//   更新摄像机的投影矩阵
camera.updateProjectionMatrix()

scene.add(camera)

// 加入辅助轴，帮助我们查看3维坐标轴
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 创建纹理加载器对象
const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load('./texture/da.jpeg')
const params = {
  uFrequency: 10,
  uScale: 0.1
}

const material = new THREE.MeshBasicMaterial({ color: '#00ff00' })

// 创建着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    }
  `
})

// 创建平面
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 64, 64),
  // material
  shaderMaterial
)

console.log(floor)
scene.add(floor)

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

function render() {
  controls.update()
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
