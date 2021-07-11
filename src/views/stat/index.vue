<template>
  <div class="stat-container">
    <el-card class="countSta">
      <div slot="header"><span>表格统计</span></div>
      <div class="panel"><span>小说统计</span>
        <h2>{{ bookCount }}本</h2></div>
      <div class="panel"><span>用户统计</span>
        <h2>{{ userCount }}个</h2></div>
    </el-card>

    <el-button v-loading="listLoading" @click="handleFan" />
    <el-card class="fanSta">
      <div slot="header"><i class="el-icon-pie-chart">扇形图</i></div>
      <el-row type="flex" justify="space-between">
        <div id="categoryOfBook" style="width: 400px;height: 400px;" />
        <div id="categoryOfBookshelf" style="width: 400px;height: 400px;" />
      </el-row>

    </el-card>
    <!--为echarts准备一个具备大小的容器dom-->
    <!--    <p>{{ categoryCountOfBookshelf }}</p>
        <p>{{ categoryCountOfBook }}</p>-->
  </div>
</template>
<script>
import echarts from 'echarts'
import { dicts, getDictLabel } from '@/dicts'
import { fanSta, countSta } from '@/api/stat'

export default {
  data() {
    return {
      listLoading: true,
      categoryList: ['玄幻奇幻', '武侠仙侠', '都市言情', '历史军事', '科幻灵异', '网友竞技'],
      charts: '',
      opinion: ['男', '女', '其他'],
      bookCount: 0,
      userCount: 0,
      opinionData: [
        { value: 20, name: '男' },
        { value: 230, name: '其他' },
        { value: 1000, name: '女' }

      ],
      categoryCountOfBookshelf: [],
      categoryCountOfBook: [],
      keyMap: {
        'categoryId': 'name',
        'count': 'value'
      }
    }
  },
  // 调用
  /*  mounted() {
      this.$nextTick(_ => {
        this.drawPie('categoryOfBook', this.categoryCountOfBook)
        this.drawPie('categoryOfBookshelf', this.categoryCountOfBookshelf)
      })
    },*/
  created() {
    this.getData()
  },
  methods: {
    handleFan() {
      this.$nextTick(function() {
        this.drawPie('categoryOfBook', '总小说类型占比', this.categoryCountOfBook)
        this.drawPie('categoryOfBookshelf', '用户收藏类型占比', this.categoryCountOfBookshelf)
      })
    },
    getData() {
      this.listLoading = true
      countSta().then(res => {
        this.userCount = res.data.userCount
        this.bookCount = res.data.bookCount
        this.listLoading = false
      })
      fanSta().then(res => {
        this.categoryCountOfBook = res.data.categoryCountOfBook
        this.categoryCountOfBookshelf = res.data.categoryCountOfBookshelf
        this.objTransform(this.categoryCountOfBook)
        this.objTransform(this.categoryCountOfBookshelf)
        this.listLoading = false
      })
    },
    objTransform(objArray) {
      for (var i = 0; i < objArray.length; i++) {
        var obj = objArray[i]

        // 修改每个对象
        for (var key in obj) {
          obj[key] = key === 'categoryId' ? getDictLabel(obj[key], dicts.categoryMap) : obj[key]
          var newKey = this.keyMap[key] // key映射, newKy指新的key名称
          if (newKey) {
            obj[newKey] = obj[key]
            delete obj[key]
          }
        }
      }
    },
    drawPie(id, title, arr_data) {
      this.charts = echarts.init(document.getElementById(id))

      this.charts.setOption({
        title: {
          text: title != null ? title : '小说类型占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '小说数量',
            type: 'pie',
            radius: '50%',
            data: arr_data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      /*
        {
          title: {
            text: '小说类型统计',
              x: 'center'
          },
          tooltip: {
            trigger: 'item'

          },
          legend: {
            orient: 'vertical',
              x: 'left',
              data: this.categoryList
          },
          series: [
            {
              name: '小说类别占比',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'blod'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.categoryCountOfBook
            }
          ]
        }*/
    }
  }
}
</script>
<!--<script>
// import { countSta } from '@/api/stat'
import echarts from 'echarts'

export default {
  data() {
    return {
      options: {}
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(this.$el)
    },
    watch: {
      options: {
        handler(options) {
          this.chart.setOption(options)
        },
        deep: true
      }
    }
  }
}
</script>-->

<style scoped lang="scss">
  .stat-container {
    padding: 32px;
    background-color: #f0f2f5;
    height: 100vh;

    .el-card {
      margin-bottom: 20px;
    }
  }

  .panel {
    height: 100px;
    width: 200px;
    padding: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    background-color: #F8F8F8;
    display: inline-block
  }
</style>
