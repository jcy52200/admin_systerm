import request from '@/utils/request'

/**
 *
 * 获取角色列表
 *
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params // 查询参数， data是请求体参数
  })
}

/**
 *
 * 新增角色
 *
 */
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

/**
 *
 * 编辑角色
 *
 */
export function editRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
