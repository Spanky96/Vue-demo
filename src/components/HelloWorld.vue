<template>
<div>
  <page>
  <page-footer>
    <footer-item v-bind:class="{ 'active' : currentView === 'login' }" @click.native="changeView('login')">
      <span class="icon demo-icon-home"></span>
      <label>Home</label>
    </footer-item>
    <footer-item v-bind:class="{ 'active' : currentView === 'slide' }" @click.native="changeView('slide')">
      <span class="icon demo-icon-search"></span>
      <label>Search</label>
    </footer-item>
    <footer-item v-bind:class="{ 'active' : currentView === 'noti' }" @click.native="changeView('noti')">
      <span class="icon demo-icon-noti"></span>
      <span class="badge">2</span>
      <label>Noti</label>
    </footer-item>
    <footer-item v-bind:class="{ 'active' : currentView === 'about' }" @click.native="changeView('about')">
      <span class="icon demo-icon-me"></span>
      <label>About</label>
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
import Login from './Login';
import Slide from './Slide';
export default {
  name: 'HelloWorld',
  components: {
    'page-content': Content,
    Page,
    'page-footer': Footer,
    'footer-item': Item,
    Login,
    Slide
  },
  data () {
    return {
      currentView: 'home'
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
