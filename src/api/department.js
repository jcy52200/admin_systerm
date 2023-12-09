import request from '@/utils/request'

/**
 * 获取组织架构
 */
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}

/**
 * 获取部门负责人
 */
export function getManargerList() {
  return request({
    url: '/sys/user/simple'
  })
}
