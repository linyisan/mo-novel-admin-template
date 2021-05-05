<template>
  <div>
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose">
      <el-form
        ref="dataForm"
        :model="tempFormData"
        :rules="rules"
        size="medium"
        label-width="80px"
        label-position="top"
      >
        <el-form-item label="章节名" prop="title">
          <el-input
            v-model="tempFormData.title"
            placeholder="请输入章节名"
            :maxlength="30"
            show-word-limit
            clearable
            :style="{width: '100%'}"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status" required>
          <el-switch v-model="tempFormData.status" active-text="发布" inactive-text="草稿" :active-value="1" :inactive-value="0"/>
        </el-form-item>
        <el-form-item label="章节内容" prop="content">
          <el-input
            v-model="tempFormData.content"
            type="textarea"
            placeholder="请输入章节内容"
            show-word-limit
            :autosize="{minRows: 4, maxRows: 30}"
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
      required: true,
      type: Object
    }
  },
  data() {
    return {
      rules: {
        title: [{
          required: true,
          message: '请输入章节名',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入章节内容',
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
