<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="filterForm" key="feedbackFilterForm" :model="listQuery" inline>
        <el-form-item prop="content">
          <el-input v-model="listQuery.content" placeholder="请输入反馈内容" clearable />
        </el-form-item>
        <el-form-item prop="done">
          <el-select v-model="listQuery.done" placeholder="状态" style="width: 90px" clearable @change="handleFilter">
            <el-option v-for="item in dicts.doneMap" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
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
      <el-table-column label="状态" prop="done" align="center">
        <template slot-scope="{row}">
          <el-switch v-model="row.done" active-text="已处理" inactive-text="未处理" :active-value="1" :inactive-value="0" @change="handleUpdate(row)" />
        </template>
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
import { dicts, getDictLabel } from '@/dicts'
import { editFeedback, searchFeedback, deleteFeedback } from '@/api/feedback'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  filters: {
    getDictLabel: getDictLabel
  },
  data() {
    return {
      dicts,
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
      searchFeedback(this.listQuery).then(res => {
        this.listLoading = false
        this.list = res.data.items
        this.total = res.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getDataList()
    },
    handleUpdate(row) {
      editFeedback(row).then(_ => {
        this.$notify({
          title: 'Success',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
        this.getDataList()
      })
    },
    handleDelete(row, index) {
      deleteFeedback(row.id).then(res => {
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
