<template>
  <div id="home">
    <div><img class="banner" src="../images/banner.png"></div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      overFunc: function () {
        console.log(1);
      },
      msg: 'This is Login page!'
    };
  },
  methods: {
    timeover: function () {
      console.log("hahahaha");
    }
  }
};
</script>

<style scoped>
.banner {
  width: 100vw;
  height: 15vh;
}
</style>
