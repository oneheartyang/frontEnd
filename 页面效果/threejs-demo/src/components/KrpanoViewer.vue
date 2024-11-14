<template>
  <div ref="krpanoContainer" class="krpano-container"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const krpanoContainer = ref<HTMLElement | null>(null);
let krpanoInstance: any = null;

// 初始化 krpano
const initializeKrpano = () => {
  if (krpanoContainer.value && (window as any).embedpano) {
    // 使用 krpano 的 embedpano 函数嵌入全景图
    (window as any).embedpano({
      // swf: '/path/to/krpano.swf',  // 可选：krpano SWF 文件路径
      xml: "/panorama.xml", // 全景图 XML 配置文件路径
      target: krpanoContainer.value,
      html5: "auto",
      mobilescale: 1.0,
      passQueryParameters: true,
      onready: (krpano) => {
        krpanoInstance = krpano; // 保存 krpano 实例
      },
    });
  }
};

// 销毁 krpano 实例
const destroyKrpano = () => {
  if (krpanoInstance && krpanoInstance.call) {
    krpanoInstance.call("removepano()"); // 调用 krpano 的销毁方法
  }
};

onMounted(() => {
  initializeKrpano(); // 在组件挂载时初始化 krpano
});

onBeforeUnmount(() => {
  destroyKrpano(); // 在组件卸载前销毁 krpano 实例
});
</script>

<style scoped>
.krpano-container {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #000;
}
</style>
