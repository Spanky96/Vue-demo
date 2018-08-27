<template>
<div>
  <advertisement></advertisement>
  <page>
  <page-footer>
    <footer-item v-bind:class="{ 'active' : currentView === 'home' }" @click.native="changeView('home')">
      <span class="icon demo-icon-home"></span>
      <label>主页</label>
    </footer-item>
    <footer-item v-bind:class="{ 'active' : currentView === 'slide' }" @click.native="changeView('slide')">
      <span class="icon demo-icon-search"></span>
      <label>预约</label>
    </footer-item>
    <footer-item v-bind:class="{ 'active' : currentView === 'noti' }" @click.native="changeView('noti')">
      <span class="icon demo-icon-noti"></span>
      <span class="badge">2</span>
      <label>消费记录</label>
    </footer-item>
    <footer-item v-bind:class="{ 'active' : currentView === 'about' }" @click.native="changeView('about')">
      <span class="icon demo-icon-me"></span>
      <label>个人</label>
    </footer-item>
  </page-footer>
  <keep-alive>
    <component :is="currentView"></component>
  </keep-alive>
</page>
</div>
</template>

<script>
import Content from './weui/components/content';
import Page from './weui/components/page/index';
import { Footer, Item } from './weui/components/footer';
import Home from './Home';
import Advertisement from './Advertisement';
export default {
  name: 'HelloWorld',
  components: {
    'page-content': Content,
    Page,
    'page-footer': Footer,
    'footer-item': Item,
    Home,
    Advertisement
  },
  data () {
    return {
      currentView: 'login'
    };
  },
  methods: {
    changeView (view) {
      this.currentView = view;
    }
  }
};
</script>

<style>
.my-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 2.8rem;
}
.demo-icon-home {
  background-image: url("/static/images/home/home.png");
  background-size: 100%;
}
.demo-icon-search {
  background-image: url("/static/images/home/search.png");
  background-size: 100%;
}
.demo-icon-noti {
  background-image: url("/static/images/home/button.png");
  background-size: 100%;
}
.demo-icon-me {
  background-image: url("/static/images/home/person.png");
  background-size: 100%;
}
</style>
