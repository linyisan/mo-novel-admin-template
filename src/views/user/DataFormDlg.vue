<template>
  <el-dialog ref="dataDlg" v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose">
    <el-row :gutter="15">
      <el-form
        ref="dataForm"
        :model="dataform"
        :rules="rules"
        size="medium"
        label-width="80px"
        label-position="left"
      >
        <el-col :span="24">
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="dataform.username"
              placeholder="请输入用户名"
              :maxlength="15"
              show-word-limit
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="dataform.password"
              placeholder="请输入密码"
              :maxlength="25"
              clearable
              show-password
              :style="{width: '100%'}"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="!dataform.id" :span="24">
          <el-form-item label="确认密码" prop="checkPassword" required>
            <el-input
              v-model="dataform.checkPassword"
              placeholder="请输入确认密码"
              clearable
              show-password
              :style="{width: '100%'}"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="dataform.email" placeholder="请输入邮箱" clearable :style="{width: '100%'}" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model="dataform.mobile"
              placeholder="请输入手机号"
              :maxlength="11"
              show-word-limit
              clearable
              :style="{width: '100%'}"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="dataform.sex" placeholder="请选择性别" clearable :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in sexOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="dataform.roleId" placeholder="请选择角色" clearable :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in roleIdOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="状态" prop="status" required>
            <el-switch
              v-model="dataform.status"
              active-text="激活"
              inactive-text="禁用"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="头像" prop="avatar">
            <el-upload
              ref="avatar"
              :file-list="avatarfileList"
              :limit="1"
              :action="avatarAction"
              :before-upload="avatarBeforeUpload"
              list-type="picture-card"
              accept="image/*"
              name="avatar"
              :auto-upload="false"
            >
              <i class="el-icon-plus" />
              <div slot="tip" class="el-upload__tip">只能上传不超过 2MB 的image/*文件</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handelConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  inheritAttrs: false,
  props: {
    dataform: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      /*      dataform: {
        username: undefined,
        password: undefined,
        checkPassword: undefined,
        email: undefined,
        mobile: '',
        sex: '',
        roleId: '',
        status: 1,
        avatar: null
      },*/
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        checkPassword: [{ validator: this.validateCheckPass, trigger: 'blur' }],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }, {
          pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          message: '邮箱格式错误',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1[3-9]\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }],
        sex: [{
          required: true,
          message: '请选择性别',
          trigger: 'change'
        }],
        roleId: [{
          required: true,
          message: '请选择角色',
          trigger: 'change'
        }]
      },
      avatarAction: 'https://jsonplaceholder.typicode.com/posts/',
      avatarfileList: [],
      sexOptions: [{
        'label': '男',
        'value': 0
      }, {
        'label': '女',
        'value': 1
      }],
      roleIdOptions: [{
        'label': '管理员',
        'value': 1
      }, {
        'label': '读者',
        'value': 2
      }]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {
      console.log(JSON.stringify(this.dataform))
    },
    onClose() {
      this.$refs['dataForm'].resetFields()
      this.$refs['dataForm'].clearValidate()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['dataForm'].validate(valid => {
        if (!valid) return
        // v-model外传
        // console.log('子组件', this.dataform.username)
        delete this.dataform.checkPassword
        delete this.dataform.updateTime
        delete this.dataform.createTime
        this.$emit('msubmit', this.dataform)
        this.close()
      })
    },
    avatarBeforeUpload(file) {
      const isRightSize = true // file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      const isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isRightSize && isAccept
    },
    validateCheckPass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dataform.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback
      }
    }
  }
}

</script>
<style>
  .el-upload__tip {
    line-height: 1.2;
  }

</style>
