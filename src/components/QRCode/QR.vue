<template>
  <div>
  	<div type="button" class="btn-sm contro-btn" :class="backgroundColor" @click="qrBtn" v-text="buttonSpan"></div>
  	<div v-if="shadow" class="modal-backdrop fade in" modal-animation-class="fade" modal-backdrop="modal-backdrop" modal-animation="true" style="z-index: 1040;"></div>
  	<div class="popup" v-if="enSureJx" style="height: 200px;">
  		<div style="margin: 30px;">您选择的叫班时间是明天，请确认</div>
  		<div>
  			<span>叫班时间：</span><span v-text="this.params.remindPlanedTime1"></span>
  			<span style="display: inline-block;margin-left: 20px;">铺位号：</span><span v-text="this.params.bedNo"></span>
  		</div>
  		<div class="btn-sm btn-success" @click="jianxiu">确认</div>
  		<div class="btn-sm btn-info" @click="quxiao" style="margin-left: 40px;">取消</div>
  	</div>
		<div class="popup" v-if="popup">
		  <div class="head" style="text-align: center;">
		  	<h3></h3>
			<i class="icon-remove icon-white" @click="cancelEdit()"></i>			  	
		  </div>
		  <div class="popup-left">
		  	<div><label>接续车次：</label><span v-text="qrVo.trainNo"></span></div>
		  	<div><label>司机：</label><span v-text="driverName"></span></div>
		  	<div><label>开车时间：</label><span>{{qrVo.trainDt | formatTime}}</span></div>
		  	<div><label>叫班时间：</label><span>{{qrVo.remindPlanedTime1 | formatTime}}</span></div>
		  	<div><label>铺位号：</label><span id="bedNo" type="text" v-text="qrVo.bedNo" style="width: 55px;"></span></div>
		  	<div class="prompt" v-if="qr">请扫描二维码!</span></div>
		  	<div class="prompt" style="color: red;" v-text="qrMsg"></div>
		  	<div class="prompt" style="color: #06c;" v-text="successMsg"></div>
		  </div>
		  <div class="popup-right">
		  	<div v-if="qr">
		  		<qriously :value="qrScan" :size="200" />
		  	</div>
		  	<div class="btn-lg" @click="forceOverRest" style="margin: 20px 40px;border: none;color: black;" v-if="type == 'restOver' && !forceOver">扫码遇到问题请点击</div>
		  	<div class="btn-lg" @click="restOverCompel" style="margin: 20px 40px;border: none;color: black;" v-if="type == 'restOver' && forceOver">强制结束间休</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
export default {
  name: 'QR',
  data () {
    return {
    	host: config.host,
      popup: false,
      qr: false,
      enSureJx: false,
      codes: '',
      qrVo: {},
      qrMsg: '',
      successMsg: '',
      driverName: '',
      qrScon: '',
      freshRight: false,
      forceOver: false,
      shadow: false
		}
  },
  props: ['startUrl','url','buttonSpan','type','params','notArrangedDriList','backgroundColor'],
  mounted () {
  	this.$nextTick(() => {
			this.freshRight = false;
    });
  },
  methods: {
  	qrBtn (){
  		this.qr = false;
  		if (this.type === 'restStart') {//开始间休
  			this.shadow = true;
  			if (!this.params.remindPlanedTime1) {
  				this.$emit('showMsg','请将叫班时间填写完整')
  				return null
  			} else if (!this.params.bedNo) {
  				this.$emit('showMsg','铺位号为空')
  				return null
  			}
  			let curDate = new Date();
  			curDate = config.dateToString(curDate,'hh:mm');
  			curDate = curDate.replace(/\:/g,'');
  			let trainDtHour  = this.params.remindPlanedTime1.replace(/\:/g,'');
	      if (trainDtHour<curDate) {//如果是明天
	      	this.enSureJx = true;
	      } else {
	      	this.qrScan = '';
					setTimeout(()=> {
						this.setRestStartInfo();
					},500)
	     }
		  } else if (this.type == 'restOver') {//结束间休
		  	this.popup = true;
		  	this.shadow = true;
		  	this.forceOver = false;
		  	this.qrScan = '';
		  	let count = 0;
				this.restOverInterval = setInterval(()=>{
					let sid = this.qrVo.sid || this.params.sid;
					if (!sid) {
						clearInterval(this.restOverInterval)
					};
					count++;
//					this.qrVo = this.params;
					this.getQrInfo ();
					if (this.qrVo.status == 3) {
						this.successMsg = '间休结束';
						setTimeout(()=> {
							this.cancelEdit();
						},2000)
						clearInterval(this.restOverInterval)
					}
					console.log(count);
					if (count == 1){
						console.log('第一次请求'+new Date());
					}
					if (count>=7200) {
						clearInterval(this.restOverInterval)
						console.log('最后一次循环'+new Date())
					}
				},500);
		  }
		},
		forceOverRest() {
			this.forceOver = true;
		},
		restOverCompel (){
			let self = this; 
			return axios({
					method: 'get',
					url: this.host + '/app/end',
					params: {sid: this.qrVo.sid},
					headers: {'appType': 'web','appid': 'logan'}
			  }).then((response) => {
			    var data = response.data;
			    if (data.type === 1) {
			    	self.successMsg = '成功';
			    } else {
			    	this.$emit('showMsg',response.data.msg)
			    }
			  }).catch( (error) => {
			    self.qrMsg = '强制关闭接口错误';
			  })
		},
		quxiao() {
			let self = this;
			this.$emit('fanhuijiaodian',this.params.index)
			this.cancelEdit()
		},
		jianxiu() {
			this.qrScan = '';
			setTimeout(()=> {
				this.setRestStartInfo();
			},500)
		},
		setRestStartInfo() {//01接口
			let self = this;
			this.params.driverName = this.notArrangedDriList[this.params.index].driverName;
			this.enSureJx = false;
//			if(this.popup) {
				return axios({
					method: 'post',
					data: this.params,
					url: this.host + this.startUrl,
					headers: {'appType': 'web','appid': 'logan'}
			  }).then( (response) => {
			    var data = response.data;
			    if (data.type === 1) {
			    	self.popup = true;
			    	self.qr = true;
			    	const name = data.result.driverName;
			    	self.driverName = name;
			      self.qrVo = data.result;
			      data.result.driverName = config.utf16to8(data.result.driverName);
			      data.result.name = config.utf16to8(data.result.name);
			      self.qrScan = JSON.stringify(data.result);
			      let count = 0;
			      self.restStartInterval = setInterval(()=>{//不停地访问02接口，询问手机扫码是否完成了
							self.getQrInfo ();
							if(self.qrVo.status == 2) {
								self.successMsg = '设备发放成功';
								setTimeout(()=> {
									self.cancelEdit();
								},2000);
								clearInterval(self.restStartInterval)
							}
							console.log(count);
							if (count == 1){
								console.log('第一次请求'+new Date());
							}
							if (count >= 7200) {
								clearInterval(this.restStartInterval)
								console.log('最后一次循环'+new Date());
							}
						},500);
			    } else {
			    	self.popup = false;
			    	self.shadow = false;
			    	self.$emit('showMsg',response.data.msg)
			    }
			  }).catch( (error) => {
			  	self.popup = false;
			  	self.shadow = false;
			    self.qrMsg = '网络错误'
			  })
//			}
		},
		getQrInfo () {//02接口
			let self = this; 
			let sid = this.qrVo.sid || this.params.sid;
			if (!sid) {
				return null
			};
			return axios({
					method: 'get',
					url: this.host + this.url,
					params: {sid: this.qrVo.sid || this.params.sid},
					headers: {'appType': 'web','appid': 'logan'}
			  }).then( (response) => {
			    var data = response.data;
			    if (data.type === 1) {
			    	self.qr = true;
//			    	if (!self.qrVo){
			    	self.qrVo = data.result;
			    	self.driverName = data.result.driverName;
//			    	}
			    	self.qrVo.status = data.result.status;
			      if(!self.qrScan){
			      	data.result.driverName = config.utf16to8(data.result.driverName);
			      	self.qrScan = JSON.stringify(data.result);
			      }
			    } else {
			    	console.log('02接口type == 0')
			    }
			  }).catch( (error) => {
			  	console.log('02接口error')
			    self.qrMsg = '网络链接失败';
			  })
		},
		cancelEdit(){//关闭二维码扫描组件
			clearInterval(this.restStartInterval);
			clearInterval(this.restOverInterval);
			this.popup = false;
			this.enSureJx = false;
			this.qrScan = '';
			this.qrVo = {};
			this.qr = false;
			this.qrMsg = '';
			this.successMsg = '';
			this.$emit("qrClose","qrIsClose");
			this.$emit("freshRight",true);
			this.shadow = false;
		}
  }
}
</script>

<style>
.popup{
  width: 600px;
  height: 600px;
  position: fixed;
  border: 1px solid;
  left: 20%;
  top: 15%;
  background: white;
  z-index: 11111;
}
.prompt{
	margin: 30px 0 !important;
	font-size: 24px;
	font-weight: bold;
}
.popup-left label{
	width: 150px;
}
.contro-btn{
  height: 25px;
  position: relative;
  border-radius: 0;
  width: 100%;
}
.startBtn{
	background:#51a8b6;
}
.overBtn{
	background:#558bc5;
}
</style>