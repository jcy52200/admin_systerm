import request from '@/utils/request'

/**
 *
 * 获取员工数据
 *
 */
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 *
 * 导出员工excel
 *
 */
export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    responseType: 'blob' // 改变接收数据的类型，使用blob接受二进制文件流
  })
}

/**
 *
 * 下载员工导入模板
 *
 */
export function getExportTemplate() {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob'
  })
}

/**
 *
 * 上传用户的excel
 *
 */
export function uploadExcel(data) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data // form-data类型，因为要上传文件类型
  })
}
/**
 *
 * 删除员工
 *
 */
export function delEmployee(id) {
  return request({
    url: `sys/user/${id}`,
    method: 'delete'
  })
}
/**
 *
 * 新增员工
 *
 */
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
/**
 *
 * 获取员工详情
 *
 */
export function getEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
/**
 *
 * 更新员工
 *
 */
export function updateEmployee(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
/**
 *
 * 分配权限 - 获取角色
 *
 */
export function getEnableRoleList() {
  return request({
    url: '/sys/role/list/enabled'
  })
}
/**
 *
 * 分配权限 - 分配角色
 *
 */
export function assignRole(data) {
  return request({
    method: 'put',
    url: '/sys/user/assignRoles',
    data
  })
}
