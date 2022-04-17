/** 该组件要覆盖到的场景 1、传code则直接通过codo码获取列表 要转换字段名
2、传api名称 + api请求参数获取列表 ，要转换字段名 3、直接传数组数据 要转换字段名
4、转换字段名：valueKey对应id，labelKey对应name
5、changes返回当前选中id和名称label 6、监听options变化，重新赋值
7、多级联动，监听apiParams变化，重新请求改apiUrl 8、外部手动刷新回显 refresh()
*/

<template>
  <el-select
    res="elSelect"
    :clearable="clearable"
    filterable
    :filter-method="selectFilter"
    :placeholder="placeholder"
    :value-key="valueKey"
    class="select-box"
    collapse-tags
    v-bind="$attrs"
    @change="selectChange"
    @focus="selectFocus"
    v-on="$listeners"
  >
    <el-option
      v-for="(item, index) in selectOptions"
      :key="item.value + 'selectUtils' + index"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
const PinyinMatch = require('pinyin-match');
import request from '@/utils/request';
import {
  baseUrl,
  integratedTicketUrl,
  integratedHotelUrl,
  integratedFoodUrl,
  integratedSupermarketUrl,
  integratedLeaseUrl,
  integratedSystemUrl,
  businessTicketUrl,
  businessHotelUrl,
  businessFoodUrl,
  travelAgencyUrl,
} from '@/utils/baseUrl';
import selectRequest from '@/api/selectRequest/index';
function getListByApi(apiUrl, params, urlType) {
  let tempUrl, tempApiUrl;
  tempApiUrl = selectRequest[apiUrl] || '/errorUrl';
  if (urlType === 'integratedTicketUrl') {
    tempUrl = integratedTicketUrl + tempApiUrl;
  } else if (urlType === 'integratedHotelUrl') {
    tempUrl = integratedHotelUrl + tempApiUrl;
  } else if (urlType === 'integratedFoodUrl') {
    tempUrl = integratedFoodUrl + tempApiUrl;
  } else if (urlType === 'integratedSupermarketUrl') {
    tempUrl = integratedSupermarketUrl + tempApiUrl;
  } else if (urlType === 'integratedLeaseUrl') {
    tempUrl = integratedLeaseUrl + tempApiUrl;
  } else if (urlType === 'integratedSystemUrl') {
    tempUrl = integratedSystemUrl + tempApiUrl;
  } else if (urlType === 'businessTicketUrl') {
    tempUrl = businessTicketUrl + tempApiUrl;
  } else if (urlType === 'businessHotelUrl') {
    tempUrl = businessHotelUrl + tempApiUrl;
  } else if (urlType === 'businessFoodUrl') {
    tempUrl = businessFoodUrl + tempApiUrl;
  } else if (urlType === 'travelAgencyUrl') {
    tempUrl = travelAgencyUrl + tempApiUrl;
  } else {
    tempUrl = baseUrl + tempApiUrl;
  }
  return request({
    url: tempUrl,
    method: 'post',
    data: params,
  });
}

export default {
  name: 'SelectUtils',
  props: {
    placeholder: {
      type: String,
      default: '请选择',
    },
    // 是否可以清除
    clearable: {
      type: Boolean,
      default: () => true,
    },
    // 是否需要初始化数据-级联时
    needInit: {
      type: Boolean,
      default: () => true,
    },
    // 直接传入列表数据,与apiUrl、codeName互斥
    options: {
      type: Array,
      default: () => [],
    },
    // 传入获取列表的code名称，与apiUrl互斥
    codeName: {
      type: String,
      default: '',
    },
    // 判断平台类型，给出指定baseUrl
    urlType: {
      type: String,
      default: 'baseUrl',
    },
    // 传入获取列表的api，与codeName互斥
    apiUrl: {
      type: String,
      default: '',
    },
    // 传入获取列表的api时与api一同传入的请求参数，与apiUrl共存
    apiParams: {
      type: Object,
      default: () => {},
    },
    // 作为 value 唯一标识的键名(id)
    valueKey: {
      type: String,
      default: 'value',
    },
    // 作为 label 唯一标识的键名(name)
    labelKey: {
      type: String,
      default: 'label',
    },
    // 省市区编号-专门为该功能添加的参数
    numberKey: {
      type: String,
      default: 'certificateNo',
    },
    // 父级id-专门为父级是多选的下拉添加的参数
    parentKey: {
      type: String,
      default: 'scenicSpotsId',
    },
    // 初始化时是否需要传下拉数组中的第一个id
    firstId: {
      type: Boolean,
      default: () => false,
    },
    // 父组件中v-model绑定的值
    inputMessage: {
      type: Number,
      default: null,
    },
  },
  //只要加上model下拉框就报错
  // model:{
  //   prop:'inputMessage',
  //   event:'fatherInputChange'
  // },
  data() {
    return {
      value: '',
      selectOptions: [], // 下拉显示器接收的数组
      copyOptions: [],
      all: [],
    };
  },
  watch: {
    apiParams: {
      deep: true,
      handler() {
        this.selectOptions = [];
        this.getInitData();
      },
    },
    options: {
      deep: true,
      handler() {
        this.selectOptions = [];
        this.getInitData();
      },
    },
  },
  created() {
    this.needInit && this.getInitData();
  },
  mounted() {},
  methods: {
    // 当下拉框显示时
    getInitData() {
      if (this.codeName) {
        this.findCodeData();
        if (
          this.firstId &&
          this.selectOptions.length > 0 &&
          this.$attrs.value == null
        ) {
          this.$emit('input', this.selectOptions[0].value);
        }
      } else if (this.apiUrl) {
        this.getListByApi();
      } else {
        this.options.forEach((element) => {
          const tempOptionsObj = {
            value: element[this.valueKey],
            label: element[this.labelKey],
          };
          this.selectOptions.push(tempOptionsObj);
          this.copyOptions = this.selectOptions;
        });
        if (
          this.firstId &&
          this.selectOptions.length > 0 &&
          this.$attrs.value == null
        ) {
          this.$emit('input', this.selectOptions[0].value);
        }
      }
    },
    selectChange(event) {
      let tempSelectData;
      if (Array.isArray(event)) {
        // 多选
        tempSelectData = this.selectOptions.filter((element) => {
          return event.indexOf(element.value) > -1;
        });
      } else {
        // 单选
        this.selectOptions.forEach((item) => {
          if (item.value == event) {
            tempSelectData = item;
          }
        });
      }
      // changes change多个s,  传出去id 和 name;
      this.$emit('changes', event, tempSelectData);
    },
    // 通过api获取数据
    getListByApi() {
      getListByApi(this.apiUrl, this.apiParams, this.urlType)
        .then((res) => {
          let resData;
          if (res.data && res.data.length) {
            resData = res.data;
          } else if (
            res.data &&
            res.data.dataList &&
            res.data.dataList.length
          ) {
            resData = res.data.dataList;
          } else {
            resData = [];
          }
          resData.forEach((element) => {
            const tempResObj = {
              value: element[this.valueKey],
              label: element[this.labelKey],
              number: element[this.numberKey],
              parent: element[this.parentKey],
            };
            this.selectOptions.push(tempResObj);
            this.copyOptions = this.selectOptions;
          });
          return new Promise((resolve) => {
            resolve('');
          });
        })
        .then(() => {
          if (
            this.firstId &&
            this.selectOptions.length > 0 &&
            this.$attrs.value == null
          ) {
            this.$emit('input', this.selectOptions[0].value);
          }
        });
    },
    // 查询code
    findCodeData() {
      const codeName = this.codeName;
      try {
        let codeObjStr = localStorage.getItem('codeObj');
        let codeObj = JSON.parse(codeObjStr);
        let codeData = codeObj[codeName];
        if (codeData instanceof Array && codeData.length) {
          codeData.forEach((item) => {
            const tempObj = {
              value: item.codeKey,
              codeName: item.codeName,
              label: item.codeValue,
            };
            this.selectOptions.push(tempObj);
            this.copyOptions = this.selectOptions;
          });
        }
        this.$emit('codeData', codeData);
      } catch (e) {
        console.log(e);
      }
    },

    // 手动刷新数据回显
    refresh() {
      this.selectOptions = [];
      this.getInitData();
    },
    // 自定义搜索，根据拼音或首字母搜索下拉选项
    selectFilter(value) {
      if (value) {
        this.selectOptions = this.selectOptions.filter((item) => {
          return PinyinMatch.default.match(item.label, value);
        });
      } else {
        this.selectOptions = this.copyOptions;
      }
    },
    selectFocus() {
      this.selectOptions = this.copyOptions;
    },
  },
};
</script>
<style lang="scss" scoped></style>
