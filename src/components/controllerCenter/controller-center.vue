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
		          <tr v-for="">
		            <td><div style="max-width:40px" class=""></div>1</td>
		            <td><div style="min-width:205px" class=""></div>G301</td>
		            <td><div style="min-width:205px" class=""></div>司机1</td>
		            <td><div style="min-width:205px" class=""></div>11:11</td>
		            <td><div style="min-width:205px" class=""></div>201</td>
		            <td><div style="min-width:205px" class=""></div>10:21</td>
		            <td>
		                <div style="max-width:120px">
		                    <button type="button" class="callBedButton" @click="finishRest" disabled>结束</button>
		                </div>
		            </td>
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
		          <tr v-for="">
		            <td><div style="max-width:40px" class=""></div>1</td>
		            <td><div style="min-width:205px" class=""></div>G301</td>
		            <td><div style="min-width:205px" class=""></div>司机1</td>
		            <td><div style="min-width:205px" class=""></div>11:11</td>
		            <td><div style="min-width:205px" class=""></div>201</td>
		            <td><div style="min-width:205px" class=""></div>10:21</td>
		            <td>
		                <div style="max-width:120px">
		                    <button type="button" class="callBedButton" @click="finishRest" disabled>结束</button>
		                </div>
		            </td>
		          </tr>
		        </tbody>
		    </table>
			</div>
			<span>当日未安排</span><button type="button" class="callBedButton" @click="startRest">开始</button>
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
		          <tr v-for="">
		            <td><div style="max-width:40px" class=""></div>1</td>
		            <td><div style="min-width:205px" class=""></div>G301</td>
		            <td><div style="min-width:205px" class=""></div>司机1</td>
		            <td><div style="min-width:205px" class=""></div>11:11</td>
		            <td><div style="min-width:205px" class=""></div>201</td>
		            <td><div style="min-width:205px" class=""></div>10:21</td>
		            <td>
		                <div style="max-width:120px">
		                    <button type="button" class="btn btn-mini" @click="finishRest" disabled>结束</button>
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
export default {
  name: 'controllerCenter',
  data () {
    return {
      aheadOfTime: 50
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
</style>