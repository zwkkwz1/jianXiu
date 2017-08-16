<template>
  <div class="controllerCenter">
  	<div class="controllerSys">
  		<div><span>总共接待：</span><span v-text="con.servedDriverNum">人次</span></div>
    	<div><span>手表叫班响应率：</span><span v-text="con.responseRate"></span></div>
    	<div><span>出发及时率：</span><span v-text="con.inTimeRate"></span></div>
    	<div class="controllerBtn">
	  		<span class="devRegister" @click="devCheckIn()">设 备 登 记</span>
	  		<!--<span class="getRestOver" @click="getRestOver()">结束间休</span>-->
	  		<span class="err-msg" v-text="errMsg"></span>
	  	</div>
	  	<div class="btn-sm btn-primary" @click="fetchData" style="float: right;margin: 100px 80px 0 0px;">刷新</div>
  	</div>
  	<!-- 设备登记弹出框 -->
  	<div class="popup" v-if="checkInPage">
  		<div class="head" style="text-align: center;">
			  <h3></h3>
				<i class="icon-remove icon-white" @click="cancelCheckInPage()"></i>			  	
			</div>
			<div class="popup-left">
				<div class="prompt">请扫描二维码！</div>
			</div>
			<div class="popup-right" style="width: 65%;">
				<qriously :value="checkInInfo" :size="300" />
			</div>
  	</div>
    <div>
    	<div>
    		<span class="con-table-name">当日已结束</span>
    		<div :class="{hideIcon:!completed,showIcon:completed}" @click="toggleControllerLeftTable('completed')"></div>
    	</div>
    	<div class="callBedTable" v-if="completed">
		    <table style="width: 100%" class="table-hover">
		        <colgroup>
		            <col style="width:60px">
		            <col/>
		            <col/>
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
		            <th>司机</th>
		            <th>到达时间</th>
		            <th>首次叫班</th>
		            <th>二次叫班</th>
		            <th>人工叫班</th>
		            <th>结束间休</th>
		            <th>设备编号</th>
		        </thead>
		        <tbody>
		          <tr v-for="(completed,$index) in con.completedList">
		            <td><div style="mix-width:50px" v-text="$index+1"></div></td>
		            <td><div style="min-width:75px" v-text="completed.trainNo"></div></td>
		            <td><div style="min-width:75px" v-text="completed.driverName"></div></td>
		            <td><div style="min-width:125px" :title="completed.startTime">{{completed.startTime | formatTime}}</div></td>
		            <td><div style="min-width:125px" :title="completed.remindRealTime1"></div>{{completed.remindRealTime1 | formatTime}}</td>
		            <td><div style="min-width:125px" :title="completed.remindRealTime2">{{completed.remindRealTime2 | formatTime}}</div></td>
		            <td><div style="min-width:125px" :title="completed.adminRemindTime">{{completed.adminRemindTime | formatTime}}</div></td>
		            <td><div style="min-width:125px" :title="completed.endRealTime">{{completed.endRealTime | formatTime}}</div></td>
		            <td><div style="min-width:125px" v-text="completed.bid"></div></td>
		          </tr>
		        </tbody>
		    </table>
			</div>
			<div>
				<span class="con-table-name">当日已安排：未结束</span>
				<div :class="{hideIcon:!notFinished,showIcon:notFinished}" @click="toggleControllerLeftTable('notFinished')"></div>
			</div>
			<div class="callBedTable" v-if="notFinished">
		    <table style="width: 100%" class="table-hover">
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
		            <th>司机</th>
		            <th>开车时间</th>
		            <th>铺位号</th>
		            <th>叫班时间</th>
		            <th></th>
		        </thead>
		        <tbody>
		          <tr v-for="(notFinished,$index) in con.notFinishedList">
		            <td><div style="mix-width:50px" v-text="$index+1"></div></td>
		            <td><div style="min-width:135px" v-text="notFinished.trainNo"></div></td>
		            <td><div style="min-width:135px" v-text="notFinished.driverName"></div></td>
		            <td><div style="min-width:185px" :title="notFinished.trainDt">{{notFinished.trainDt | formatTime}}</div></td>
		            <td><div style="min-width:135px" v-text="notFinished.bedNo"></div></td>
		            <td><div style="min-width:185px" :title="notFinished.remindPlanedTime1">{{notFinished.remindPlanedTime1 | formatTime}}</div></td>
		            <td>
		              <div style="max-width:120px">
		                <qr type="restOver" url="/web/get" :params="notFinished" buttonSpan="结束" @qrClose="fetchData"></qr>
		              </div>
		            </td>
		          </tr>
		        </tbody>
		    </table>
			</div>
			<div>
				<span class="con-table-name">当日未安排</span>
				<button type="button" class="callBedButton btn-md" @click="addnotArrangedList()">临时增加</button>
				<div :class="{hideIcon:!notArranged,showIcon:notArranged}" @click="toggleControllerLeftTable('notArranged')"></div>
			</div>
			<div style="position: relative;">
				<div class="callBedTable" v-if="notArranged" style="z-index: 111;">
			    <table style="width: 100%" class="table-hover">
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
			            <th>司机</th>
			            <th>开车时间</th>
			            <th>铺位号</th>
			            <th>叫班时间</th>
			            <th></th>
			        </thead>
			        <tbody>
			          <tr v-for="(notArranged,$index) in notArrangedList">
			            <td><div type="text" style="mix-width:50px" v-text="$index+1"></div></td>
			            <td><input type="text" style="min-width:135px" v-model="notArranged.trainNo" /></td>
			            <td style="min-width:135px">
			            	<!--<input type="text" style="min-width:135px" v-model="notArranged.driverName" @click="autocompleteShow($index)"/>-->
			            	
			            	<!--<input type="text" style="min-width:135px" v-model="dri.driverName" @click="autocompleteShow($index)"/>
			            	<div class="v-autocomplete-list" v-if="selectDri == $index">
			            		<span v-for="name in driverLikeList" v-text="name" @click="selectDriver(name,notArranged)"></span>
			            	</div>-->
			            	
			            	<!--<main v-if="selectDri == $index" class="v-autocomplete-list">
			            		<vue-instant :suggestion-attribute="suggestionAttribute" v-model="value" @selected="selectedDriver"  
			            			@enter="selectedDriver" :suggestions="driverList" name="customName" placeholder="custom placeholder" 
			            			type="google"></vue-instant>
			            	</main>-->
			            	
			            </td>
			            <td><input type="text" style="min-width:185px" v-model="notArranged.trainDt" @blur="getRemindPlanedTime1(notArranged,$index)"/></td>
			            <td><select name="" style="min-width:135px" v-model="notArranged.bedNo">
			            	<option v-for="bedNo in con.bedNos">{{ bedNo }}</option>
			            </select></td>
			            <td><input type="text" style="min-width:185px" v-model="notArranged.remindPlanedTime1" /></td>
			            <td>
			                <div style="max-width:120px">
			                	<qr startUrl="/web/createOrUpdate" url="/web/get" type="restStart" 
			                		:params="notArranged" buttonSpan="开始" @qrClose="fetchData"></qr>
			                </div>
			            </td>
			          </tr>
			        </tbody>
			    </table>
				</div>
				<div class="callBedTable driListTable" v-if="notArranged">
			    <table style="width: 100%" class="table-hover">
			        <colgroup>
			            <col />
			        </colgroup>
			        <thead>
			            <th>司机</th>
			        </thead>
			        <tbody>
			          <tr v-for="(dri,$index) in notArrangedDriList">
			            <td>
			            	<!--<input type="text" style="min-width:135px" v-model="notArranged.driverName" @click="autocompleteShow($index)"/>-->
			            	<input type="text" style="min-width:135px" v-model="dri.driverName" @click="autocompleteShow($index)"/>
			            	<!--<div class="v-autocomplete-list" v-if="selectDri == $index">
			            		<span v-for="name in driverLikeList" v-text="name" @click="selectDriver(name,notArranged)"></span>
			            	</div>-->
			            	
			            </td>
			          </tr>
			        </tbody>
			    </table>
				</div>
			</div>
    </div>
  </div>
</template>

<script>
/**
 * con:controller缩写
 */
import axios from 'axios'
import qr from '@/components/QRCode/QR'
import config from '@/config'
export default {
  name: 'controllerCenter',
  data () {
    return {
      host: config.host,
      suggestionAttribute: 'name',
      selectDri: -1,
      aheadOfTime: 50,
      controllerPopup: false,
      getRestOverBedNo: false,
      checkInPage: false,
      completed: false,
      notFinished: true,
      notArranged: true,
      notArrangedDriList: [],
      driverList: [],
      driverLikeList: [],
      bedNo:　'',
      restOverScan: '',
      restOverVo: {},
      qrMsg: '',
      errMsg: '',
      checkInInfo: '',
      startRest: false,
      notArrangedList: [],
      con: new Object
    }
  },
watch: {
	notArrangedDriList: {
		handler: (newVal, oldVal)=> {
		  for (let i = 0; i < newVal.length; i++) {
　　　　　  this.getDriverLikeList()
　　　 }
	},
    deep: true
	}
},
//filters: {  
//  formatTime: function (value) {
//    let valueArr = value.split(" ");
//    let timeArr = valueArr[1].split(":");
//    return timeArr[0] + ':' + timeArr[1];
//  } 
//},
  components: {qr},
  mounted () {
  	this.$nextTick(() => {
      this.fetchData();
      this.getCheckInInfo();
      this.getDriverList();
	      setInterval(()=>{
	      	this.getDriverList();
	      },8640000)
    });
  },
  methods: {
  	fetchData () {
    	let self = this;
	    return axios({//控制中心左侧接口
				  method: 'get',
//				  url: '/static/controllerLeft.json',
				  url: this.host + '/web/left',
				  headers: {'appType': 'web','appid': 'logan'}
				})
	      .then( (response) => {
	      	var response = response.data;
	      	if (response.type === 1) {
	      		self.con = response.result;
	      		for (let i = 0; i < self.con.notArrangedList.length; i++) {
	      			self.getRemindPlanedTime1(self.con.notArrangedList[i],i);
	      			self.con.notArrangedList[i].bedNo = self.con.bedNos[0];//给铺位设置默认值
	      			self.con.notArrangedList[i].driverAutocomplete = false;
	      			self.con.notArrangedList[i].driverName = '';
	      			self.notArrangedDriList.push({'driverName':self.con.notArrangedList[i].driverName});
	      		}
	      		self.notArrangedList = self.con.notArrangedList;
	      	}
	      }).catch( (error) => {
	        console.log("网络连接失败")
	      })
	  },
	  autocompleteShow(index) {
	  	this.selectDri = index;
	  	console.log(this.notArrangedDriList);
	  },
//	  autocompleteHide () {
//	  	this.selectDri = -1
//	  };
	  getDriverList () {
	  	let self = this;
	    return axios({//接口04，获取司机姓名
				  method: 'get',
				  url: '/static/driverList.json',
//				  url: this.host + '/web/getAllDrivers',
				  headers: {'appType': 'web','appid': 'logan'}
				})
	      .then( (response) => {
	      	var data = response.data;
	      	if (data.type === 1) {
	      		self.driverList = data.result.driverList;
//						for (var i=0;i<driverList.length;i++) {
//							self.driverList.push({'name':driverList})
//						}
	      	}
	      }).catch( (error) => {
	        console.log("司机信息获取失败")
	      })
	  },
	  getDriverLikeList () {
	  	[this.selectDri]
	  	if (!notArranged.driverName) {
	  		notArranged.driverAutocomplete = false;
	  		return null
	  	}
	  	notArranged.driverAutocomplete = true;
	  	this.driverLikeList = [];
	  	for (var i = 0; i < this.driverList.length; i++) {
	  		if (this.driverList[i].indexOf(notArranged.driverName) == 0) {//this.driverList[i]的第一个字符串是否是输入的字符串
	  			this.driverLikeList.push(this.driverList[i]);
	  		}
	  	}
	  },
	  selectDriver(name,notArranged) {
	  	notArranged.driverName = name;
	  	this.selectDri = -1;
	  },
	  toggleControllerLeftTable (type) {
	  	this[type] = !this[type];
	  },
	  devCheckIn () {
	  	this.checkInPage = true;
	  	this.getCheckInInfo()
	  },
	  getCheckInInfo () {
	  	let self = this;
	  	return axios({//21接口，获取设备登记信息
				  method: 'get',
//				  url: '/static/checkIn.json',
				  url: this.host + '/web/get-register-info',
				  headers: {'appType': 'web','appid': 'logan'}
				})
	      .then( (response) => {
	      	var response = response.data;
	      	if (response.type === 1) {
	      		self.aheadOfTime = response.result.timeout;
	      		response.result.name = this.utf16to8(response.result.name);
	      		self.checkInInfo = JSON.stringify(response.result);
	      	}
	      }).catch( (error) => {
	        alert("获取设备登记信息失败")
	      })
	  },
	  cancelCheckInPage () {
	  	this.checkInInfo = '';
	  	this.checkInPage = false;
	  },
//	  getRestOver () {//点击结束间休，弹出弹出框
//	  	this.getRestOverBedNo = true;
//	  	this.setFocu("restOverBedNo")
//	  },
	  setFocu(id) {
	  	setTimeout(()=>{
	  		document.getElementById(id).focus();
	  	},500)
	  },
	  cancelRestOverBedNoPage() {//结束间休弹出框关闭
	  	this.restOverVo = {};
	  	this.getRestOverBedNo = false;
	  	this.controllerPopup = false;
	  	clearInterval(this.restOverInterval)
	  },
//	  restOver() {//接口02，判断退勤是否结束以及接受退勤信息
//	  	let self = this; 
//			return axios({
//				method: 'get',
//				url: '/static/qr.json',
////			data: this.bedNo,
//				headers: {'appType': 'web','appid': 'logan'}
//			 }).then( (response) => {
//			  var data = response.data;
//			  if (data.type === 1) {
//			    self.restOverVo = data.result;
//			    self.controllerPopup = true;
//			    if(!self.restOverScan){
//			    	self.restOverScan = JSON.stringify(data.result);
//			    };
//			    if (self.restOverVo.status == 3){
//			    	self.qrMsg = '扫描成功！间休结束';
//			    	self.cancelRestOverBedNoPage()
//			    };
//			  }
//		  }).catch( (error) => {
//			  self.restOverVo.trainNo = '网络链接失败';
//			})
//	  },
	  addnotArrangedList() {
	  	let notArranged = {
        "sid": "",
        "status": "",
        "remindPlanedTime1": "",
        "trainNo": "",
        "driverName":"",
        "trainDt": "",
        "startTime": "",
        "bedNo": ""
    	}
	  	this.con.notArrangedList.push(notArranged);
	  },
	  getRemindPlanedTime1 (notArranged,index) {
	  	let hour = '';
	  	let min = '';
	  	if (!this.con.notArrangedList[index].trainDt.match(/^([0][0-9]|[1][0-9]|[2][0-3]):([1-5][0-9]|[0][0-9])$/)) {
	  		this.con.notArrangedList[index].trainDt = '';
	  		this.con.notArrangedList[index].remindPlanedTime1 = '';
	  		this.errMsg = '第'+index+1+'行开车时间格式错误！正确格式为（HH:MM）';
	  		return null;
	  	} else {
	  		this.errMsg = '';
	  	}
	  	let trainDtArr = this.con.notArrangedList[index].trainDt.split(":");
	  	let trainDtMin = parseInt(trainDtArr[0]*60) + parseInt(trainDtArr[1]);
	  	let remindPlanedTime1 = trainDtMin - this.aheadOfTime;
	  	if (remindPlanedTime1 < 0) {
	  		remindPlanedTime1 = remindPlanedTime1 + 1440;
	  		hour = (parseInt(remindPlanedTime1/60)) < 10 ? '0'+parseInt(remindPlanedTime1/60) : parseInt(remindPlanedTime1/60);
	  		min = remindPlanedTime1%60;
	  	} else {
	  		hour = (parseInt(remindPlanedTime1/60)) < 10 ? '0'+parseInt(remindPlanedTime1/60) : parseInt(remindPlanedTime1/60);
	  		min = remindPlanedTime1%60;
	  	}
	  	this.con.notArrangedList[index].remindPlanedTime1 = hour + ':' + min;
	  	this.$set(this.con.notArrangedList, index, this.con.notArrangedList[index]);
	  },
	  testRemindPlanedTime1 (notArranged,index) {
	  	if (!this.con.notArrangedList[index].remindPlanedTime1.match(/^([0][0-9]|[1][0-9]|[2][0-3]):([1-5][0-9]|[0][0-9])$/)) {
	  		this.con.notArrangedList[index].remindPlanedTime1 = '';
	  		this.errMsg = '第'+index+1+'行叫班时间格式错误！正确格式为（HH:MM）';
	  		return null;
	  	}else {
	  		this.errMsg = '';
	  	};
	  },
	  utf16to8(str) {
		  var out, i, len, c;
		  out = "";
		  len = str.length;
		  for(i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if ((c >= 0x0001) && (c <= 0x007F)) {
			    out += str.charAt(i);
			} else if (c > 0x07FF) {
			    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			    out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
			    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
			} else {
			    out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
			    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
				}
		  }
		  return out;
		}
  }
}
</script>
<style>
.col-md-7{
	display: inline-block;
	width: 65%;
}
.controllerCenter .controllerSys div{
	display: inline-block;
	margin: 10px 100px 10px 0;
}
.controllerBtn{
	margin-bottom: 40px;
}
.controllerBtn span{
	display: inline-block;
	width: 200px;
	height: 50px;
	font-size: 26px;
	cursor: pointer;
	color: #fff;
	line-height: 50px;
	text-align: center;
}
.devRegister{
	background: #61b834;
}
.getRestOver{
	background: #006DCC;
}
.over-bedNo{
	position: relative;
	top: 100px;
	text-align: center;
}
.input-over-bedNo{
	width: 100px !important;
	font-size: 22px !important;
}
.restOverPopup{
	left: 0px !important;
	top: 22px !important;
}
.hideIcon{
	background-image: url(../../img/opened.png);
}
.showIcon{
	background-image: url(../../img/closed.png);
}
.hideIcon,.showIcon{
	display: inline-block;
	width: 20px;
	height: 20px;
	cursor: pointer;
	position: relative;
  top: 3px;
}
.con-table-name{
	font-size: 22px;
	margin: 10px 0;
	display: inline-block;
}
select{
	text-align: center;
}
.v-autocomplete-list{
	position: absolute;
	z-index: 111;
	background: white;
	width: 250px;
	left: 0;
	max-height: 500px;
	border: 1px solid #ccc;
	text-align: center;
	border-radius:5px ;
	display: inline-block;
}
.v-autocomplete-list span{
	display: block;
}
.driListTable{
	position: absolute;
	top: 0;
	left: 246px;
}
.driListTable tr{
	height: 28px;
}
.driListTable td{
	width: 180px;
}
.driListTable td:hover{
	background: none;
}
</style>