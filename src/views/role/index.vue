<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理内容 -->
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog = true">添加角色</el-button>
      </div>
      <!-- 放置table组件 -->
      <el-table :data="list">
        <el-table-column prop="name" align="center" width="200" label="角色">
          <template v-slot="{row}">
            <!-- 条件判断：展示角色名称 or 展示input -->
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" width="200" label="启用">
          <!-- 自定义列表结构 -->
          <template v-slot="{row}">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" />
            <span v-else>{{ row.state === 0 ? '未启用' : '已启用' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
          <template v-slot="{row}">
            <el-input v-if="row.isEdit" v-model="row.editRow.description" size="mini" type="textarea" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <!-- 放置操作按钮 -->
          <template v-slot="{row}">
            <!-- 编辑状态 -->
            <template v-if="row.isEdit">
              <el-button type="primary" size="mini" @click="btnEditOK(row)">确认</el-button>
              <el-button size="mini" @click="row.isEdit = false">取消</el-button>
            </template>
            <!-- 非编辑状态 -->
            <template v-else>
              <el-button size="mini" type="text" @click="btnPremission(row.id)">分配权限</el-button>
              <el-button size="mini" type="text" @click="btnEditRow(row)">编辑</el-button>
              <el-popconfirm title="确认删除吗?" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" style="margin-left: 10px;" size="mini" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row type="flex" style="height: 60px;" align="middle" justify="end">
        <el-pagination
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          :total="pageParams.total"
          layout="prev, pager, next"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <!-- 放置弹层 -->
    <el-dialog width="500px" title="新增角色" :visible.sync="showDialog" @close="addClose">
      <!-- 表单内容 -->
      <el-form ref="roleForm" :model="roleForm" label-width="120px" :rules="rules">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" style="width: 300px;" size="mini" />
        </el-form-item>
        <el-form-item label="启用" prop="state">
          <!-- 重置表单数据 需要prop -->
          <el-switch v-model="roleForm.state" :active-value="1" :inactive-value="0" size="mini" />
        </el-form-item>
        <el-form-item prop="description" label="角色描述">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" style="width: 300px;" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="15">
              <el-button type="primary" size="mini" @click="btnOK">确定</el-button>
              <el-button size="mini" @click="addClose">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 放置权限弹层 -->
    <el-dialog :visible.sync="showPermissionDialog" title="分配权限">
      <!-- 放置权限数据 -->
      <el-tree node-key="id" :default-checked-keys="permIds" :data="permissonData" :props="{label: 'name'}" show-checkbox default-expand-all />
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="btnPermissionOK">确认</el-button>
          <el-button size="mini" @click="showPermissionDialog = false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { addRole, getRoleList, editRole, delRole, getRoleDetail, assignPerm } from '@/api/role'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Role',
  data() {
    return {
      list: [],
      showDialog: false,
      // 分页信息
      pageParams: {
        page: 1, // 页码
        pagesize: 5, // 每页条数
        total: 0
      },
      roleForm: {
        name: '',
        description: '',
        state: 0
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
      },
      // 权限变量
      showPermissionDialog: false, // 权限弹层
      permissonData: [],
      currentRoleId: null, // 当前角色id
      permIds: [] // 当前角色拥有的权限
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams)
      this.list = rows
      this.pageParams.total = total
      console.log(rows)
      // 针对每一行数据添加一个标记
      this.list.forEach(item => {
        // item.isEdit = false // 添加一个isEdit属性，初始值为false
        // 动态的添加属性，不具备响应式特点
        // vue提供了this.$set(目标对象，属性名称，初始值)可以针对目标对象添加响应的属性
        this.$set(item, 'isEdit', false)
        // 添加缓存数据
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
    },
    changePage(newPage) {
      this.pageParams.page = newPage // 赋值当前页码
      this.getRoleList()
    },
    btnOK() {
      this.$refs.roleForm.validate(async isOK => {
        if (isOK) {
          await addRole(this.roleForm)
          this.$message.success('新增角色成功')
          this.getRoleList()
          this.addClose()
        }
      })
    },
    addClose() {
      this.$refs.roleForm.resetFields() // 重置表单
      this.showDialog = false // 关闭弹层
    },
    // 点击编辑行
    btnEditRow(row) {
      row.isEdit = true // 开启行内编辑
      // 更新缓存数据
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    async btnEditOK(row) {
      if (row.editRow.name && row.editRow.description) {
        // 调用更新接口
        await editRole({ ...row.editRow, id: row.id })
        this.$message.success('角色编辑完成')
        Object.assign(row, {
          ...row.editRow,
          isEdit: false // 推出编辑模式
        }) // 规避eslint误判
      } else {
        this.$message.warning('角色或描述不能为空')
      }
    },
    // 点击确定触发
    async confirmDel(id) {
      await delRole(id)
      this.$message.success('删除角色成功')
      // 如果删除的是本页最后一条，跳转至上一页
      if (this.list.length === 1) {
        this.pageParams.page--
      }
      this.getRoleList()
    },
    // 分配权限按钮
    async btnPremission(id) {
      this.showPermissionDialog = true
      const { permIds } = await getRoleDetail(id)
      this.permIds = permIds
      this.permissonData = transListToTreeData(await getPermissionList(), 0)
      this.currentRoleId = id
    },
    // 确认权限分配
    async btnPermissionOK() {
      await assignPerm({
        id: this.currentRoleId,
        permIds: this.$refs.permIds.getCheckedKeys()
      })
      this.$message.success('角色分配权限成功')
      this.showPermissionDialog = false
    }
  }
}
</script>

<style scoped>
.role-operate {
  padding: 30px;
}
</style>
