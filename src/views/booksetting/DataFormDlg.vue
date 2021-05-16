<template>
  <div>
    <el-dialog v-bind="$attrs" title="Dialog Titile" v-on="$listeners" @open="onOpen" @close="onClose">
      <el-form
        ref="dataForm"
        :model="tempFormData"
        :rules="rules"
        size="medium"
        label-width="85px"
        label-position="top"
      >
        <el-form-item label="小说ID" prop="bookId">
          <el-input
            v-model="tempFormData.bookId"
            placeholder="请输入单行文本小说ID"
            clearable
            :style="{width: '100%'}"
          />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="tempFormData.type" placeholder="请选择类型" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in typeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input
            v-model="tempFormData.sort"
            placeholder="请输入排序"
            clearable
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
        bookId: [{
          required: true,
          message: '请输入单行文本小说ID',
          trigger: 'blur'
        }, {
          pattern: /\d.*/,
          message: '只能输入整数',
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: '请选择类型',
          trigger: 'change'
        }],
        sort: [{
          required: true,
          message: '请输入排序',
          trigger: 'blur'
        }, {
          pattern: /\d.*/,
          message: '只能输入整数',
          trigger: 'blur'
        }]
      },
      typeOptions: [{
        'label': '轮播图',
        'value': 1
      }, {
        'label': '本周强推',
        'value': 2
      }, {
        'label': '热门推荐',
        'value': 3
      }, {
        'label': '精品推荐',
        'value': 4
      }]
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
    },
    close() {
      this.$refs['dataForm'].resetFields()
      this.$refs['dataForm'].clearValidate()
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
