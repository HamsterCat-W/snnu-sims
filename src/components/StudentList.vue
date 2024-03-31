<template>
  <div>
    <a-row class="grid-demo">
      <a-col :span="10">
        <a-input-search
          style="width: 320px"
          placeholder="请输入查询条件"
          search-button
          :modal-value="searchcondition"
        />
      </a-col>
      <a-col :span="8" style="text-align: right">
        <a-button-group type="primary">
          <a-button type="primary" @click="Allselect"
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
      :data="studentStore.students"
      row-key="sno"
      show-empty-tree
      :row-selection="rowSelection"

      style="margin-top: 20px"
      column-resizable
      :pageSize="pagesize"
      @page-size-change="changepageSize"
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
            <IconMore/>
          </a-button>
          <a-button
            type="primary"
            shape="circle"
            size="mini"
            @click="handleEdit(record)"
          >
            <IconEdit/>
          </a-button>
          <a-button
            type="primary"
            shape="circle"
            size="mini"
            @click="handleDelete(record)"
          >
            <IconDelete/>
          </a-button>
        </div>
      </template>
    </a-table>
    <!-- 渲染模态框组件 -->
    <StudentInfo
      :visible="visible"
      :title="title"
      :width = "800"
      :student = "selectedStudent"
      @cancel="handleCancelModal"
      @before-ok="handleBeforeOkModal"
    />
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
          :page-size-options="[5, 10, 15]"
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
import StudentInfo from "./StudentInfo.vue";
onMounted(() => getStudentList());

const studentStore = useStudentStore();
// 是否加载完毕（未使用）
const loading = ref(true);

//搜索条件
const searchcondition = ref("");

//总学生数
let total = ref(studentStore.students.length);
let current = ref(1); //当前的页数
let pagesize = ref(10); //每页条数

//行选择器
const rowSelection = reactive({
  //复选框
  type: "checkbox",
  //是否显示全选按钮
  showCheckedAll: true,
  //只能选一条
  onlyCurrent: false,
});
//表头属性
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

//控制modal弹出框
const visible = ref(false);
//弹出框的标题
const title = ref("");
//选中的行学生信息
const selectedStudent = ref({});

const Allselect = () => {
  // snoset.value = students.value.map((stu) => stu.sno);
  // selectedKeys = snoset.value;
};
const handleMore = (student: any) => {
  title.value = "查看信息";
  selectedStudent.value = student;
  visible.value = true;
  // 使用 student 对象进行更多操作
  console.log("点击了更多按钮，当前学生信息:", student);
  studentStore.setCurrentStudent(student);
};

const handleEdit = (student: any) => {
  // 使用 student 对象进行编辑操作
  title.value = "修改信息";
  selectedStudent.value = student;
  visible.value = true;

  console.log("点击了编辑按钮，当前学生信息:", student);
  studentStore.setCurrentStudent(student);
};

const handleCancelModal = () => {
  visible.value = false;
};

const handleBeforeOkModal = () => {
  // 模态框确定前的操作，比如表单验证
  // 返回 true 表示允许关闭模态框，返回 false 表示阻止关闭
};

const handleDelete = (student: any) => {
  // 使用 student 对象进行删除操作
  console.log("点击了删除按钮，当前学生信息:", student);
};

const changepage = (page: number) => {
  current.value = page;
};

const changepageSize = (newPageSize: number) => {
  console.log("New page size:", newPageSize);
  pagesize.value = newPageSize;
  // 在这里可以进行相应的操作，例如重新获取数据等
};

// 在组件挂载后获取数据
const getStudentList = async () => {
  try {
    // 发送 GET 请求获取学生数据
    const data: Student[] = await ApiService.get<Student[]>("students/");
    console.log(data);
    loading.value = false; // 数据加载完成，loading 状态设为 false
    studentStore.setStudents(data);
  } catch (error) {
    console.error("Error:", error);
    loading.value = false; // 出现错误，loading 状态设为 false
  }
};

//成功请求
// const baseURL = "http://192.168.80.1:8000/";
// () => {
//   axios
//     .get(baseURL + "students/")
//     .then(function (res) {
//       console.log(res);
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// };

//成功
// onMounted(async () => {
//   axios
//     .get(baseURL + "students/")
//     .then(function (res) {
//       console.log(res);
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// });

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
</script>
<style scoped lang="less">
.button-group {
  display: flex;
  gap: 10px; /* 间距大小，根据需要进行调整 */
}
</style>
