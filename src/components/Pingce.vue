<template>
  <div id="pc-page">
    <div class="h1">{{page.title}}</div>
    <div class="class-name">{{page.className}}</div>
    <div class="descrpition">{{page.descrpition}}</div>
    <div class="tips">请点击机关名称查看机关介绍</div>
    <div class="groups">
      <div class="group" v-for="(group, index) in page.groups" :key="index">
        <div class="group-name">{{group.name}}</div>
        <div class="items">
          <div class="item" v-for="(item, order) in group.items" :key="order">
            <div class="sub sub-name">{{item.order |NumFormat}}. <div class="itemname">{{item.name}}</div></div>
            <div class="sub sub-item"><label>好<input type="radio" :name="item.id" class="radio-box"></label><i></i></div>
            <div class="sub sub-item"><label>较好<input type="radio" :name="item.id" class="radio-box"></label><i></i></div>
            <div class="sub sub-item"><label>一般<input type="radio" :name="item.id" class="radio-box"></label><i></i></div>
            <div class="sub sub-item"><label>较差<input type="radio" :name="item.id" class="radio-box"></label><i></i></div>
            <div class="sub sub-item"><label>不了解<input type="radio" :name="item.id" class="radio-box"></label><i></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Alert, Confirm } from './modal';
export default {
  name: 'Pingce',
   props: {
    page: {
      type: Object
    }
   },
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

<style lang="scss" scoped>
#pc-page {
  color: #535353;
  padding: 10px;
  .h1 {
    text-align: center;
    font-weight: bold;
    font-size: 1.15rem;
    border-bottom: 2px solid #F19149;
  }
  .class-name ,.descrpition {
    text-align: center;
    line-height: 31px;
  }
  .tips {
    text-align: center;
    font-size: 16px;
    color: #546BF7;
  }
  .groups {
    .group:nth-child(n+2) {
      border-top: 1px solid #DBDBDB;
    }
    .group {
      .group-name {
        font-weight: bold;
        font-size: 0.85rem;
        line-height: 40px;
      }
      .items {
        font-size: 14px;
        line-height: 25px;
        .item {
          margin-bottom: 5px;
          display: flex;
          .sub {
            flex: 1;
            .itemname {
              display: inline;
              color: #546BF7;
              text-decoration: underline;
            }
            .radio-box {
              display: block;
              margin: 5px auto;
            }
          }
          .sub-name {
            min-width: 24%;
            cursor: pointer;
          }
          .sub-item {
            text-align: center;
          }
          .sub:last-child {
            min-width: 16%;
          }
        }
      }
    }
  }
}

</style>
