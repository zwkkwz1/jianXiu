<template>
  <div id="app" style="min-width: 1100px;">
  	<div class="app-title">
  		<!--<img src="./assets/logo.png" alt="" />-->
  		<!--<span class="home-name" v-text="homeName"></span>
  		<span class="app-time" v-html="currentdate">
  		</span>-->
	  	<nav>
		  	<router-link to="/">
		  		<span :class="{isSelect: $route.name == '控制中心'}">控制中心</span>
		  	</router-link>
		  	<i class="headNavLine"></i>
		  	<router-link to="/dq">
		  		<span :class="{isSelect: $route.name == '历史查询'}">历史查询</span>
		  	</router-link>
		  	<i class="headNavLine"></i>
		  	<router-link to="/tp">
		  		<span :class="{isSelect: $route.name == '计划维护'}">计划维护</span>
		  	</router-link>
		  	<i class="headNavLine"></i>
		  	<router-link to="/bunkAd">
		  		<span :class="{isSelect: $route.name == '铺位管理'}">铺位管理</span>
		  	</router-link>
		  	<i class="headNavLine"></i>
		  	<router-link to="bunkEx">
		  		<span :class="{isSelect: $route.name == '铺位看板'}">铺位看板</span>
		  	</router-link>
		  	<i class="headNavLine"></i>
		  	<router-link to="/sys">
		  		<span :class="{isSelect: $route.name == '系统设置'}">系统设置</span>
		  	</router-link>
		  	<span class="app-time" v-html="currentdate"></span>
	  	</nav>
	  	<!--<div class="nav-name">
	  		<span v-text="navName"></span>
	  	</div>-->
	  </div>
	  <div>
	  	<div class="loadingPanel" v-if="loadingIsShow">
        <i class="icon-diyi-loading"></i>
        <span v-text="loadingMessage"></span>
   		</div>
	  </div>
  	<div class="callBunk" style="margin: 10px 30px 0 30px;width: 55%;display: inline-block;">
  		<router-view @adRemindClose="adRemindClose" @loadShow="loadShow" @loadHide="loadHide"></router-view>
  	</div>
  	<div class="right-table mainTable">
  		<div class="rightList">
  			<div class="head" style="text-align: center;">
			  	<div>人工待叫列表</div>		  	
			  </div>
  			<div class="manually-list-info">
  				<span v-text="manuallyListLength"></span>人需人工叫班
  				<span style="display: none;" v-html="singAndDanceHtml"></span>
  			</div>
  			<div style="margin-bottom: 20px;">
  				<table style="width: 95%;margin: 0 13px;" class="table-hover">
		        <colgroup>
		            <col style="width:60px">
		            <col/>
		            <col/>
		            <col/>
		            <col/>
		            <col/>
		            <col style="width:120px">
		        </colgroup>
		        <thead>
		            <th style="min-width:50px;">序号</th>
		            <th style="min-width:75px;">车次</th>
		            <th style="min-width:75px;">叫班时间</th>
		            <th style="min-width:65px;">司机</th>
		            <th style="min-width:65px;">铺位号</th>
		            <th style="min-width:95px;">叫班次数</th>
		            <th style="min-width:65px;">有无响应</th>
		        </thead>
		        <tbody>
		          <tr v-for="(manually,$index) in rightList.manuallyList" @dblclick="adminRemind(manually,$index)"
		          	:class="{isCallBed: manually.reminded, notCallBed: !manually.reminded}">
		            <td><div v-text="$index+1"></div></td>
		            <td><div v-text="manually.trainNo"></div></td>
		            <td><div>{{manually.remindPlanedTime | formatTime}}</div></td>
		            <td><div v-text="manually.driverName"></div></td>
		            <td><div v-text="manually.bedNo"></div></td>
		            <td><div><span class="manually-time">{{manually.remindTimes + '次'}}</span>{{manually.timeGoingOn | remindTime}}</div></td>
		            <td><div>{{manually.responded?'有':'无'}}</div></td>
		          </tr>
		        </tbody>
		      </table>
  			</div>
  		</div>
  		<div class="rightList">
  			<div class="head" style="text-align: center;">
			  	<div>自动叫醒记录</div>		  	
			  </div>
  			<div class="manually-list-info">
  				<span v-text="autoListLength"></span>人手表已震动，暂不需要干预
  			</div>
  			<div style="margin-left: 20px;" v-for="auto in rightList.autoList">
  				<span>
  					{{'铺位号' + auto.bedNo + "叫班时间  " + " 已过"}}
  				</span>
  				<span>{{auto.responded?'有响应':'无响应'	}}</span>
  			</div>
  		</div>
  	</div>
  	<ad-remind :params="adminRemindVo" :startAdRemind="startAdRemind" @adRemindClose="adRemindClose" 
  		@loadShow="loadShow" @loadHide="loadHide" @adRemindSuccess="adRemindSuccess"></ad-remind>
  </div>
</template>

<script>
	/**
	 *todo:改header部分的布局
	 */
import axios from 'axios'
import adRemind from '@/components/adminRemind/adminRemind'
import config from './config'
export default {
  name: 'app',
  data () {
  	return {
  		host: config.host,
  		homeName:"上 海 铁 路 局",
  		navName: '',
  		navLable: '',
  		currentdate : '',
  		autoListLength: '',
  		singAndDanceHtml: '',
  		manuallyListLength: '',
  		loadingMessage: '',
  		startAdRemind: false,
  		loadingIsShow: false,
  		adminRemindVo: {},
  		singTime: 0,
  		singInterval: 33000,
  		rightList: {}
  	}
  },
  components: {adRemind},
  filters : {
		remindTime: function(value) {
			let minute = config.time1To2(parseInt(value/60));
			let secs = config.time1To2(parseInt(value%60));
			return minute + ':' + secs;
		}
  },
  mounted () {
  	this.$nextTick(function () {
			this.getRightInterval();
  		this.getRightList();
    });
    setInterval(()=>{
  	  this.filterTime ();
  	},1000);
//	this.navName = this.$route.name;
  },
  methods: {
  	getRightInterval () {
  		this.rightInterval = setInterval(()=>{
  	 		this.getRightList ();
  		},5000);
  	},
	  filterTime () {
	  	var date = new Date();
      var month = config.time1To2(date.getMonth() + 1);
      var strDate = config.time1To2(date.getDate());
      this.currentdate = "<div>" + date.getFullYear() + "/" + month + "/" + strDate + "</div>" 
            + "<div>" + date.getHours() + ":" + config.time1To2(date.getMinutes())
            + ":" + config.time1To2(date.getSeconds()) + "</div>";
   	},
//  modifyNav (nvaName) {
//  	this.navName = nvaName;
//  },
    loadShow (){
    	this.loadingIsShow = true;
    },
    loadHide (){
    	this.loadingIsShow = false;
    },
    adminRemind(manually,index) {
    	this.adminRemindVo = manually;
    	this.startAdRemind = true;
    	if (!manually.reminded) {
    		this.singAndDanceHtml = '';
    		clearTimeout(this.singTimeout);
    	}
    },
    adRemindSuccess(params){
//  	for (var i = 0; i < this.rightList.manuallyList.length; i++) {
//  		if (this.rightList.manuallyList[i].bedNo == params.bedNo) {
//  			this.rightList.manuallyList[i].reminded = true;
//  			console.log('右侧列表铺位号'+this.rightList.manuallyList[i].bedNo+'置绿' + this.rightList.manuallyList[i].reminded);
//  			break;
//  		}
//  	}
//  	clearInterval(this.rightInterval);
//  	clearTimeout(this.reRight);
//  	console.log('暂停请求右侧列表'+new Date())
//  	this.reRight = setTimeout(()=>{
//  		this.getRightInterval();
//  		console.log('7秒后重新请求右侧列表'+new Date())
//  	},7000)
			this.getRightList ();
    },
    adRemindClose (){
    	console.log('我在App');
    	this.startAdRemind = false;
    },
    getRightList() {//获取控制中心右侧列表信息，接口12
    	console.log('请求右侧列表');
    	let self = this;
   		return axios({
				method: 'get',
//				url: '/static/rightList.json',
				url: this.host + '/web/right',
			  headers: {'appType': 'web','appid': 'logan'}
			})
	    .then( (response) => {
	      var data = response.data;
	      if (data.type === 1) {
	      	clearInterval(this.timeGoingInterval);
	      	self.rightList = data.result;
	      	self.manuallyListLength = self.rightList.manuallyList.length;
	      	self.timeGoingInterval = setInterval(()=>{
	      		let manuallyList = self.rightList.manuallyList;
			  	  for (let i = 0; i < manuallyList.length; i++) {
			  	  	manuallyList[i].timeGoingOn++;
			  	  }
			  	},1000);
			  	let nowData = new Date();
			  	nowData = nowData.getTime();
			  	if (self.rightList.singAndDance){
			  		if (!self.singAndDanceHtml) {
				  		self.singTime = nowData;
				  		self.singAndDanceHtml = '<video style="display: none" controls="" autoplay="" name="media"><source src="/static/callbunk.mp3" type="audio/mpeg"></video>';
				  		self.singTimeout = setTimeout (()=>{
				  			self.singAndDanceHtml = ''
				  		},self.singInterval)
			  		}
			  	}
	      	self.autoListLength = self.rightList.autoList.length;
	      }
	    }).catch( (error) => {
	      console.log("右侧列表数据获取失败")
	    })
    }
  }
}
</script>

<style>
body{
	margin: 0;
	padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}
ul{
	margin-top: 0;
}
.app-title{
	width: 100%;
	height: 66px;
	position: relative;
	top: 0;
	/*background-image: linear-gradient(to top, #39496a, #4a5f89);*/
	background-color: rgb(81, 140, 184);
	color: white;
}
.home-name{
	position: relative;
	left: 16%;
	font-size: 46px;
	font-family: cursive;
	line-height: 66px;
}
.app-time{
	display: inline-block;
	position: relative;
	right: 20%;
	float: right;
	font-size: 20px;
	line-height: 33px;
	text-align: center;
	margin-top: 1px;
}
nav{
	height: 65px;
	position: relative;
	background: rgb(81, 140, 184);
	color: white;
	
	border-top: 1px solid #407aa6;
}
nav a{
	cursor: pointer;
  transition: all 0.18s ease-out 0s;
  position: relative;
	width: 118px;
  line-height: 65px;
  display: inline-block;
  text-align: center;
}
nav a span{
	color: white;
	border: none;
}
.headNavLine{
  /*border-left: 1px solid #2c3a54;*/
  border-left: 1px solid #4a799c;
  /*border-right: 1px solid #566a8e;*/
  display: inline-block;
  height: 39px;
  position: relative;
  top: 15px;
}
a:link {
  text-decoration: none;
  color: #F60;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: #000000;
  opacity: 0.8;
}
.popup{
  width: 600px;
  max-height: 600px;
  position: fixed;
  border: 1px solid;
  left: 20%;
  top: 15%;
  background: white;
  z-index: 11111;
  overflow: auto;
}
a:visited {
  text-decoration: none;
}
a:hover {
	text-decoration: none;
}
a:active {
	text-decoration: none;
	font-size: 14px;
	font-weight: bold;
}
.head div{
	/*background: #415378;*/
	background-color: #518cb8;
	color: white;
	font-size: 20px;
	height: 32px;
}
.manually-list-info{
	margin-left: 20px;
}
.isCallBed:hover{
	background: #86fa8c !important;
}
.isCallBed{
	background: #74de7a;
	/*background: #51a8b6;*/
}
.notCallBed:hover{
	background: #fa5e5e !important;
}
.notCallBed{
	/*background: #f44;*/
	background-color: #c5564e;
	color: white;
}
.rightList{
	margin-bottom: 20px;
	/*border: 1px solid #039;*/
	border: 1px solid #518CB8;
	min-width: 550px;
}
.manually-time{
	display: inline-block;
	margin-right: 5px;
}
.mainTable{
	width: 30%;
	display: inline-block;
	position: absolute;
	top: 162.4px;
}
.callBunk div input{
	width: 90px;
	height: 25px;
	font-size: 18px;
	text-align: center;
	border-radius: 3px;
}
.btn-lg{
	display: inline-block;
  height: 30px;
  width: 150px;
  border-radius: 5px;
 	border: 1px solid;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  color: #fff;
}
.btn-md{
	display: inline-block;
  height: 30px;
  width: 100px;
  border-radius: 5px;
 	border: 1px solid;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  color: #fff;
}
.btn-sm{
	display: inline-block;
    height: 26px;
    width: 48px;
    border-radius: 5px;
   	border: 1px solid;
    text-align: center;
    line-height: 26px;
    cursor: pointer;
    color: #fff;
}
.btn-info{
	background-color: #5bc0de;
  border-color: #46b8da;
}
.btn-success{
	background-color: #5cb85c;
  border-color: #5cb85c;
}
.btn-table{
	height: 23px;
	line-height: 26px;
}
.btn-primary{
	color: #fff;
	background-color: #337ab7;
	border-color: #2e6da4;
}
.icon-diyi-loading {
  background-image: url(/static/loading.gif) !important;
  height: 80px !important;
  left: 50%;
  margin: -40px auto 0 -40px !important;
  position: absolute;
  top: 50%;
  width: 80px !important;
}
.loadingPanel {
  background-color: #eeeeee;
  height: 100%;
  opacity: 0.6;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 10000;
}
.table-hover{
	border-collapse: collapse;
	text-align: center;
}
.controllerCenter div input{
	width: 30px;
	height: 30px;
	font-size: 20px;
}
.callBedTable{
	line-height: 26px;
	padding-bottom: 25px;
}
.callBedTable tr:hover{
	background: #e9e9e9;
}
.callBedTable thead th{
	/*border: 1px solid #2c3a54;*/
	border: 1px solid #3f6c8d;
}
.callBedTable tr td{
	border: 1px solid #b4caed;
	padding: 0;
}
.callBedTable table thead{
	/*background-color: #425574;*/
	background-color: rgb(81,140,184);
	color: #ffffff;
}
.callBedTable td input{
	font-size: 16px;
	height: 20px;
	text-align: center;
}
.callBedTable td select{
	height: 26px;
	border-radius: 3px;
	font-family: "微软雅黑";
}
.callBedTable td button{
	height: 25px;
  width: 115px;
  background-color: #7b93f6;
  color: white;
}
.right-table thead th{
	border: 1px solid #898484;
}
.right-table tr td{
	border: 1px solid #898484;
	padding: 0;
}
.right-table table thead {
  /*background-color: #425574;*/
  background: #518CB8;
  color: #ffffff;
}
.msg{
	position: relative;
	color: red;
}
.success-msg{
	position: relative;
	color: #06c;
}
a span{
	display: inline-block;
	width: 100%;
}
.nav-name{
	width: 100%;
	border-bottom: 1px solid #ccc;
	height: 50px;
	line-height: 50px;
	font-size: 26px;
	color: #333;
}
.nav-name span{
	margin-left: 50px;
}
.page-info{
	display: inline-block;
	margin: 0 80px 0 0 !important;
	min-width: 150px;
	margin-bottom: 20px;
}
.page-info label{
	font-size: 18px;
}
.page-info span{
	font-size: 22px;
}
.icon-white{
	background-image: url(/static/glyphicons-halflings-white.png);
}
.icon-black{
	background-image: url(/static/glyphicons-halflings.png);
}
[class^="icon-"], [class*=" icon-"] {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-top: 1px;
  line-height: 14px;
  vertical-align: text-top;
  background-position: 14px 14px;
  background-repeat: no-repeat;
}
.icon-remove {
  background-position: -312px 0;
  right: 10px;
  top: 6px;
  position: absolute;
  cursor: pointer;
}
.popup .head {
  background-color: #518cb8;
  padding-bottom: 5px;
  padding-top: 5px;
  color: #ffffff;
  height: 20px;
}
.popup-left{
	display: inline-block;
	width: 38%;
	font-size: 22px;
	margin: 40px 0 20px 20px;
	position: relative;
	text-align: left;
}
.popup-right{
	display: inline-block;
	width: 50%;
	margin: 30px 0;
	float: right;
}
.popup-left div{
	margin: 10px 0;
}
.ad-remind-label{
	display: inline-block;
	width: 80px;
	margin: 10px 20px;
}
.popup .popup-title{
  text-align: center;
	margin-top: 20px;
}
.ad-remind-item{
	display: inline-block;
	width: 300px;
	border-bottom: 1px solid #ccc;
}
nav .isSelect{
	background: #3F6C8D;
	left: -4px;
	width: 125px;
	height: 62px;
	position: relative;
}
</style>
