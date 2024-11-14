<template>
  <div ref="panoramaContainer" class="panorama-container"></div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Pannellum",
});

import { onBeforeUnmount, onMounted, ref } from "vue";

import panoramaImage from "@/assets/qwantani_sunset.jpg";

// const PANORAMA_IMAGE_URL = "/qwantani_sunset.jpg";

const panoramaContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (panoramaContainer.value && (window as any).pannellum) {
    (window as any).pannellum.viewer(panoramaContainer.value, {
      type: "equirectangular",
      panorama: panoramaImage,
      autoLoad: true,
      showZoomCtrl: false, // 控制是否显示缩放控件
      yaw: 0, // 水平旋转初始值
      pitch: 0, // 垂直旋转初始值
      autoRotate: -2, // 自动旋转速度，正数顺时针旋转，负数逆时针旋转
      hfov: 100, // 设置默认视场角
      minHfov: 100, // 设置最小视场角
      maxHfov: 100, // 设置最大视场角
      showFullscreenCtrl: false, // 控制是否显示全屏控件
      compass: true, // 启用指南针
      northOffset: 45, // 设置北方偏移角度
      hotSpots: [
        {
          yaw: 10,
          pitch: -10,
          roll: -10,
          type: "info",
          text: "我是信息xxx",
        },
        {
          pitch: -11,
          yaw: -20,
          roll: -10,
          cssClass: "custom-hotspot",
          createTooltipFunc: hotspot,
          createTooltipArgs: "四道桥站",
        },
      ],
    });
  }
});

function hotspot(
  hotSpotDiv: {
    classList: { add: (arg0: string) => void };
    appendChild: (arg0: HTMLSpanElement) => void;
    offsetWidth: number;
  },
  args: string
) {
  hotSpotDiv.classList.add("custom-tooltip");
  var span = document.createElement("span");
  span.innerHTML = args;
  hotSpotDiv.appendChild(span);
  //   span.style.width = span.scrollWidth - 20 + "px";
  //   span.style.marginLeft =
  //     -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + "px";
  //   span.style.marginTop = -span.scrollHeight - 12 + "px";
}
</script>

<style>
.panorama-container {
  width: 100%;
  height: 100vh;
}

.custom-hotspot {
  /* background-color: red;
  border-color: #faecd8;
  color: white;
  display: inline-block;
  width: 80px;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap; */
  display: flex;
  height: 22px;
  width: 65px;
  color: white;
  border-radius: 4px;
  border: 1px solid white;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
  box-sizing: border-box;
  /* position: relative; */
}
.custom-tooltip span {
  position: relative;
}
.custom-tooltip span::after {
  position: absolute;
  top: 22px;
  left: 50%;
  width: 1px;
  height: 30px;
  background: #fff;
  content: "";
}

.pnlm-compass {
  position: absolute;
  top: 4px;
  bottom: auto;
}
</style>
