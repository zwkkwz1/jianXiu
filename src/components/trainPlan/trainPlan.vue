<template>
	<div>
		<div class="tp">
		<div>
			<label for="trainNo">车次：</label>
			<input type="text" name="trainNo" id="trainNo" v-model="tpVo.trainNo" style="width: 120px;"/>
		</div>
		<div>
			<label for="trainDt">开车时间:</label>
			<input type="text" name="trainDt" id="trainDt" v-model="tpVo.trainDt" />
		</div>
		<div>
			<div class="btn-lg btn-success" @click="addTP" disabled="">添加</div>
		</div>
	</div>
		<div class="callBedTable">
			<table style="width: 50%" class="table-hover">
		        <colgroup>
		            <col style="width:60px">
		            <col/>
		            <col/>
		            <col style="width:120px">
		        </colgroup>
		        <thead>
		            <th>序号</th>
		            <th>车次</th>
		            <th>开车时间</th>
		            <th></th>
		        </thead>
		        <tbody>
		          <tr v-for="(tp,$index) in tp.list">
		            <td><div type="text" style="max-width:60px" v-text="$index+1"></div></td>
		            <td><input type="text" style="min-width:135px" v-model="tp.trainNo" /></td>
		            <td><input type="text" style="min-width:185px" v-model="tp.trainDt" /></td>
		            <td class="table-handle">
		                <div style="max-width:120px">
		                	<img src="../../img/delete.png" class="deleteTn" @click="deletTP(tp)" onerror="javascript:this.src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496385415687&di=cfb8c3b6a69be436172b2fbcf2d35748&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F55%2F73%2F39I58PICCqK_1024.png'">
		                </div>
		                <div class="btn-sm btn-info btn-table" @click="updateTP(tp)">提交</div>
		            </td>
		          </tr>
		        </tbody>
		    </table>
		</div>
	</div>
</template>

<script>
	/**
	 * todo:1.添加按钮应该要两个input都有值才可以点击,vue的表单验证？
	 * 		2.表格内的和新增的两个开车时间的正则验证，
	 */
	import axios from 'axios'
	export default {
	  name: 'trainPlan',
	  data () {
	  	return {
	  	  tp: {},
	  	  tpVo: {}
	  	}
	  },
	  mounted () {
	  	this.$nextTick(() => {
	      this.getTrainPlan();
	    });
	  },
	  methods: {
	  	getTrainPlan () {//接口34，计划车次维护(查看)
	  	  let self = this;
	  	  return axios({
	  	  	method: 'get',
	  	  	url: '/static/trainPlan.json',
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  self.tp = data.result;
	  	  	}
	  	  }).catch( (error) => {
	  	  	console.log('计划车次获取失败')
	  	  })
	  	},
	  	addTP () {//接口31，计划车次维护(增加)
	  	  let self = this;
	  	  return axios({
	  	  	method: 'post',
	  	  	url: '/web/plan/save',
	  	  	data: this.tpVo,
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  self.getTrainPlan();
	  	  	}
	  	  }).catch( (error) => {
	  	  	console.log('计划车次添加失败')
	  	  	self.getTrainPlan();//现在没有后台程序。肯定失败，暂时在失败这里也放上，模仿成功的情况
	  	  })
	  	},
	  	deletTP(tp) {//接口31，计划车次维护(删除)
	  	  let self = this;
	  	  return axios({
	  	  	method: 'get',
	  	  	url: '/web/plan/delete',
	  	  	params: {sid:tp.sid},
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  self.getTrainPlan();
	  	  	}
	  	  }).catch( (error) => {
	  	  	console.log('计划车次获取失败')
	  	  	self.getTrainPlan();//现在没有后台程序。肯定失败，暂时在失败这里也放上，模仿成功的情况
	  	  })
	  	},
	  	updateTP(tp) {//接口33，计划车次维护(修改)
	  	  let self = this;
	  	  return axios({
	  	  	method: 'post',
	  	  	url: '/web/plan/update',
	  	  	data: tp,
	  	  	headers: {'appType': 'web','appid': 'logan'}
	  	  })
	  	  .then( (response) => {
	  	  	var data = response.data
	  	  	if (data.type == 1) {
	  	  	  self.getTrainPlan();
	  	  	}
	  	  }).catch( (error) => {
	  	  	console.log('计划车次添加失败')
	  	  	self.getTrainPlan();//现在没有后台程序。肯定失败，暂时在失败这里也放上，模仿成功的情况
	  	  })
	  	}
	  }
	}
</script>

<style>
.deleteTn{
  background-repeat: no-repeat;
  display: inline-block;
  width: 21px;
  cursor: pointer;
  height: 21px;
  position: relative;
  top: 4px;
}
.tp{
	margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    width: 70%;
}
.tp div{
	display: inline-block;
	width: 30%;
	margin: 10px 0;
}
.table-handle div{
	display: inline-block;
}
</style>