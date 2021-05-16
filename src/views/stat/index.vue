<template>
  <!--  <div class="stat-container">
    <el-card class="countSta">
      <div slot="header"><span>表格统计</span></div>
      <div class="panel"><span>小说统计</span>
        <h2>123456</h2></div>
      <div class="panel"><span>用户统计</span>
        <h2>123456</h2></div>
    </el-card>
    <el-card class="zheSta">
      <div slot="header"><i class="el-icon-pie-chart">扇形图</i></div>
    </el-card>
  </div>-->

  <!--为echarts准备一个具备大小的容器dom-->
  <div id="abcmain" style="width: 600px;height: 400px;" />
</template>
<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      charts: '',
      opinion: ['男', '女', '其他'],
      opinionData: [
        { value: 20, name: '男' },
        { value: 230, name: '其他' },
        { value: 1000, name: '女' }

      ]
    }
  },
  // 调用
  mounted() {
    this.$nextTick(function() {
      this.drawPie('abcmain')
    })
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        tooltip: {
          trigger: 'item'

        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: this.opinion
        },
        series: [
          {
            name: '性别',
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
            data: this.opinionData
          }
        ]
      })
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
