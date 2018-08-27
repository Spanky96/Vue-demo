<template>
    <div class="count" @click="close()">
        {{countNumber}}
    </div>
</template>

<script>

export default {
  data() {
    return {
      countNumber: this.number
    }
  },
  props: {
    number: {
      type: Number,
      default: 5
    },
    autoClose: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    startCountDown: function () {
      var interval = setInterval(()=>{
        if (-- this.countNumber == 0) {
          clearInterval(interval);
          if (this.autoClose) {
            this.$emit('timeover', this);
          } else {
            this.countNumber = 'x';
          }
        }
      },1000);
    },
    close: function () {
      if (this.countNumber == 'x') {
        this.$emit('timeover', this);
      }
    }
  },
  mounted: function() {
    this.startCountDown();
  }
}
</script>

<style lang="less" scoped>
.count {
  text-align: center;
  width: 25px;
  line-height: 25px;
  color: white;
  background: #cfcfcf;
  border-radius: 50%;
  float: right;
  right: 15px;
  top: 15px;
}
</style>
