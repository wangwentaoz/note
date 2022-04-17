<template>
  <div class="roomImg" v-loading="loading">
    <div class="text">
      图片要求：建议上传10张以上，且尺寸大于1200*900，大小限制1M以内。<br />
      请保证上传图片清晰无水印；
    </div>
    <div class="nav">
      <div class="header">
        <span class="number">{{ dataList.length }}/30</span
        ><span>拖拽可调整顺序</span>
      </div>
      <div class="drag">
        <transition-group class="transition-wrapper" name="sort">
          <div
            class="box sort-item"
            v-for="item in dataList"
            :key="item.id"
            :draggable="true"
            @dragstart="dragstart(item)"
            @dragenter="dragenter(item, $event)"
            @dragend="dragend(item, $event)"
            @dragover="dragover($event)"
          >
            <!-- :key="item.roomTypeNoId" -->
            <!-- <img :src="require(item.roomPicPth)" alt="" /> -->
            {{ item.label }}
          </div>
          <div class="box sort-item" key="roomImg999">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              :before-upload="beforeupload"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <em>点击上传</em>
              </div>
              <!-- <div class="el-upload__tip" slot="tip">
                只能上传jpg/png文件，且不超过500kb
              </div> -->
            </el-upload>
          </div>
        </transition-group>
      </div>
    </div>
    <!-- <div>oldData:{{ oldData }}</div>
    <div>newData:{{ newData }}</div>
    <div>dataList:{{ dataList }}</div> -->
  </div>
</template>
<script>
import { findHotelRoomTypeMediaList } from "@/api/integratedManagePlatform/hotelSetting/roomImg.js";
export default {
  props: {
    roomTypeId: {
      // type: Number,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      oldData: null, // 开始排序时按住的旧数据
      newData: null, // 拖拽过程的数据
      dataList: [
        { id: 1, label: "测试一号" },
        { id: 2, label: "测试二号" },
        { id: 3, label: "测试三号" },
        { id: 4, label: "测试四号" },
        { id: 5, label: "测试五号" },
        { id: 6, label: "测试六号" },
        { id: 7, label: "测试七号" },
        // { id:4,label:'测试四号' },
      ],
      loading:false,
    };
  },
  watch: {
    dataList(arr) {
      if (arr.length > 30) {
        this.dataList.slice(0, 30);
      }
    },
  },
  mounted() {
    this.findRoomSupporting();
  },
  methods: {
    findRoomSupporting() {
      this.loading = true
      findHotelRoomTypeMediaList({
        roomTypeId: "10000000000002",
      }).then((res) => {
        // this.dataList = res.data;
      }).finally(()=>{
         this.loading = false
      });
    },
    dragstart(value) {
      this.oldData = value;
    },

    // 记录移动过程中信息
    dragenter(value, e) {
      this.newData = value;
      e.preventDefault();
    },

    // 拖拽最终操作
    dragend(value, e) {
      if (this.oldData !== this.newData) {
        let oldIndex = this.dataList.indexOf(this.oldData);
        let newIndex = this.dataList.indexOf(this.newData);
        let newItems = [...this.dataList];
        // 删除老的节点
        newItems.splice(oldIndex, 1);
        // 在列表中目标位置增加新的节点
        newItems.splice(newIndex, 0, this.oldData);
        this.dataList = [...newItems];
      }
    },

    // 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
    dragover(e) {
      e.preventDefault();
    },
    //阻止upload的自己上传，进行再操作
    beforeupload(file) {
      console.log(file);

      // this.src = windowURL.createObjectURL(file);
      // //重新写一个表单上传的方法
      // this.param = new FormData();
      // this.param.append("file", file, file.name);
      // return false;
    },
    qk() {
      //  this.$router.go(0)
    },
  },
};
</script>
<style lang="scss" scoped>
.roomImg {
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #575757;
  font-weight: 400;
  .drag {
    padding-left: 5%;
    .transition-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
    .box {
      width: 20%;
      height: 200px;
      // display: inline-block;
      // background-color: chartreuse;
      border:1px solid #b6b3b3;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 4%;
      margin-top: 10px;
      transition: all 0.8s;
      border-radius: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .text {
    width: 95%;
    padding: 18px 18px;
    margin: 10px auto;
    line-height: 26px;
    background-color: rgb(229, 236, 244);
    border-radius: 10px;
  }
  .header {
    margin: 20px 0 15px;
    display: flex;
    align-items: center;
    // color: rgb(197, 197, 197);
    .number {
      font-size: 22px;
      margin-right: 10px;
      color: rgb(77, 136, 240);
    }
  }
  /deep/.el-upload-dragger {
    width: 166px;
    height: 199px;
    border-radius: 15px;
  }
  /deep/ .el-upload,
  .el-icon-upload {
    width: 100%;
  }
}
//
</style>
