// 发送请求
// AXIOS
import axios from 'axios';
import URLs from './URLs';
// const appkey = 'Q_A_Q_1590927055348';
const appkey = 'DuYiyongzhi_1564986206465';

const ajax = axios.create({
  baseURL: URLs.baseURL,
  params: {
    appkey
  }
});

// axios拦截器。
// 响应回来时，处理一下返回的数据结果
ajax.interceptors.response.use((data) => {
  const newData = data.data;
  if (newData.status === 'success') {
    return newData;
  }
  return Promise.reject(newData.msg);
}, (data) => Promise.reject(data));

const login = (data) => ajax.post(URLs.login, `appkey=${appkey}&${data}`);
const logon = (data) => ajax.post(URLs.logon, `appkey=${appkey}&${data}`);
const getStu = (page, size) => ajax.get(URLs.getStu, { params: { page, size } })
const updateStu = (options) => ajax.get(URLs.updateStu, {
  params: {
    ...options,
  }
})
const delStu = sNo => ajax.get(URLs.delStu, {
  params: {
    sNo
  }
});
const addStu = stu => ajax.get(URLs.addStu, {
  params: {
    ...stu,
  },
})
export default {
  login,
  logon,
  getStu,
  updateStu,
  delStu,
  addStu,
}
