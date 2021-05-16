<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" key="bookSettingFilterForm" :model="listQuery" inline>
        <el-form-item prop="type">
          <el-select v-model="listQuery.type" placeholder="类型" style="width: 110px" clearable @change="handleFilter">
            <el-option v-for="item in dicts.bookSettingTypeMap" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-refresh-left" @click="handleReset('filterForm')">重置</el-button>
      </el-form>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin-left: 10px" @click="handleCreate">添加</el-button>
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
        <template slot-scope="{row}">《{{ row.book.title }}》</template>
      </el-table-column>
      <el-table-column
        label="类型"
        prop="type"
        align="center"
        width="100px"
        :filters="[{ value: 1, text: '轮播图' }, { value: 2, text: '本周强推' }, { value: 3, text: '热门推荐' }, { value: 4, text: '精品推荐' }]"
        :filter-method="(value, row)=>{return row.type === value}"
      >
        <template slot-scope="{row}">{{ row.type | getDictLabel(dicts.bookSettingTypeMap) }}</template>
      </el-table-column>
      <el-table-column label="排行" prop="sort" align="center" width="75px" sortable>
        <template slot-scope="{row}">{{ row.sort }}</template>
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
import { searchBookSetting, getBookSetting, addBookSetting, editBookSetting, deleteBookSetting } from '@/api/bookSetting'
import Pagination from '@/components/Pagination'
import DataFormDlg from './DataFormDlg'

export default {
  components: { DataFormDlg, Pagination },
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
        limit: 20
      },

      temp: {},
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
      searchBookSetting(this.listQuery).then(res => {
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
      getBookSetting(row.id).then(res => {
        this.temp = Object.assign({}, row)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      })
    },
    handleDelete(row, index) {
      deleteBookSetting(row.id).then(res => {
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
      if (this.dialogStatus === 'create') {
        addBookSetting(tempData).then(res => {
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
        editBookSetting(tempData).then(res => {
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
