<template>
  <div id="pc-page">
    <div class="h1">{{page.title}}</div>
    <div class="class-name">{{page.className}}{{getItemNumber(page)}}</div>
    <!-- 选择题 1-5 评测表 START-->
    <div v-if="page.orderNo <= 5">
      <div class="description">({{page.description}})</div>
      <div class="tips">请点击机关名称查看当年工作实绩</div>
      <div class="groups">
        <div class="group" v-for="(group, index) in page.groups" :key="index">
          <div class="group-name" v-if="page.groups.length > 1">{{group.name}}</div>
          <div class="items">
            <div class="item" v-for="(item, order) in group.items" :key="order">
              <div class="sub sub-name">{{item.order |NumFormat}}. <div class="itemname" @click="showInfo(item)">{{item.name}}</div></div>
              <label @click="showTips(group, item, true)" class="item-label"><div class="sub sub-item">好<input type="radio" :name="item.id" class="radio-box" :disabled="!editable || item.chooseStatus != '1' && checkMaxGood(group)" value="1" v-model="item.chooseStatus"  @change="itemChanged(item)"></div></label>
              <label @click="showTips(group, item)" class="item-label"><div class="sub sub-item">较好<input type="radio" :name="item.id" class="radio-box" value="2" v-model="item.chooseStatus" :disabled="!editable" @change="itemChanged(item)"></div></label>
              <label @click="showTips(group, item)" class="item-label"><div class="sub sub-item">一般<input type="radio" :name="item.id" class="radio-box" value="3" v-model="item.chooseStatus" :disabled="!editable" @change="itemChanged(item)"></div></label>
              <label @click="showTips(group, item)" class="item-label"><div class="sub sub-item">较差<input type="radio" :name="item.id" class="radio-box" value="4" v-model="item.chooseStatus" :disabled="!editable" @change="itemChanged(item)"></div></label>
              <label @click="showTips(group, item)" class="item-label"><div class="sub sub-item">不了解<input type="radio" :name="item.id" class="radio-box" value="5" v-model="item.chooseStatus" :disabled="!editable" @change="itemChanged(item)"></div></label>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-btns largeShow" style="display:flex">
        <div class="submit-btn" @click="$emit('changeView',{id: 0, offset: -1})"><div>{{ page.orderNo > 1 ? '上一页' : '返回' }}</div></div>
        <div class="submit-btn" @click="$emit('changeView',{id: 0, offset: 1})"><div>下一页</div></div>
      </div>
    </div>
    <!-- 选择题 1-5 评测表 END-->

    <!-- 南闸街道 评测表 START-->
    <div v-if="page.orderNo == 6">
      <div class="groups">
        <div class="no-group">
          <div class="no-group-name">1.您对本{{getAreaType(page.title)}}的作风效能的总体评价。</div>
          <div class="items">
            <div class="item">
              <div class="sub sub-item" @click="showTips()"><label>好<input type="radio" name="jdzp" class="radio-box" value="1" v-model="page.advise1.chooseStatus" :disabled="!editable"></label></div>
              <div class="sub sub-item" @click="showTips()"><label>较好<input type="radio" name="jdzp" class="radio-box" value="2" v-model="page.advise1.chooseStatus" :disabled="!editable"></label></div>
              <div class="sub sub-item" @click="showTips()"><label>一般<input type="radio" name="jdzp" class="radio-box" value="3" v-model="page.advise1.chooseStatus" :disabled="!editable"></label></div>
              <div class="sub sub-item" @click="showTips()"><label>较差<input type="radio" name="jdzp" class="radio-box" value="4" v-model="page.advise1.chooseStatus" :disabled="!editable"></label></div>
            </div>
          </div>
        </div>
        <div class="no-group">
          <div class="no-group-name">2.您对本{{getAreaType(page.title)}}的服务高质量发展的具体意见和建议。</div>
          <div class="textarea">
            <textarea name="nzjy" id="nzjy" placeholder="请在此输入您的具体意见和建议......" style="width:100%" :disabled="!submitable" v-model="page.advise1.advise" @blur="savePage06()"></textarea>
          </div>
          <div class="ps">注: 批评意见包括表扬，批评及建议，尽量反应具体事例。</div>
        </div>
      </div>
      <div class="submit-btns largeShow" style="display:flex">
        <div class="submit-btn" @click="$emit('changeView',{id: 0, offset: -1})"><div>上一页</div></div>
        <div class="submit-btn" @click="$emit('changeView',{id: 0, offset: 1})"><div>下一页</div></div>
      </div>
    </div>
    <!-- 南闸街道 评测表 END-->

    <!-- 江阴总评 评测表 START-->
    <div v-if="page.orderNo == 7">
      <div class="groups">
        <div class="no-group">
          <div class="no-group-name">1.您对全市机关作风效能的总体评价。</div>
          <div class="items">
            <div class="item">
              <div class="sub sub-item" @click="showTips()"><label>好<input type="radio" name="nzzp" class="radio-box" value="1" v-model="page.advise2.chooseStatus" :disabled="!editable"></label></div>
              <div class="sub sub-item" @click="showTips()"><label>较好<input type="radio" name="nzzp" class="radio-box" value="2" v-model="page.advise2.chooseStatus" :disabled="!editable"></label></div>
              <div class="sub sub-item" @click="showTips()"><label>一般<input type="radio" name="nzzp" class="radio-box" value="3" v-model="page.advise2.chooseStatus" :disabled="!editable"></label></div>
              <div class="sub sub-item" @click="showTips()"><label>较差<input type="radio" name="nzzp" class="radio-box" value="4" v-model="page.advise2.chooseStatus" :disabled="!editable"></label></div>
            </div>
          </div>
        </div>
        <div class="no-group">
          <div class="no-group-name">2.您对全市机关作风效能的意见建议总体评价。</div>
          <div class="textarea">
            <textarea name="qsjy" id="qsjy" placeholder="请在此输入您的建议总体评价......" style="width:100%" @blur="saveZpb()" v-model="page.advise2.advise" :disabled="!submitable"></textarea>
          </div>
          <hr color="#F9C4A2" size="1">
          <div class="no-group-name">3.您对有关部门（单位）和镇（街道）服务高质量发展的具体意见和建议。</div>
          <div id="jvyjs" v-for="(advice, index) in page.dwadvise" :key="index">
            <div class="row1">
              <div class="col1">
                <div class="title">单位名称</div>
              </div>
              <div class="col2">
                <div class="dwmc">{{advice.dwName ? advice.dwName : ''}}</div>
                <div class="choose">
                  <input :id="'advice'+index" type="text" v-model="advice.danwei" @click="showDwopt(advice, index)" @blur="closeDwopt(advice)">
                  <ul class="dw-list" v-show="advice.dwShow">
                    <li class="li-dw" v-for="(dw,id) in getLikelyCompany(advice.danwei)" :key="id" @click="chooseDwopt(advice, dw)">{{dw.name}}</li>
                  </ul>
                </div>
              </div>
              <div class="col3">
                <div class="delete" @click="delAdvice(index)" v-if="submitable && page.dwadvise.length > 1"></div>
              </div>
            </div>
            <div class="row2">
              <div class="col1">
                <div class="title">具体意见和建议</div>
              </div>
              <div class="col4">
                <textarea v-model="advice.advise" placeholder="请在此输入您的意见建议总体评价......" @blur="saveZpb()" :disabled="!submitable"></textarea>
              </div>
            </div>
            <div class="row1">
              <div class="col-add">
                <div class="add" @click="addAdvice()" v-if="submitable && page.dwadvise.length -1 == index">再添加一条意见建议</div>
              </div>
            </div>
          </div>
          <div class="ps">注: 1, 批评意见包括表扬，批评及建议，尽量反应具体事例。<br>2, 一个部门（单位）填写一栏。</div>
        </div>
      </div>
      <div class="submit-btns largeShow" style="display:flex">
        <div class="submit-btn" @click="$emit('changeView',{id: 0, offset: -1})"><div>上一页</div></div>
        <div class="submit-btn" @click="$emit('changeView',{id: 0, offset: 1})"><div>提交</div></div>
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
    },
    editable: {
      type: Boolean
    },
    submitable: {
      type: Boolean
    }
   },
  data () {
    const companies = this.$db.getObject('companies');
    return {
      companies
    };
  },
  methods: {
    itemChanged (item) {
      this.$emit('itemChanged', item);
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
      vm.page.dwadvise.forEach(n => {
          if (n.dwId && n.advise.trim()) {
            dwadvise.push({
              dwId: n.dwId,
              advise: n.advise
            });
          }
      });
      var data = {
        advise2: vm.page.advise2,
        dwadvise: dwadvise && dwadvise[0] ? dwadvise : []
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
      return group.items.filter((o) => o.chooseStatus == '1').length == group.maxGood;
    },
    closeDwopt (advice) {
      var vm = this;
      setTimeout(function () {
        if (advice.danwei) {
          var company = vm.companies.find((company) => {
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
        return this.companies.filter((c) => c.name.includes(name.trim()));
      }
    },
    showTips (group, item, good) {
      if (!this.editable) {
        this.$emit('showAlert', {name: '提示', description: '结果已提交，不能更改。', okText: '确认'});
        return;
      }
      if (good && item.chooseStatus != '1' && this.checkMaxGood(group)) {
        this.$emit('showAlert', {name: '提示', description: '勾选好的单位不能超总体的40%，请适当考虑后投票。', okText: '确认'});
      }
    },
    showInfo (item) {
      this.$emit('showAlert', item);
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
        page.groups.forEach((group) => {
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
    font-size: 1.15rem;
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
        font-size: 14px;
        line-height: 25px;
        display: flex;
        flex-wrap: wrap;
        .item {
          margin-bottom: 5px;
          display: flex;
          flex: 1;
          min-width: 300px;
          @media screen and (min-width: 768px) {
            max-width: 330px;
          }
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
            min-width: 27%;
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
