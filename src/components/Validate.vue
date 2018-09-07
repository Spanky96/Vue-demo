<template>
  <div>
    <page style="background:#FBF4DA">
      <div class="bgtop"></div>
      <div id="validate">
        <div class="text">{{idConfirm ? '验证成功' : '请填写验证码'}}</div>
        <div class="validate-code">
          <div class="codebox">
            <input type="text" id="code" class="code" :disabled="idConfirm" v-model="code" @keyup.enter="validateCode()">
            <div class="inner-btn" :class="idConfirm ? 'active' : 'input'" @click="validateCode()"></div>
          </div>
        </div>
      </div>
    </page>
  </div>
</template>

<script>
import Content from './weui/components/content';
import Page from './weui/components/page/index';
export default {
  name: 'Validate',
  components: {
    'page-content': Content, Page
  },
  data () {
    var idConfirm = false;
    var code = '';
    return {
      idConfirm: idConfirm,
      code: code
    };
  },
  methods: {
    validateCode: function () {
      var vm = this;
      var identityId = vm.$route.params.identityId;
      if (vm.code) {
        // 验证code
        vm.$http.get('api/login/checkCode.jsp', {
          params: {
            actId: 'lh2k24obyosi',
            code: vm.code,
            typeId: identityId
          }}).then(function (res) {
          if (res.data.success) {
              vm.idConfirm = true;
              vm.$db.set('memberId', res.data.memberId);
              vm.$router.push({path: '/gz'});
          } else {
            vm.$toast(res.data.msg);
            vm.code = '';
          }
        }).catch(function (err) {
          console.log(err);
          vm.$toast('数据访问失败');
        });
      } else {
        vm.$toast('请输入验证码');
      }
    }
  }
};
</script>
<style lang="scss">
  #validate {
    margin-top: 16vh;
    .text {
      text-align: center;
      padding: 1.5vh 0 1vh;
      font-size: 1rem;
    }
    .validate-code {
      margin: auto;
      width: 200px;
      height: 12px;
    }
    .codebox {
        position: absolute;
        height: 32px;
      .code {
        background-color: #ffffff6e;
        border: 1px solid;
        width: 200px;
        height: 32px;
        text-indent: 1em;
        font-size: 16px;
      }
      .inner-btn {
        position: relative;
        left: 174px;
        cursor: pointer;
        top: -26px;
        width: 20px;
        height: 20px;
      }
      .input {
        background: url('../images/mzpc/input.png') no-repeat;
        background-size: 100% 100%;
      }
      .active {
        background: url('../images/mzpc/active2.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>
