<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" key="bookFilterForm" :model="listQuery" inline>
        <el-form-item prop="title">
          <el-input v-model="listQuery.title" placeholder="请输入书名" clearable />
        </el-form-item>
        <el-form-item prop="authorName">
          <el-input v-model="listQuery.authorName" placeholder="请输入作者名" clearable />
        </el-form-item>
        <el-form-item prop="channel">
          <el-select v-model="listQuery.channel" placeholder="频道" style="width: 90px" clearable @change="handleFilter">
            <el-option v-for="item in dicts.channelMap" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="categoryId">
          <el-select v-model="listQuery.categoryId" placeholder="分类" style="width: 110px;" clearable @change="handleFilter">
            <el-option v-for="item in dicts.categoryMap" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="status">
          <el-select v-model="listQuery.bookStatus" placeholder="状态" style="width: 90px" clearable @change="handleFilter">
            <el-option v-for="item in dicts.bookStatusMap" :key="item.value" :label="item.label" :value="item.value" />
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
      <el-table-column label="书名" prop="title" align="center" fixed>
        <template slot-scope="{row}">
          <router-link :to="{name: 'BookIndex', params: {bookId: row.id}}">《{{ row.title }}》</router-link>
        </template>
      </el-table-column>
      <el-table-column label="作者" prop="authorName" align="center">
        <template slot-scope="{row}">{{ row.authorName }}</template>
      </el-table-column>
      <el-table-column label="频道" prop="channel" align="center">
        <template slot-scope="{row}">{{ row.channel | getDictLabel(dicts.channelMap) }}</template>
      </el-table-column>
      <el-table-column label="小说分类" prop="categoryId" align="center">
        <template slot-scope="{row}">{{ row.categoryId | getDictLabel(dicts.categoryMap) }}</template>
      </el-table-column>
      <el-table-column label="简介" prop="introduction" align="center" type="expand" width="70px">
        <template slot-scope="{row}">{{ row.introduction }}</template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="{row}">{{ row.status | getDictLabel(dicts.bookStatusMap) }}</template>
      </el-table-column>
      <el-table-column label="点击量" prop="visitCount" align="center" sortable>
        <template slot-scope="{row}">{{ row.visitCount }}</template>
      </el-table-column>
      <el-table-column label="字数" prop="wordCount" align="center" sortable>
        <template slot-scope="{row}">{{ row.wordCount | numberFormatter }}</template>
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
import { searchBook, addBook, editBook, deleteBook } from '@/api/book'
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

      listQuery: {
        page: 1,
        limit: 20,
        sort: 'updateTime',
        order: 'desc'
      },

      temp: {
        title: undefined,
        authorName: undefined,
        channel: 0,
        categoryId: undefined,
        status: 1,
        introduction: undefined,
        cover: null
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
      searchBook(this.listQuery).then(res => {
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
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete(row, index) {
      deleteBook(row.id).then(res => {
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
      delete tempData.visitCount
      delete tempData.wordCount
      delete tempData.createTime
      delete tempData.updateTime
      if (this.dialogStatus === 'create') {
        addBook(tempData).then(res => {
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
        editBook(tempData).then(res => {
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
