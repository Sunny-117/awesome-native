<template>
  <form action="#" id="login">
    <h2>
      登录
      <router-link to="/logon">注册</router-link>
    </h2>
    <div>
      <label for="account"> 账号: </label>
      <input type="text" id="account" v-model="account" />
    </div>
    <div>
      <label for="password">密码:</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <div>
      <label for=""></label>
      <input class="btn" type="submit" value="提交" @click.prevent="login" />
      <input class="btn" type="reset" value="重置" @click.prevent="reset" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    async login() {
      if (this.account && this.password) {
        try {
          await this.$api.login(
            `account=${this.account}&password=${this.password}`
          );
          this.Cookie.setCookie("username", this.account); //保存到cookie，保存登录状态
          this.$router.push("/main");
        } catch (error) {
          this.$toast({ msg: error, type: "err" });
        }
      } else {
        this.$toast({ msg: "错误信息：请输入用户名或者密码", type: "err" });
      }
    },
    reset() {
      this.account = "";
      this.password = "";
    },
  },
  created() {
    this.Cookie.removeCookie("username"); //退出登录即没有登录的时候删除cookie
  },
};
</script>

<style scoped src="./login.css">
/* @import url(./login.css); */
</style>
