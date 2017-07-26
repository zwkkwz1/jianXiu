<template>
  <div class="controllerCenter">
  	<div class="col-md-7">
  		<div><span>总共接待：</span><span>50人次</span></div>
    	<div><span>手表叫班响应率：</span><span v-text="">98%</span></div>
    	<div><span>出发及时率：</span><span v-text="">100%</span></div>
    	<div><span>设定提前叫班时间：</span><input v-model="aheadOfTime" />分钟</div>
  	</div>
    <div>
    	<span>当日已结束</span>
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
		            <th>出发时间</th>
		            <th>设备编号</th>
		        </thead>
		        <tbody>
		          <tr v-for="(completed,$index) in con.completedList">
		            <td><div style="max-width:60px" v-text="completed.$index"></div>1</td>
		            <td><div style="min-width:95px" v-text="completed.trainNo"></div></td>
		            <td><div style="min-width:95px" v-text="completed.driverName"></div></td>
		            <td><div style="min-width:125px" v-text="completed.startTime"></div></td>
		            <td><div style="min-width:125px" v-text="completed.remindRealTime1"></div></td>
		            <td><div style="min-width:125px" v-text="completed.remindRealTime2"></div></td>
		            <td><div style="min-width:125px" v-text="completed.adminRemindTime"></div></td>
		            <td><div style="min-width:125px" v-text="completed.endRealTime"></div></td>
		            <td><div style="min-width:125px" v-text="completed.mid"></div></td>
		          </tr>
		        </tbody>
		    </table>
			</div>
			<span>当日已安排：未结束</span>
			<div class="callBedTable">
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
		            <td><div style="max-width:60px" v-text="notFinished.$index"></div></td>
		            <td><div style="min-width:135px" v-text="notFinished.trainNo"></div></td>
		            <td><div style="min-width:135px" v-text="notFinished.driverName"></div></td>
		            <td><div style="min-width:185px" v-text="notFinished.trainDt"></div></td>
		            <td><div style="min-width:135px" v-text="notFinished.bedNo"></div></td>
		            <td><div style="min-width:185px" v-text="notFinished.remindPlanedTime1"></div></td>
		            <td>
		                <div style="max-width:120px">
		                    <qr startUrl="/static/qr.json" type="restOver" url="/static/qr.json" buttonSpan="结束"></qr>
		                </div>
		            </td>
		          </tr>
		        </tbody>
		    </table>
			</div>
			<span>当日未安排</span><button type="button" class="callBedButton" @click="addTrainNumber">临时增加</button>
			<div class="callBedTable">
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
		          <tr v-for="(notArranged,$index) in con.notArrangedList">
		            <td><input type="text" style="max-width:60px" v-model="notArranged.$index" /></td>
		            <td><input type="text" style="min-width:135px" v-model="notArranged.trainNo" /></td>
		            <td><input type="text" style="min-width:135px" v-model="notArranged.driverName" /></td>
		            <td><input type="text" style="min-width:185px" v-model="notArranged.trainDt" /></td>
		            <td><select name="" style="min-width:135px" v-model="notArranged.bedNo">
		            	<option v-for="bedNo in con.bedNos">{{ bedNo }}</option>
		            </select></td>
		            <td><input type="text" style="min-width:185px" v-model="notArranged.remindPlanedTime1" /></td>
		            <td>
		                <div style="max-width:120px">
		                	<qr startUrl="/static/restStart.json" url="/static/qr.json" type="restStart" 
		                		:params="notArranged" buttonSpan="开始"></qr>
		                </div>
		            </td>
		          </tr>
		        </tbody>
		    </table>
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
export default {
  name: 'controllerCenter',
  data () {
    return {
      aheadOfTime: 50,
      con: new Object
    }
  },
  components: {qr},
  mounted () {
  	this.$nextTick(() => {
      this.fetchData();
	      setInterval(()=>{
	      	this.fetchData ();
	      },50000000)
    });
  },
  methods: {
  	fetchData () {
    	var self = this;
	    return axios({
				  method: 'get',
				  url: '/static/controllerLeft.json',
//				  url: 'http://localhost:9180/app/time',
				  headers: {'appType': 'web','appid': 'logan'}
				})
	      .then( (response) => {
	      	var response = response.data;
	      	if (response.type === 1) {
	      		self.con = response.result;
	      	}
	      }).catch( (error) => {
	        alert("网络连接失败")
	      })
	  }
  }
}
</script>
<style>
.col-md-7{
	display: inline-block;
	width: 65%;
}
.controllerCenter .col-md-7 div{
	display: inline-block;
	margin: 10px 100px 10px 0;
}
.table-hover{
	border-collapse: collapse;
}
.controllerCenter div input{
	width: 30px;
	height: 30px;
	font-size: 20px;
}
.callBedTable{
	text-align: center;
	line-height: 26px;
	width: 65%;
	margin-bottom: 25px;
}
.callBedTable tr:hover{
	background: #e9e9e9;
}
.callBedTable thead th{
	border: 1px solid #2c3a54;
}
.callBedTable tr td{
	border: 1px solid #b4caed;
}
.callBedTable table thead{
	background-color: #425574;
	color: #ffffff;
}
.callBedTable td input{
	font-size: 16px;
	height: 20px;
}
.callBedTable td select{
	height: 26px;
}
.callBedTable td button{
	height: 25px;
  width: 115px;
  background-color: #7b93f6;
  color: white;
}
</style>