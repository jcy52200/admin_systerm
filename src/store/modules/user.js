import { getUserInfo, login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// 声明token
const state = {
  token: getToken(), // 从缓存中读取初始值
  userInfo: {} // 存储用户基本资料状态
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
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  // context 上下文
  async login(context, data) {
    // 调用登录接口
    const token = await login(data)
    context.commit('setToken', token)
  },
  // 获取用户的基本资料
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
  },
  // 退出登录的action
  logout(context) {
    context.commit('removeToken') // 删除token
    context.commit('setUserInfo', {}) // 设置用户信息为空对象
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
