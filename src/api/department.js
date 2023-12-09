import request from '@/utils/request'

/**
<<<<<<< HEAD
 *
 * 获取组织架构数据
 *
*/
=======
 * 获取组织架构
 */
>>>>>>> 11f04670318e16bbb66db09e2eca95aed0e787e1
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}

/**
<<<<<<< HEAD
 *
 *  获取部门负责人的数据
 * **/

export function getManagerList() {
=======
 * 获取部门负责人
 */
export function getManargerList() {
>>>>>>> 11f04670318e16bbb66db09e2eca95aed0e787e1
  return request({
    url: '/sys/user/simple'
  })
}
<<<<<<< HEAD

/**
 * 新增组织
 * ***/
export function addDepartment(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}
=======
>>>>>>> 11f04670318e16bbb66db09e2eca95aed0e787e1
