<template>
  <div class="container">
    <div class="app-container">
      <el-button class="btn-add" size="mini" type="primary" @click="addPermission(0, 1)">添加权限</el-button>
      <el-table default-expand-all :data="list" row-key="id">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="标识" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type === 1" size="mini" type="text" @click="addPermission(0, 2)">添加</el-button>
            <el-button size="mini" type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹层 -->
    <el-dialog :title="showTitle" :visible="showDialog" @close="close">
      <!-- 表单内容 -->
      <el-form ref="addPerm" :model="formData" label-width="120px" :rules="rules">
        <el-form-item prop="name" label="权限名称">
          <el-input v-model="formData.name" style="width: 80%" size="mini" />
        </el-form-item>
        <el-form-item prop="code" label="权限标识">
          <el-input v-model="formData.code" style="width: 80%" size="mini" />
        </el-form-item>
        <el-form-item prop="description" label="权限描述">
          <el-input v-model="formData.description" type="textarea" :rows="4" style="width: 80%" size="mini" />
        </el-form-item>
        <el-form-item prop="enVisible" label="启用">
          <el-switch v-model="formData.enVisible" size="mini" active-value="1" inactive-value="0" />
        </el-form-item>
        <el-form-item>
          <!-- 按钮 -->
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button size="mini" type="primary" @click="btnOK">确定</el-button>
              <el-button size="mini" @click="close">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission, updatePermission, getPermissionDetail, delPermission } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
export default {
  name: 'Permission',
  data() {
    return {
      formData: {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '', // 父级部门id
        enVisible: '0'
      },
      list: [], // 数据属性
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false // 弹层的显隐
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑权限' : '新增权限'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), 0)
    },
    addPermission(pid, type) {
      // 操作部门方法
      this.formData.pid = pid
      this.formData.type = type
      this.showDialog = true
    },
    // 点击编辑权限
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    // 删除按钮
    async delPermission(id) {
      try {
        await this.$confirm('确定要删除？')
        await delPermission(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 确定按钮
    btnOK() {
      this.$refs.addPerm.validate().then(() => {
        if (this.formData.id) {
          // 编辑场景
          return updatePermission(this.formData)
        }
        // 新增选项
        return addPermission(this.formData)
      }).then(() => {
        // 提示消息
        this.$message.success(this.formData.id ? '更新部门成功' : '新增部门成功')
        this.getPermissionList()
        this.showDialog = false
      })
    },
    // 取消按钮
    close() {
      this.formData = {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      }
      this.$refs.addPerm.resetFields() // 重置表单
      this.showDialog = false
    },
    // 编辑时获取详情
    async getPermissionDetail() {
      this.formData = await getPermissionDetail(this.currentNodeId)
    }
  }
}
</script>

<style>
.btn-add {
  margin: 10px;
}
</style>
