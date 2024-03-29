<template>
  <div>
    请输出查询条件：<a-input-search
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      search-button
    />
    <!-- 显示全部 添加 导入excel<a-upload action="/" @before-upload="beforeUpload" /> -->
    <!-- 导出excel<a-upload action="/" @before-upload="beforeUpload" /> -->
  </div>
  <div>
    <!-- <h1 class="title flex justify-center color-blue">SNNU SIMS</h1> -->
    <a-checkbox-group direction="vertical">
      <div v-for="student in students" :key="student.sno">
        <a-checkbox value="student.sno">
          学生信息展示列表 更多 修改 删除
        </a-checkbox>
      </div>
    </a-checkbox-group>
  </div>
  <div>
    批量删除按钮 共（总学生数）条 k条/页 页码 第 页<a-pagination
      :total="50"
      show-total
      show-jumper
      show-page-size
    />
  </div>
</template>
<script setup lang="ts" name="StudentList">
import { useStudentStore } from "@/store/useStudentStore";
// import { Modal } from "@arco-design/web-vue";

const { students } = useStudentStore();
// const beforeUpload = (file) => {
//   return new Promise((resolve, reject) => {
//     Modal.confirm({
//       title: "beforeUpload",
//       content: `确认上传 ${file.name}`,
//       onOk: () => resolve(true),
//       onCancel: () => reject("cancel"),
//     });
//   });
// };

// interface Student {
//   sno: number;
//   name: string;
//   gender: string;
//   birthday: string;
//   mobile: string;
//   email: string;
//   address: string;
//   image?: string | null;
// }
// import { ApiService } from "@/service/ApiService.ts";

// async fetchStudents() {
//       try {
//         //使用ApiService中的get方法获取学生信息列表
//         const students = await ApiService.get<Student[]>("/students");
//       } catch (error) {
//         console.error("获取学生信息失败:", error);
//       }
//     }
</script>
<style scoped lang="less"></style>
