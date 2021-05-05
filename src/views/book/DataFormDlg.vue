<template>
  <div>
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose">
      <el-row :gutter="15">
        <el-form
          ref="dataForm"
          :model="tempFormData"
          :rules="rules"
          size="medium"
          label-width="80px"
          label-position="left"
        >
          <el-col :span="24">
            <el-form-item label="小说名" prop="title">
              <el-input
                v-model="tempFormData.title"
                placeholder="请输入小说名"
                :maxlength="30"
                show-word-limit
                clearable
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="作者名" prop="authorName">
              <el-input
                v-model="tempFormData.authorName"
                placeholder="请输入作者名"
                :maxlength="10"
                show-word-limit
                clearable
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="频道" prop="channel">
              <el-select v-model="tempFormData.channel" placeholder="频道" clearable :style="{width: '100%'}">
                <el-option
                  v-for="(item, index) in channelOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分类" prop="categoryId">
              <el-select
                v-model="tempFormData.categoryId"
                placeholder="分类"
                clearable
                :style="{width: '100%'}"
              >
                <el-option
                  v-for="(item, index) in categoryIdOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="status">
              <el-select v-model="tempFormData.status" placeholder="状态" clearable :style="{width: '100%'}">
                <el-option
                  v-for="(item, index) in statusOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="小说简介" prop="introduction">
              <el-input
                v-model="tempFormData.introduction"
                type="textarea"
                placeholder="请输入小说简介"
                :maxlength="1000"
                show-word-limit
                :autosize="{minRows: 4, maxRows: 4}"
                :style="{width: '100%'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="封面" prop="cover">
              <el-upload
                ref="cover"
                :file-list="coverfileList"
                :action="coverAction"
                :before-upload="coverBeforeUpload"
                list-type="picture-card"
                accept="image/*"
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
          message: '请输入小说名',
          trigger: 'blur'
        }],
        authorName: [{
          required: true,
          message: '请输入作者名',
          trigger: 'blur'
        }],
        channel: [{
          required: true,
          message: '频道',
          trigger: 'change'
        }],
        categoryId: [{
          required: true,
          message: '分类',
          trigger: 'change'
        }],
        status: [{
          required: true,
          message: '状态',
          trigger: 'change'
        }],
        introduction: [{
          required: true,
          message: '请输入小说简介',
          trigger: 'blur'
        }]
      },
      coverAction: 'https://jsonplaceholder.typicode.com/posts/',
      coverfileList: [],
      channelOptions: [{
        'label': '男频',
        'value': 0
      }, {
        'label': '女频',
        'value': 1
      }],
      categoryIdOptions: [{
        'label': '玄幻奇幻',
        'value': 1
      }, {
        'label': '武侠仙侠',
        'value': 3
      }, {
        'label': '都市言情',
        'value': 4
      }, {
        'label': '历史军事',
        'value': 5
      }, {
        'label': '科幻灵异',
        'value': 6
      }, {
        'label': '网游竞技',
        'value': 7
      }],
      statusOptions: [{
        'label': '下架',
        'value': 0
      }, {
        'label': '连载中',
        'value': 1
      }, {
        'label': '已完结',
        'value': 2
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
      this.$refs['dataForm'].clearValidate()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['dataForm'].validate(valid => {
        if (!valid) return
        delete this.tempFormData.createTime
        delete this.tempFormData.updateTime
        this.$emit('msubmit', this.tempFormData)
        this.close()
      })
    },
    coverBeforeUpload(file) {
      const isRightSize = true // file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      const isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isRightSize && isAccept
    }
  }
}

</script>
<style>
  .el-upload__tip {
    line-height: 1.2;
  }

</style>
