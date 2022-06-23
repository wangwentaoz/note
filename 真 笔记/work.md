# 笔记
this.$resetParams(this.dialogForm)
1.  预定--》订单查询--》编辑订单--》房间查询--》房间入住--》房间收银--》结算--》房间退房--》订单退房  OK 
2.  预定--》订单查询--》编辑订单--》订单入住--》房间收银--》结算--》房间退房--》订单退房  OK 
3.  预定--》订单查询--》编辑订单--》房间查询--》房间入住--》订单收银--》结算--》房间退房--》订单退房   OK
4.  预定--》订单查询--》编辑订单--》订单入住--》订单收银--》结算--》房间退房--》订单退房  OK
5.  预定--》订单查询--》编辑订单--》房间查询--》房间入住--》房间收银--》结算--》订单退房  OK
6.  预定--》订单查询--》编辑订单--》订单入住--》房间收银--》结算--》订单退房  OK
7.  预定--》订单查询--》编辑订单--》房间查询--》房间入住--》订单收银--》结算--》订单退房  OK
8.  预定--》订单查询--》编辑订单--》订单入住--》订单收银--》结算--》订单退房  OK
9.  预定--》订单查询--》编辑订单--》房间查询--》房间入住--》房间收银--》结算退房  
10. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》房间收银--》临时挂账--》收银+结算
11. 预定--》订单查询--》编辑订单--》订单入住--》房间收银--》结算退房 
12. 预定--》订单查询--》编辑订单--》订单入住--》房间收银--》临时挂账--》收银+结算
13. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》订单收银--》结算退房
14. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》订单收银--》临时挂账--》收银+结算
15. 预定--》订单查询--》编辑订单--》订单入住--》订单收银--》结算退房
16. 预定--》订单查询--》编辑订单--》订单入住--》订单收银--》临时挂账--》收银+结算
17. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》结算退房
18. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》临时挂账--》收银+结算
19. 预定--》订单查询--》编辑订单--》订单入住--》结算退房
20. 预定--》订单查询--》编辑订单--》订单入住--》临时挂账--》收银+结算
21. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》提前退房间--》提前退房
22. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》提前退房间--》临时挂账--》收银+结算
23. 预定--》订单查询--》编辑订单--》订单入住--》提前退房间--》提前退房
24. 预定--》订单查询--》编辑订单--》订单入住--》提前退房间--》临时挂账--》收银+结算
25. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》提前退房
26. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》临时挂账--》收银+结算
27. 预定--》订单查询--》编辑订单--》订单入住--》提前退房
28. 预定--》订单查询--》编辑订单--》订单入住--》临时挂账--》收银+结算
29. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》收银--》提前退房间--》提前退房
30. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》收银--》提前退房间--》临时挂账--》收银+结算
31. 预定--》订单查询--》编辑订单--》订单入住--》收银--》提前退房间--》提前退房
32. 预定--》订单查询--》编辑订单--》订单入住--》收银--》提前退房间--》临时挂账--》收银+结算
33. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》收银--》提前退房
34. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》收银--》临时挂账--》收银+结算
35. 预定--》订单查询--》编辑订单--》订单入住--》收银--》提前退房
36. 预定--》订单查询--》编辑订单--》订单入住--》收银--》临时挂账--》收银+结算
37. 预定--》订单查询--》编辑订单--》取消房间--》取消订单  OK
38. 预定--》订单查询--》编辑订单--》取消订单  OK
39. 预定--》订单查询--》编辑订单--》收银--》取消房间--》取消订单 OK
40. 预定--》订单查询--》编辑订单--》收银--》取消订单 OK
41. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》撤销入住--》取消房间--》取消订单 OK
42. 预定--》订单查询--》编辑订单--》订单入住--》撤销入住--》取消房间--》取消订单
43. 预定--》订单查询--》编辑订单--》房间查询--》房间入住--》撤销入住--》取消订单
44. 预定--》订单查询--》编辑订单--》订单入住--》撤销入住--》取消订单 


/** 各业态设置 */
<template>
  <div class="format-setting" id="table-box">
    <div class="table-top-content" v-if="showNum">
      <el-button
        type="add"
        icon="el-icon-circle-plus-outline"
        v-for="item in copywritingSet"
        :key="item.level"
        @click="addLevel(item)"
        >{{ item.title }}</el-button
      >
    </div>
    <div class="format-setting-header">
      <div
        class="format-setting-header-list"
        v-for="(item, index) in copywritingSet"
        :key="index"
      >
        {{ item.head }}
      </div>
      <div class="format-setting-header-list handle-list">操作</div>
    </div>
    <div class="format-setting-body" :style="{ height: autoHeight }">
      <div
        class="format-setting-body-first"
        v-for="firstItem in formatData"
        :key="firstItem.id"
      >
        <div class="common-row first-row">
          <span>{{ firstItem.title }}</span>
          <span class="common-row-btn">
            <el-button
              v-if="showNumEdit"
              icon="el-icon-edit"
              type="edit"
              @click="editLevel(firstItem, 'first')"
              >编辑</el-button
            >
            <el-button
              v-if="showNumDel"
              icon="el-icon-delete"
              type="danger"
              @click="deleteLevel(firstItem, 'first')"
              >删除</el-button
            >
          </span>
        </div>
        <last-row
          :lastData="firstItem.children"
          :type="type"
          v-on="$listeners"
          v-if="trueLength === 2"
        ></last-row>
        <div
          v-else
          class="format-setting-body-second"
          v-for="secondItem in firstItem.children"
          :key="secondItem.id"
        >
          <div class="common-row second-row">
            <span>{{ secondItem.title }}</span>
            <span class="common-row-btn">
              <el-button
                v-if="showNumEdit"
                icon="el-icon-edit"
                type="edit"
                @click="editLevel(secondItem, 'second')"
                >编辑</el-button
              >
              <el-button
                v-if="showNumDel"
                icon="el-icon-delete"
                type="danger"
                @click="deleteLevel(secondItem, 'second')"
                >删除</el-button
              >
            </span>
          </div>
          <last-row
            :lastData="secondItem.children"
            :type="type"
            v-on="$listeners"
            v-if="trueLength === 3"
          ></last-row>
          <div
            v-else
            class="format-setting-body-third"
            v-for="thirdItem in secondItem.children"
            :key="thirdItem.id"
          >
            <div class="common-row third-row">
              <span>{{ thirdItem.title }}</span>
              <span class="common-row-btn">
                <el-button
                  v-if="showNumEdit"
                  icon="el-icon-edit"
                  type="edit"
                  @click="editLevel(thirdItem, 'third')"
                  >编辑</el-button
                >
                <el-button
                  v-if="showNumDel"
                  icon="el-icon-delete"
                  type="danger"
                  @click="deleteLevel(thirdItem, 'third')"
                  >删除</el-button
                >
              </span>
            </div>
            <last-row
              :lastData="thirdItem.children"
              :items="copywritingSet[copywritingSet.length-1]"
              :type="type"
              v-if="trueLength === 4"
              v-on="$listeners"
            ></last-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { copywritingSet } from "./config";
import { isMenuNo, setTableHeight } from "@/utils";
export default {
  data() {
    return {
      copywritingSet: copywritingSet[this.type],
      tableHeaderSet: [], // 表头lable设置
      autoHeight: "auto",
      showNum: false,
      showNumEdit: false,
      showNumDel: false,
    };
  },
  props: {
    // 树状结构数据
    formatData: {
      type: Array,
      default: () => [],
    },
    // 风格类型-对应的业态
    type: {
      type: String,
      default: "hotel",
    },
  },
  computed: {
    // 过滤掉没有head的表头，不占用一级
    trueLength() {
      const tempArray = this.copywritingSet.filter((element) => {
        return element.head;
      });
      return tempArray.length;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.autoHeight = setTableHeight(254);
      window.onresize = () => {
        this.autoHeight = setTableHeight(254);
      };
      if(this.type == 'business'){
        // this.showNum = isMenuNo(100461);
        // this.showNumEdit = isMenuNo(100460);
        // this.showNumDel = isMenuNo(100462);
        this.showNum = true;
        this.showNumEdit = true;
        this.showNumDel = true;
      }
      else if (this.type == "scenic") {
        this.showNum = isMenuNo(100461);
        this.showNumEdit = isMenuNo(100460);
        this.showNumDel = isMenuNo(100462);
      } else if (this.type == "address") {
        this.showNum = isMenuNo(100470);
        this.showNumEdit = isMenuNo(100471);
        this.showNumDel = isMenuNo(100472);
      } else if (this.type == "hotel") {
        this.showNum = isMenuNo(100383);
        this.showNumEdit = isMenuNo(100384);
        this.showNumDel = isMenuNo(100385);
      }
    });
  },
  methods: {
    addLevel(item) {
      item.method = "add";
      this.$emit("each-click", item);
    },
    editLevel(item, level) {
      item.method = "edit";
      item.level = level;
      this.$emit("each-click", item);
    },
    deleteLevel(item, level) {
      item.method = "delete";
      item.level = level;
      this.$emit("each-click", item);
    },
  },
  components: {
    "last-row": {
      template: `<div class="common-row last-row" v-show="lastData.length">
              <div
                class="last-row-box"
                v-for="lastItem in lastData"
                :key="lastItem.id"
              >
                <div class="last-row-box-info">
                  <div class="last-row-box-info-name one-t">
                    {{ lastItem.title }}
                  </div>
                  <div class="last-row-box-info-type">
                    <span class="last-row-box-info-type-con">{{ lastItem.no || lastItem.tableTypeName || lastItem.tableNo || lastItem.roomNo }}</span>
                    <span class="last-row-box-handle"><i
                      class="el-icon-edit-outline"
                    @click="editLevel(lastItem)"
                     v-if="showNumEdit"
                  ></i>
                  <i
                    v-if="showNumDel"
                    class="el-icon-delete"
                    @click="deleteLevel(lastItem)"
                  ></i></span>
                  </div>
                </div>
              </div>
              <div class="last-row-box addBtnBox" v-show="type == 'hotel' || type == 'business'">
                <div class="last-row-box-info x-c"  @click="addLevel2(items)">
                  <div class="el-icon-circle-plus-outline"></div>
                  <div class="addBtn4">{{addWords}}</div>
                </div>
              </div>
            </div>`,
      data() {
        return {
          level: "",
          showNumEdit: false,
          showNumDel: false,
        };
      },
      props: {
        lastData: {
          type: Array,
          default: () => [],
        },
        // 风格类型-对应的业态
        type: {
          type: String,
          default: "",
        },
        items:{
          type: Object,
          default: () => {},
        },
        addWords: {
          type: String,
          default: "添加房间",
        },
      },
      created() {
        const tempArray = copywritingSet[this.$parent.type].filter(
          (element) => {
            return element.head;
          }
        );
        const maxLength = tempArray.length;
        this.level = copywritingSet[this.$parent.type][maxLength - 1].level;
      },
      mounted() {
         if(this.type == 'business'){
          //  this.showNumEdit = isMenuNo(100460);
          // this.showNumDel = isMenuNo(100462);
          this.showNumEdit = true
          this.showNumDel = true
         }
       else if (this.type == "scenic") {
          this.showNumEdit = isMenuNo(100460);
          this.showNumDel = isMenuNo(100462);
        } else if (this.type == "address") {
          this.showNumEdit = isMenuNo(100471);
          this.showNumDel = isMenuNo(100472);
        } else if (this.type == "hotel") {
          this.showNumEdit = isMenuNo(100384);
          this.showNumDel = isMenuNo(100385);
        }
      },
      methods: {
        addLevel2(item) {
          // if(this.type == 'business'){
          // let obj = JSON.parse(JSON.stringify(item));
          // obj.method = "add";
          // obj.level = 'fourth2'
          // this.$emit("each-click", obj);
          // }else{
          let obj = JSON.parse(JSON.stringify(item));
          obj.method = "add";
          obj.level = 'fourth2'
          obj.pid = this.lastData[0].pid;
          this.$emit("each-click", obj);
          // }
        },
        editLevel(item) {
          item.method = "edit";
          item.level = this.level;
          this.$emit("each-click", item);
        },
        deleteLevel(item) {
          item.method = "delete";
          item.level = this.level;
          this.$emit("each-click", item);
        },
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.format-setting {
  padding: 0 20px 50px;
  font-size: 13px;
  color: #464849;
  letter-spacing: 0.32px;
  background-color: #fff;
  &-header {
    display: flex;
    width: 100%;
    height: 42px;
    padding: 0 80px 0 24px;
    line-height: 42px;
    background-color: #eff3f7;
    border-color: #d7d7d7;
    box-shadow: 0 1px 0 0 #d7d7d7;
    &-list {
      // margin-right: 50px;
      margin-right: 77px;
    }
    .handle-list {
      margin: 0 0 0 auto;
    }
  }
}
.table-top-content {
  padding: 18px 0 10px;
}
.common-row {
  display: flex;
  align-items: center;
  padding: 9px 26px 9px 24px;
  border-bottom: 1px solid #d7d7d7;
  &-btn {
    margin-left: auto;
  }
  &:hover {
    background-color: #ffeacd;
  }
}
.second-row {
  // padding-left: 126px;
  padding-left: 148px;
}
.third-row {
  padding-left: 209px;
}
::v-deep .last-row {
  flex-wrap: wrap;
  // padding-left: 286px;
  padding-left: 250px;
  &-box {
    display: flex;
    justify-content: space-between;
    width: 137px;
    height: 60px;
    padding: 7px 12px;
    margin: 6px 6px;
    background: #f2f2f2;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    &-info {
      width: 100%;
      &-name {
        line-height: 20px;
        margin-bottom: 10px;
        font-size: 14px;
        color: #367fa9;
        letter-spacing: 0.35px;
        font-weight: 500;
      }
      &-type {
        display: flex;
        justify-content: space-between;
        &-con{
          display: block;
          width: 65px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    &-handle {
      display: none;
    }
  }
  .el-icon-edit-outline {
    margin-right: 7px;
    font-size: 12px;
    color: #1d84c6;
    cursor: pointer;
  }
  .el-icon-delete {
    font-size: 12px;
    color: #ee5564;
    cursor: pointer;
  }
}
::v-deep .last-row-box:hover .last-row-box-handle {
  display: block;
}
.format-setting-body {
  overflow-y: scroll;
  .el-button {
    padding: 4.5px 8.5px;
    font-size: 12px;
  }
}
/deep/.addBtnBox{
  cursor: pointer;
  background-color: #1d84c6;
  color: #fff;
  &:hover{
    background-color: rgba(32, 137, 202,0.8);
  }
  .addBtn4{
    margin-left: 5px;
  }
}
</style>
