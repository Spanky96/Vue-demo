<template>
  <div>
    <page style="background:#FBF4DA">
      <div class="bgtop"></div>
      <div class="bgdown">
        <div class="pagger">
          <div class="btn btn-pre" @click="changeView(0, -1)"><div>{{ this.currentId > 1 ? '上一页' : '返回' }}</div></div>
          <div class="btn btn-next" @click="changeView(0, 1)"><div>{{ this.currentId != 7 ? '下一页' : '提交' }}</div></div>
        </div>
      </div>
      <div class="wrap">
        <ul class="tabs group">
            <li v-for="(tab, id) in tabs" :key="id">
              <a @click="changeView(tab.id)" :class="{active: tab.active}" v-bind:style="[tab.style]">{{tab.active ? tab.title : tab.subTitle}}</a>
            </li>
        </ul>
        <div id="content">
          <scroll :enable-infinite="false" :enable-refresh="false">
            <!-- <keep-alive>
              <component :is="currentView" :page="pages[currentId -1]"></component>
            </keep-alive> -->
            <pingce :page="pages[currentId -1]" v-on:showAlert="showAlert"></pingce>
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
    var pages = [
        {
            "id": 1,
            "title": "江阴市机关作风效能建设民主评测表(一)"
        },
        {
            "id": 2,
            "title": "江阴市机关作风效能建设民主评测表(二)"
        },
        {
            "id": 3,
            "title": "江阴市机关作风效能建设民主评测表(三)"
        },
        {
            "id": 4,
            "title": "江阴市机关作风效能建设民主评测表(四)"
        },
        {
            "id": 5,
            "title": "江阴市机关作风效能建设民主评测表(五)",
            "className": "第五类　　园区 镇街道",
            "descrpition": "(请选择符合您看法的选项, 镇(街道) “ 好 ” 票不超过6个单位， 园区“好”票三选一)",
            "groups": [
                {
                    "name": "园区",
                    "maxGood": 1,
                    "items": [{
                        "id": "q01001",
                        "order": 1,
                        "name": "高新区",
                        "description": "弹框描述内容",
                        "type": "choose"
                    }, {
                        "id": "q01002",
                        "order": 2,
                        "name": "领港经济开发区",
                        "description": "弹框描述内容"
                    }
                ]},
                {
                  "name": "镇街道",
                  "maxGood": 3,
                  "items": [{
                      "id": "q01001",
                      "order": 1,
                      "name": "澄江街道",
                      "description": "弹框描述内容",
                      "type": "choose"
                  }, {
                      "id": "q01002",
                      "order": 2,
                      "name": "南闸街道",
                      "description": "弹框描述内容"
                  }
                ]}
            ]
        },
        {
            "id": 6,
            "title": "南闸街道作风效能建设民主评测表"
        },
        {
            "id": 7,
            "title": "江阴市机关作风效能建设总体评价表"
        }
    ];
    var tabs = [
      {id: '1', title: '江阴市机关作风效能建设民主评测表1', subTitle: '1', active: true},
      {id: '2', title: '江阴市机关作风效能建设民主评测表2', subTitle: '2'},
      {id: '3', title: '江阴市机关作风效能建设民主评测表3', subTitle: '3'},
      {id: '4', title: '江阴市机关作风效能建设民主评测表4', subTitle: '4'},
      {id: '5', title: '江阴市机关作风效能建设民主评测表5', subTitle: '5'},
      {id: '6', title: '南闸街道作风效能建设民主评测表', subTitle: '南'},
      {id: '7', title: '江阴市机关作风效能建设总体评价表', subTitle: '江'}];
    this.changeStyle(tabs);
    return {
      pages: pages,
      tabs: tabs,
      currentId: 1,
      currentView: 'pingce',
      alertObject: {okText: '关闭'}
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
      var pageId = id || (parseInt(this.currentId) + offset);
      if (pageId < 1 || pageId > 7) {
        if (pageId == 0) {
          // 返回
        }
        if (pageId == 8) {
          // 提交
          this.$refs.confirm.open();
        }
        return;
      }
      if (this.currentId == pageId) {
        return;
      }
      this.currentId = pageId;
      this.tabs.map((item) => {
        item.active = item.id == pageId;
      });
      this.changeStyle(this.tabs);
    },
    showAlert: function (item) {
      this.alertObject = {
        title: item.name,
        content: item.description,
        okText: '关闭'
      };
      this.$refs.alert.open();
    },
    submit: function () {
      console.log(111);
    }
  },
  mounted () {
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
        font-size: 1.4rem;
        background: url('../images/mzpc/timg.png');
        background-size: 100% 100%;
        padding: 0.6rem;
      }
      .modal-text {
        font-size: 14px;
        line-height: 24px;
        max-height: 45vh;
        overflow-y: scroll;
        padding: 10px;
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
