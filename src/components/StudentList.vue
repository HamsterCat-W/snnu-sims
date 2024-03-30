<template>
  <div>
    <a-row class="grid-demo">
      <a-col :span="10">
        <a-input-search
          style="width: 320px"
          placeholder="请输入查询条件"
          search-button
        />
      </a-col>
      <a-col :span="8" style="text-align: right">
        <a-button-group type="primary">
          <a-button type="primary"
            ><template #icon><icon-select-all /> </template
            ><template #default>全部</template>
          </a-button>
          <a-button
            ><template #icon><icon-plus /></template
            ><template #default>添加</template></a-button
          >
        </a-button-group>
      </a-col>
      <a-button-group type="primary">
        ><a-upload action="/"></a-upload
        ><a-button type="primary"
          ><template #icon><icon-download /> </template
          ><template #default>点击下载</template>
        </a-button>
      </a-button-group>
    </a-row>
  </div>
  <div>
    <a-table
      :columns="columns"
      :data="students"
      row-key="sno"
      show-empty-tree
      :row-selection="rowSelection"
      v-model:selectedKeys="selectedKeys"
      style="margin-top: 20px"
      column-resizable
      :bordered="{ cell: true }"
    >
      <template #optional="{ record }">
        <div class="button-group">
          <a-button
            type="primary"
            shape="circle"
            size="mini"
            @click="handleMore(record)"
          >
            <IconMore />
          </a-button>
          <a-button
            type="primary"
            shape="circle"
            size="mini"
            @click="handleEdit(record)"
          >
            <IconEdit />
          </a-button>
          <a-button
            type="primary"
            shape="circle"
            size="mini"
            @click="handleDelete(record)"
          >
            <IconDelete />
          </a-button>
        </div>
      </template>
    </a-table>
  </div>
  <div>
    <a-row class="grid-demo" style="margin-top: 20px">
      <a-col :span="8" style="text-align: left">
        <a-button type="primary"
          ><template #icon><icon-delete /> </template
          ><template #default>批量删除</template>
        </a-button></a-col
      >
      <a-col :span="16" style="text-align: right">
        <a-pagination
          @change="changepage"
          @page-size-change="changepageSize"
          :current="current"
          :total="total"
          :page-size="pagesize"
          show-total
          show-jumper
          show-page-size
      /></a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts" name="StudentList">
import { ApiService } from "../service/ApiService";
import { Student } from "../types/Stu";
import { useStudentStore } from "../store/useStudentStore";
import { ref, reactive, onMounted } from "vue";
// import { Modal } from "@arco-design/web-vue";
import {
  IconMore,
  IconEdit,
  IconDelete,
  IconSelectAll,
  IconPlus,
  IconDownload,
} from "@arco-design/web-vue/es/icon";
import { Pagination } from "@arco-design/web-vue";
const studentStore = useStudentStore();
const selectedKeys = ref(["1", "2"]);
const total = ref(50);
const current = ref(1); //当前的页数
const pagesize = ref(6); //每页条数
const rowSelection = reactive({
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: false,
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

const changepage = (page: number) => {
  current.value = page;
};

const changepageSize = (psize: number) => {
  pagesize.value = psize;
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
