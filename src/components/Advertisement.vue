<template>
<div id="ads" v-if="open">
  <div class="count-down">
    <count-down :number="5" @timeover = "timeover" :auto-close="false"></count-down>
  </div>
  <slide-wrapper id="ads">
    <slide><img src="../images/ad/ad1.png" /></slide>
    <slide><img src="../images/ad/ad2.png" /></slide>
    <slide><img src="../images/ad/ad1.png" /></slide>
    <slide><img src="../images/ad/ad2.png" /></slide>
  </slide-wrapper>
</div>
</template>

<script>
import Content from './weui/components/content';
import { SimpleHeader } from './weui/components/header';
import { SlideWrapper, Slide } from './weui/components/slide';
import { CountDown } from './weui/components/timer';

export default {
  data () {
    return {
      open: true
    };
  },
  components: {
    'page-content': Content,
    SimpleHeader,
    SlideWrapper,
    Slide,
    CountDown
  },
  methods: {
    timeover: function () {
      this.open = false;
    }
  }
};
</script>

<style lang="less">
#ads {
  .slide-wrap {
    z-index: 9999;
    .slide {
      min-height: 100vh;
      height: 100vh;
      img {
        height: 100vh;
      }
    }
    .bullets {
      bottom: 1.3rem;
    }
  }
  .count-down {
    position: absolute;
    z-index: 99999999;
    right: 0;
    top: 15px;
    right: 15px;
  }
}
</style>
