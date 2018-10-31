<template>
  <div>
    <page id="gaozhi" style="background:#FBF4DA;overflow-y: scroll;">
      <div class="bgtop">
        <div class="title">{{activeName}}</div>
      </div>
      <div class="content">
        <p>为深入贯彻落实市委、市政府各项决策部署，检验我市机关作风效能建设实际成效，客观真实反映社会各界人士对各参评部门（单位）高质量发展的满意程度。根据市“民主评议机关”活动《实施办法》，特邀请您参加民主评议活动。</p>
        <p>评议时，请您按照测评要求，针对“履职尽责敢担当、服务基层强作风、勤政廉政严纪律、发展成效高质量”等四方面内容，参阅各参评部门（单位）服务高质量发展工作实绩公示，进行客观公正的评议。</p>
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
