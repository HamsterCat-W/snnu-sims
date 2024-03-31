<template>
  <a-modal
    :visible="visible"
    :title="title"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
    :body-style="{ height: '350px' }"
  >
    <a-form :model="student">
      <div style="text-align: center; margin-bottom: 20px">
        <a-upload
          action="/"
          :fileList="file ? [file] : []"
          :show-file-list="false"
          @change="onChange"
          @progress="onProgress"
        >
          <template #upload-button>
            <div
              :class="`arco-upload-list-item${
                file && file.status === 'error'
                  ? ' arco-upload-list-item-error'
                  : ''
              }`"
            >
              <div
                class="arco-upload-list-picture custom-upload-avatar"
                style="min-width: 200px; height: 130px"
                v-if="file && file.url"
              >
                <img :src="file.url" />
                <div
                  class="arco-upload-list-picture-mask"
                  style="min-width: 200px; height: 130px"
                >
                  <IconEdit />
                </div>
                <a-progress
                  v-if="file.status === 'uploading' && file.percent < 100"
                  :percent="file.percent"
                  type="circle"
                  :style="{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                  }"
                />
              </div>
              <div
                class="arco-upload-picture-card"
                v-else
                style="text-align: center; min-width: 200px; height: 130px"
              >
                <div class="arco-upload-picture-card-text">
                  <IconPlus />
                  <div style="font-weight: 800">上传照片</div>
                </div>
              </div>
            </div>
          </template>
        </a-upload>
      </div>

      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item field="sno" label="学号" label-col-flex="80px">
            <a-input v-model="student.sno" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="name" label="姓名" label-col-flex="80px">
            <a-input v-model="student.name" placeholder="please enter..." />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item field="gender" label="性别" label-col-flex="80px">
            <a-input v-model="student.gender" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="birthday" label="出生日期" label-col-flex="80px">
            <a-input v-model="student.birthday" placeholder="please enter..." />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item field="mobile" label="手机号码" label-col-flex="80px">
            <a-input v-model="student.mobile" placeholder="please enter..." />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item field="email" label="邮箱地址" label-col-flex="80px">
            <a-input v-model="student.email" placeholder="please enter..." />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item field="address" label="地址" label-col-flex="80px">
            <a-input v-model="student.address" placeholder="please enter..." />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
  
<script setup name="StudentInfo" lang="ts">
// import { useStudentStore } from "../store/useStudentStore";
import { IconEdit, IconPlus } from "@arco-design/web-vue/es/icon";
import { ref } from "vue";

const file = ref();

const onChange = (_, currentFile) => {
  file.value = {
    ...currentFile,
    // url: URL.createObjectURL(currentFile.file),
  };
};
const onProgress = (currentFile) => {
  file.value = currentFile;
};

// 接收父组件传递的属性
const props = defineProps({
  visible: Boolean,
  title: String,
  student: Object,
});
// 发送事件给父组件
const emits = defineEmits(["cancel", "before-ok"]);

// 方法：取消操作
const handleCancel = () => {
  emits("cancel");
};

// 方法：确定前的操作
const handleBeforeOk = () => {
  console.log("huoqu", props.student); // 从 props 中获取 student 属性
  window.setTimeout(() => {}, 3000);
};
</script>
<style scoped>
.arco-upload
  .arco-upload-list-item
  .arco-upload-picture-card
  .arco-upload-list-picture-mask {
  min-width: 200px;
  height: 130px;
}
</style>
  