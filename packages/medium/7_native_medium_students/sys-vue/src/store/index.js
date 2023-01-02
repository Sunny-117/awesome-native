import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    show: false,
    activeStu: {},//这是干啥的
    stuList: [],
    count: 0,
    nowPage: 1,
    size: 4,
  },
  // 定义同步的方法，改变state中的值
  mutations: {
    // 同步方法，可以改变state中的值，
    setShow(state, val) {
      state.show = val
    },
    setActiveStu(state, stu) {
      state.activeStu = stu
    },
    setNowPage(state, p) {
      state.nowPage = p;
    },
    setCount(state, count) {
      state.count = count;
    },
    setStuList(state, list) {
      state.stuList = list;
    }
  },
  // 相当于computed，计算属性，根据已有属性按照一定规则重新处理得到的数据
  getters: {
    totalPage(state) {
      return Math.ceil(state.count / state.size);
    }
  },
  // 定义异步方法，返回结果调用mutations当中的方法，
  actions: {
    async getStuList({ state, commit }) {
      const { data: { cont, findByPage } } = await API.getStu(state.nowPage, state.size);
      commit('setCount', cont);
      commit('setStuList', findByPage);
    },

    /**
     * 处理删除之后页码的变化（当前页码内没有数据了，就页码-1）
     * @param {*} param0 
     * @param {*} sNo 
     */
    async delStu({ commit, state, getters, dispatch }, sNo) {
      await API.delStu(sNo);
      // count - 1 

      commit('setCount', state.count - 1);
      if (state.nowPage > getters.totalPage) {//当前页数>总页数
        commit('setNowPage', state.nowPage - 1);//获取上一页
      }
      dispatch('getStuList');//重新获取数据
    }
  },
  // 分模块
  // modules: {
  //   news: { namespaced: true, },
  //   // state.new.xxx, state => state.news.xxx
  //   map: {},
  //   kw: {},
  // }
})
