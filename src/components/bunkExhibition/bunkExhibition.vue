<template>
	<ul class="bunkList">
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
	export default {
	  name: 'bunkEx',
	  data () {
	  	return {
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
	  	  	url: '/static/bunkEx.json',
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
		width: 180px;
		border: 1px solid;
		line-height: 80px;
		text-align: center;
		font-size: 18px;
		color: white;
		transition: all 0.5s ease-out; 
	}
	.taboo{
		background: red;
	}
	.taboo:hover{
		background: rgba(255, 0, 0, 0.5);
	}
	.access{
		background: #06C;
	}
	.access:hover{
		background: rgba(0, 102, 204, 0.5);
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