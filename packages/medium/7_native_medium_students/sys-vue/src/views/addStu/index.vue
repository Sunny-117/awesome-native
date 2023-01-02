<template>
  <div id="student-add">
    <form action="#" id="add-student-form">
      <div>
        <label for="name">姓名</label
        ><input type="text" id="name" name="name" v-model="stu.name" />
      </div>
      <div>
        <label for="">性别</label>
        <input type="radio" name="sex" id="male" value="0" v-model="stu.sex" />
        <label for="male" class="sex">男</label>
        <input
          type="radio"
          name="sex"
          id="female"
          value="1"
          v-model="stu.sex"
        />
        <label for="female" class="sex">女</label>
      </div>
      <div>
        <label for="email">邮箱</label
        ><input type="email" id="email" name="email" v-model="stu.email" />
      </div>
      <div>
        <label for="number">学号</label
        ><input type="text" id="number" name="sNo" v-model="stu.sNo" />
      </div>
      <div>
        <label for="birthYear">出生年</label
        ><input type="text" id="birthYear" name="birth" v-model="stu.birth" />
      </div>
      <div>
        <label for="phone">手机号</label
        ><input type="text" id="phone" name="phone" v-model="stu.phone" />
      </div>
      <div>
        <label for="address">住址</label
        ><input type="text" id="address" name="address" v-model="stu.address" />
      </div>
      <div>
        <label for=""></label>
        <button id="add-submit" class="btn" @click.prevent="addStu">
          提交
        </button>
        <input type="reset" class="btn" @click.prevent="reset" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stu: {
        name: "",
        sex: "0",
        birth: "",
        phone: "",
        email: "",
        sNo: "",
        address: "",
      },
    };
  },
  methods: {
    async addStu() {
      try {
        await this.$api.addStu(this.stu);
        this.$toast({ type: "suc", msg: "添加成功" });
        const flag = window.confirm("是否继续添加");
        if (flag) {
          this.reset();
        } else {
          this.$router.push({ name: "stuList" });
        }
      } catch (error) {
        this.$toast({ type: "err", msg: error });
      }
    },
    reset() {
      this.stu = {
        name: "",
        sex: "0",
        birth: "",
        phone: "",
        email: "",
        sNo: "",
        address: "",
      };
    },
  },
};
</script>

<style></style>
