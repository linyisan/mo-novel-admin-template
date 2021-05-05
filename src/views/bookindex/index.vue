<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" key="bookIndexFilterForm" :model="listQuery" inline>
        <el-form-item prop="title">
          <el-input v-model="listQuery.title" placeholder="请输入章节名" clearable />
        </el-form-item>
        <el-form-item prop="status">
          <el-select v-model="listQuery.status" placeholder="状态" style="width: 90px" clearable @change="handleFilter">
            <el-option v-for="item in dicts.bookIndexStatus" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh-left" @click="handleReset('filterForm')">重置</el-button>
      </el-form>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" style="margin-left: 10px" @click="handleCreate">添加</el-button>
    </div>

    <!--表格 start-->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" align="center" width="70px" fixed sortable>
        <template slot-scope="{row}">{{ row.id }}</template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center" sortable>
        <template slot-scope="{row}">{{ row.createTime }}</template>
      </el-table-column>
      <el-table-column label="修改时间" prop="updateTime" align="center" sortable>
        <template slot-scope="{row}">{{ row.updateTime }}</template>
      </el-table-column>
      <el-table-column label="章节名" prop="title" align="center" fixed>
        <template slot-scope="{row}">{{ row.title }}</template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="{row}">{{ row.status | getDictLabel(dicts.bookIndexStatus) }}</template>
      </el-table-column>
      <el-table-column label="字数" prop="wordCount" align="center" sortable>
        <template slot-scope="{row}">{{ row.wordCount }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-with" fixed="right">
        <template slot-scope="{row, $index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button>
          <el-button v-if="row.status != 'deleted'" size="mini" type="danger" @click="handleDelete(row, $index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--表格 end-->

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getDataList" />

    <data-form-dlg :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :temp-form-data="temp" @msubmit="msubmit" />
  </div>
</template>

<script>
import { dicts, getDictLabel } from '@/dicts'
import { searchBookIndex, getBookIndex, addBookIndex, editBookIndex, deleteBookIndex } from '@/api/bookIndex'
import Pagination from '@/components/Pagination'
import DataFormDlg from './DataFormDlg'
import waves from '@/directive/waves/waves'

export default {
  components: { DataFormDlg, Pagination },
  directives: { waves },
  filters: {
    getDictLabel: getDictLabel
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      bookId: this.$route.params.bookId,

      listQuery: {
        page: 1,
        limit: 20,
        sort: 'updateTime',
        order: 'desc',
        bookId: this.$route.params.bookId
      },

      temp: {
        title: undefined,
        status: 1,
        content: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      dicts
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getDataList()
    },
    getDataList() {
      this.listLoading = true
      searchBookIndex(this.listQuery).then(res => {
        this.listLoading = false
        this.list = res.data.items
        this.total = res.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getDataList()
    },
    handleReset(formName) {
      this.$refs[formName].resetFields()
      // 重新加载数据
      this.handleFilter()
    },
    // 后端交互排序
    sortChange(data) {
      this.listQuery.sort = data.prop
      this.listQuery.order = data.order === 'ascending' ? 'ASC' : 'DSC'
      // this.handleFilter() // 后端交互排序
    },
    handleCreate() {
      this.temp = {}
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      getBookIndex(row.id).then(res => {
        this.temp = Object.assign({}, row)
        this.temp.content = res.data.content
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      })
    },
    handleDelete(row, index) {
      deleteBookIndex(row.id).then(res => {
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
      delete tempData.createTime
      delete tempData.updateTime
      delete tempData.wordCount
      tempData.bookId = this.bookId
      if (this.dialogStatus === 'create') {
        addBookIndex(tempData).then(res => {
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
        editBookIndex(tempData).then(res => {
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
  }
}
</script>
