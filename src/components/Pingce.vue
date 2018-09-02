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
              <div class="sub sub-item"><label @click="showTips(group)">好<input type="radio" :name="item.id" class="radio-box" :disabled="checkMaxGood(group)" value="1" v-model="item.checked"></label><i></i></div>
              <div class="sub sub-item"><label>较好<input type="radio" :name="item.id" class="radio-box" value="2" v-model="item.checked"></label><i></i></div>
              <div class="sub sub-item"><label>一般<input type="radio" :name="item.id" class="radio-box" value="3" v-model="item.checked"></label><i></i></div>
              <div class="sub sub-item"><label>较差<input type="radio" :name="item.id" class="radio-box" value="4" v-model="item.checked"></label><i></i></div>
              <div class="sub sub-item"><label>不了解<input type="radio" :name="item.id" class="radio-box" value="5" v-model="item.checked"></label><i></i></div>
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
          <div id="jvyjs" v-for="(advice, index) in advices" :key="index">
            <div class="row1">
              <div class="col1">
                <div class="title">单位名称</div>
              </div>
              <div class="col2">
                <input type="text" v-model="advice.danwei" @focus="advice.dwShow = true" @blur="closeDwopt(advice)">
                <ul class="dw-list" v-show="advice.dwShow">
                  <li class="li-dw" v-for="(dw,id) in getLikelyCompany(advice.danwei)" :key="id" @click="advice.danwei = dw.name">{{dw.name}}</li>
                </ul>
              </div>
              <div class="col3">
                <div class="add" @click="addAdvice()" v-if="advices.length -1 == index"></div>
                <div class="delete" @click="delAdvice(index)" v-if="advices.length > 1"></div>
              </div>
            </div>
            <div class="row2">
              <div class="col1">
                <div class="title">具体意见和建议</div>
              </div>
              <div class="col4">
                <textarea v-model="advice.content" placeholder="请在此输入您的意见建议总体评价......"></textarea>
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
    const companies = [
      {id: 1, name: '江阴领悟信息'}, {id: 2, name: '江阴海澜之家'},
      {id: 3, name: '江阴阳光集团'}, {id: 4, name: '江阴华西集团'},
      {id: 5, name: '江阴万达'}, {id: 6, name: '江阴港龙'},
      {id: 7, name: '江阴无锡'}, {id: 8, name: '南京领悟'}
    ];
    return {
      advices: [{
        danwei: '',
        content: '',
        dwShow: false
      }],
      companies
    };
  },
  methods: {
    checkMaxGood (group) {
      return group.items.filter((o) => o.checked == 1).length == group.maxGood;
    },
    closeDwopt (advice) {
      setTimeout(function () {
        advice.dwShow = false;
      }, 100);
    },
    getLikelyCompany (name) {
      if (!name) {
        return this.companies;
      } else {
        return this.companies.filter((c) => c.name.includes(name.trim()));
      }
    },
    showTips (group) {
      if (this.checkMaxGood(group)) {
        this.$emit('showAlert', {name: '提示', description: '您勾选好的单位已超总体的40%，请适当考虑后投票。', okText: '确认'});
      }
    },
    showInfo (item) {
      this.$emit('showAlert', item);
    },
    addAdvice () {
      this.advices.push({
        danwei: '',
        content: '',
        dwShow: false
      });
    },
    delAdvice (index) {
      this.advices.splice(index, 1);
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
        display: flex;
        flex-wrap: wrap;
        .item {
          margin-bottom: 5px;
          display: flex;
          flex: 1;
          min-width: 300px;
          padding-right: 20px;
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
      .title {
        line-height: 25px;
      }
    }
    .col2 {
      flex: 2;
      input {
        border: 1px solid;
        height: 25px;
        font-size: 14px;
        padding: 5px;
        width: 160px;
      }
      .dw-list {
        position: absolute;
        max-height: 150px;
        z-index: 6;
        overflow-y: scroll;
        list-style: none;
        background: #fff;
        width: 160px;
        margin-top: 0;
        padding: 0 5px;
        border-bottom: 1px solid;
        border-left: 1px solid;
        box-shadow: #867c7c 2px 2px 5px;
        .li-dw {
          cursor: pointer;
          padding: 2px 0;
          border-bottom: 1px solid #cfcfcf;
        }
      }
    }
    .col3 {
      flex: 1;
      display: flex;
      .add {
        background: url('../images/mzpc/ADD.png');
      }
      .delete {
        background: url('../images/mzpc/DEL.png');
      }
      .add, .delete {
        height: 20px;
        width: 20px;
        background-size: 100% 100%;
        margin: 2px 5px;
      }
    }
    .col4 {
      flex: 3;
      textarea {
          border: none;
          background: rgb(238, 238, 238);
          width: 100%;
          resize: none;
          height: 18vh;
          padding: 10px;
          font-size: 14px;
          font-family: sans-serif;
      }
    }
  }
  .row1 {
    margin-bottom: 10px;
  }
  .row2 {
    margin-bottom: 20px;
  }
}
</style>
