<template>
  <div>
    <page style="background:#FBF4DA; overflow-x:hidden;overflow-y:scroll">
      <div id="main-bgtop" class="bgtop">
        <div class="title-box">
          <div class="title">江阴民主评测评议</div>
          <div class="title title-stroke">江阴民主评测评议</div>
        </div>
        <div class="time">活动时间：2018年5月12日至2019年2月30日</div>
      </div>
      <div class="bgdown">
        <div class="pagger">
          <div class="btn btn-pre" @click="changeView(0, -1)"><div>{{ this.currentIndex > 0 ? '上一页' : '返回' }}</div></div>
          <div class="btn btn-next" @click="changeView(0, 1)"><div>{{ this.currentIndex + 1 != pages.length ? '下一页' : '提交' }}</div></div>
        </div>
      </div>
      <div class="wrap">
        <ul class="tabs group largeHide">
            <li v-for="(tab, index) in tabs" :key="index">
              <a @click="changeView(index)" :class="{active: tab.active}" v-bind:style="[tab.style]">{{tab.active ? tab.title : tab.subTitle}}</a>
            </li>
        </ul>
        <ul class="tabs group largeShow">
            <li v-for="(tab, index) in tabs" :key="index">
              <a @click="changeView(index)" :class="{active: tab.active}">{{tab.easyTitle}}</a>
            </li>
        </ul>
        <div id="content">
          <scroll :enable-infinite="false" :enable-refresh="false" ref="scroll">
            <pingce v-for="(page, index) in pages" :key="index" v-show="currentIndex==index" :page="pages[index]" :editable="editable" v-on:showAlert="showAlert" v-on:changeView="changeView2" v-on:itemChanged="itemChanged" :ref="'pingce'+page.orderNo"></pingce>
          </scroll>
        </div>
      </div>
      <alert :title="alertObject.title" :content="alertObject.content" :ok-text='alertObject.okText' ref="alert"></alert>
      <confirm :title="'确认'" :content="'提交后对满意率勾选无法修改，十日内意见建议栏任可填写更改。'" :ok-text="'提交'" :cancel-text="'取消'"  :on-ok="submit" ref="confirm"></confirm>
    </page>
  </div>
</template>

<script>
import Content from './weui/components/content';
import Page from './weui/components/page/index';
import { Footer, Item } from './weui/components/footer';
import Scroll from './weui/components/scroll';
import { Alert, Confirm } from './modal';
import Pingce from './pingce';
export default {
  name: 'Main',
  components: {
    'page-content': Content, Page, 'page-footer': Footer, 'footer-item': Item, Pingce, Scroll, Alert, Confirm
  },
  data () {
    var pages = this.$db.getObject('pages');
    var tabs = this.$db.getObject('tabs');
    // 是否已保存
    var editable = this.$db.getObject('editable');
    if (!pages || !tabs) {
      this.$router.push({path: '/'});
    }
    tabs[0].active = true;
    this.changeStyle(tabs);
    return {
      pages: pages,
      tabs: tabs,
      editable: editable,
      currentIndex: 0,
      alertObject: {okText: '关闭'},
      resultCache: this.initResultCache(pages),
      countCache: 0
    };
  },
  methods: {
    changeStyle (tabs) {
      var activeIndex = tabs.findIndex((item) => item.active);
      var maxIndex = tabs.length;
      tabs.map(function (item, index) {
        var style = {};
        style['z-index'] = maxIndex - Math.abs(activeIndex - index);
        style['left'] = (activeIndex - index) * 6 + 'px';
        if (activeIndex - index > 0) {
          style['border-radius'] = '8px 0 0 0';
        } else if (activeIndex - index < 0) {
          style['border-radius'] = '0 8px 0 0';
        }
        item.style = style;
      });
    },
    changeView (id, offset) {
      var pageId = offset ? (parseInt(this.currentIndex) + offset) : id;
      if (pageId == -1) {
        // 返回
        this.$router.push({path: '/gz'});
        return;
      }
      if (pageId == this.pages.length) {
        this.$refs.confirm.open();
        return;
      }
      if (this.currentIndex == pageId) {
        return;
      }
      this.currentIndex = pageId;
      this.tabs.map((item, index) => {
        item.active = index == pageId;
      });
      this.changeStyle(this.tabs);
      document.getElementsByClassName('pull-down')[0].scrollTop = 0;
      document.getElementsByClassName('page')[0].scrollTop = document.getElementById('main-bgtop').scrollHeight;
    },
    changeView2: function (data) {
      this.changeView(data.id, data.offset);
    },
    showAlert: function (item) {
      this.alertObject = {
        title: item.name,
        content: item.description,
        okText: item.okText || '关闭'
      };
      this.$refs.alert.open();
    },
    getUnchoosedItem () {
      for (var page of this.pages) {
        if (page.orderNo >= 1 && page.orderNo <= 5) {
          for (var group of page.groups) {
            for (var item of group.items) {
              if (item.chooseStatus == '0') {
                return {
                  page: page.title,
                  item: item.name
                };
              }
            }
          }
        }
        if (page.orderNo == 6) {
          if (page.advise1.chooseStatus == '0') {
              return {
                page: page.title,
                item: page.deptName
              };
          }
        }
        if (page.orderNo == 7) {
          if (page.advise2.chooseStatus == '0') {
            return {
              page: page.title,
              item: '总体评价'
            };
          }
        }
      }
      return false;
    },
    initResultCache: function (pages) {
      var resultCache = new Set();
      pages.forEach(page => {
        if (page.orderNo >= 1 && page.orderNo <= 5) {
          page.groups.forEach(group => {
            group.items.forEach(item => {
              if (item.chooseStatus != '0') {
                resultCache.add(item);
              }
            });
          });
        }
      });
      return resultCache;
    },
    submit: function () {
      // 提交
      if (this.editable) {
        // 1 检查所有选择题 是否已选
        var unchooseditem = this.getUnchoosedItem();
        if (unchooseditem) {
          this.showAlert({
            name: '提示',
            description: unchooseditem.page + ' 中存在未选择选项：' + unchooseditem.item + '。',
            okText: '关闭'
          });
          return;
        } else {
          // 提交选择题
          console.log(this.resultCache);
          this.saveResult(this.resultCache, true);
        }
      }
      // 3 提交主观题
      this.$refs.pingce6 && this.$refs.pingce6[0].savePage06();
      this.$refs.pingce7 && this.$refs.pingce7[0].saveZpb();
      // 4 不可修改
      this.editable = false;
      this.$db.set('editable', false);
      // 5 跳转页面
      this.$router.push({path: '/bye'});
    },
    itemChanged (item) {
      this.resultCache.add(item);
      if (++this.countCache % 10 == 0) {
        // 每选择10个 暂存一次
        this.saveResult(this.resultCache);
      }
    },
    saveResult (resultSet, boolean) {
      var result = [[], [], [], [], []];
      resultSet.forEach((o) => {
        Number(o.chooseStatus) && result[Number(o.chooseStatus) - 1].push(o.id);
      });
      this.$http.post('api/save/saveResult.jsp', {
        actId: 'lh2k24obyosi',
        memberId: this.$db.get('memberId'),
        result: result.map((n) => n.join(',')),
        status: boolean ? 'Y' : 'N'
      }).then(function (res) {
          if (res.data.success) {
            console.log("评测结果暂存成功");
          } else {
            console.log("保存失败");
          }
        }).catch(function (err) {
          console.log(err);
      });
    }
  }
};
</script>
<style lang="scss">
.page {
  .modal {
    position: fixed;
    width: 16.5rem;
    margin-left: -8.25rem;
    top: 50%;
    .modal-inner {
      padding: 0rem;
      background: #FEFEFE;
      border-radius: 12px 12px 0 0;
      .modal-title {
        color: #CE0205;
        font-size: 1rem;
        background: url('../images/mzpc/timg.png');
        background-size: 100% 100%;
        padding: 0.4rem;
      }
      .modal-text {
        font-size: 14px;
        line-height: 24px;
        max-height: 45vh;
        overflow-y: auto;
        padding: 10px;
        p {
          padding: 0;
          text-align: left;
          text-indent: 2em;
        }
      }
      &:after {
        height: 0
      }
    }
    .modal-buttons {
      width: 100%;
      background: #FEFEFE;
      height: 60px;
      border-radius: 0 0 12px 12px;
      .modal-button {
        width: 170px;
        height: 40px;
        background: #F9B552;
        color: white;
        border-radius: 0.4rem;
        box-shadow: #B3B3AB 0px 3px 2px;
        margin: 8px;
        font-size: 16px;
        line-height: 40px;
      }
    }
  }
}
</style>
