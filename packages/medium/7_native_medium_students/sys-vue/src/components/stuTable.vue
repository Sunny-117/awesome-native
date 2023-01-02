<template>
  <table>
    <thead>
      <tr>
        <th>学号</th>
        <th>姓名</th>
        <th>性别</th>
        <th>邮箱</th>
        <th>年龄</th>
        <th>手机号</th>
        <th>住址</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody id="tbody">
      <!-- DOM 渲染的逻辑 -->
      <tr v-for="item in stuList" :key="item.id">
        <td>{{ item.sNo }}</td>
        <td>{{ item.name }}</td>
        <td>{{ formatSex(item.sex) }}</td>
        <td>{{ item.email }}</td>
        <td>{{ formatAge(item.birth) }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.address }}</td>
        <td>
          <button class="btn edit" @click="edit(item)">编辑</button>
          <button class="btn remove" @click="del(item.sNo)">删除</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  // data() {
  //   return {
  //     stuList: [],
  //   }
  // },
  computed: {
    ...mapState(["stuList"]),
  },
  methods: {
    formatSex(val) {
      return val == "0" ? "男" : "女";
    },
    formatAge(val) {
      return new Date().getFullYear() - val;
    },
    edit(item) {
      // 改变store当中show
      this.setShow(true);
      this.setActiveStu(item);
    },
    del(sNo) {
      // 删除学生，重新获取当前页的数据。
      const flag = window.confirm("是否确定删除 ???");
      if (flag) {
        this.delStu(sNo);
      }
    },
    ...mapMutations(["setShow", "setActiveStu"]),
    ...mapActions(["getStuList", "delStu"]),
  },
  async created() {
    this.getStuList();
    // const res = await this.$api.getStu(1, 5);
    // this.stuList = res.data.findByPage;
    // console.log(res);
  },
};
</script>

<style></style>
