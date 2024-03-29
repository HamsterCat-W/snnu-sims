import { ApiService } from "@/service/ApiService.ts";
import { defineStore } from "pinia";
import { computed } from "vue";

interface Student {
  sno: number;
  name: string;
  gender: string;
  birthday: string;
  mobile: string;
  email: string;
  address: string;
  image?: string | null;
}

export const useStudentStore = defineStore({
  id: "students",
  state: () => ({
    //学生信息列表
    students: [] as Student[],
    //当前选中的学生信息
    currentStudent: null as Student | null,
  }),
  actions: {
    //获取学生信息
    async fetchStudents() {
      try {
        //使用ApiService中的get方法获取学生信息列表
        const students = await ApiService.get<Student[]>("/students");
        //将获取到的学生信息列表存储到状态中
        this.setStudents(students);
      } catch (error) {
        console.error("获取学生信息失败:", error);
      }
    },
    //设置学生信息列表
    setStudents(students: Student[]) {
      this.students = students;
    },
    //获取当前选中的学生信息
    setCurrentStudent(student: Student) {
      this.currentStudent = student;
    },
  },
});
