<template>
  <div id="pc-page">
    <div class="h1">{{page.title}}</div>
    <!-- <div class="class-name">{{page.className}}{{getItemNumber(page)}}</div> -->
    <!-- 选择题 1-5 评测表 START-->
    <div>
      <div class="description" v-if="page.descrption">({{page.descrption}})</div>
      <div class="tips" v-if="page.showTip">{{page.showTip}}</div>
      <div class="groups">
        <div class="group" v-for="(group, index) in page.users" :key="index">
          <div class="group-name">{{group.groupName}} ({{group.items.length}}人)</div>
          <div class="items">
            <div class="item" v-for="(item, order) in group.items" :key="order" :class="item.type">
              <div class="sub sub-name"><span class="no">{{item.orderNo | NumFormat}}. </span>
                <div class="itemname">{{item.userName}}</div>
                <!-- <div class="leader" v-if="item.role">({{item.role}})</div> -->
              </div>

              <input class="rateInput" type="number" v-model="item.value"
                :disabled="!submitable"
                :placeholder="item.userName + '总评分'"
                @blur="itemChanged(item, group, page)"
              >
              <div class="msg">{{item.msg}}</div>

              <!-- <label @click="showTips(group, item, true)" class="item-label"><div class="sub sub-item">好<input type="radio" :name="item.id" class="radio-box" :disabled="!editable || item.chooseStatus != '1' && checkMaxGood(group)" value="1" v-model="item.chooseStatus"  @change="itemChanged(item)"></div></label>
              <label @click="showTips(group, item)" class="item-label m60"><div class="sub sub-item">较好<input type="radio" :name="item.id" class="radio-box" value="2" v-model="item.chooseStatus" :disabled="!editable" @change="itemChanged(item)"></div></label>
              <label @click="showTips(group, item)" class="item-label"><div class="sub sub-item">一般<input type="radio" :name="item.id" class="radio-box" value="3" v-model="item.chooseStatus" :disabled="!editable" @change="itemChanged(item)"></div></label> -->
            </div>
          </div>
        </div>
      </div>
      <div class="submit-btns largeShow" style="display:flex">
        <div class="submit-btn" @click="$emit('changeView',{id: 0, offset: -1})"><div>{{ page.orderNo > 1 ? '上一页' : '返回' }}</div></div>
        <div class="submit-btn" @click="$emit('changeView',{id: 0, offset: 1})"><div>下一页</div></div>
      </div>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash';

export default {
  name: 'Pingce2',
   props: {
    page: {
      type: Object
    },
    editable: {
      type: Boolean
    },
    submitable: {
      type: Boolean
    }
   },
  data () {
    // const companies = this.$db.getObject('companies');
    this.page.users.forEach(group => {
      group.items.forEach(item => {
        item.type = '';
        item.msg = '';
      });
    });
    return {
    };
  },
  methods: {
    itemChanged (item, group, page) {
      // this.$emit('itemChanged', item);
      if (item.value) {
        if (isNaN(item.value)) {
          item.type = 'error';
          item.msg = '非数字';
        } else {
          if (parseInt(item.value) == parseFloat(item.value)) { // 整数自动取整
            item.value = parseInt(item.value);
          } else { // 小数割成1位
            item.value = parseFloat(Math.floor(parseFloat(item.value) * 100) / 100);
          }
          if (item.value > 100 || item.value < 0) {
            item.type = 'error';
            item.msg = '非有效区间数字';
          } else {
            item.type = 'number';
            item.msg = '';
          }
        }
      }
      this.checkRule();
    },
    checkRule: function () {
      // 无error
      var error = '';
      try {
        this.page.users.forEach(group => {
          group.items.forEach(item => {
            if (item.type == 'error') {
              throw (new Error());
            }
          });
        });
      } catch (e) {
        error = '存在无效值';
      }

      // 规则1 90分以上不能超过40%
      this.page.users.forEach(group => {
        var totalPerson = group.items.length;
        var maxNum = Math.floor(totalPerson * 0.4);
        var count = 0;
        group.items.forEach(item => {
          item.msg.replace('评分重复', '');
          if (item.type == 'number' && item.value >= 90) {
            count++;
          }
        });
        group.items.forEach(item => {
          if (item.type == 'number' && item.value >= 90) {
            item.msg = (count > maxNum) ? '90分以上不能超过40%;' : '';
          }
        });
        if (count > maxNum) {
          error = '90分以上超过40%';
        }
      });

      // 规则1 90分以上不能超过40% 按page
      /*
      var totalPerson = _.sum(this.page.users.map(n => n.items.length));
      var maxNum = Math.floor(totalPerson * 0.4);
      var count = 0;
      this.page.users.forEach(group => {
        group.items.forEach(item => {
          item.msg.replace('评分重复', '');
          if (item.type == 'number' && item.value >= 90) {
            count++;
          }
        });
      });
      this.page.users.forEach(group => {
        group.items.forEach(item => {
          if (item.type == 'number' && item.value >= 90) {
            item.msg = (count > maxNum) ? '90分以上不能超过40%;' : '';
          }
        });
      });
      if (count > maxNum) {
        error = '90分以上超过40%';
      }
      */
      // 规则2 所有人的分数不能重复
      var exitSame = false;
      this.page.users.forEach(groupI => {
        groupI.items.forEach(itemI => {
          this.page.users.forEach(groupJ => {
            groupJ.items.forEach(itemJ => {
              if (itemI != itemJ && itemI.type == 'number' && itemJ.type == 'number') {
                if (itemI.value == itemJ.value) {
                  exitSame = true;
                  !itemI.msg.includes('评分重复') && (itemI.msg += '评分重复');
                  !itemJ.msg.includes('评分重复') && (itemJ.msg += '评分重复');
                }
              }
            });
          });
        });
      });
      if (exitSame) {
        error = '评分重复';
      }
      this.page.error = error;
      return error;
    },
    savePage06 () {
      var vm = this;
      if (!vm.submitable) {
        return;
      }
      var data = {
        advise1: {
          chooseStatus: vm.page.advise1.chooseStatus,
          advise: vm.page.advise1.advise
        }
      };
      var url = 'api/save/saveJdb.jsp?actId=' + vm.$db.get('active').actId;
      if (vm.$db.get('memberId')) {
        url += '&memberId=' + vm.$db.get('memberId');
      }
      var p = new Promise(function (resolve, reject) {
        vm.$http.post(url, data).then(function (res) {
          if (res.data.success) {
            console.log("评测结果暂存成功");
          } else {
            console.log("保存失败");
          }
          resolve("page06");
        }).catch(function (err) {
          console.log(err);
        });
      });
      return p;
    },
    saveZpb () {
      var vm = this;
      if (!vm.submitable) {
        return;
      }
      var dwadvise = [];
      vm.page.dwadvise.forEach(function (n) {
          if (n.dwId && n.advise.trim()) {
            dwadvise.push({
              dwId: n.dwId,
              advise: n.advise
            });
          }
      });
      var data = {
        advise2: vm.page.advise2,
        dwadvise: dwadvise[0] ? dwadvise : []
      };
      var url = 'api/save/saveZpb.jsp?actId=' + vm.$db.get('active').actId;
      if (vm.$db.get('memberId')) {
        url += '&memberId=' + this.$db.get('memberId');
      }
      var p = new Promise(function (resolve, reject) {
        vm.$http.post(url, data).then(function (res) {
          if (res.data.success) {
            console.log("评测结果暂存成功");
          } else {
            console.log("保存失败");
          }
          resolve('zpb');
        }).catch(function (err) {
          console.log(err);
        });
      });
      return p;
    },
    checkMaxGood (group) {
      return group.items.filter(function (o) { return o.chooseStatus == '1'; }).length == group.maxGood;
    },
    closeDwopt (advice) {
      var vm = this;
      setTimeout(function () {
        if (advice.danwei) {
          var company = vm.companies.find(function (company) {
            return advice.danwei == company.name;
          });
          if (company) {
            advice.dwId = company.id;
            advice.dwName = company.name;
          } else {
            vm.$toast('该单位不存在或不在评议范围内');
            advice.danwei = '';
            advice.dwId = '';
          }
        } else {
          advice.dwId = '';
        }
        advice.dwShow = false;
      }, 200);
    },
    showDwopt (advice, index) {
      if (!this.submitable) return;
      advice.dwShow = true;
      setTimeout(function () {
        document.getElementById('advice' + index).focus();
      }, 200);
    },
    chooseDwopt (advice, dw) {
      advice.danwei = dw.name;
      advice.dwName = dw.name;
      advice.dwShow = false;
      if (advice.dwId == dw.id) {
        return;
      }
      advice.dwId = dw.id;
      if (advice.advise.trim()) {
        this.saveZpb();
      }
    },
    getLikelyCompany (name) {
      if (!name) {
        return [];
      } else {
        return this.companies.filter(function (c) { return c.name.includes(name.trim()); });
      }
    },
    showTips (group, item, good) {
      if (!this.editable) {
        this.$emit('showAlert', {name: '提示', description: '结果已提交，不能更改。', okText: '确认'});
        return;
      }
      if (good && item.chooseStatus != '1' && this.checkMaxGood(group)) {
        var goodItems = group.items.filter(function (o) { return o.chooseStatus == '1'; });
        var goodItemNames = goodItems.map(n => (n.name || n.leader)).join(',');
        var goodName = this.page.chooses ? this.page.chooses[0].chooseTitle : '好票';
        this.$emit('showAlert', {name: '提示', description: (`"${goodName}"数不能超过${group.maxGood},请适当考虑后投票。<br>当前`) + '已投给：' + goodItemNames, okText: '确认'});
      }
    },
    showInfo (item) {
      item.description && this.$emit('showAlert', item);
    },
    addAdvice () {
      this.page.dwadvise.push({
        danwei: '',
        advise: '',
        dwShow: false
      });
    },
    delAdvice (index) {
      var zc = this.page.dwadvise[index].dwId;
      this.page.dwadvise.splice(index, 1);
      zc && this.saveZpb();
    },
    getItemNumber: function (page) {
      if (page.orderNo <= 5) {
        var count = 0;
        page.groups.forEach(function (group) {
          count += group.items.length;
        });
        return '(' + count + '个)';
      } else {
        return '';
      }
    },
    getAreaType: function (title) {
      const typeArr = ['高新区', "开发区", "园区", "街道", "镇"];
      for (var type of typeArr) {
        if (title.includes(type)) {
          return type;
        }
      }
      return "地";
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
    font-size: 1rem;
    border-bottom: 2px solid #F19149;
  }
  .class-name ,.description {
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
        @media screen and (min-width: 768px) {
          display: flex;
          flex-wrap: wrap;
        }
        font-size: 14px;
        line-height: 25px;
        .item {
          margin-bottom: 5px;
          display: flex;
          flex: 1;
          min-width: 300px;
          @media screen and (min-width: 768px) {
            max-width: 330px;
            padding-right: 20px;
          }
          padding-right: 5px;
          .m60 {
            min-width: 60px;
          }
          .sub {
            flex: 1;
            .itemname {
              display: inline;
              color: #546BF7;
              // text-decoration: underline;
            }
            .leader {
              font-size: 12px;
            }
            .radio-box {
              display: block;
              margin: 5px auto;
            }
          }
          .sub-name {
            min-width: 35%;
            cursor: pointer;
            display: flex;
            flex-wrap: wrap;
          }
          .sub-item {
            text-align: center;
          }
          &.error {
            .msg {
              color: red !important;
            }
            .rateInput {
              color: red !important;
            }
          }
          .rateInput {
            text-align: right;
            width: 153px;
          }
          .msg {
            position: absolute;
            font-size: 12px;
            color: orange;
            right: 210px;
            zoom: 0.8;
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
  .submit-btn {
    background: url('../images/mzpc/button.jpg') no-repeat;
    width: 170px;
    background-size: 100% 100%;
    border-radius: 5px;
    height: 40px;
    color: white;
    line-height: 40px;
    font-size: 20px;
    margin: 15px auto;
    cursor: pointer;
    text-align: center;
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
      max-width: 100%;
      position: relative;
      .dwmc {
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        width: 100%;
        padding-left: 5px;
        color: #546BF7;
        cursor: pointer;
      }
      .choose {
        position: absolute;
        width: 100%;
        top: 0px;
        input {
          height: 25px;
          font-size: 14px;
          padding: 5px;
          width: 100%;
          border: none;
          background: rgb(238, 238, 238);
        }
        .dw-list {
          position: absolute;
          max-height: 200px;
          z-index: 6;
          overflow-y: scroll;
          list-style: none;
          background: #fff;
          width: 100%;
          margin-top: 0;
          padding: 0 5px;
          border-bottom: 1px solid;
          border-left: 1px solid;
          box-shadow: #867c7c 2px 2px 5px;
          .li-dw {
            cursor: pointer;
            padding: 4px 0;
            border-bottom: 1px solid #cfcfcf;
          }
        }
      }
    }
    .col3 {
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
      max-width: 35px;
      .delete {
        background: url('../images/mzpc/DEL.png');
      }
      .delete {
        height: 20px;
        width: 20px;
        background-size: 100% 100%;
        margin: 2px 5px;
      }
    }
    .col-add {
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
      .add {
        background: url('../images/mzpc/ADD.png');
      }
      .add{
        height: 20px;
        background-size: 20px 20px;
        background-repeat: no-repeat;
        text-indent: 25px;
        line-height: 24px;
        color: #545BF7;
        cursor: pointer;
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
}
</style>
