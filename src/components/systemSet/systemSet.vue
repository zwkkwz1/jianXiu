<template>
	<div class="sys">
		<div>
			<label for="roomName">间休室名称：</label>
			<input type="text" name="roomName" id="roomName" v-model="sys.name" style="width: 120px;"/>
		</div>
		<div>
			<label for="abbr">间休室缩写：</label>
			<input type="text" name="abbr" id="abbr" v-model="sys.abbr"/>（虹桥：HQ）
		</div>
		<div>
			<label for="timeAhead">设定提前叫班时间（分）:</label>
			<input type="text" name="timeAhead" id="timeAhead" v-model="sys.timeAhead" />(40~120)
		</div>
		<div>
			<label for="interval">叫班间隔（分）：</label>
			<input type="text" name="interval" id="interval" v-model="sys.interval" />(3~5)
		</div>
		<div>
			<label for="timeOut">响应超时时间（秒）：</label>
			<input type="text" name="timeOut" id="timeOut" v-model="sys.timeout" />(45~120)
		</div>
		<div>
			<label for="timeToLeave">办理结束间休延迟（分）：</label>
			<input type="text" name="timeToLeave" id="timeToLeave" v-model="sys.timeToLeave" />(10~20)
		</div>
		<div>
			<span class="btn-lg btn-success" @click="setSysInfo">提交</span>
			<div v-text="sysMsg" class="msg" style="width: auto;"></div>
			<div v-text="successMsg" class="success-msg" style="width: auto;"></div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import config from '@/config'
	export default {
	  name: 'systemSet',
	  data () {
	  	return {
	  	  host: config.host,
	  	  sysMsg: '',
	  	  successMsg: '',
	  	  sys: {}
	  	}
	  },
	  mounted () {
	  	this.$nextTick(() => {
	      this.getSysInfo();
	    });
	  },
	  methods: {
	  	getSysInfo () {//接口22，获取系统设置
	  	  return axios({
	  	  	method: 'get',
	  	  	url: this.host + '/web/load-config',
//	  	  	url: '/static/sysInfo.json',
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  this.sys = data.result;
	  	  	}
	  	  }).catch( (error) => {
	  	  	console.log('系统信息获取失败')
	  	  })
	  	},
	  	setSysInfo() {//接口23，更新系统设置
	  	  this.sysMsg = '';
	  	  this.successMsg = '';
	  	  if (this.sys.timeAhead>120 || this.sys.timeAhead<40 || !(/^[0-9]*$/).test(this.sys.timeAhead)) {
	  	  	this.sysMsg = '提前叫班时间设置错误';
	  	  	this.msgHide();
	  	  	return null
	  	  } else if (this.sys.abbr.length > 2 || !this.sys.abbr.match(/^[a-zA-Z]+$/)) {
	  	  	this.sysMsg = '间休室缩写是两个字母';
	  	  	this.msgHide();
	  	  	return null
	  	  } else if (this.sys.interval>5 || this.sys.interval<3 || !/^[0-9]*$/.test(this.sys.interval)) {
	  	  	this.sysMsg = '叫班时间间隔设置违规';
	  	  	this.msgHide();
	  	  	return null
	  	  } else if (this.sys.timeout>120 || this.sys.timeout<40 || !/^[0-9]*$/.test(this.sys.timeout)) {
	  	  	this.sysMsg = '响应超时时间设置违规';
	  	  	this.msgHide();
	  	  	return null
	  	  } else if (this.sys.timeToLeave>20 || this.sys.timeToLeave<10|| !/^[0-9]*$/.test(this.sys.timeToLeave)) {
	  	  	this.sysMsg = '办理结束间休时间设置违规';
	  	  	this.msgHide();
	  	  	return null
	  	  } 
//	  	  let self = this;
	  	  return axios({
	  	  	method: 'post',
	  	  	url: this.host + '/web/update-config',
	  	  	data: this.sys,
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	var data = response.data
	  	  	if (data.type = 1) {
	  	  	  this.getSysInfo();
	  	  	  this.successMsg = '系统信息更新成功';
	  	  	  this.msgHide();
	  	  	}
	  	  }).catch((error) => {
	  	  	this.sysMsg = '系统信息更新失败'
	  	  	this.msgHide();
	  	  })
	  	},
	  	msgHide(){
	  	  clearTimeout(this.hideMsg);
	  	  this.hideMsg = setTimeout(()=>{
	  		this.sysMsg = '';
	  		this.successMsg = '';
	  	  },5000)
	  	}
	  }
	}
</script>

<style>
	.sys div{
		margin: 10px 0;
	}
	.sys div label{
		width: 200px;
		display: inline-block;
	}
</style>