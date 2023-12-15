import request from '@/utils/request'

/**
 *
 * 获取员工数据
 *
 */
export function getEmployeeList(params) {
  return request({
    url: '/employee.js',
    params
  })
}
