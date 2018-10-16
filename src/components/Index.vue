<template>
  <div>
    <page style="background:#FBF4DA">
      <div class="bgtop"></div>
      <div class="idChoose">
        <scroll :enable-infinite="false" :enable-refresh="false">
          <div class="tip-text">请选择您的身份</div>
          <div class="color-hr"></div>
          <div class="option-list">
            <div class="option" v-for="(option, index) in options" :key="index" @click="optionChoosed(option.typeId)" :class="{active: option.isActive, disabled: option.disabled}"><div class="name">{{option.typeName}}</div><div class="pic"></div></div>
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
import Scroll from './weui/components/scroll';
export default {
  name: 'Index',
  components: {
    'page-content': Content, Page, Scroll
  },
  data () {
    var options = [];
    return {
      options: options
    };
  },
  methods: {
    optionChoosed: function (id) {
      var choosedOpt = this.options.find((opt) => {
        return opt.typeId == id;
      });
      if (choosedOpt.disabled) {
        this.$toast("该身份暂未开放，请选择其他身份。");
        return;
      }
      this.options.map((option) => {
         option.isActive = option.typeId == id;
      });
    },
    next: function () {
      var vm = this;
      var type = this.options.find((option) => option.isActive);
      if (type && type.typeId) {
        if (type.typeId == this.options[this.options.length - 1].typeId) {
          vm.$http.get('api/login/checkCode.jsp', {
            params: {
              typeId: type.typeId
            }}).then(function (res) {
            if (res.data.success) {
                vm.$db.set('memberId', res.data.memberId);
                vm.$db.set('active', res.data.active);
                vm.$router.push({path: '/gz'});
            } else {
              vm.$toast(res.data.msg);
            }
          }).catch(function () {
            vm.$toast('数据访问失败');
          });
        } else {
          this.$router.push({path: '/validate/' + type.typeId});
        }
      } else {
        this.$toast('请选择您的身份');
      }
    },
    getIdentities: function () {
      var vm = this;
      this.$http.get('api/member/getMemberType.jsp')
        .then(function (res) {
          if (res.data.success) {
            var types = res.data.types;
            types.map((n) => {
              // 临时修改 公众代表 市民群众无法选择
              n.disabled = (n.typeName == '公众代表' || n.typeName == '市民群众');
              n.isActive = false;
            });
            vm.options = types;
          } else {
            window.alert(res.data.msg);
          }
        }).catch(function (err) {
          window.alert(err);
        });
    }
  },
  mounted () {
    this.getIdentities();
  }
};
</script>
<style lang="scss">
  .idChoose {
    margin: 0 auto;
    text-align: center;
    position: absolute;
    // background: #FBF4DA;
    width: 100vw;
    bottom: 0;
    max-width: 500px;
    left: 0;
    right: 0;
    top: 10vh;
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
        position: relative;
        cursor: pointer;
        padding: 10px 0;
        text-align: left;
        border-bottom: 1px solid;
        font-size: 14px;
        display: flex;
        &.disabled .name {
          color: #c9c9c9;
        }
        .name {
          min-width: 85%;
          max-width: 85%;
        }
        .pic{
          position: absolute;
          right: 0px;
          top: 50%;
          margin-top: -10px;
          width: 40px;
          height: 20px;
          background: url('../images/mzpc/active1.png') no-repeat 20px;
          background-size: 50% 100%;
          visibility: hidden;
        }
        &.active .pic{
          visibility: visible;
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
