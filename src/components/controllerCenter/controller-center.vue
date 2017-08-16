<template>
	<div class="controllerCenter">
		<div class="controllerSys" style="margin-top: 10px;">
			<div class="page-info"><label>总共接待：</label><span v-text="con.servedDriverNum">人次</span></div>
			<div class="page-info"><label>手表叫班响应率：</label><span>{{con.responseRate}}</span></div>
			<div class="page-info"><label>出发及时率：</label><span>{{con.inTimeRate}}</span></div>
			<!--<div class="controllerBtn">-->
	  		<!--<span class="devRegister" @click="devCheckIn()">设 备 登 记</span>-->
			<!--<span class="getRestOver" @click="getRestOver()">结束间休</span>-->
			<!--</div>-->
	  		<!--</div>-->
			<div class="btn-sm btn-primary" @click="fetchData" style="float: right;margin: 40px 0 0px 0px;">刷新</div>
		</div>
		<div class="msg" v-text="errMsg" style="font-size: 18px;left: 20px;"></div>
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
				<span class="con-table-name">当日已结束：</span>
				<div :class="{hideIcon:!completed,showIcon:completed}" @click="toggleControllerLeftTable('completed')"></div>
			</div>
			<div class="callBedTable" v-if="completed">
				<table style="min-width: 600px;width: 100%;" class="table-hover">
					<colgroup>
						<col/>
						<col/>
						<col/>
						<col/>
						<col/>
						<col/>
						<col/>
						<col/>
						<col/>
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
							<td>
								<div style="min-width:40px" v-text="$index+1"></div>
							</td>
							<td>
								<div style="min-width:65px" v-text="completed.trainNo"></div>
							</td>
							<td>
								<div style="min-width:65px" v-text="completed.driverName"></div>
							</td>
							<td>
								<div style="min-width:65px" :title="completed.startTime">{{completed.startTime | formatTime}}</div>
							</td>
							<td>
								<div style="min-width:65px" :title="completed.remindRealTime1"></div>{{completed.remindRealTime1 | formatTime}}</td>
							<td>
								<div style="min-width:65px" :title="completed.remindRealTime2">{{completed.remindRealTime2 | formatTime}}</div>
							</td>
							<td>
								<div style="min-width:65px" :title="completed.adminRemindTime">{{completed.adminRemindTime | formatTime}}</div>
							</td>
							<td>
								<div style="min-width:65px" :title="completed.endRealTime">{{completed.endRealTime | formatTime}}</div>
							</td>
							<td>
								<div style="min-width:65px" v-text="completed.bid"></div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div>
				<span class="con-table-name">当日已安排：未结束</span>
				<div :class="{hideIcon:!notFinished,showIcon:notFinished}" @click="toggleControllerLeftTable('notFinished')"></div>
			</div>
			<div class="callBedTable" v-if="notFinished">
				<table style="min-width: 600px;width: 100%;" class="table-hover">
					<colgroup>
						<col/>
						<col/>
						<col/>
						<col/>
						<col/>
						<col/>
						<col/>
					</colgroup>
					<thead>
						<th style="min-width:50px;width: 8%;">序号</th>
						<th style="min-width:65px;width: 14%;">车次</th>
						<th style="min-width:65px;width: 15%;">司机</th>
						<th style="min-width:85px;width: 20%;">开车时间</th>
						<th style="min-width:85px;width: 15%;">铺位号</th>
						<th style="min-width:85px;width: 20%;">叫班时间</th>
						<th style="min-width:60px;width: 8%;"></th>
					</thead>
					<tbody>
						<tr v-for="(notFinished,$index) in con.notFinishedList">
							<td>
								<div v-text="$index+1"></div>
							</td>
							<td>
								<div v-text="notFinished.trainNo"></div>
							</td>
							<td>
								<div v-text="notFinished.driverName"></div>
							</td>
							<td>
								<div :title="notFinished.trainDt" :id="$index">{{notFinished.trainDt | formatTime}}</div>
							</td>
							<td>
								<div v-text="notFinished.bedNo"></div>
							</td>
							<td>
								<div :title="notFinished.remindPlanedTime1">{{notFinished.remindPlanedTime1 | formatTime}}</div>
							</td>
							<td>
								<div>
									<qr type="restOver" url="/web/get" backgroundColor="overBtn" :params="notFinished" buttonSpan="结束" @qrClose="fetchData" @fanhuijiaodian="fanhuijiaodian" @freshRight="freshRight"></qr>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div>
				<span class="con-table-name">当日未安排：</span>
				<div type="button" class="btn-primary btn-md" style="background: rgb(126, 178, 220);border-color: rgb(126, 178, 220);" @click="addnotArrangedList()">临时增加</div>
				<div :class="{hideIcon:!notArranged,showIcon:notArranged}" @click="toggleControllerLeftTable('notArranged')"></div>
				<div class="msg" style="display: inline-block;" v-text="startMsg"></div>
			</div>
			<div style="position: relative;min-width: 600px;">
				<div class="callBedTable driListTable" v-if="notArranged">
					<table style="width: 100%;" class="table-hover">
						<colgroup>
							<col />
							<col />
						</colgroup>
						<thead>
							<th style="min-width:40px;width: 30%;">序号</th>
							<th style="min-width: 60px;width: 70%;">司机</th>
						</thead>
						<tbody>
							<tr v-for="(dri,$index) in notArrangedDriList" :class="{tomorrow: !dri.isToday}">
								<td>
									<div type="text" style="min-width:40px" v-text="$index+1"></div>
								</td>
								<td style="position: relative;">
									<input :id="$index" style="min-width: 50px;width: 80%;" type="text" v-model="dri.driverName" @click="autocompleteShow($index)" @blur="autocompleteHide" @focus="autocompleteShow($index)" />
									<div class="v-autocomplete-list" v-if="selectDri == $index">
										<span v-if="driverLikeList.length == 0">请输入姓名</span>
										<span v-for="name in driverLikeList" v-text="name" @click="selectDriver(name)"></span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="callBedTable not-arr-right" v-if="notArranged">
					<table style="width: 100%;" class="table-hover">
						<colgroup>
							<col/>
							<col/>
							<col/>
							<col/>
							<col/>
						</colgroup>
						<thead>
							<th style="min-width:60px;width: 15%;">车次</th>
							<th style="min-width:100px;width: 25%;">开车时间</th>
							<th style="min-width:75px;width: 25%;">铺位号</th>
							<th style="min-width:100px;width: 25%;">叫班时间</th>
							<th style="min-width:60px;width: 15%;"></th>
						</thead>
						<tbody>
							<tr v-for="(notArranged,index) in notArrangedList" :class="{tomorrow: !notArranged.isToday}">
								<td><input type="text" style="min-width:50px;width: 80%;" v-model="notArranged.trainNo" /></td>
								<td><input type="time" style="min-width:100px;width: 90%;font-weight: bold;" v-model="notArranged.trainDt" @blur="getRemindPlanedTime1(notArranged,index)" /></td>
								<td>
									<select style="min-width:75px;width: 80%;font-weight: bold;font-size: 16px;" v-model="notArranged.bedNo">
										<option v-for="bedNo in con.bedNos">{{ bedNo }}</option>
									</select>
								</td>
								<td><input type="time" style="min-width:100px;width: 90%;font-weight: bold;" v-model="notArranged.remindPlanedTime1" /></td>
								<td>
									<div>
										<qr startUrl="/web/createOrUpdate" url="/web/get" backgroundColor="startBtn" type="restStart" :notArrangedDriList="notArrangedDriList" :params="notArranged" buttonSpan="开始"
											@qrClose="fetchData" @freshRight="freshRight" @showMsg="showMsg"></qr>
									</div>
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
		data() {
			return {
				host: config.host,
				suggestionAttribute: 'name',
				selectDri: -1,
				aheadOfTime: '',
				controllerPopup: false,
				getRestOverBedNo: false,
				checkInPage: false,
				completed: false,
				notFinished: true,
				notArranged: true,
				notArrangedDriList: [],
				driverList: [],
				driverLikeList: [],
				bedNo: '', //给铺位设置默认值,
				controllerMsg: '',
				restOverScan: '',
				restOverVo: {},
				qrMsg: '',
				errMsg: '',
				checkInInfo: '',
				startMsg: '',
				startRest: false,
				i1: '',
				i2: '',
				isLate: true,
				notArrangedList: [],
				con: {
					notArrangedList: []
				},
			}
		},
		watch: {
			//	notArrangedDriList: 
			notArrangedDriList: {
				handler: 'getDriverLikeList',
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
		components: {
			qr
		},
		mounted() {
			this.$nextTick(() => {
				this.fetchData();
				this.getCheckInInfo();
				setInterval(() => {
					this.getDriverList();
				}, 8640000)
			});
		},
		methods: {
			fetchData() {
				let self = this;
//				this.$emit('loadShow');
				this.getDriverList();
				return axios({ //控制中心左侧接口
						method: 'get',
//										  url: '/static/controllerLeft.json',
						url: this.host + '/web/left',
						headers: {
							'appType': 'web',
							'appid': 'logan'
						}
					})
					.then((response) => {
						var response = response.data;
						self.notArrangedDriList = [];
						self.isLate = true;
						if(response.type === 1) {
							self.con = response.result;
							self.i2 = self.con.notArrangedList.length;
							self.aheadOfTime = self.con.timeAhead
							for(let i = 0; i < self.con.notArrangedList.length; i++) {
								let curDate = new Date();
								curDate = config.dateToString(curDate, 'hh:mm')
								curDate = curDate.replace(/\:/g, '');
								let trainDtHour = self.con.notArrangedList[i].trainDt.replace(/\:/g, '');
								self.con.notArrangedList[i].index = i;
								self.con.notArrangedList[i].isToday = trainDtHour <= curDate ? false : true; //是否是当天的车次
								if (trainDtHour <= curDate && self.isLate) {
									self.i1 = i;
								} else if(trainDtHour > curDate) {
									self.isLate = false;
								} else if(trainDtHour <= curDate && !self.isLate && self.i2 == self.con.notArrangedList.length) {
									self.i2 = i;
								}
								self.notArrangedDriList.push({
									'isToday': self.con.notArrangedList[i].isToday,
									'driverName': ''
								});
								self.getRemindPlanedTime1(self.con.notArrangedList[i], i);
								let bedNoNum = i<self.con.bedNos.length?i:self.con.bedNos.length-1;
								self.con.notArrangedList[i].bedNo = self.con.bedNos.length != 0?self.con.bedNos[bedNoNum]:''; //给铺位设置默认值
								self.con.notArrangedList[i].driverAutocomplete = false;
								self.con.notArrangedList[i].driverName = '';
							}
//							self.$emit('loadHide');
							self.startMsg = self.con.bedNos.length != 0?'':'没有剩余的铺位';
							self.msgHide();
							self.notArrangedList = self.con.notArrangedList;
						} else {
							self.startMsg = response.msg;
							self.msgHide();
						}
					}).catch((error) => {
//						self.$emit('loadHide');
						console.log("网络连接失败")
					})
			},
			freshRight() {
				console.log('我在controller');
				this.$emit("adRemindClose",true);
			},
			showMsg(msg){
				this.startMsg = msg;
				this.msgHide();
			},
			msgHide(){
				setTimeout(()=>{
					this.errMsg = '';
					this.startMsg = '';
				},5000)
			},
			fanhuijiaodian(index) {
				setTimeout(() => {
					let kaicheshijianId = index.toString();
					document.getElementById(kaicheshijianId).focus()
				}, 1000)
			},
			autocompleteShow(index) {//打开某一个司机自动补全框
				setTimeout(() => {
					this.selectDri = index;
				}, 300)
			},
			autocompleteHide() {//关闭司机自动补全框
				setTimeout(() => {
					this.selectDri = -1
					this.driverLikeList = [];
				}, 200)
			},
			getDriverLikeList() {
				if(this.selectDri == -1) {
					return null;
				}
				if(!this.notArrangedDriList[this.selectDri].driverName) {
					this.driverLikeList = [];
					return null
				}
				this.driverLikeList = [];
				for(var i = 0; i < this.driverList.length; i++) {
					if(this.driverList[i].indexOf(this.notArrangedDriList[this.selectDri].driverName) == 0) { //this.driverList[i]的第一个字符串是否是输入的字符串
						this.driverLikeList.push(this.driverList[i]);
					}
				}
			},
			getDriverList() {
				let self = this;
				return axios({ //接口04，获取司机姓名
						method: 'get',
//						url: '/static/driverList.json',
						url: this.host + '/web/getAllDrivers',
						headers: {
							'appType': 'web',
							'appid': 'logan'
						}
					})
					.then((response) => {
						var data = response.data;
						if(data.type === 1) {
							self.driverList = data.result.driverList;
							//						for (var i=0;i<driverList.length;i++) {
							//							self.driverList.push({'name':driverList})
							//						}
						}
					}).catch((error) => {
						console.log("司机信息获取失败")
					})
			},
			selectDriver(name) {
				this.notArrangedDriList[this.selectDri].driverName = name;
				this.selectDri = -1;
			},
			toggleControllerLeftTable(type) {
				this[type] = !this[type];
			},
			devCheckIn() {
				this.checkInPage = true;
				this.getCheckInInfo()
			},
			getCheckInInfo() {
				let self = this;
				return axios({ //21接口，获取设备登记信息
						method: 'get',
						//				  url: '/static/checkIn.json',
						url: this.host + '/web/get-register-info',
						headers: {
							'appType': 'web',
							'appid': 'logan'
						}
					})
					.then((response) => {
						var response = response.data;
						if(response.type === 1) {
							//	      		self.aheadOfTime = response.result.timeout;
							response.result.name = config.utf16to8(response.result.name);
							self.checkInInfo = JSON.stringify(response.result);
						}
					}).catch((error) => {
						//	        alert("获取设备登记信息失败")
					})
			},
			cancelCheckInPage() {
				this.checkInInfo = '';
				this.checkInPage = false;
			},
			setFocu(id) {
				setTimeout(() => {
					document.getElementById(id).focus();
				}, 500)
			},
			cancelRestOverBedNoPage() { //结束间休弹出框关闭
				this.restOverVo = {};
				this.getRestOverBedNo = false;
				this.controllerPopup = false;
				clearInterval(this.restOverInterval)
			},
			addnotArrangedList() {
				let fistOne = this.con.notArrangedList[0]
				if(!fistOne.remindPlanedTime1 || !fistOne.bedNo) {
					return null;
				}
				let notArranged = {
					"status": "",
					"remindPlanedTime1": "",
					"trainNo": "",
					"driverName": "",
					"trainDt": "",
					"startTime": "",
					"bedNo": this.con.bedNos[0],
					"isToday": true
				}
				this.notArrangedDriList.unshift({
					'isToday': true,
					'driverName': ''
				});
				this.con.notArrangedList.unshift(notArranged);
				for(var i = 0; i < this.con.notArrangedList.length; i++) {
					this.con.notArrangedList[i].index = i;
				}
			},
			getRemindPlanedTime1(notArranged, index) {//通过开车时间计算叫班时间
				let hour = '';
				let min = '';
				if(!this.con.notArrangedList[index].trainDt) {
					return null;
				}
				let trainDtArr = this.con.notArrangedList[index].trainDt.split(":");
				let trainDtMin = parseInt(trainDtArr[0] * 60) + parseInt(trainDtArr[1]);
				let remindPlanedTime1 = trainDtMin - this.aheadOfTime;
				
				if(remindPlanedTime1 < 0) {
					remindPlanedTime1 = remindPlanedTime1 + 1440;
					hour = config.time1To2(parseInt(remindPlanedTime1 / 60))
					min = config.time1To2(remindPlanedTime1 % 60)
				} else {
					hour = config.time1To2(parseInt(remindPlanedTime1 / 60))
					min = config.time1To2(remindPlanedTime1 % 60);
				}
				this.con.notArrangedList[index].remindPlanedTime1 = hour + ':' + min;
				this.$set(this.con.notArrangedList, index, this.con.notArrangedList[index]);
			}
		}
	}
</script>
<style>
	.col-md-7 {
		display: inline-block;
		width: 65%;
	}
	
	.controllerCenter .controllerSys div {
		display: inline-block;
		margin: 10px 100px 10px 0;
	}
	
	.controllerBtn {
		margin-bottom: 40px;
	}
	
	.controllerBtn span {
		display: inline-block;
		width: 200px;
		height: 50px;
		font-size: 26px;
		cursor: pointer;
		color: #fff;
		line-height: 50px;
		text-align: center;
	}
	
	.devRegister {
		background: #61b834;
	}
	
	.getRestOver {
		background: #006DCC;
	}
	
	.over-bedNo {
		position: relative;
		top: 100px;
		text-align: center;
	}
	
	.input-over-bedNo {
		width: 100px !important;
		font-size: 22px !important;
	}
	
	.restOverPopup {
		left: 0px !important;
		top: 22px !important;
	}
	
	.hideIcon {
		background-image: url(../../img/opened.png);
	}
	
	.showIcon {
		background-image: url(../../img/closed.png);
	}
	
	.hideIcon,
	.showIcon {
		display: inline-block;
		width: 20px;
		height: 20px;
		cursor: pointer;
		position: relative;
		top: 3px;
	}
	
	.con-table-name {
		font-size: 22px;
		margin: 10px 0;
		display: inline-block;
	}
	
	select {
		text-align: center;
	}
	
	.v-autocomplete-list {
		position: absolute;
		z-index: 111;
		background: white;
		width: 120%;
		min-width: 80px;
		left: -10%;
		margin-top: 30px;
		max-height: 500px;
		border: 1px solid #ccc;
		text-align: center;
		border-radius: 5px;
		display: inline-block;
	}
	.v-autocomplete-list span {
		display: block;
	}
	.not-arr-right{
		width: 84%;
		float: left;
	}
	.driListTable {
		float: left;
		width: 16%;
	}
	.driListTable tr {
		height: 28px;
	}
	
	.driListTable td {
		width: 180px;
	}
	
	.driListTable td:hover {
		background: none;
	}
	
	.tomorrow {
		background-color: #ddd;
	}
	
	.tomorrow input {
		background-color: #ddd;
	}
	
	.tomorrow select {
		background-color: #ddd;
	}
	
	.today {
		background-color: white;
	}
	.isLate {
		background-color:#eee;
	}
	.isLate input {
		background-color:#eee;
	}
	.isLate select {
		background-color:#eee;
	}
</style>