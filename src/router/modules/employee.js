import layout from '@/layout'
export default {
  path: '/employee',
  component: layout,
  children: [{
    path: '',
    name: 'employee',
    component: () => import('@/views/employee'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  }, {
    path: '/employee/detail/:id?', // 员工详情的地址
    component: () => import('@/views/employee/detail.vue'),
    hidden: true, // 隐藏在左侧菜单
    meta: {
      title: '员工详情' // 显示在导航文本
    }
  }]
}
