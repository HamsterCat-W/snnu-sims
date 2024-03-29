<template>
  <a-layout class="layout-demo">
    <a-layout-sider theme="dark" breakpoint="lg" :width="220" collapsible :collapsed="collapsed" @collapse="onCollapse">
      <div class="logo" />
      <a-menu :defaultOpenKeys="['1']" :defaultSelectedKeys="['0_2']" @menuItemClick="onClickMenuItem">
        <a-menu-item key="0_1" disabled>
          <IconHome />
          学生信息
        </a-menu-item>
        <a-menu-item key="0_2">
          <IconCalendar />
          课程管理
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header> SNNU SIMS</a-layout-header>
      <a-layout style="padding: 0 24px">
        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts" name="About">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { IconHome, IconCalendar } from '@arco-design/web-vue/es/icon'

const collapsed = ref(false)
const onCollapse = (val, type) => {
  const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩'
  Message.info({
    content,
    duration: 2000
  })
  collapsed.value = val
}
function onClickMenuItem(key) {
  Message.info({ content: `You select ${key}`, showIcon: true })
}
</script>

<style scoped>
.layout-demo {
  height: 100%;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}
.layout-demo :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}
.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
  text-align: center;
  font-size: 30px;
  font-weight: bold;
}
.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>
