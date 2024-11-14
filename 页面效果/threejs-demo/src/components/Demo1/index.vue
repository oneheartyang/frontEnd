<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
// 引入three.js
import * as THREE from "three";
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import panoramaImage from "@/assets/qwantani_sunset.jpg";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

const cameraHeight = ref(1.6); // 默认机位高度

const container = ref<HTMLElement | null>(null); // 用于引用容器元素
let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls,
  sphere: THREE.Mesh,
  hotspots: THREE.Mesh[],
  raycaster: THREE.Raycaster,
  cssRenderer: CSS2DRenderer,
  mouse: THREE.Vector2;

// 初始化 Three.js 场景
const initThree = () => {
  if (!container.value) return; // 确保 container.value 存在

  // 1. 创建场景
  scene = new THREE.Scene();
  // 2. 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.lookAt(scene.position);
  // camera.position.set(0, cameraHeight.value, 0.1); // 相机稍微离开原点
  // camera.position.set(0, 30, -300);
  camera.position.set(0, 30, 10);

  // 3. 创建渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.value.appendChild(renderer.domElement);

  // 4. 创建全景球体，并反转球体，使贴图朝内
  const geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1); // 反转球体，确保贴图朝内

  // 加载全景图片纹理
  const texture = new THREE.TextureLoader().load(panoramaImage);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  // 创建球体并加入场景
  sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(0, 0, 0);
  scene.add(sphere);

  // 5. 添加控制器，使用户可以旋转视角
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false; // 禁用缩放
  controls.enablePan = false; // 禁用平移

  // 创建 CSS2D 渲染器
  // CSS2DRenderer 初始化
  cssRenderer = new CSS2DRenderer();
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.domElement.style.position = "absolute";
  cssRenderer.domElement.style.top = "0";
  cssRenderer.domElement.style.left = "0";
  cssRenderer.domElement.style.pointerEvents = "none"; // 确保 CSS2D 层不拦截鼠标事件
  container.value.appendChild(cssRenderer.domElement);

  // // 创建自定义热点
  // hotspots = [
  //   createHotspot(0, 0, 10, "热点1：这里是第一个信息点"),
  //   // createHotspot(10, 0, 0, "热点2：这里是第二个信息点"),
  //   // createHotspot(0, 0, 0, "热点3：这里是第三个信息点"),
  // ];

  // hotspots.forEach((hotspot) => scene.add(hotspot));
  // 创建标注文字
  const divElement = document.createElement("div");
  divElement.className = "label";
  divElement.textContent = "标注文字";
  divElement.style.marginTop = "-1em";
  const labelObject = new CSS2DObject(divElement);
  labelObject.position.set(0, -1.6, 1); // 设置标注位置
  scene.add(labelObject);

  // 创建 Raycaster 用于检测鼠标点击
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // 6. 渲染循环
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update(); // 更新控制器
    renderer.render(scene, camera);
    cssRenderer.render(scene, camera); // 渲染文字标签
  };
  animate();

  // 7. 监听窗口大小变化
  window.addEventListener("resize", onResize);
};

// 创建自定义热点
const createHotspot = (x: number, y: number, z: number, info: string) => {
  const geometry = new THREE.SphereGeometry(0.2, 16, 16); // 小球表示热点
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // 红色热点
  const hotspot = new THREE.Mesh(geometry, material);
  hotspot.position.set(x, y, z); // 设置位置
  (hotspot as any).info = info; // 绑定信息

  // 创建 CSS2D 文字标签
  const label = createLabel(info);
  // label.position.set(x, y + 0.5, z); // 将标签放置在热点上方
  scene.add(label);
  return hotspot;
};

// 创建 CSS2D 文字标签
const createLabel = (text: string | null) => {
  const div = document.createElement("div");
  div.className = "label";
  div.textContent = text;
  div.style.color = "white";
  console.log(div); // 打印查看是否正确创建 div 标签

  const label = new CSS2DObject(div);
  return label;
};

// 处理窗口大小变化
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
};

// 清理工作
const cleanup = () => {
  window.removeEventListener("resize", onResize);
  if (renderer) {
    renderer.dispose();
  }
};

// 在组件挂载时初始化
onMounted(() => {
  initThree();
});

// 在组件卸载时清理
onBeforeUnmount(() => {
  cleanup();
});

const updateCameraHeight = () => {
  camera.position.set(0, cameraHeight.value, 0); // 根据输入框的值更新相机的 y 坐标
};
</script>

<template>
  <div>
    <div ref="container" class="three-container"></div>
    <!-- 输入框用于动态设置机位高度 -->
    <!-- <div class="input-container">
      <label for="camera-height">设置机位高度 (y): </label>
      <input
        id="camera-height"
        type="number"
        v-model="cameraHeight"
        :min="0"
        step="0.1"
        @input="updateCameraHeight"
      />
    </div> -->
    <!-- <div id="tag">标签内容</div> -->
  </div>
</template>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

canvas,
.css2d-renderer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.label {
  background-color: rgba(255, 255, 255, 0.7); /* 半透明背景 */
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  color: white;
  text-align: center;
  font-family: Arial, sans-serif;
  pointer-events: none; /* 确保标签不会拦截鼠标事件 */
  z-index: 100; /* 确保标签显示在 3D 场景之上 */
  position: absolute; /* 使用绝对定位 */
}
</style>
