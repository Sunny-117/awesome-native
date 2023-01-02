<template>
  <div id="student-list">
    <!-- 组件划分的目的，帮助理解数据流 -->
    <stu-table></stu-table>
    <transition>
      <Dialog v-if="dialogShow"></Dialog>
    </transition>
    <Pagination
      :totalPage="totalPage"
      :nowPage="nowPage"
      @turn="turnPage"
    ></Pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import stuTable from "@/components/stuTable.vue";
import Dialog from "@/components/dialog.vue";
import Pagination from "@/components/pagination.vue";
export default {
  // data() {
  //   return {
  //     nowPage: 5,
  //     totalPage: 10
  //   }
  // },
  components: {
    stuTable,
    Dialog,
    Pagination,
  },
  computed: {
    ...mapState({
      dialogShow: (state) => state.show,
      nowPage: (state) => state.nowPage,
    }),
    ...mapGetters(["totalPage"]),
  },
  methods: {
    ...mapMutations(["setNowPage"]),
    ...mapActions(["getStuList"]),
    turnPage(n) {
      this.setNowPage(n);
      this.getStuList(); //重新获取学生数据
    },
  },
};
</script>

<style>
/* v-enter, v-enter-to, v-enter-active */
/* v-leave, v-leavt-to, v-leave-active */
/* v- 可以改名，transition 设置name属性 */
/* name = a, a-enter, a-enter-to */

/* 怎么进来，怎么出去，从上倒下进来，从下到上出去 */
.v-enter,
.v-leave-to {
  top: -100%;
  opacity: 0;
}
.v-enter-to,
.v-leave {
  top: 0;
  opacity: 1;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}
</style>
