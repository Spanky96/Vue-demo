<template>
  <div>
    <page style="background:#FBF4DA">
      <div class="bgtop">
        <div id="validate">
          <div class="text">{{idConfirm ? '验证成功' : '请填写验证码'}}</div>
          <div class="validate-code">
            <div class="codebox">
              <input type="text" id="code" class="code" :disabled="idConfirm" v-model="code" @keyup.enter="validateCode()">
              <div class="inner-btn" :class="idConfirm ? 'active' : 'input'" @click="validateCode()"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="idChoose">
        <scroll :enable-infinite="false" :enable-refresh="false">
          <div class="tip-text">请选择您的身份</div>
          <div class="color-hr"></div>
          <div class="option-list">
            <div class="option" v-for="(option, id) in options" :key="id" @click="optionChoosed(option.id)" :class="{active: option.isActive}">{{option.name}}<div class="pic"></div></div>
          </div>
          <div class="btn" @click="next()">确定</div>
        </scroll>
      </div>
    </page>
  </div>
</template>

<script>
import Content from './weui/components/content';
import Page from './weui/components/page/index';
import Toast from './weui/components/toast/index';
import Scroll from './weui/components/scroll';
export default {
  name: 'Index',
  components: {
    'page-content': Content, Page, Toast, Scroll
  },
  data () {
    var idConfirm = false;
    var code = '';
    var options = [
      {id: 1, name: '市领导', isActive: false}, {id: 2, name: '企业代表', isActive: false}, {id: 3, name: '党代表; 人大代表; 政协委员; 市党风联络员; 特邀检查员', isActive: false},
      {id: 4, name: '副科级以上干部; 驻澄单位领导; 离退休干部代表', isActive: false}, {id: 5, name: '市级机关、驻澄单位干部代表', isActive: false},
      {id: 6, name: '各镇、街道、园区的机关干部; 村（社区）干部; 大学生村官', isActive: false}, {id: 7, name: '公众代表', isActive: false}, {id: 8, name: '市民群众', isActive: true}
    ];
    return {
      idConfirm: idConfirm,
      options: options,
      code: code
    };
  },
  methods: {
    validateCode: function () {
      if (this.code) {
        // 验证code
        this.idConfirm = true;
        if (this.idConfirm) {

        } else {
          this.$toast('您输入验证码不正确,请重试。');
          this.code = '';
        }
      } else {
        this.$toast('请输入验证码');
      }
    },
    optionChoosed: function (id) {
      if (!this.idConfirm) {
        this.$toast('请输入验证码');
        return;
      }
      this.options.map((option) => {
         option.isActive = option.id == id;
      });
    },
    next: function () {
      var identityId = this.options.find((option) => option.isActive).id;
      if (identityId) {
        this.$router.push({path: '/gz'});
      } else {
         this.$toast('请选择您的身份');
      }
    }
  }
};
</script>
<style lang="scss">
  #validate {
    .text {
      text-align: center;
      padding: 1.5vh 0 1vh;
      font-size: 1rem;
    }
    .validate-code {
      position: absolute;
      right: 0;
      top: 7vh;
      left: 0;
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
  .idChoose {
    margin: 0 auto;
    text-align: center;
    position: absolute;
    background: #FBF4DA;
    width: 100vw;
    bottom: 0;
    max-width: 500px;
    left: 0;
    right: 0;
    top: 16vh;
    .tip-text {color:#BB0301; font-size: 20px;}
    .color-hr {
      height: 5px;
      width: 100%;
      background: linear-gradient(#FF7A00, #FFE800);
      width: 90%;
      margin: 5px auto;
    }
    .option-list {
      margin: 15px 5vw 0;
      .option {
        cursor: pointer;
        padding: 10px 0;
        text-align: left;
        border-bottom: 1px solid;
        font-size: 14px;
        &.active .pic{
          float: right;
          width: 25px;
          height: 25px;
          background: url('../images/mzpc/active1.png') no-repeat;
          background-size: 100% 100%;
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
      margin: 15px auto;
      cursor: pointer;
    }
  }
</style>
