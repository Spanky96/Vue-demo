<template>
  <div>
    <page id="gaozhi" style="background:#FBF4DA;overflow-y: scroll;">
      <div class="bgtop">
        <div class="title">{{activeName}}</div>
      </div>
      <div class="content" v-html="actIntroduce">
      </div>
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
    return {
      activeName: this.$db.get('active').actName,
      actIntroduce: this.$db.get('active').actIntroduce,
      // 数据加载完毕 1  加载失败 -1
      status: 0,
      tips: ''
    };
  },
  methods: {
    startPc: function () {
      if (this.status == 1) {
        if (this.tips) {
          this.$toast(this.tips);
        }
        this.$router.push({path: '/tp'});
      } else if (this.status == 0) {
        this.$toast('数据正在加载，请稍后');
      } else if (this.status == -1) {
        this.getPageList();
        this.getCompanyList();
      }
    },
    getPageList: function () {
      var vm = this;
      var actId = vm.$db.get('active').actId;
      var url = 'api/forminfo/getFormInfo.jsp?actId=' + actId;
      if (this.$db.get('memberId')) {
        url += '&memberId=' + this.$db.get('memberId');
      }
      this.$http.get(url)
        .then(function (res) {
          if (res.data.success) {
            vm.status = 1;
            var pages = res.data.pages;
            if (pages[pages.length - 1].dwadvise.length == 0) {
              pages[pages.length - 1].dwadvise.push({danwei: '', advise: '', dwShow: false});
            } else {
              pages[pages.length - 1].dwadvise.map(function (n) {
                n.danwei = n.dwName;
              });
            }
            vm.$db.set('pages', pages);
            vm.$db.set('tabs', res.data.tabs);
            vm.$db.set('editable', res.data.status != 'Y');
            vm.$db.set('submitable', res.data.statusOn != 'Y');
            vm.tips = res.data.tips;
          } else {
            vm.status = -1;
            vm.$toast(res.data.msg);
          }
        }).catch(function (err) {
          console.log(err);
          vm.status = -1;
          window.alert(err);
        });
    },
    getCompanyList: function () {
      var vm = this;
      this.$http.get('api/dept/getDepts.jsp')
        .then(function (res) {
          if (res.data.success) {
            vm.$db.set('companies', res.data.companies);
          } else {
            window.alert(res.data.msg);
          }
        }).catch(function (err) {
          console.log(err);
          window.alert(err);
        });
    }
  },
  mounted () {
    this.getPageList();
    this.getCompanyList();
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
</style>
