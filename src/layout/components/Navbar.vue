<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <span class="name">{{ name }}</span>
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://gitee.com/oops52200/vue2-admin.git/">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <!-- prevent:阻止默认事件 -->
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <!-- native：注册组件的根元素的原生事件，el中本无@click -->
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 放置dialog -->
    <!-- sync:接收子组件传过来的事件的值 -->
    <el-dialog width="500px" title="修改密码" :visible.sync="showDialog" @close="btn">
      <el-form ref="passForm" label-width="120px" :model="passForm" :rules="rules">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passForm.oldPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passForm.newPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passForm.confirmPassword" show-password size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="btnOK">确认修改</el-button>
          <el-button size="mini" @click="btnCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { updatePassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      showDialog: false, // 控制弹层的显示和隐藏
      passForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '' // 确认密码字段
      },
      rules: {
        oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
        newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }, {
          trigger: 'blur',
          min: 6,
          max: 16,
          message: '新密码的长度为6-16位之间',
          validator: (rules, value, callback) => {
            if (this.passForm.oldPassword === value) {
              callback()
            } else {
              callback(new Error('新密码与旧密码不'))
            }
          }
        }],
        confirmPassword: [{ required: true, message: '确认密码不能为空', trigger: 'blur' }, {
          trigger: 'blur',
          validator: (rules, value, callback) => {
            if (this.passForm.newPassword === value) {
              callback()
            } else {
              callback(new Error('确认密码与新密码不一致'))
            }
          }
        }]
      }
    }
  },
  computed: {
    // 引入头像和用户名称
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    updatePassword() {
      this.showDialog = true
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // 调用退出登录的action
      await store.dispatch('user/logout')
      router.push('/login')
      Message({ type: 'success', message: '已退出登录' })
    },
    // 确定
    btnOK() {
      this.$refs.passForm.validator(async isOK => {
        if (isOK) {
          // 调用接口
          await updatePassword(this.passForm)
          this.$message.success('修改密码成功')
          // 成功了
          this.$refs.passForm.resetFields() // 重置表单的方法
          this.showDialog = false
        }
      })
    },
    // 取消
    btnCancel() {
      this.$refs.passForm.resetFields() // 重置表单的方法
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        .name {
          //
          margin-right: 10px;
          font-size: 16px;
        }
        .username {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 6px;
          text-align: center;
          background-color: aqua;
          color: #fff;
          line-height: 40px;
          font-size: 20px;
        }
        .el-icon-setting {
          font-size: 20px;
        }
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 6px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
