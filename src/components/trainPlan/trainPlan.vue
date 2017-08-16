<template>
	<div class="train-plan">
		<div class="tp">
			<div>
				<label for="trainNo">车次：</label>
				<input type="text" name="trainNo" id="trainNo" v-model="tpVo.trainNo" style="width: 120px;"/>
			</div>
			<div>
				<label for="trainDt">开车时间:</label>
				<input type="time" name="trainDt" id="trainDt" v-model="tpVo.trainDt" style="width: 125px;"/>
			</div>
			<div>
				<div class="btn-lg btn-success" @click="addTP" disabled="">添加</div>
				<div>
		    	  <vue-xlsx-table @on-select-file="handleOk">
		    		导入excel
		    	  </vue-xlsx-table>
				</div>
				<div style="position: absolute;top: 25px;margin-left: 30px;">
				  <span class="msg" v-text="errMsg"></span>
				  <span class="success-msg" v-text="successMsg"></span>
				</div>
			</div>
		</div>
		
		<div v-if="excelShow">
		<div class="modal-backdrop fade in" modal-animation-class="fade" modal-backdrop="modal-backdrop" modal-animation="true" style="z-index: 1040;"></div>
    	    <div class="popup">
		  	  <div class="head" style="text-align: center;">
				<h3></h3>
				<i class="icon-remove icon-white" @click="cancelPopup"></i>			  	
			  </div>
			  <div class="tn-msg" style="position: relative;top: 20px;">
			  	<div class="im-msg">红色背景为重复车次，蓝色背景的信息填写不完整</div>
			  	<span>注：</span><span class="msg">excel内车次的出发时间的格式为 hh:mm</span>
			  </div>
			  <div class="msg" v-text="tnSaveMsg"></div>
			  <div class="callBedTable">
				<table style="width: 70%;min-width: 400px;margin: 20px 15% 0 15%;" class="table-hover">
			        <colgroup>
			            <col style="width:60px">
			            <col/>
			            <col/>
			            <col style="width:120px">
			        </colgroup>
			        <thead>
			            <th style="max-width:60px">序号</th>
			            <th style="min-width:75px">车次</th>
			            <th style="min-width:130px">开车时间</th>
			        </thead>
			        <tbody>
			          <tr v-for="(tn,index) in tnList" :class="{repeatL:reTn.indexOf(tn.trainNo) >= 0 , tnComplete: !tn.trainNo || !tn.trainDt , tnFor: !/^[0-9A-Z\u4e00-\u9fa5]*$/.test(tn.trainNo)}">
			            <td><div v-text="index+1"></div></td>
			            <td><div style="min-width:65px" v-text="tn.trainNo"></div></td>
			            <td><div type="time" style="min-width:120px;width: 90%;" v-text="tn.trainDt"></div></td>
			          </tr>
			        </tbody>
			    </table>
			  </div>
			  <div class="tn-msg">
			  	<div class="msg-left">提示：</div>
			  	<div class="msg-right">
			  		<div>共<span v-text="tnLength"></span>条车次信息</div>
				  	<div class="msg" v-text="tnRepeatMsg" v-if="tnRepeat"></div>
			  	</div>
			  </div>
			  <div class="tn-btn-div">
			  	<div class="btn-sm btn-primary tn-btn" v-if="!tnRepeat && !notComplete && tnFormat" @click="tnExcelSave" style="margin-bottom: 20px;">确定</div>
		      	<div class="btn-sm btn-success tn-btn" @click="cancelPopup" style="margin-bottom: 20px;">取消</div>
			  </div>
		   </div>
		</div>
		
		<div class="callBedTable">
			<table style="width: 50%;min-width: 400px;" class="table-hover">
		        <colgroup>
		            <col style="min-width:60px">
		            <col/>
		            <col/>
		            <col style="min-width:120px">
		            <col/>
		        </colgroup>
		        <thead>
		            <th style="max-width:60px">序号</th>
		            <th style="min-width:75px">车次</th>
		            <th style="min-width:130px">开车时间</th>
		            <th style="min-width: 90px;"></th>
		        </thead>
		        <tbody>
		          <tr v-for="(tp,$index) in tp.list">
		            <td><div type="text" v-text="$index+1"></div></td>
		            <td><input type="text" style="min-width:65px" v-model="tp.trainNo" /></td>
		            <td><input type="time" style="min-width:120px;width: 90%;" v-model="tp.trainDt" /></td>
		            <td class="table-handle">
		                <div style="max-width:120px">
		                	<img src="../../img/delete.png" class="deleteTn" @click="deletTP(tp)" onerror="javascript:this.src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496385415687&di=cfb8c3b6a69be436172b2fbcf2d35748&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F55%2F73%2F39I58PICCqK_1024.png'">
		                </div>
		                <div class="btn-sm btn-info btn-table" @click="updateTP(tp)">保存</div>
		            </td>
		          </tr>
		        </tbody>
		    </table>
		</div>
	</div>
</template>

<script>
	import config from '@/config'
	import axios from 'axios'
	export default {
	  name: 'trainPlan',
	  data () {
	  	return {
	  	  host: config.host,
	  	  excelShow: false,
	  	  tp: {},
	  	  errMsg: '',
	  	  notComplete: false,
	  	  tnFormat: true,
	  	  tnList: [],
	  	  tnNo: [],
	  	  reTn: [],
	  	  successMsg: '',
	  	  tnSaveMsg: '',
	  	  tnLength: 0,
	  	  tnRepeatMsg: '',
	  	  tpVo: {}
	  	}
	  },
	  mounted () {
	  	this.$nextTick(() => {
	      this.getTrainPlan();
	    });
	  },
	  methods: {
	  	getTrainPlan () {//接口34，计划车次维护(查看)
	  	  this.$emit('loadShow');
	  	  let self = this;
	  	  return axios({
	  	  	method: 'get',
	  	  	url: this.host + '/web/plan/list',
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	self.$emit('loadHide');
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  self.tp = data.result;
	  	  	} else {
	  	  	  self.errMsg = data.msg;
	  	  	  this.hideMsg();
	  	  	}
	  	  }).catch( (error) => {
	  	  	this.$emit('loadHide');
	  	  	self.errMsg = data.msg;
	  	  	this.hideMsg();
	  	  })
	  	},
	  	/**
	  	 * 车次excel的导入
	  	 */
	  	handleOk (convertedData) {//解析excel数据
	      console.log(convertedData);
	      this.tnSaveMsg = '';
	      this.excelShow = true;
	      this.notComplete = false;
	      this.tnFormat = true;
	      this.tnLength = convertedData.body.length;
//	      console.log(convertedData.body[0][convertedData.header[0]])
	      this.tnNo = [];
	      this.reTn = [];
	      this.tnRepeatMsg = '重复的车次包括：';
	      for (var i = 0; i < convertedData.body.length; i++) {//解析convertedData并且判断车次重复之类的
			let tnVo = {
			  "trainNo": convertedData.body[i][convertedData.header[0]].toUpperCase(),
			  "trainDt": convertedData.body[i][convertedData.header[1]]
			}
			
			if (!/^[0-9A-Z\u4e00-\u9fa5]*$/.test(tnVo.trainNo)) {
			  this.tnFormat = false;
			}
			if (!tnVo.trainNo || !tnVo.trainDt) {
			  this.notComplete = true;
			}
			this.tnList.push(tnVo);
			if (this.tnNo.indexOf(tnVo.trainNo) == -1) {//没有重复的
			  this.tnNo.push(tnVo.trainNo);
			} else {//有重复
			  this.reTn.push(tnVo.trainNo);
			  this.tnRepeatMsg += tnVo.trainNo + '、'
			}
	      }
	      this.tnRepeatMsg = this.tnRepeatMsg.substring(0, this.tnRepeatMsg.lastIndexOf('、'));  
	      this.tnRepeat = this.reTn.length == 0?false:true;
	    },
	    cancelPopup () {//关闭窗口
	      this.excelShow = false;
	      this.tnList = [];
	    },
	    tnExcelSave () {
	      this.$emit('loadShow');
	  	  let self = this;
	  	  return axios({
	  	  	method: 'post',
	  	  	url: this.host + '/web/plan/import',
	  	  	data: this.tnList,
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	this.$emit('loadHide');
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  this.tnSaveMsg = '车次更新成功';
	  	  	  this.cancelPopup();
	  	  	  this.getTrainPlan();
	  	  	} else {
	  	  	  this.tnSaveMsg = data.msg;
	  	  	}
	  	  }).catch( (error) => {
	  	  	this.$emit('loadHide');
	  	  	this.tnSaveMsg = data.msg;
	  	  })
	    },
	    /**
	     * over
	     */
	  	addTP () {//接口31，计划车次维护(增加)
	  	  this.errMsg = '';
	  	  if (!this.tpVo.trainDt || !this.tpVo.trainNo) {
	  	  	this.errMsg = "车次和开车时间必填";
	  	  	this.hideMsg()
	  	  	return null;
	  	  };
	  	  for (var i = 0; i < this.tp.list.length; i++) {
	  	  	if (this.tp.list[i].trainNo == this.tpVo.trainNo) {
	  	  	  this.errMsg = "车次" + this.tp.list[i].trainNo + '已存在';
	  	  	  this.hideMsg()
	  	  	  return null;
	  	  	}
	  	  }
	  	  this.tpVo.trainNo = this.tpVo.trainNo.toUpperCase();
	  	  let self = this;
	  	  this.$emit('loadShow');
	  	  return axios({
	  	  	method: 'post',
	  	  	url: this.host + '/web/plan/save',
	  	  	data: this.tpVo,
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	self.$emit('loadHide');
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  self.getTrainPlan();
	  	  	  self.tpVo.trainDt = '';
	  	  	  self.tpVo.trainNo = '';
	  	  	  self.successMsg = '添加成功';
	  	  	  this.hideMsg();
	  	  	} else {
	  	  	  self.errMsg = data.msg;
	  	  	  this.hideMsg();
	  	  	}
	  	  }).catch( (error) => {
	  	  	self.$emit('loadHide');
	  	  	self.errMsg = data.msg;
	  	  	this.hideMsg();
	  	  })
	  	},
	  	deletTP(tp) {//接口32，计划车次维护(删除)
	  	  return axios({
	  	  	method: 'get',
	  	  	url: this.host + '/web/plan/delete',
	  	  	params: {sid:tp.sid},
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  this.getTrainPlan();
	  	  	  this.successMsg = '删除成功';
	  	  	  this.hideMsg();
	  	  	} else {
	  	  	  this.errMsg = data.msg;
	  	  	  this.hideMsg();
	  	  	}
	  	  }).catch( (error) => {
	  	  	this.errMsg = data.msg;
	  	  	this.hideMsg();
	  	  })
	  	},
	  	updateTP(tp) {//接口33，计划车次维护(修改)
	  	  let self = this;
	  	  return axios({
	  	  	method: 'post',
	  	  	url: this.host + '/web/plan/update',
	  	  	data: tp,
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  this.getTrainPlan();
	  	  	  this.successMsg = '修改成功';
	  	  	  this.hideMsg();
	  	  	} else {
	  	  	  this.errMsg = data.msg;
	  	  	  this.hideMsg();
	  	  	}
	  	  }).catch( (error) => {
	  	  	this.errMsg = data.msg;
	  	  	this.hideMsg();
	  	  })
	  	},
	  	hideMsg(msg){
		  setTimeout(()=>{
			this.successMsg = '';
			this.errMsg = '';
			this.tnSaveMsg = ''
		  },5000)
		}
	  }
	}
</script>

<style>
.deleteTn{
  background-repeat: no-repeat;
  display: inline-block;
  width: 21px;
  cursor: pointer;
  height: 21px;
  position: relative;
  top: 4px;
}
.tp{
	margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    width: 70%;
    position: relative;
}
.tp div{
	display: inline-block;
	width: 30%;
	margin: 10px 0;
}
.table-handle div{
	display: inline-block;
}
.train-plan{
	height: 700px;
	overflow-y: scroll;
}
.repeatL{
	background: #c44;
	color: white;
}
.repeatL:hover{
	background: #f44 !important; 
}
.tnComplete{
	background: #06c;
	color: white;
}
.tnComplete:hover{
	background: #07d !important;
	color: white;
}
.tnFor{
	background: #fb4;
	color: white;	
}
.tnFor:hover{
	background: #fc0 !important;
	color: white;	
}
.tn-msg{
	text-align: left;
	margin: 0 0 0 15%;
}
.msg-left{
	display: inline-block;
	vertical-align: top;
}
.tn-btn{
	position: relative;
	right: -78%;
}
.msg-right{
	display: inline-block;
}
.im-msg{
	color: #988;
	font-size: 12px;
}
.xlsx-button{
	font-size: 16px;
}
</style>