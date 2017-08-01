<template>
	<div>
		<div class="callBedTable" style="padding-bottom: 0;margin-top: 40px;">
			<table style="width: 25%" class="table-hover">
				<colgroup>
					<col style="width:60px">
					<col/>
					<col style="width:120px">
				</colgroup>
				<thead>
					<th>序号</th>
					<th>铺位号</th>
					<th></th>
				</thead>
				<tbody>
					<tr v-for="(bunk,$index) in bunkList">
						<td><div style="min-width:50px" v-text="$index+1"></div></td>
						<td><input type="text" style="min-width:185px" v-model="bunk.bedNo" /></td>
						<td>
							<div style="max-width:80px">
								<img src="../../img/delete.png" class="deleteBunk" @click="deletTP(bunk,$index)" onerror="javascript:this.src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496385415687&di=cfb8c3b6a69be436172b2fbcf2d35748&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F55%2F73%2F39I58PICCqK_1024.png'">
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="addTrainNo" @click="addBunk"></div>
		<!--<div class="btn-lg btn-success" @click="addBunk" style="margin: 30px 0;">添加</div>-->
		<div class="btn-lg btn-success" @click="updataBunk" style="margin: 30px 0;">提交</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
	  name: 'bunkAdmin',
	  data () {
	  	return {
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
	      let updataBunk = "";
	      let self = this;
	  	  for (var i = 0; i < this.bunkList.length; i++) {
	  	  	if (this.bunkList[i].bedNo) {
	  	  	  updataBunk = updataBunk + this.bunkList[i].bedNo + ","
	  	  	};
	  	  };
	  	  updataBunk = updataBunk.substring(0,updataBunk.lastIndexOf(','))
	  	  return axios({//接口25，更新铺位信息
	  	  	method: 'get',
	  	  	url: this.HOST + '/web/update-bedNos',
	  	  	params: updataBunk,
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  self.callBunkAd();
	  	  	}
	  	  }).catch( (error) => {
	  	  	console.log('铺位看板获取失败')
	  	  })
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
</style>