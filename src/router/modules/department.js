import layout from '@/layout'

export default {
  // 路由信息
  path: '/department',
  name: 'department',
  component: layout, // 一级路由
  children: [{
    path: '', // 二级路由地址为空，表示 /department 显示一级路由 + 二级路由
    component: () => import('@/views/department'),
    name: 'department', // 可以用来跳转，也可以标记路由
    meta: {
      // 路由元信息，存储数据
      icon: 'tree',
      title: '组织'
    }
  }]
}
