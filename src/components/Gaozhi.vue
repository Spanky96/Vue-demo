<template>
  <div>
    <page id="gaozhi" style="background:#FBF4DA;overflow-y: scroll;">
      <div class="bgtop">
        <div class="title">{{activeName}}</div>
      </div>
      <div class="content" v-html="gaozhi"></div>
      <div class="btn" @click="startPc()"><div class="text"></div></div>
    </page>
  </div>
</template>

<script>
import Content from './weui/components/content';
import Page from './weui/components/page/index';
export default {
  name: 'Gaozhi',
  components: {
    'page-content': Content, Page
  },
  data () {
    var mzpyData = this.$db.get('mzpyData');
    return {
      activeName: mzpyData.handler.batchName,
      gaozhi: mzpyData.handler.content,
      // 数据加载完毕 1  加载失败 -1
      status: 0,
      tips: ''
    };
  },
  methods: {
    startPc: function () {
      this.$router.push({path: '/tp'});
    }
  },
  mounted () {
  }
};
</script>
<style lang="scss" scoped>
#gaozhi {
  .title {
    color: white;
    text-align: center;
    max-width: 480px;
    height: 4vh;
    line-height: 100%;
    font-size: 20px;
    margin: 3vh auto;
  }
  .content {
    max-width: 500px;
    margin: 16vh auto 0;
    /deep/ p {
      line-height: 35px;
      text-indent: 2em;
      color: #000;
      font-size: 16px;;
      padding: 0 20px;
      margin: 0;
    }
  }
  .btn {
    background: url('../images/mzpc/button2.png') no-repeat;
    width: 200px;
    background-size: 100% 100%;
    border-radius: 5px;
    height: 60px;
    color: white;
    margin: 15px auto;
    cursor: pointer;
    .text {
      background: url('../images/mzpc/text2.png') no-repeat;
      background-size: 100% auto;
      margin: 0 auto;
      height: 30px;
      width: 80px;
      position: relative;
      top: 19px;
    }
  }
}
.content /deep/ table {
  width: 95% !important;
  margin-left: 2.5%;
  font-family: verdana,arial,sans-serif;
  font-size:11px;
  color:#333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
  tr:first-child td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffeeee;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    width: 20%;
  }
  td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: transparent;
    vertical-align: initial;
  }
}
</style>
