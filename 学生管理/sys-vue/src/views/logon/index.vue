<template>
  <form action="#" id="register">
    <h2>
      注册
      <router-link to="/login">登录</router-link>
    </h2>
    <div>
      <label for="username"> 用户名: </label>
      <input type="text" id="username" name="username" v-model="username" />
    </div>
    <div>
      <label for="account"> 账号: </label>
      <input type="text" id="account" name="account" v-model="account" />
    </div>
    <div>
      <label for="password">密码:</label>
      <input type="password" id="password" name="password" v-model="password" />
    </div>
    <div>
      <label for="rePassword">确认密码:</label>
      <input
        type="password"
        id="rePassword"
        name="rePassword"
        v-model="rePassword"
      />
    </div>
    <div>
      <label for=""></label>
      <input class="btn" type="submit" value="注册" @click.prevent="logon" />
      <input class="btn" type="reset" value="重置" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      username: "",
      password: "",
      rePassword: "",
    };
  },
  methods: {
    async logon() {
      if (this.account && this.username && this.password && this.rePassword) {
        if (this.rePassword === this.password) {
          try {
            await this.$api.logon(
              `account=${this.account}&password=${this.password}&rePassword=${this.rePassword}&username=${this.username}`
            );
            const flag = window.confirm("是否跳转到登录页面进行登录？？？");
            if (flag) {
              this.$router.push("/login");
            }
          } catch (error) {
            this.$toast({ msg: error, type: "err" });
          }
        } else {
          this.$toast({ msg: "两次密码不一致", type: "err" });
        }
      } else {
        this.$toast({ msg: "表单信息不全", type: "err" });
      }
    },
    // reset() {
    //   this.account = ''
    //   this.username = ''
    //   this.password = ''
    //   this.rePassword = ''
    // }
  },
};
</script>

<style scoped src="../login/login.css"></style>
