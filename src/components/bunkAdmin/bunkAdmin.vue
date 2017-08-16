<template>
	<div>
		<div class="callBedTable" style="padding-bottom: 0;margin-top: 40px;">
			<div class="bunk-revise" v-for="(bunk,$index) in bunkList">
				<input type="text" v-model="bunk.bedNo" style="width: 120px;"/>
				<div>
					<i class="icon-remove icon-black" @click="deletTP(bunk,$index)" style="top: 2px;right: 16px;"></i>
				</div>
			</div>
		</div>
		<div class="success-msg" v-text="successMsg"></div>
		<div class="msg" v-text="errMsg"></div>
		<div class="addTrainNo" @click="addBunk"></div>
		<!--<div class="btn-lg btn-success" @click="addBunk" style="margin: 30px 0;">添加</div>-->
		<div class="btn-lg btn-success" @click="updataBunk" style="margin: 30px 0;">提交</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import config from '@/config'
	export default {
	  name: 'bunkAdmin',
	  data () {
	  	return {
	  	  host: config.host,
	  	  successMsg: '',
	  	  errMsg: '',
	  	  bunkList: []
	  	}
	  },
	  mounted () {
	  	this.$nextTick(() => {
	      this.callBunkAd();
	    });
	  },
	  methods: {
	  	callBunkAd () {//接口14，铺位看板
	  	  let self = this;
	  	  return axios({
	  	  	method: 'get',
//	  	  	url: '/static/bunkEx.json',
			url: this.host + '/web/bedInfos',
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  self.bunkList = data.result.bedInfos;
	  	  	}
	  	  }).catch( (error) => {
	  	  	console.log('铺位看板获取失败')
	  	  })
	  	},
	  	deletTP (bunk,index) {
	  	  this.bunkList.splice(index,1);
	  	},
	  	addBunk () {
	  	  let aBunk = {
	  	  	"bedNo":""
	  	  }
	  	  this.bunkList.push(aBunk);
	  	},
	  	updataBunk() {//更新铺位看板
	      let updataBunk = [];
	      this.successMsg = '';
	      this.errMsg = '';
	      let self = this;
	  	  for (var i = 0; i < this.bunkList.length; i++) {
	  	  	if (this.bunkList[i].bedNo) {
	  	  	  updataBunk.push(this.bunkList[i].bedNo);
	  	  	};
	  	  };
	  	  this.$emit('loadShow');
	  	  return axios({//接口25，更新铺位信息
	  	  	method: 'post',
	  	  	url: this.host + '/web/bedno/update',
	  	  	data: {"bedNos":updataBunk},
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	this.$emit('loadHide');
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  self.callBunkAd();
	  	  	  self.successMsg = '铺位更新成功'
	  	  	  self.hideMsg();
	  	  	} else if(data.type == 0){
	  	  	  self.errMsg = data.msg;
	  	  	  self.hideMsg();
	  	  	}
	  	  }).catch( (error) => {
	  	  	this.$emit('loadHide');
	  	  	console.log('铺位看板获取失败')
	  	  	self.errMsg = '铺位看板获取失败';
	  	  	self.hideMsg();
	  	  })
	  	},
	  	hideMsg () {
	  	  clearTimeout(this.msgHide);
	  	  this.msgHide = setTimeout(()=>{
	  		this.successMsg = '';
	  		this.errMsg = '';
	  	  },5000)
	  	}
	  }
	}
</script>

<style>
	.deleteBunk{
		cursor: pointer;
		position: relative;
		top: 3px;
	}
	.addTrainNo{
		background-repeat: no-repeat;
	    display: block;
	    width: 30px;
	    cursor: pointer;
	    top: 10px;
	    height: 30px;
		text-align: center;
	    position: relative;
	    border: 2px solid;
	    border-radius: 20px;
	    color: #ccc;
	}
	.addTrainNo:before {
	    border-top: 4px solid;
	    content: "";
	    display: block;
	    position: relative;
	    width: 16px;
	    top: 13px;
	    left: 7px;
	}
	.addTrainNo:after {
	    border-left: 4px solid;
	    content: "";
	    display: inline-block;
	    position: relative;
	    top: 3px;
	    height: 16px;
	}
	.addTrainNo:hover {
	    color: #69c;
	}
	.bunk-revise{
		display: inline-block;
		width: 140px;
		position: relative;
		margin-top: 5px;
	}
	.bunk-revise div{
		position: absolute;
		top: 5px;
		right: 5px;
	}
</style>