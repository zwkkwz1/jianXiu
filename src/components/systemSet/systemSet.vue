<template>
	<div class="sys">
		<div>
			<label for="roomName">间休室名称：</label>
			<input type="text" name="roomName" id="roomName" v-model="sys.name" style="width: 120px;"/>
		</div>
		<div>
			<label for="timeAhead">设定提前叫班时间:</label>
			<input type="text" name="timeAhead" id="timeAhead" v-model="sys.timeAhead" />
		</div>
		<div>
			<label for="interval">叫班间隔：</label>
			<input type="text" name="interval" id="interval" v-model="sys.interval" />
		</div>
		<div>
			<label for="timeOut">响应超时时间：</label>
			<input type="text" name="timeOut" id="timeOut" v-model="sys.timeOut" />
		</div>
		<div>
			<label for="timeToLeave">办理间休延迟：</label>
			<input type="text" name="timeToLeave" id="timeToLeave" v-model="sys.timeToLeave" />
		</div>
		<div>
			<span class="btn-lg btn-success" @click="setSysInfo">提交</span>
		</div>
	</div>
</template>

<script>
	/**
	 * todo：设定(设定提前叫班时间)修改之后。控制中心的 (设定提前叫班时间)也要改
	 */
	import axios from 'axios'
	export default {
	  name: 'systemSet',
	  data () {
	  	return {
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
	  	  let self = this;
	  	  return axios({
	  	  	method: 'get',
	  	  	url: '/static/sysInfo.json',
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  self.sys = data.result;
	  	  	}
	  	  }).catch( (error) => {
	  	  	console.log('系统信息获取失败')
	  	  })
	  	},
	  	setSysInfo() {//接口23，更新系统设置
	  	  let self = this;
	  	  return axios({
	  	  	method: 'post',
	  	  	url: '/web/update-config',
	  	  	data: self.sys,
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	var data = response.data
	  	  	if (data.type != 1) {
	  	  	  self.getSysInfo();
	  	  	  console.log('系统信息更新失败')
	  	  	}
	  	  }).catch( (error) => {
	  	  	console.log('系统信息更新失败')
	  	  })
	  	}
	  }
	}
</script>

<style>
	.sys div{
		display: inline-block;
		width: 30%;
		margin: 10px 0;
	}
</style>