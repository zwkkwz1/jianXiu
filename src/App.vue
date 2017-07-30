<template>
  <div id="app">
  	<div class="app-title">
  		<!--<img src="./assets/logo.png" alt="" />-->
  		<span class="homeName" v-text="homeName"></span>
  		<span class="app-time" v-html="currentdate">
  		</span>
	  	<nav>
		  	<router-link to="/controller">
		  		<span>控制中心</span>
		  	</router-link>
		  	<i class="headNavLine"></i>
		  	<router-link to="/trainPlan">
		  		<span>计划维护</span>
		  	</router-link>
		  	<i class="headNavLine"></i>
		  	<router-link to=""></router-link>
		  	<i class="headNavLine"></i>
		  	<router-link to=""></router-link>
		  	<i class="headNavLine"></i>
		  	<router-link to="/sys">
		  		<span>系统设置</span>
		  	</router-link>
	  	</nav>
	  </div>
  	<div class="callBed" style="margin: 90px 30px 0 30px;width: 65%;display: inline-block;">
  		<router-view></router-view>
  	</div>
  	<div class="callBedTable mainTable">
  		<div class="rightList">
  			<div class="head" style="text-align: center;">
			  	<div>人工待叫列表</div>		  	
			  </div>
  			<div class="manually-list-info">
  				<span v-text="manuallyListLength"></span>人需人工叫班
  				<span v-html="singAndDanceHtml"></span>
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
		            <th>序号</th>
		            <th>车次</th>
		            <th>叫班时间</th>
		            <th>司机</th>
		            <th>铺位号</th>
		            <th>叫班次数</th>
		            <th>有无响应</th>
		        </thead>
		        <tbody>
		          <tr v-for="(manually,$index) in rightList.manuallyList" 
		          	:class="{isCallBed: manually.remindResponse, notCallBed: !manually.remindResponse}">
		            <td><div style="max-width:60px" v-text="$index+1"></div></td>
		            <td><div style="min-width:75px" v-text="manually.trainNo"></div></td>
		            <td><div style="min-width:95px" v-text="manually.remindPlanedTime"></div></td>
		            <td><div style="min-width:75px" v-text="manually.driverName"></div></td>
		            <td><div style="min-width:75px" v-text="manually.bedNo"></div></td>
		            <td><div style="min-width:95px"><span class="manually-time">{{manually.remindTimes + '次'}}</span>{{manually.timeGoingOn | forMatTime}}</div></td>
		            <td><div style="min-width:40px">{{manually.remindResponse?'有':'无'}}</div></td>
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
  				<span v-text="autoListLength"></span>人手表一震动，暂不需要干预
  			</div>
  			<div style="margin-left: 20px;" v-for="auto in rightList.autoList">
  				<span>
  					{{auto.trainNo + "叫班时间  " + auto.remindRealTime + " 已过"}}
  				</span>
  				<span>{{auto.remindResponse?'有响应':'无响应'	}}</span>
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
  	return {
  		homeName:"上 海 铁 路 局",
  		currentdate : '',
  		autoListLength: '',
  		singAndDanceHtml: '',
  		manuallyListLength: '',
  		singTime: 0,
  		singInterval: 33000,
  		rightList: {}
  	}
  },
  filters : {
		forMatTime: function(value) {
			let minute = parseInt(value/60);
			if (parseInt(value/60) < 10) {
				minute = '0' + minute;
			}
			return minute + ':' + value%60;
		}
  },
  mounted () {
  	this.$nextTick(function () {
		setInterval(()=>{
  	 		this.getRightList ();
  		},5000);
  		this.getRightList();
    });
    setInterval(()=>{
  	  this.filterTime ();
  	},1000);
  },
  methods: {
	  filterTime () {
	  	var date = new Date();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.currentdate = "<div>" + date.getFullYear() + "-" + month + "-" + strDate + "</div>" 
            + "<div>" + date.getHours() + ":" + date.getMinutes()
            + ":" + date.getSeconds() + "</div>";
    },
    filters:{
    	forMatTime: function(value){
    		return value%60 + ":" + value/60;
    	}
    },
    getRightList() {//获取控制中心右侧列表信息，接口12
    	this.rightList = {};
    	let self = this;
    	clearInterval(this.timeGoingInterval);
   		return axios({
				method: 'get',
				url: '/static/rightList.json',
			  headers: {'appType': 'web','appid': 'logan'}
			})
	    .then( (response) => {
	      var data = response.data;
	      if (data.type === 1) {
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
			  		if (nowData - self.singTime > self.singInterval) {
				  		self.singTime = nowData;
				  		self.singAndDanceHtml = '<video style="display: none" controls="" autoplay="" name="media"><source src="/static/callbed.mp3" type="audio/mpeg"></video>';
				  		setTimeout (()=>{
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
	background-image: linear-gradient(to top, #39496a, #4a5f89);
	color: white;
}
.homeName{
	position: relative;
	left: 200px;
	font-size: 24px;
	font-family: "微软雅黑";
	line-height: 66px;
}
.app-time{
	display: inline-block;
	position: relative;
	left: 300px;
	top: 6px;
	text-align: center;
	margin-top: 1px;
}
nav{
	height: 65px;
	position: relative;
	background: #425575;
	color: white;
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
}
.headNavLine{
  border-left: 1px solid #2c3a54;
  border-right: 1px solid #566a8e;
  display: inline-block;
  height: 39px;
  position: relative;
  top: 15px;
}
a:link {
  text-decoration: none;
  color: #F60;
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
	background: #415378;
	color: white;
	font-size: 20px;
	height: 32px;
}
.manually-list-info{
	margin-left: 20px;
}
.isCallBed{
	background: #0be417;
}
.notCallBed{
	background: red;
}
.rightList{
	margin-bottom: 20px;
	border: 1px solid #039;
}
.manually-time{
	display: inline-block;
	margin-right: 5px;
}
.mainTable{
	width: 30%;
	display: inline-block;
	position: absolute;
	top: 300px;
}
.btn-md{
	border-radius: 5px;
}
.callBed div input{
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
.btn-sm{
	display: inline-block;
    height: 26px;
    width: 38%;
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
</style>
