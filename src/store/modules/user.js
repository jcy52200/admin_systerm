import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// 声明token
const state = {
  token: getToken() // 从缓存中读取初始值
}

// 修改state数据方法
const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken(state) {
    // 删除vuex的token
    state.token = null
    removeToken()
  }
}

const actions = {
  // context 上下文
  async login(context, data) {
    console.log(data)
    // todo:调用登录接口
    const token = await login(data)
    context.commit('setToken', token)
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
