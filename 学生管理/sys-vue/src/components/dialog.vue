<template>
  <div class="modal" @click="setShow(false)">
    <div class="modal-content" @click.stop="() => {}">
      <h2>编辑表单</h2>
      <form action="#" id="edit-student-form">
        <div>
          <!-- v-model = @input + :value -->
          <label for="edit-name">姓名</label
          ><input
            type="text"
            id="edit-name"
            name="name"
            :value="activeStu.name"
            @input="edit('name', $event.target.value)"
          />
          <!-- 不要用v-modal,单项数据流 -->
        </div>
        <div>
          <label for="">性别</label>
          <input
            type="radio"
            name="sex"
            id="edit-male"
            value="0"
            :checked="activeStu.sex == '0'"
            @change="edit('sex', '0')"
          />
          <label for="edit-male" class="sex">男</label>
          <input
            type="radio"
            name="sex"
            id="edit-female"
            value="1"
            :checked="activeStu.sex == '1'"
            @change="edit('sex', '1')"
          />
          <label for="edit-female" class="sex">女</label>
        </div>
        <div>
          <label for="edit-email">邮箱</label
          ><input
            type="email"
            id="edit-email"
            name="email"
            :value="activeStu.email"
            @input="edit('email', $event.target.value)"
          />
        </div>
        <div>
          <label for="edit-number">学号</label
          ><input
            type="text"
            id="edit-number"
            name="sNo"
            readonly
            :value="activeStu.sNo"
          />
        </div>
        <div>
          <label for="edit-birthYear">出生年</label
          ><input
            type="text"
            id="edit-birthYear"
            name="birth"
            :value="activeStu.birth"
            @input="edit('birth', $event.target.value)"
          />
        </div>
        <div>
          <label for="edit-phone">手机号</label
          ><input
            type="text"
            id="edit-phone"
            name="phone"
            :value="activeStu.phone"
            @input="edit('phone', $event.target.value)"
          />
        </div>
        <div>
          <label for="edit-address">住址</label
          ><input
            type="text"
            id="edit-address"
            name="address"
            :value="activeStu.address"
            @input="edit('address', $event.target.value)"
          />
        </div>
        <div>
          <label for=""></label>
          <button id="edit-submit" class="btn" @click.prevent="commit">
            <!-- 取消默认事件 -->
            提交
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      stu: {},
    };
  },
  methods: {
    ...mapMutations(["setShow"]),
    ...mapActions(["getStuList"]),
    edit(key, value) {
      // 记录修改的内容
      this.stu[key] = value;
    },
    async commit() {
      // 对象合并，源对象activeStu和新对象stu合并
      const newStu = { ...this.activeStu, ...this.stu };
      try {
        const { msg } = await this.$api.updateStu(newStu); //发送请求
        this.$toast({ msg, type: "suc" });
        this.setShow(false);
        // 分页之后处理
        // 1.硬性重新加载
        // window.location.reload();
        // 2. 也可以当前组件重新拉取数据 正常。
        // this.getStuList();
        // 3. 也可以本地直接合并对象，减少请求
        Object.assign(this.activeStu, this.stu);
      } catch (error) {
        this.$toast({ msg: error, type: "err" });
      }
    },
  },
  computed: {
    ...mapState(["activeStu"]),
  },
};
</script>

<style></style>
