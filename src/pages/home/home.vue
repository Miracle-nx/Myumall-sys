<template>
  <div>
    <div id="main"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list"
    }),
    // 计算属性 变量属性依赖于另一个属性
    a() {
      //属性当方法写
      console.log(this.list);
      return this.list;
      // list变了 a也会变, 访问过这个页面list才会有数据
    }
  },
  watch: {
    list: {
      //监听list
      handler() {
        if (this.list.length > 0) {
          // 再创建图表
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById("main"));

          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "ECharts 入门示例"
            },
            tooltip: {},
            legend: {
              data: ["销量"]
            },
            xAxis: {
              data: this.list.map(item => item.catename)
            },
            yAxis: {},
            series: [
              {
                name: "销量",
                type: "bar",
                data: this.list.map(item =>
                  item.children ? item.children.length : 0
                ) //有的没有children的字段要判断一下
              }
            ]
          };

          // @@@@最后使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction"
    })
  },
  mounted() {
    // @@@@但是要等list有数据之后再创图标-----watch监听一下
    this.reqListAction();
    // 绘制柱形图
    // 1、npm i echarts --save
    // 2、引入e-charts
    // 3、绑定节点
    // 4、mouted----1、渲染数据和渲染数据的方法调用----2、Js
  }
};
</script>
<style scoped>
#main {
  width: 80%;
  height: 300px;
  border: 1px solid slateblue;
}
</style>
