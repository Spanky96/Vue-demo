<template>
  <div>
    <page id="bye">
      <div class="textbox">
        <div class="text"> 感谢您的参与!</div>
        <div class="text-stroke"> 感谢您的参与!</div>
      </div>
      <div class="btn" @click="back()">完成</div>
    </page>
  </div>
</template>

<script>
import Content from './weui/components/content';
import Page from './weui/components/page/index';
export default {
  name: 'GoodBye',
  components: {
    'page-content': Content, Page
  },
  methods: {
    back () {
      this.$router.push({path: '/tp'});
    }
  }
};
</script>
<style lang="scss" scoped>
#bye {
  background: url('../images/mzpc/bg3.jpg') no-repeat;
  background-size: 100% 100%;
  text-align: center;
  .textbox {
    font-size: 2rem;
    margin-top: 9rem;
    .text {
      color: #FCFF04;
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
    }
    .text-stroke {
      -webkit-text-stroke: #fe8b00 11px;
    }
  }
  .btn {
    background: url('../images/mzpc/button2.png') no-repeat;
    width: 170px;
    background-size: 100% 100%;
    border-radius: 5px;
    height: 40px;
    color: white;
    line-height: 40px;
    font-size: 20px;
    margin: 35px auto;
    cursor: pointer;
  }
}
</style>
