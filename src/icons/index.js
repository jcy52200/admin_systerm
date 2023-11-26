import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 全局注册组件
Vue.component('svg-icon', SvgIcon)

// require.context（目标目录，是否扫描子目录，正则）扫描目录中的文件
const req = require.context('./svg', false, /\.svg$/)
// 将所有svg引用到项目中
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
