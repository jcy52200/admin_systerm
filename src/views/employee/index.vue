<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input
          v-model="queryParams.keyword"
          style="margin-bottom:10px"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名全员搜索"
          @input="changeValue"
        />
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
          <el-button size="mini" type="primary" @click="$router.push('/employee/detail')">添加员工</el-button>
          <el-button size="mini" @click="showExcelDialog = true">excel导入</el-button>
          <el-button size="mini" @click="exportEmployee">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="list">
          <el-table-column prop="staffPhotp" align="center" label="头像">
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhotp" :src="row.staffPhotp" :size="30" />
              <span v-else class="username">{{ row.username?.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="mobile" label="手机号" sortable />
          <el-table-column prop="workNumber" label="工号" sortable />
          <el-table-column prop="formOfEmployment" label="聘用形式">
            <template v-slot="{ row }">
              <span v-if="row.formOfEmployment === 1">正式</span>
              <span v-else-if="row.formOfEmployment === 2">非正式</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable />
          <el-table-column label="操作" width="280px">
            <template v-slot="{ row }">
              <el-button size="mini" type="text">查看</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-popconfirm title="确认要删除吗" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" style="margin-left: 10px;" size="mini" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row style="height: 60px" align="middle" type="flex" justify="end">
          <el-pagination
            :page-size="queryParams.pagesize"
            :current-page="queryParams.page"
            layout="total,prev, pager, next"
            :total="total"
            @current-change="changePage"
          />
        </el-row>
      </div>
    </div>
    <!-- 放置弹层 -->
    <import-excel :show-excel-dialog.sync="showExcelDialog" @uploadSuccess="getEmployeeList" />
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import { getEmployeeList, exportEmployee, delEmployee } from '@/api/employee'
import ImportExcel from './components/import-excel.vue'
export default {
  name: 'Employee',
  components: {
    ImportExcel
  },
  data() {
    return {
      showExcelDialog: false, // 控制弹层的显示和隐藏
      depts: [], // 组织数据
      list: [],
      defineProps: {
        label: 'name',
        children: 'children'
      },
      queryParams: {
        departmentId: 1,
        page: 1, // 页码
        pagesize: 10, // 每页条数
        keyword: '' // 模糊搜索参数字段
      },
      total: 0 // 员工总数
    }
  },
  created() {
    this.getDepartment()
    this.getEmployeeList()
  },
  methods: {
    async getDepartment() {
      // 递归方法，将列表转化为树形
      const result = await getDepartment()
      this.depts = transListToTreeData(result, 0)
      console.log(this.depts[0])
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
      this.list = rows
    },
    selectNode(node) {
      this.queryParams.departmentId = node.id // 切换节点时再次记录id位置
      this.queryParams.page = 1
      this.getEmployeeList()
    },
    changePage(newPage) {
      // 切换页码
      this.queryParams.page = newPage
      this.getDepartment()
    },
    changeValue() {
      // 防抖处理
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.getEmployeeList()
      }, 500)
    },
    async exportEmployee() {
      // 导出excel
      const result = await exportEmployee()
      console.log(result)
      // FileSaver.saveAs(blob对象，文件名称)
      FileSaver.saveAs(result, '员工信息表.xlsx')
    },
    async confirmDel(id) {
      await delEmployee(id)
      this.$message.success('删除成功')
      if (this.list.length === 1 && this.queryParams.page > 1) {
        this.queryParams.page--
      }
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
