<template>
	<ul class="bunkList" style="margin-top: 20px;">
		<li class="bunk" v-for="(bunk,$index) in bunkList" :class="{taboo:bunk.used,access:!bunk.used}">
			<div v-text="bunk.bedNo"></div>
			<div v-text="bunk.driverName"></div>
			<div class="tn-ex">
				<span class="tn-ex-tn" v-text="bunk.trainNo"></span>
				<span class="tn-ex-tDt">{{bunk.trainDt | formatTime}}</span>
			</div>
		</li>
	</ul>
</template>

<script>
	import axios from 'axios'
	import config from '@/config'
	export default {
	  name: 'bunkEx',
	  data () {
	  	return {
	  	  host: config.host,
	  	  bunkList: {}
	  	}
	  },
	  mounted () {
	  	this.$nextTick(() => {
	      this.getBunkInfo();
	    });
	  },
	  methods: {
	  	getBunkInfo () {//接口14，铺位看板	
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
	  	}
	  }
	}
</script>

<style>
	.bunkList{
		height: 700px;
		overflow-y: scroll;
	}
	.bunk{
		display: inline-block;
		height: 80px;
		width: 150px;
		margin-left: 10px;
		border: 1px solid;
		line-height: 80px;
		text-align: center;
		font-size: 18px;
		color: white;
		transition: all 0.5s ease-out; 
	}
	.taboo{
		background: #f08d3c;
	}
	.taboo:hover{
		background: #e6a570;
	}
	.access{
		background: #097796;
	}
	.access:hover{
		background: #0e98c1;
	}
	.bunk div{
		font-size: 16px;
		height: 23px;
		line-height: 23px;
	}
	.tn-ex{
		display: inline-block;
		position: relative;
		top: -25px;
	}
	.tn-ex-tn{
		width: 40px
	}
	.tn-ex-tDt{
		width: 100px;
	}
</style>