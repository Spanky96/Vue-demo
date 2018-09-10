<template>
  <div>
    <page id="gaozhi" style="background:#FBF4DA;overflow-y: scroll;">
      <div class="bgtop">
        <div class="title">2018江阴市机关作风效能民主评测活动</div>
      </div>
      <div class="content">
        <p>在测评过程中，如因故无法完成测评并关闭测评页面后，系统会自动记录当前测评进度，并在下次进入系统后，系统自动加载进度，继续开始未完成的测评.</p>
        <p>测评进度是PC端和移动端共享，即在PC端的测评因故中断后，可在移动端继续未完成的测评，同样在移动端测评时因故中断后，也可在PC端登录后继续未完成的测评。</p>
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
      // 数据加载完毕 1  加载失败 -1
      status: 0
    };
  },
  methods: {
    startPc: function () {
      if (this.status == 1) {
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
      var url = 'api/forminfo/getFormInfo.jsp?actId=lh2k24obyosi';
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
            }
            vm.$db.set('pages', pages);
            vm.$db.set('tabs', res.data.tabs);
            vm.$db.set('editable', res.data.status != 'Y');
            vm.$db.set('submitable', res.data.statusOn != 'Y');
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
