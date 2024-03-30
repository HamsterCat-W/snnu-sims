<template>
  <div>
    <a-input-search
      style="width: 320px"
      placeholder="请输入查询条件"
      search-button
    />
    <!-- 显示全部 添加 导入excel<a-upload action="/" @before-upload="beforeUpload" /> -->
    <!-- 导出excel<a-upload action="/" @before-upload="beforeUpload" /> -->
  </div>
  <div>
    <a-table
      :columns="columns"
      :data="students"
      show-empty-tree
      :row-selection="rowSelection"
      style="margin-top: 20px"
    >
      <template #optional="{ record }">
        <div class="button-group">
          <a-button type="primary" shape="circle" @click="handleMore(record)">
            <IconMore />
          </a-button>
          <a-button type="primary" shape="circle" @click="handleEdit(record)">
            <IconEdit />
          </a-button>
          <a-button type="primary" shape="circle" @click="handleDelete(record)">
            <IconDelete />
          </a-button>
        </div>
      </template>
    </a-table>
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
import { ApiService } from "../service/ApiService.ts";
import { Student } from "../types/Stu.ts";
import { useStudentStore } from "../store/useStudentStore";
import { ref, reactive, onMounted } from "vue";
// import { Modal } from "@arco-design/web-vue";
import { IconMore, IconEdit, IconDelete } from "@arco-design/web-vue/es/icon";
import { Pagination } from "@arco-design/web-vue";
const studentStore = useStudentStore();
const rowSelection = reactive({
  type: "checkbox",
  showCheckedAll: true,
});
console.log(rowSelection);
const columns = [
  {
    title: "学号",
    dataIndex: "sno",
    key: "sno",
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "生日",
    dataIndex: "birthday",
    key: "birthday",
  },
  {
    title: "手机号",
    dataIndex: "mobile",
    key: "mobile",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "地址",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
studentStore.setStudents([
  {
    sno: 9,
    name: "吴宇航",
    gender: "男",
    birthday: "2003-04-07",
    mobile: "7890123456",
    email: "wuyuhang@example.com",
    address: "杭州市西湖区",
    image: null,
  },
  {
    sno: 10,
    name: "顾梦琪",
    gender: "女",
    birthday: "2001-12-20",
    mobile: "9012345678",
    email: "gumengqi@example.com",
    address: "杭州市拱墅区",
    image: null,
  },
  {
    sno: 11,
    name: "唐天翔",
    gender: "男",
    birthday: "2000-06-10",
    mobile: "3456789012",
    email: "tangtianxiang@example.com",
    address: "南京市玄武区",
    image: null,
  },
  {
    sno: 12,
    name: "孙怡涵",
    gender: "女",
    birthday: "1999-02-18",
    mobile: "6789012345",
    email: "sunyihan@example.com",
    address: "南京市鼓楼区",
    image: null,
  },
  {
    sno: 13,
    name: "周泽宇",
    gender: "男",
    birthday: "2002-10-25",
    mobile: "9012345678",
    email: "zhouzeyu@example.com",
    address: "武汉市江汉区",
    image: null,
  },
]);
const students = studentStore.students;

const handleMore = (student: any) => {
  // 使用 student 对象进行更多操作
  console.log("点击了更多按钮，当前学生信息:", student);
};

const handleEdit = (student: any) => {
  // 使用 student 对象进行编辑操作
  console.log("点击了编辑按钮，当前学生信息:", student);
};

const handleDelete = (student: any) => {
  // 使用 student 对象进行删除操作
  console.log("点击了删除按钮，当前学生信息:", student);
};

onMounted(async () => {
  try {
    //使用ApiService中的get方法获取学生信息列表
    const students = await ApiService.get<Student[]>("/students");
    //将获取到的学生信息列表存储到状态中
    studentStore.setStudents(students);
  } catch (error) {
    console.error("获取学生信息失败:", error);
  }
});
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
<style scoped lang="less">
.button-group {
  display: flex;
  gap: 10px; /* 间距大小，根据需要进行调整 */
}
</style>
