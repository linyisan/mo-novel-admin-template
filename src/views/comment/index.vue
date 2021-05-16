<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" key="commentFilterForm" :model="listQuery" inline>
        <el-form-item prop="content">
          <el-input v-model="listQuery.content" placeholder="请输入评价内容" clearable />
        </el-form-item>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-refresh-left" @click="handleReset('filterForm')">重置</el-button>
      </el-form>
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
      <el-table-column label="用户" prop="username" align="center" width="100px">
        <template slot-scope="{row}">{{ row.userInfoVo.name }}</template>
      </el-table-column>
      <el-table-column label="内容" prop="content" align="center">
        <template slot-scope="{row}">{{ row.content }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-with" fixed="right">
        <template slot-scope="{row, $index}">
          <el-button v-if="row.status != 'deleted'" size="mini" type="danger" @click="handleDelete(row, $index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--表格 end-->

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getDataList" />

  </div>
</template>
<script>
import { deleteBookComment, searchBookComment } from '@/api/comment'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,

      listQuery: {
        page: 1,
        limit: 20
      }
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
      searchBookComment(this.listQuery).then(res => {
        this.listLoading = false
        this.list = res.data.items
        this.total = res.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getDataList()
    },
    handleDelete(row, index) {
      deleteBookComment(row.id).then(res => {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
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
    }
  }
}
</script>

<style scoped>

</style>
