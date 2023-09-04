import axios from 'axios'
// 设置请求拦截器
axios.interceptors.request.use(config => {
    // 获取token
    const token = localStorage.getItem('token')
    if (token) {
         // 如果存在令牌这添加token请求头
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
})

// 响应拦截器
axios.interceptors.response.use(null, err => {
    if (err.response.status === 401) {
      // 没有登录或者令牌过期
      // 清空缓存的token
     localStorage.removeItem('token')
      // 跳转login
      vm.$router.push("/login");
    }
    return Promise.reject(err);
  });