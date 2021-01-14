<template>
  <div>
    <page style="background:#FBF4DA; overflow-x:hidden;overflow-y:scroll">
      <div id="main-bgtop" class="bgtop">
        <div class="title-box">
          <div class="title">{{active.actName}}</div>
          <div class="title title-stroke">{{active.actName}}</div>
        </div>
        <div class="time">活动时间：{{active.dateStart}}至{{active.dateEnd}}</div><div id="test" style="display:none;width: 15px;height: 15px;background: #fff;" @click="yjpj()"></div>
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
          <div id="fixtips">{{tipInfo}} {{getExtraTipInfo()}}</div>
          <scroll :enable-infinite="false" :enable-refresh="false" ref="scroll" id="pcPage">
            <pingce v-for="(page, index) in pages" :key="index" v-show="currentIndex==index" :page="pages[index]" :editable="editable" :submitable="submitable" v-on:showAlert="showAlert" v-on:changeView="changeView2" v-on:itemChanged="itemChanged" :ref="'pingce'+page.orderNo"></pingce>
          </scroll>
        </div>
      </div>
      <alert :title="alertObject.title" :content="alertObject.content" :ok-text='alertObject.okText' ref="alert"></alert>
      <confirm :title="'确认'" :content="'提交后对满意率勾选无法修改，七日内意见建议栏仍可填写更改。是否确认提交?'" :ok-text="'提交'" :cancel-text="'取消'"  :on-ok="submit" ref="confirm"></confirm>
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
    var active = this.$db.getObject('active');
    // 是否已保存
    var editable = this.$db.getObject('editable');
    var submitable = this.$db.getObject('submitable');
    if (!pages || !tabs) {
      this.$router.push({path: '/'});
    }
    tabs.forEach(function (n) { n.active = false; });
    tabs[0].active = true;
    this.changeStyle(tabs);
    var tipInfo = this.getTipInfo(pages[0]);
    return {
      pages: pages,
      tabs: tabs,
      active: active,
      editable: editable,
      submitable: submitable,
      currentIndex: 0,
      alertObject: {okText: '关闭'},
      resultCache: this.initResultCache(pages),
      countCache: 0,
      tipInfo: tipInfo
    };
  },
  watch: {
    currentIndex (n, old) {
      this.tipInfo = this.getTipInfo(this.pages[n]);
      if (this.tipInfo) {
        document.getElementById('fixtips').style.display = 'block';
        document.getElementById('pcPage').style.top = '22px';
      } else {
        document.getElementById('fixtips').style.display = 'none';
        document.getElementById('pcPage').style.top = '0px';
      }
    }
  },
  methods: {
    changeStyle (tabs) {
      var activeIndex = tabs.findIndex(function (item) {
        return item.active;
      });
      var maxIndex = tabs.length;
      tabs.forEach(function (item, index) {
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
    checkPage (page) {
      var unchoosedItems = [];
      if (page.orderNo >= 1 && page.orderNo <= 5) {
        for (var group of page.groups) {
          for (var item of group.items) {
            if (item.chooseStatus == '0') {
              unchoosedItems.push({
                item: item.order,
                group: group.name
              });
            }
          }
        }
      }
      if (page.isZjd) {
        if (page.advise1.chooseStatus == '0') {
            unchoosedItems.push({
              item: page.deptName
            });
        }
      }
      if (page.isZpb) {
        if (page.advise2.chooseStatus == '0') {
          unchoosedItems.push({
            item: '总体评价'
          });
        }
      }
      if (unchoosedItems.length) {
        return {
          page: page.orderNo,
          items: unchoosedItems
        };
      } else {
        return false;
      }
    },
    changeView (id, offset) {
      var pageId = offset ? (parseInt(this.currentIndex) + offset) : id;
      if (this.editable && pageId > this.currentIndex) {
        // 检查有没有未填选项
        // 1 -> 2 检查 1  1->3 检查 1,2
        for (var startIndex = parseInt(this.currentIndex); startIndex < pageId; startIndex++) {
          var page = this.pages[startIndex];
          var result = this.checkPage(page);
          if (result) {
            var description = '';
            if (startIndex == parseInt(this.currentIndex)) {
              description = '本页遗有待评项：' + (function () {
                var res = '';
                if (result.page > 5) { // 总评表和街道评表
                  return '总体评价';
                } else if (result.page == 5) { // 有多组的
                  var currentGroup = '';
                  result.items.forEach(function (o) {
                    if (o.group != currentGroup) {
                      currentGroup = o.group;
                      res += '<br>' + currentGroup + ':';
                    }
                    res += (o.item < 10 ? "0" + o.item : o.item) + ',';
                  });
                  return res;
                } else {
                  result.items.forEach(function (o) {
                    res += (o.item < 10 ? "0" + o.item : o.item) + ',';
                  });
                  return res;
                }
              })() + '<br>请先给与测评再尝试此操作。';
            } else {
              description = '请先完成' + page.title + "再尝试此操作。";
            }
            this.showAlert({
              name: '提示',
              description: description,
              okText: '关闭'
            });
            return;
          }
        }
      }

      if (pageId == -1) {
        // 返回
        this.$router.push({path: '/gz'});
        return;
      }
      if (pageId == this.pages.length) {
        if (!this.submitable) {
          this.showAlert({name: '提示', description: '很抱歉,距您上次提交已超7日，无法提交。'});
          return;
        }
        this.$refs.confirm.open();
        return;
      }
      if (this.currentIndex == pageId) {
        return;
      }
      this.currentIndex = pageId;
      this.tabs.forEach(function (item, index) {
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
        if (page.isZjd) {
          if (page.advise1.chooseStatus == '0') {
              return {
                page: page.title,
                item: '总体评价'
              };
          }
        }
        if (page.isZpb) {
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
      pages.forEach(function (page) {
        if (page.orderNo >= 1 && page.orderNo <= 5) {
          page.groups.forEach(function (group) {
            group.items.forEach(function (item) {
              if (item.chooseStatus != '0') {
                resultCache.add(item);
              }
            });
          });
        }
      });
      return resultCache;
    },
    yjpj: function () {
      var resultCache = new Set();
      this.pages.forEach(function (page) {
        if (page.orderNo >= 1 && page.orderNo <= 5) {
          page.groups.forEach(function (group) {
            group.items.forEach(function (item) {
              if (item.chooseStatus == '0') {
                item.chooseStatus = Math.ceil(Math.random() * 5);
                resultCache.add(item);
              }
            });
          });
        }
      });
      this.resultCache = resultCache;
    },
    submit: function () {
      var vm = this;
      // 如果不能提交，直接return
      if (!vm.submitable) {
        return;
      }
      // 回调
      var p1 = null;
      var p2 = null;
      var p3 = null;
      // 提交
      if (vm.editable) {
        // 1 检查所有选择题 是否已选
        var unchooseditem = vm.getUnchoosedItem();
        if (unchooseditem) {
          vm.showAlert({
            name: '提示',
            description: unchooseditem.page + ' 中存在未选择选项：' + unchooseditem.item + '。',
            okText: '关闭'
          });
          return;
        } else {
          // 提交选择题
          p1 = vm.saveResult(vm.resultCache, true);
        }
      }
      // 3 提交主观题
      if (vm.$refs.pingce8) {
        if (p1) {
          p2 = new Promise(function (resolve, reject) {
            p1.then(function (data) {
              console.log(data + "完成下面是06");
              vm.$refs.pingce8[0].savePage06().then(function (data) {
                resolve(data);
              });
            });
          });
        } else {
          p2 = vm.$refs.pingce8[0].savePage06();
        }
      }
      if (vm.$refs.pingce6) {
        if (p1) {
          p2 = new Promise(function (resolve, reject) {
            p1.then(function (data) {
              console.log(data + "完成下面是06");
              vm.$refs.pingce6[0].savePage06().then(function (data) {
                resolve(data);
              });
            });
          });
        } else {
          p2 = vm.$refs.pingce6[0].savePage06();
        }
      }

      var p = p2 || p1;
      if (p) {
        p3 = new Promise(function (resolve, reject) {
          if (vm.$refs.pingce7) {
            p.then(function (data) {
              console.log(data + "完成下面是总评表");
              vm.$refs.pingce7[0].saveZpb().then(function (data) {
                resolve(data);
              });
            });
          } else {
            p.then(function (data) {
              resolve(data);
            });
          }
         
        });
      } else {
        p3 = vm.$refs.pingce7[0].saveZpb();
      }

      p3.then(function (data) {
        console.log(data + "完成下面是最后操作");
        // 4 不可修改
        vm.editable = false;
        vm.$db.set('editable', false);
        vm.$db.set('pages', vm.pages);
        vm.$db.set('tabs', vm.tabs);
        // 5 跳转页面
        vm.$router.push({path: '/bye'});
      });
    },
    itemChanged (item) {
      this.resultCache.add(item);
      this.getExtraTipInfo();
      if (++this.countCache % 10 == 0) {
        // 每选择10个 暂存一次
        this.saveResult(this.resultCache);
      }
    },
    saveResult (resultSet, boolean) {
      var vm = this;
      var result = [[], [], [], [], []];
      resultSet.forEach(function (o) {
        Number(o.chooseStatus) && result[Number(o.chooseStatus) - 1].push(o.id);
      });
      var p = new Promise(function (resolve, reject) {
        vm.$http.post('api/save/saveResult.jsp', {
          actId: vm.active.actId,
          memberId: vm.$db.get('memberId'),
          result: result.map(function (n) { return n.join(','); }),
          status: boolean ? 'Y' : 'N'
        }).then(function (res) {
            if (res.data.success) {
              console.log("评测结果暂存成功");
              resolve("zc");
            } else {
              vm.showAlert({
                name: '提示',
                description: res.data.msg,
                okText: '关闭'
              });
            }
          }).catch(function (err) {
            console.log(err);
        });
      });
      return p;
    },
    getTipInfo: function (page) {
      var tip = '';
      if (page.orderNo >= 1 && page.orderNo <= 3) {
        tip = '注：' + (page.title.length > 8 ? '该表' : page.title) + '满意票不能超过 ' + page.groups[0].maxGood;
      } else if (page.orderNo == 4) {
        tip = '注：园区满意票三选一, 镇街道满意票不超过' + (page.groups[1] && page.groups[1].maxGood) || '';
      }
      return tip;
    },
    getExtraTipInfo: function () {
      var page = this.pages[this.currentIndex];
      var currentGood = 0;
      if (page.orderNo >= 1 && page.orderNo <= 3) {
        currentGood = page.groups[0].items.filter(function (o) { return o.chooseStatus == '1'; }).length;
        return `(${currentGood}/${page.groups[0].maxGood})`;
      } else if (page.orderNo == 4) {
        currentGood = page.groups[1].items.filter(function (o) { return o.chooseStatus == '1'; }).length;
        return `(${currentGood}/${page.groups[1].maxGood})`;
      }
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
        word-wrap: break-word;
        p {
          padding: 0;
          color: #000;
          text-align: left;
          text-indent: 2em;
          font-size: 14px;
          line-height: 24px;
          max-height: 45vh;
          overflow-y: auto;
          padding: 10px;
          word-wrap: break-word;
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
#pcPage {
  top: 22px;
  overflow-y: scroll;
  overflow-x: hidden;
}
#fixtips {
  color: red;
  box-shadow: 0 3px 5px #ccc;
  text-align: center;
  font-size: 12px;
}
</style>
