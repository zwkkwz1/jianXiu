<template>
	<div>
		<div class="data-query-nav">
			<div style="margin-bottom: 20px;">
				<div class="btn-sm btn-info" @click="dateRangeType('日')" :class="{isChecked:isDay}">日</div>
				<div class="btn-sm btn-info" @click="dateRangeType('周')" :class="{isChecked:isWeek}">周</div>
				<div class="btn-sm btn-info" @click="dateRangeType('月')" :class="{isChecked:isMonth}">月</div>
			</div>
			<span>日期选择：</span>
			<datepicker v-model="pickDate" language="zh" name="timePick" :format="state.format" :disabled="state.disabled" 
				:highlighted="state.highlighted" @input="getDateRange('pick')"></datepicker>
			<label for="driverName">司机：</label>
			<input type="text" name="driverName" id="driverName" v-model="dateVo.driverName" />
			<div class="btn-sm btn-primary" style="margin-left: 40px;" @click="getDataInfo()">查询</div>
		</div>
		<div class="callBedTable">
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
					<tr v-for="(completed,$index) in dq.completedList">
						<td>
							<div style="max-width:60px" v-text="$index+1"></div>
						</td>
						<td>
							<div style="min-width:95px" v-text="completed.trainNo"></div>
						</td>
						<td>
							<div style="min-width:95px" v-text="completed.driverName"></div>
						</td>
						<td>
							<div style="min-width:125px">{{completed.startTime | formatTime}}</div>
						</td>
						<td>
							<div style="min-width:125px">{{completed.remindRealTime1 | formatTime}}</div>
						</td>
						<td>
							<div style="min-width:125px">{{completed.remindRealTime2 | formatTime}}</div>
						</td>
						<td>
							<div style="min-width:125px">{{completed.adminRemindTime | formatTime}}</div>
						</td>
						<td>
							<div style="min-width:125px">{{completed.endRealTime | formatTime}}</div>
						</td>
						<td>
							<div style="min-width:125px" v-text="completed.mid"></div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import Datepicker from 'vuejs-datepicker';
	import axios from 'axios'
	export default {
	  name: 'dataQuery',
	  data () {
	  	return {
	  		dateVo: {
	  			type: 1
	  		},
	  		dq: {
	  			completedList:[]
	  		},
	  		pickDate: '',
	  		isDay: true,
	  		isWeek: false,
	  		isMonth: false,
	  		dateType: '日',
	  		state : {
	  			format:"yyyy-MM-dd",
	  			disabled: {
	  				from: new Date(), 
	  			},
	  			highlighted: {
	  				dates: [new Date()]
	  			}
	  		}
	  	}
	  },
	  mounted () {
	  	this.$nextTick(() => {
	      this.getDateRange('init');
	    });
	  },
	  components: {Datepicker},
	  methods: {
	  	getDataInfo () {//接口13,历史查询
	  	  let self = this;
	  	  return axios({
//	  	  	method: 'post',
//	  	  	url: '/web/queryHistoryData',
//	  	  	data: this.dateVo,
			method: 'get',
			url: '/static/dataQuery.json',
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  self.dq = data.result;
	  	  	}
	  	  }).catch( (error) => {
	  	  	console.log('系统信息获取失败')
	  	  })
	  	},
	  	getDateRange (pattern) {
	  	  if (pattern === 'init') {//设置初始值
	  	  	this.dateType = '日';
	  	  	this.dateVo.type = 1;
	  	  	this.pickDate = new Date();
	  	  }
	  	  if (this.dateType === '日') {
	  		this.dateVo.from = this.dateToString(this.pickDate,"yyyy-MM-dd 00:00:00");
	  		let nextDay = new Date(this.pickDate.getTime() + 24*60*60*1000);
	  		this.dateVo.to = this.dateToString(nextDay,"yyyy-MM-dd 00:00:00");
	  		if (pattern === 'init') {
		  	  this.getDataInfo();
		  	}
	  	  }  else if (this.dateType === '周') {
	  	  	//一天的毫秒数
	  	  	let millisecond = 1000 * 60 * 60 * 24; 
		    //选择的日期
		    let datePick = new Date(this.pickDate.getTime());
		    //返回date是一周中的某一天
		    let week = datePick.getDay(); 
		    //返回date是一个月中的某一天   
		    let month = datePick.getDate();
		    //减去的天数   
		    let minusDay = week != 0 ? week - 1 : 6; 
		    let weekFirstDay = new Date(datePick.getTime() - (millisecond * minusDay));//获得当前周的第一天   
		    this.dateVo.from = this.dateToString(weekFirstDay,"yyyy-MM-dd 00:00:00");
		    let weekLastDay = new Date(weekFirstDay.getTime() + (millisecond * 6));//获得当前周的最后一天
		    this.dateVo.to = this.dateToString(weekLastDay,"yyyy-MM-dd 00:00:00");
	  	  } else if (this.dateType === '月') {
	  	  	let datePick = this.dateToString(this.pickDate,"yyyy-MM-dd");
	  	  	let dateArr = datePick.split("-");
	  	  	this.dateVo.from = dateArr[0] + '-' + dateArr[1] + '-01 00:00:00'
	  	  	let nextMonth = parseInt(dateArr[1]) + 1;
	  	  	let nextYear = nextMonth>12?parseInt(dateArr[0])+1:parseInt(dateArr[0]);
	  	  	nextMonth = nextMonth < 10 ? '0'+nextMonth:nextMonth>12?1:nextMonth;
	  	  	this.dateVo.to = nextYear + '-' + nextMonth + '-01 00:00:00';
	  	  }
	  	},
	  	dateRangeType(type) {
	  	  this.isDay = false;
	  	  this.isWeek = false;
	  	  this.isMonth = false;
	  	  if (type === '日') {
	  		this.dateVo.type = 1;
	  		this.dateType = '日';
	  		this.getDateRange('changeType');
	  		this.isDay = true;
	  	  } else if(type === '周'){
	  		this.dateVo.type = 2;
	  		this.dateType = '周';
	  		this.getDateRange('changeType');
	  		this.isWeek = true;
	  	  } else if(type === '月'){
	  		this.dateVo.type = 3;
	  		this.dateType = '月';
	  		this.getDateRange('changeType');
	  		this.isMonth = true;
	  	  }
	  	},
	  	dateToString(dateTime,format) {
	  		var d, k, o;
            o = {
                "M+": dateTime.getMonth() + 1,
                "d+": dateTime.getDate(),
                "h+": dateTime.getHours(),
                "m+": dateTime.getMinutes(),
                "s+": dateTime.getSeconds(),
                "q+": Math.floor((dateTime.getMonth() + 3) / 3),
                "S": dateTime.getMilliseconds()
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (k in o) {
                d = o[k];
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? d : ("00" + d).substr(("" + d).length));
                }
            }
            return format;
	  	}
	  }
	}
</script>

<style>
	input[name=timePick]{
		width: 130px !important;
	}
	.vdp-datepicker{
		display: inline-block;
		margin-right: 40px;
	}
	.isChecked{
		background-color: #333;
		border-color: #333;
	}
	.data-query-nav{
		margin: 40px 0;
	}
</style>