<template>
  <div class="pagination">
    <i class="iconfont icon-previewleft" @click="turnPage('prev')"></i>
    <ul>
      <template v-if="totalPage <= 7">
        <li
          @click="turnPage(i)"
          :class="{ active: nowPage === i }"
          v-for="i in totalPage"
          :key="i"
        >
          {{ i }}
        </li>
      </template>
      <template v-else>
        <!-- np <= 4 : 1~6, ... t(100) -->
        <!-- np >= (t-3): 1 ..., t-5,t-4,t-3,t-2,t-1,t -->
        <!-- np > 4 && np < (t-3): 1...  np-2 np-1 np np+1 np+2 ... t-->
        <!-- 1... np > 4 -->
        <!-- ...t  np < (t-3)-->
        <template v-if="nowPage <= 4">
          <li
            v-for="i in 6"
            :key="i"
            @click="turnPage(i)"
            :class="{ active: nowPage === i }"
          >
            {{ i }}
          </li>
        </template>
        <template v-if="nowPage > 4">
          <li @click="turnPage(1)">1</li>
          <li @click="turnPage(nowPage - 5 > 1 ? nowPage - 5 : 1)">...</li>
        </template>
        <template v-if="nowPage > 4 && nowPage < totalPage - 3">
          <li
            v-for="i in 5"
            :key="nowPage - 3 + i"
            @click="turnPage(nowPage - 3 + i)"
            :class="{ active: 3 === i }"
          >
            {{ nowPage - 3 + i }}
          </li>
        </template>
        <template v-if="nowPage < totalPage - 3">
          <li
            @click="turnPage(nowPage + 5 > totalPage ? totalPage : nowPage + 5)"
          >
            ...
          </li>
          <li @click="turnPage(totalPage)">{{ totalPage }}</li>
        </template>
        <template v-if="nowPage >= totalPage - 3">
          <li
            v-for="i in 6"
            :key="totalPage - 6 + i"
            @click="turnPage(totalPage - 6 + i)"
            :class="{ active: nowPage === totalPage - 6 + i }"
          >
            {{ totalPage - 6 + i }}
          </li>
        </template>
      </template>
    </ul>
    <i class="iconfont icon-previewright" @click="turnPage('next')"></i>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     // 当前页
  //     nowPage:5 ,
  //     // 总共的页
  //     totalPage:100,
  //   }
  // },
  props: {
    nowPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    turnPage(val) {
      let np = this.nowPage;
      if (val === "prev") {
        if (this.nowPage > 1) {
          // this.nowPage --
          np = this.nowPage - 1;
        }
      } else if (val === "next") {
        if (this.nowPage < this.totalPage) {
          // this.nowPage ++;
          np = this.nowPage + 1;
        }
      } else {
        // this.nowPage = val;
        np = val;
      }
      if (np === this.nowPage) {
        return;
      }
      this.$emit("turn", np);
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  user-select: none;
}
ul {
  display: flex;
}
ul > li,
i {
  height: 32px;
  width: 32px;
  text-align: center;
  line-height: 32px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #aaa;
  margin: 0 5px;
  cursor: pointer;
}
.active {
  color: #409eff;
  border-color: #409eff;
}
li:hover,
i:hover {
  color: #409eff;
  border-color: #409eff;
}
</style>
