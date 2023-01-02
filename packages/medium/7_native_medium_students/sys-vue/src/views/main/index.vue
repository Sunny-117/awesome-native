<template>
  <div>
    <div class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
        <span>渡一教育</span>
      </div>
      <ul class="user">
        <li class="username" id="username">{{ this.username }}</li>
        <router-link to="/login" class="logout" tag="li">退出</router-link>
      </ul>
    </div>
    <div class="left-menu">
      <dl class="menu">
        <dt>学生管理</dt>
        <router-link tag="dd" :to="{ name: 'stuList' }">学生列表</router-link>
        <router-link tag="dd" to="/main/addStu">新增学生</router-link>
      </dl>
    </div>
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  created() {
    const username = this.Cookie.getCookie("username");
    if (username) {
      //已经登录
      this.username = username;
    } else {
      this.$router.push("/login");
    }
  },
};
</script>

<!-- vue-loader -->
<style>
@import url(./index.css);
</style>
