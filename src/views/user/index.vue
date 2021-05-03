<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" :model="listQuery" inline>
        <el-form-item prop="username"><el-input
          v-model="listQuery.username"
          placeholder="请输入用户名搜索"
          clearable
          style="width: 160px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        /></el-form-item>
        <el-form-item prop="mobile"><el-input
          v-model="listQuery.mobile"
          placeholder="请输入手机号搜索"
          clearable
          style="width: 160px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        /></el-form-item>
        <el-form-item prop="email"><el-input
          v-model="listQuery.email"
          placeholder="请输入邮件搜索"
          clearable
          style="width: 160px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        /></el-form-item>
        <el-form-item prop="sex"><el-select v-model="listQuery.sex" placeholder="性别" clearable style="width: 80px" class="filter-item" @change="handleFilter">
          <el-option v-for="item in dicts.sexMap" :key="item.value" :label="item.label" :value="item.value" />
        </el-select></el-form-item>
        <el-form-item prop="roleId">        <el-select v-model="listQuery.roleId" placeholder="角色" clearable style="width: 80px" class="filter-item" @change="handleFilter">
          <el-option v-for="item in dicts.roleDict" :key="item.value" :label="item.label" :value="item.value" />
        </el-select></el-form-item>
        <el-form-item prop="sort"><el-select v-model="listQuery.sort" placeholder="排序" clearable style="width: 100px" class="filter-item" @change="handleFilter">
          <!--        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />-->
          <el-option label="更新时间" value="updateTime" />
        </el-select></el-form-item>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh-left" @click="handleReset('filterForm')">重置</el-button>
      </el-form>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        style="margin-left: 10px"
        @click="handleCreate"
      >添加
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="70px"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center" sortable prop="updateTime">
        <template slot-scope="{row}">
          <span>{{ row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center" fixed>
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" align="center">
        <template slot-scope="{row}">
          <span>{{ row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
        align="center"
        width="70px"
        :filters="[{text:'男', value:0},{text: '女', value: 1}]"
        :filter-method="(value, row) => {return row.sex === value}"
      >
        <template slot-scope="{row}">
          <span>{{ row.sex | getDictLabel(dicts.sexMap) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮件" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="{row}">
          <span>{{ row.avatar }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        align="center"
        width="70px"
        :filters="[{text: '可用', value: 1}, {text: '禁用', value: 0}]"
        :filter-method="(value, row)=>{return row.status === value}"
      >
        <template slot-scope="{row}">
          <el-tag>{{ row.status | getDictLabel(dicts.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-with" fixed="right">
        <template slot-scope="{row, $index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button>
          <el-button v-if="row.status != 'deleted'" size="mini" type="danger" @click="handleDelete(row, $index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getDataList"
    />

    <data-form-dlg :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :model="temp" />

    <!--<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top:8px;"
          />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
import { createArticle, updateArticle } from '@/api/article'
import { dicts, getDictLabel } from '@/dicts'
import { fetchList } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import DataFormDlg from './DataFormDlg'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  components: { DataFormDlg, Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    },
    getDictLabel: getDictLabel
  },
  data() {
    return {
      tableKey: 0,
      list: [], // 表格数据
      total: 0, // 表格数据总数
      listLoading: true,

      listQuery: { // 搜索框初始化对象 可通过圆点语法添加
        page: 1, // 当前页数
        limit: 20, // 页面大小
        /*        importance: undefined,
        title: undefined,
        type: undefined,*/
        sort: undefined, // 'createTime', // 默认排序字段
        order: 'desc' // 默认排序方式
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      }
      /*      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false*/
    }
  },
  computed: {
    dicts() {
      return dicts
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getDataList()
    },
    getDataList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.items
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getDataList()
    },
    handleReset(formName) {
      this.$refs[formName].resetFields()
      this.listQuery.page = 1
      this.listQuery.limit = 20
      // 重新加载数据
      this.handleFilter()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    // 后端交互排序 start
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    // 后端交互排序 end
    // 清除表单 start
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
      // 清除表单 end
    },
    // 表单增删改 start
    handleCreate() {
      // this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      /*      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })*/
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // 公用数据 start
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          // 公用数据 end
          // 后端交互 start
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
          // 后端交互 end
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      /*      this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
            })*/
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      // const tmpRow = this.list[index]
      // delete(tmpRow.id).then()
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    // 表单增删改 end
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
