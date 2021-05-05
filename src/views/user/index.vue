<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" key="userFilterForm" :model="listQuery" inline>
        <el-form-item prop="username"><el-input
          v-model="listQuery.username"
          placeholder="请输入用户名搜索"
          clearable
          style="width: 160px;"
          class="filter-item"
        /></el-form-item>
        <el-form-item prop="mobile"><el-input
          v-model="listQuery.mobile"
          placeholder="请输入手机号搜索"
          clearable
          style="width: 160px;"
          class="filter-item"
        /></el-form-item>
        <el-form-item prop="email"><el-input
          v-model="listQuery.email"
          placeholder="请输入邮件搜索"
          clearable
          style="width: 160px;"
          class="filter-item"
        /></el-form-item>
        <el-form-item prop="sex"><el-select v-model="listQuery.sex" placeholder="性别" clearable style="width: 80px" class="filter-item" @change="handleFilter">
          <el-option v-for="item in dicts.sexMap" :key="item.value" :label="item.label" :value="item.value" />
        </el-select></el-form-item>
        <el-form-item prop="roleId">        <el-select v-model="listQuery.roleId" placeholder="角色" clearable style="width: 80px" class="filter-item" @change="handleFilter">
          <el-option v-for="item in dicts.roleDict" :key="item.value" :label="item.label" :value="item.value" />
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

    <data-form-dlg :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :dataform="temp" @msubmit="msubmit" />

  </div>
</template>

<script>
import { dicts, getDictLabel } from '@/dicts'
import { searchUser, addUser, editUser, deleteUser } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import DataFormDlg from './DataFormDlg'

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
        // TODO: 自主排序或sort-change
        sort: undefined, // 'createTime', // 默认排序字段
        order: 'desc' // 默认排序方式
      },
      statusOptions: ['published', 'draft', 'deleted'],
      temp: { // 表单数据
        username: undefined,
        password: undefined,
        checkPassword: undefined,
        email: undefined,
        mobile: '',
        sex: '',
        roleId: '',
        status: 1,
        avatar: null
      },
      dialogFormVisible: false,
      dialogStatus: '', // 从textMap取值
      textMap: {
        update: '修改',
        create: '创建'
      },
      dicts
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
      searchUser(this.listQuery).then(response => {
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
      console.log('进行后端交互排序', data)
      this.listQuery.sort = prop
      this.listQuery.order = order === 'ascending' ? 'ASC' : 'DSC'
      this.handleFilter()
    },
    // 后端交互排序 end
    handleCreate() {
      this.temp = {}
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      /*      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })*/
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      /*      this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
            })*/
    },
    handleDelete(row, index) {
      // const tmpRow = this.list[index]
      // delete(tmpRow.id).then()
      deleteUser(row.id).then(res => {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    msubmit(tempData) {
      console.log('父组件', JSON.stringify(tempData))
      if (this.dialogStatus === 'create') {
        // 添加
        addUser(tempData).then(res => {
          if (res.code === 500) { alert('添加失败'); return }
          // this.list.unshift(tempData)
          this.dialogFormVisible = false
          this.getDataList()
          this.$notify({
            title: 'Success',
            message: '添加成功',
            type: 'success',
            duration: 2000
          })
        })
      } else {
        // 修改
        editUser(tempData).then(res => {
          // const index = this.list.findIndex(v => v.id === tempData.id)
          // this.list.splice(index, 1, tempData)
          this.dialogFormVisible = false
          this.getDataList()
          this.$notify({
            title: 'Success',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    }
    // 表单增删改 end
  }
}
</script>
