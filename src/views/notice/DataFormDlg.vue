<template>
  <div>
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose">
      <el-form
        ref="dataForm"
        :model="tempFormData"
        :rules="rules"
        size="medium"
        label-width="85px"
        label-position="top"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="tempFormData.title" placeholder="请输入标题" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            v-model="tempFormData.content"
            type="textarea"
            placeholder="请输入消息内容"
            :maxlength="1000"
            show-word-limit
            :autosize="{minRows: 20, maxRows: 50}"
            :style="{width: '100%'}"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  inheritAttrs: false,
  props: {
    tempFormData: {
      require: true,
      type: Object
    }
  },
  data() {
    return {
      rules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入消息内容',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
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
        this.$emit('msubmit', this.tempFormData)
        this.close()
      })
    }
  }
}

</script>
<style>
</style>
