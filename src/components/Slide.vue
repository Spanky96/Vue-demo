<template>
<div id="ads">
  <slide-wrapper id="ads">
    <slide><img src="/static/images/ad/ad1.png" /></slide>
    <slide><img src="/static/images/ad/ad2.png" /></slide>
    <slide><img src="/static/images/ad/ad1.png" /></slide>
    <slide><img src="/static/images/ad/ad2.png" /></slide>
  </slide-wrapper>
</div>
</template>

<script>
import Content from './weui/components/content';
import { SimpleHeader } from './weui/components/header';
import { SlideWrapper, Slide } from './weui/components/slide';

export default {
  components: {
    'page-content': Content,
    SimpleHeader,
    SlideWrapper,
    Slide
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
}
</style>
