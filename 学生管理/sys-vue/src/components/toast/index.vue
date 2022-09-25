<template>
  <div class="item" :class="[type, animate]">
    <i class="iconfont" :class="iconType"></i>
    <span style="margin-left: 20px">{{ msg }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: true,
    };
  },
  computed: {
    iconType() {
      if (this.type === "suc") {
        return "icon-dui";
      }
      if (this.type === "err") {
        return "icon-cuo";
      }
      if (this.type === "warn") {
        return "icon-warn";
      }
      return "icon-dui";
    },
    animate() {
      return this.flag ? "fade-in" : "fade-out";
    },
  },
};
</script>

<style scoped>
.item {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px;
  min-width: 200px;
  border-radius: 5px;
  z-index: 100;
}

.suc {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
.err {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}
.warn {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    top: 0;
  }
  100% {
    opacity: 1;
    top: 30px;
  }
}

@keyframes fadeOut {
  100% {
    opacity: 0;
    top: 0;
  }
  0% {
    opacity: 1;
    top: 30px;
  }
}
.fade-in {
  animation: fadeIn 0.5s forwards;
}

.fade-out {
  animation: fadeOut 0.5s forwards;
}
</style>
