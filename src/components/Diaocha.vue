<template>
  <div>
    <page id="gaozhi" style="background:#FBF4DA;overflow-y: scroll;">
      <div class="bgtop">
        <div class="title">评测调查</div>
      </div>
      <div class="content">
        <p>评测结果已提交，感谢您的参与! 为了让我们更高效地开展评测活动，请完成下面问卷调查, 感谢您的配合！</p>
      </div>
      <div class="questions">
        <div class="q">
          <div class="qt">
            一、您觉得网上测评是否便捷、高效？
          </div>
          <div class="qa">
            <input type="radio" name="q1" value="Y" v-model="params.question1">是
            <input type="radio" name="q1" value="N" v-model="params.question1">否
          </div>
        </div>
        <div class="q">
          <div class="qt">
            二、您觉得网上测评采用随机验证码及密码绑定来避免网上拉票、作假行为是否有效？
          </div>
          <div class="qa">
            <input type="radio" name="q2" value="Y" v-model="params.question2">是
            <input type="radio" name="q2" value="N" v-model="params.question2">否
          </div>
        </div>
        <div class="q">
          <div class="qt">
            三、您觉得网上测评是否能替代传统的纸质测评？
          </div>
          <div class="qa">
            <input type="radio" name="q3" value="Y" v-model="params.question3">是
            <input type="radio" name="q3" value="N" v-model="params.question3">否
          </div>
        </div>
      </div>
      <div class="btn" @click="tijiao()">提交</div>
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
    var memberId = this.$db.get('memberId');
    if (!memberId) {
      this.$router.push({path: '/'});
    }
    return {
      params: {
        memberId,
        question1: '',
        question2: '',
        question3: ''
      }
    };
  },
  methods: {
    tijiao: function () {
      var vm = this;
      if (!(vm.params.question1 && vm.params.question2 && vm.params.question3)) {
        vm.$toast("您还有未填选项，请先填写。");
        return;
      }
      vm.$http.get('api/saveLSTJ/saveLSTJ.jsp', {params: vm.params}).then(function (res) {
        vm.$router.push({path: '/bye'});
      });
    }
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
    p {
      line-height: 25px;
      text-indent: 2em;
      color: #000;
      font-size: 16px;;
      padding: 0 20px;
      margin: 0;
    }
  }
  .questions {
    width: 80%;
    margin: 20px auto 0;
    .q {
      margin-bottom: 15px;
      .qt {
        font-size: 14px;
      }
      .qa {
        height: 25px;
        display: flex;
        margin-top: 10px;
        input{
          zoom: 120%;
          &:nth-child(2) {
            margin-left: 60px;
          }
        }
      }
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
    cursor: pointer;
    text-align: center;
    margin: 0 auto;
    margin-top: 15px;
  }
}
</style>
