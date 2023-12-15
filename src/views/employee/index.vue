<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small" placeholder="输入员工姓名全员搜索" />
        <!-- 树形组件 -->
        <el-tree
          ref="deptTree"
          node-key="id"
          highlight-current
          :expand-on-click-node="false"
          default-expand-all
          :data="depts"
          :props="defineProps"
          @current-change="selectNode"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="list">
          <el-table-column prop="staffPhotp" align="center" label="头像" />
          <el-table-column prop="username" label="姓名" />
          <el-table-column label="手机号" sortable />
          <el-table-column label="工号" sortable />
          <el-table-column label="聘用形式" />
          <el-table-column label="部门" />
          <el-table-column label="入职时间" sortable />
          <el-table-column label="操作" width="280px">
            <template>
              <el-button size="mini" type="text">查看</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row style="height: 60px" align="middle" type="flex" justify="end">
          <el-pagination
            layout="total,prev, pager, next"
            :total="1000"
          />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import { getEmployeeList } from '@/api/employee'
export default {
  name: 'Employee',
  data() {
    return {
      depts: [], // 组织数据
      list: [],
      defineProps: {
        label: 'name',
        children: 'children'
      },
      queryParams: {
        departmentId: null
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      // 递归方法，将列表转化为树形
      const result = await getDepartment()
      this.depts = transListToTreeData(result, 0)
      this.queryParams.departmentId = this.depts[0].id
      // 设置选中节点
      this.$nextTick(() => { // 树的渲染时异步的，要等待更新完毕
        // 此时树渲染完毕
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
    },
    // 获取员工列表
    async getEmployeeList() {
      const { rows } = await getEmployeeList(this.queryParams)
      console.log(rows)
      this.list = rows
    },
    selectNode(node) {
      this.queryParams.departmentId = node.id
      this.getEmployeeList()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}

</style>
