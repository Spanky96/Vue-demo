<template>
  <div id="pc-page">
    <div class="h1">{{page.title}}</div>
    <div class="class-name">{{page.className}}</div>
    <div class="descrpition">{{page.descrpition}}</div>
    <!-- 选择题 1-5 评测表 START-->
    <div v-if="page.id <= 5">
      <div class="tips">请点击机关名称查看机关介绍</div>
      <div class="groups">
        <div class="group" v-for="(group, index) in page.groups" :key="index">
          <div class="group-name">{{group.name}}</div>
          <div class="items">
            <div class="item" v-for="(item, order) in group.items" :key="order">
              <div class="sub sub-name">{{item.order |NumFormat}}. <div class="itemname" @click="showInfo(item)">{{item.name}}</div></div>
              <div class="sub sub-item"><label>好<input type="radio" :name="item.id" class="radio-box"></label><i></i></div>
              <div class="sub sub-item"><label>较好<input type="radio" :name="item.id" class="radio-box"></label><i></i></div>
              <div class="sub sub-item"><label>一般<input type="radio" :name="item.id" class="radio-box"></label><i></i></div>
              <div class="sub sub-item"><label>较差<input type="radio" :name="item.id" class="radio-box"></label><i></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 选择题 1-5 评测表 END-->

    <!-- 南闸街道 评测表 START-->
    <div v-if="page.id == 6">
      <div class="groups">
        <div class="no-group">
          <div class="no-group-name">1.您对本街道的作风效能的总体评价。</div>
          <div class="items">
            <div class="item">
              <div class="sub sub-item"><label>好<input type="radio" name="nzzp" class="radio-box"></label><i></i></div>
              <div class="sub sub-item"><label>较好<input type="radio" name="nzzp" class="radio-box"></label><i></i></div>
              <div class="sub sub-item"><label>一般<input type="radio" name="nzzp" class="radio-box"></label><i></i></div>
              <div class="sub sub-item"><label>较差<input type="radio" name="nzzp" class="radio-box"></label><i></i></div>
              <div class="sub sub-item"><label>不了解<input type="radio" name="nzzp" class="radio-box"></label><i></i></div>
            </div>
          </div>
        </div>
        <div class="no-group">
          <div class="no-group-name">2.您对本街道的的具体意见和建议。</div>
          <div class="textarea">
            <textarea name="nzjy" id="nzjy" placeholder="请在此输入您的具体意见和建议......" style="width:100%"></textarea>
          </div>
          <div class="ps">注: 批评意见包括表扬，批评及建议，尽量反应具体事例。</div>
        </div>
      </div>
    </div>
    <!-- 南闸街道 评测表 END-->

    <!-- 江阴总评 评测表 START-->
    <div v-if="page.id == 7">
      <div class="groups">
        <div class="no-group">
          <div class="no-group-name">1.您对全市机关作风效能的总体评价。</div>
          <div class="items">
            <div class="item">
              <div class="sub sub-item"><label>好<input type="radio" name="nzzp" class="radio-box"></label><i></i></div>
              <div class="sub sub-item"><label>较好<input type="radio" name="nzzp" class="radio-box"></label><i></i></div>
              <div class="sub sub-item"><label>一般<input type="radio" name="nzzp" class="radio-box"></label><i></i></div>
              <div class="sub sub-item"><label>较差<input type="radio" name="nzzp" class="radio-box"></label><i></i></div>
            </div>
          </div>
        </div>
        <div class="no-group">
          <div class="no-group-name">2.您对全市机关作风效能的意见建议总体评价。</div>
          <div class="textarea">
            <textarea name="qsjy" id="qsjy" placeholder="请在此输入您的建议总体评价......" style="width:100%"></textarea>
          </div>
          <hr color="#F9C4A2" size="1">
          <div class="no-group-name">3.您对有关部门（单位）和镇（街道）的具体意见和建议。</div>
          <div id="jvyjs">
            <div class="row1">
              <div class="col1">
                <div class="title">单位名称</div>
              </div>
              <div class="col2">
                <input type="text">
              </div>
              <div class="col3">
                <span class="add">1</span>
                <span class="delete">2</span>
              </div>
            </div>
            <div class="row2">
              <div class="col1">
                <div class="title">具体意见和建议</div>
              </div>
              <div class="col4">
                <textarea></textarea>
              </div>
            </div>
          </div>
          <div class="ps">注: 1, 批评意见包括表扬，批评及建议，尽量反应具体事例。<br>2, 一个部门（单位）填写一栏。</div>
        </div>
      </div>
    </div>
    <!-- 江阴总评 评测表 END-->
  </div>
</template>

<script>
export default {
  name: 'Pingce',
   props: {
    page: {
      type: Object
    }
   },
  data () {
    return {
    };
  },
  methods: {
    showInfo (item) {
      this.$emit('showAlert', item);
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
    .group, .no-group {
      .group-name, .no-group-name {
        font-size: 0.85rem;
        line-height: 30px;
      }
      .group-name {
        font-weight: bold;
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
    .no-group {
      .textarea {
        #nzjy, #qsjy{
          border: none;
          background: rgb(238, 238, 238);
          width: 100%;
          resize: none;
          padding: 10px;
          font-size: 14px;
          height: 48vh;
          font-family: sans-serif;
        }
        #qsjy {
          height: 20vh;
        }
      }
      .ps {
        text-indent: -2em;
        margin-left: 2em;
        padding: 5px;
      }
    }
  }
}

#jvyjs {
  .row1, .row2 {
    display: flex;
    font-size: 14px;
    .col1 {
      flex: 1;
      padding: 0 15px;
      max-width: 100px;
    }
    .col2 {
      flex: 2;
      input {
        border: 1px solid;
        height: 25px;
        font-size: 14px;
        padding: 5px;
      }
    }
    .col3 {
      flex: 1;
      .add {
        background: url('../images/mzpc/ADD.png');
      }
      .delete {
        background: url('../images/mzpc/DEL.png');
      }
    }
    .col4 {
      flex: 4;
      textarea {
          border: none;
          background: rgb(238, 238, 238);
          width: 100%;
          resize: none;
          padding: 10px;
          font-size: 14px;
          font-family: sans-serif;
      }
    }
  }
  .row1 {
    margin-bottom: 10px;
  }
}
</style>
