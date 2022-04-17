<template>
  <div >
    <el-button @click="buttonClick">按钮</el-button>
    <el-button @click="inputChange">按钮1</el-button>
          <div class="diffPrice-week">
            <el-table :data="priceTable" 
                      border 
                      style="width: 100%" 
                      >
              <el-table-column
                fixed
                prop="projectName"
                label="项目名称"
                width="110"
                align="center">
              </el-table-column>
              <el-table-column label="周一" align="center">
                <el-table-column
                  label="分成"
                  width="104" 
                  align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.salePrice1" 
                              size="mini" placeholder="输入"/>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="周二" align="center">
                <el-table-column
                  prop="salePrice2"
                  label="分成"
                  width="104"
                  align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.salePrice2" 
                              size="mini" placeholder="输入"/>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="周三" align="center">
                <el-table-column
                  prop="salePrice3"
                  label="分成"
                  width="104"
                  align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.salePrice3" 
                              size="mini" placeholder="输入"/>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <div class="diffPrice-samePrice">
            <el-table :data="priceTable" 
                      border 
                      style="width: 100%" 
                      >
              <el-table-column
                fixed
                prop="projectName"
                label="项目名称"
                width="350"
                align="center">
              </el-table-column>
              <el-table-column label="默认价" align="center">
                <el-table-column
                  prop="salePrice0"
                  label="分成"
                  width="250"
                  align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.salePrice0" 
                              size="mini" 
                              placeholder="输入"
                              ></el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>
</template>
<script>
export default {
  name: "",
  components: {
  },
  data() {
    return {
      basicInfoForm:{},
      priceTable:[],
    };
  },
  created() {},
  mounted() {
  },
  methods: {
    //基本信息弹窗
    buttonClick(){
      setTimeout(() =>{
        let baseProjectDTOList = [{
          projectName: "迎客松",
          salePrice1: 2,
          salePrice2: 2,
          salePrice3: 2,
        }]
        //致命原因 不论是删掉basicInfoForm ,或者给baseProjectDTOList来一个深拷贝，或者直接this.$set(item, 'salePrice0', 1)
        //都能解决input不能输入的问题
        this.basicInfoForm = baseProjectDTOList
        this.priceTable = baseProjectDTOList.map(item =>{
          //完美解决
          // this.$set(item, 'salePrice0', 1)
          item.salePrice0 = item.salePrice0||''
          item.salePrice1 = item.salePrice1||''
          item.salePrice2 = item.salePrice2||''
          item.salePrice3 = item.salePrice3||''
          return item
        })
        console.log(this.priceTable);
      },1000)
    },
    inputChange(){
        console.log(this.priceTable);
    }
  },
};
//
</script>
<style scoped lang="scss">

</style>
