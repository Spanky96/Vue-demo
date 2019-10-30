<template>
  <div>
    <page style="background:#FBF4DA">
      <div class="bgtop"></div>
      <div id="validate">
        <div class="text">{{idConfirm ? '验证成功' : '请填写验证码'}}</div>
        <div class="validate-code">
          <div class="codebox">
            <input type="number" pattern="[0-9]*" id="code" class="code" :disabled="idConfirm" v-model="code" @keyup.enter="validateCode()">
          </div>
        </div>
        <div class="pin">
          <div class="text">设置或输入4位数密码</div>
          <div class="validate-code">
            <div class="box" :class="{showPw: pwShow}">
              <input class="code-num" type='number' pattern="[0-9]*" v-model="pin[0]">
              <input class="code-num" type='number' pattern="[0-9]*" v-model="pin[1]">
              <input class="code-num" type='number' pattern="[0-9]*" v-model="pin[2]">
              <input class="code-num" type='number' pattern="[0-9]*" v-model="pin[3]">
              <div class="toggle" @click="pwShow = !pwShow;"></div>
            </div>
          </div>
        </div>
        <div class="btn" @click="validateCode()">确定</div>
        <div class="tip">注：如忘记密码请联系主办方。</div>
      </div>
      <preloader ref="preloader"></preloader>
    </page>
  </div>
</template>

<script>
import Content from './weui/components/content';
import Page from './weui/components/page/index';
import Preloader from './weui/components/preloader/index';
export default {
  name: 'Validate',
  components: {
    'page-content': Content, Page, Preloader
  },
  data () {
    var idConfirm = false;
    var code = '';
    var pin = [];
    var pwShow = false;
    return {
      idConfirm: idConfirm,
      code: code,
      pin: pin,
      pwShow: pwShow
    };
  },
  methods: {
    goNextInput: function (el) {
      var vm = this;
      var txts = document.querySelectorAll(el);
      for (var i = 0; i < txts.length; i++) {
        var t = txts[i];
        t.index = i;
        t.onkeyup = function (event) {
          if (parseInt(this.value) >= 0 && this.value <= 9) {
            var next = this.index + 1;
            if (this.value.length > 1) {
              this.value = this.value % 10;
              vm.pin[this.index] = this.value % 10;
            }
            if (next > txts.length - 1) return;
            if (this.value) {
              txts[next].focus();
            }
          } else if (this.value > 9) {
            this.value = this.value % 10;
            vm.pin[this.index] = this.value % 10;
          } else {
            this.value = '';
            vm.pin[this.index] = '';
          }
        };
        t.onkeydown = function (event) {
          if (event.keyCode == 8 && !this.value) {
            var prev = this.index - 1;
            if (prev == -1) return;
            txts[prev].value = '';
            vm.pin[prev] = '';
            txts[prev].focus();
          }
        };
        t.onfocus = function () {
          this.select();
        };
      }
    },
    checkPassword: function (pin) {
      var result = '';
      for (var i = 0; i < 4; i++) {
        var elm = pin[i];
        if (parseInt(elm) >= 0 && elm <= 9) {
          result += elm;
        } else {
          return false;
        }
      }
      return result;
    },
    validateCode: function () {
      var vm = this;
      var password = this.checkPassword(vm.pin);
      if (!password) {
        vm.$toast("密码不符合要求，请重新输入。");
        vm.pin = [];
        return;
      }
      if (vm.code) {
        // 验证code
        vm.$refs.preloader.open();
        vm.$http.get('api/login/checkCode.jsp', {
          params: {
            code: vm.code,
            password: password
          }}).then(function (res) {
          if (res.data.success) {
              vm.idConfirm = true;
              vm.$db.set('memberId', res.data.memberId);
              vm.$db.set('active', res.data.active);
              vm.$db.set('personTypes', res.data.personTypes);
              vm.$router.push({path: '/index' + (res.data.personType ? ('/' + res.data.personType) : '')});
          } else {
            vm.$toast(res.data.msg);
            if (res.data.msg.includes('验证码')) {
              vm.code = '';
              vm.pin = [];
            }
            if (res.data.msg.includes('密码')) {
              vm.pin = [];
            }
          }
          vm.$refs.preloader.close();
        }).catch(function (err) {
          console.log(err);
          vm.$toast('数据访问失败');
          vm.$refs.preloader.close();
        });
      } else {
        vm.$toast('请输入验证码');
      }
    }
  },
  mounted () {
    this.goNextInput('.code-num');
  }
};
</script>
<style lang="scss">
  #validate {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
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
      position: absolute;
      text-align: center;
      margin: 0 auto;
      left: 0;
      right: 0;
      bottom: 16vh;
    }
    .tip {
      position: fixed;
      bottom: 0;
      padding: 10px;
      font-size: 12px;
    }
  }
  .pin {
    margin-top: 35px;
    .box {
      display: flex;
      justify-content: space-between;
      position: relative;
      input {
        background-color: #ffffff6e !important;
        border: 1px solid !important;
        width: 35px;
        height: 32px;
        text-align: center;
        font-size: 16px;
        -webkit-text-security: disc;
      }
      .toggle {
        width: 16px;
        height: 16px;
        background: url('../images/mzpc/by.png') no-repeat;
        position: absolute;
        right: -35px;
        top: 6px;
      }
      &.showPw {
        .toggle {
          background: url('../images/mzpc/zy.png') no-repeat;
        }
        input {
          -webkit-text-security: unset;
        }
      }
    }
  }
</style>
