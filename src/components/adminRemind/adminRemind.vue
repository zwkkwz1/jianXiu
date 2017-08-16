<template>
	<div class="popup" v-if="startAdRemind" style="width: 450px;">
		<div class="head" style="text-align: center;">
		  	<h3></h3>
			<i class="icon-remove icon-white" @click="cancelAd()"></i>			  	
		</div>
		<div v-text="title" class="popup-title"></div>
		<div class="ad-remind-item"><span class="ad-remind-label">车次：</span><span v-text="params.trainNo"></span></div>
		<div class="ad-remind-item"><span class="ad-remind-label">铺位号：</span><span v-text="params.bedNo"></span></div>
		<div class="ad-remind-item"><span class="ad-remind-label">司机：</span><span v-text="params.driverName"></span></div>
		<div class="ad-remind-item"><span class="ad-remind-label">叫班时间：</span><span>{{params.remindPlanedTime | formatTime}}</span></div>
		<div class="ad-remind-item"><span class="ad-remind-label">{{params.timeGoingOn | remindTime}}</span><span></span></div>
		<div v-text="msg" class="msg"></div>
		<div class="btn-lg btn-success" @click="adRemindConfirm" style="margin: 20px 40px;" v-if="!params.reminded">已人工叫班</div>
	</div>
</template>

<script>
  import axios from 'axios'
  import config from '@/config'
  export default{
	name: 'adRemind',
	data () {
      return {
      	host: config.host,
    	title: '人工叫班确认',
    	msg: ''
	  }
    },
    props: ['params','startAdRemind'],
    mounted () {
  	  this.$nextTick(() => {
			
      });
    },
    filters : {
		remindTime: function(value) {
			return config.time1To2(parseInt(value/60)) + ':' + config.time1To2(parseInt(value%60));
		}
  	},
    methods: {
      adRemindConfirm() {
      	let self = this;
      	this.$emit("loadShow","人工叫班");
      	return axios({//21接口，获取设备登记信息
			  method: 'get',
			  url: this.host + '/web/confirm',
			  params: {sid: this.params.sid},
			  headers: {'appType': 'web','appid': 'logan'}
			})
	      .then( (response) => {
	      	var response = response.data;
	      	this.$emit("loadHide","人工叫班");
	      	if (response.type === 1) {
	      	  const params = this.params;
	      	  this.$emit('adRemindSuccess',params)
	      	  this.cancelAd();
	      	} else {
	      	  self.msg = "人工叫班失败"
	      	}
	      }).catch( (error) => {
	      	this.$emit("loadHide","人工叫班");
	        self.msg = "人工叫班失败"
	      })
      },
      cancelAd(){//关闭二维码扫描组件
		this.$emit("adRemindClose",true);
		this.params = {};
		this.startAdRemind = false;
	  },
    }
  }
</script>

<style>
</style>