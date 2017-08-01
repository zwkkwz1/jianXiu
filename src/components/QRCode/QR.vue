<template>
  <div>
  	<button type="button" class="btn btn-mini" @click="qrBtn" v-text="buttonSpan"></button>
  	<div v-if="popup" class="modal-backdrop fade in" modal-animation-class="fade" modal-backdrop="modal-backdrop" modal-animation="true" style="z-index: 1040;"></div>
		<div class="popup" v-if="popup">
		  <div class="head" style="text-align: center;">
		  	<h3></h3>
			<i class="icon-remove icon-white" @click="cancelEdit()"></i>			  	
		  </div>
		  <div class="popup-left">
		  	<div>接续车次：<span v-text="qrVo.trainNo"></span></div>
		  	<div>司机：<span v-text="driverName"></span></div>
		  	<div>开车时间：<span>{{qrVo.trainDt | formatTime}}</span></div>
		  	<div>叫班时间：<span>{{qrVo.remindPlanedTime1 | formatTime}}</span></div>
		  	<div>铺位号：<span id="bedNo" type="text" v-text="qrVo.bedNo" style="width: 55px;"></span></div>
		  	<div class="prompt" v-if="qr">请扫描二维码!</span></div>
		  	<div class="prompt" v-text="qrMsg"></div>
		  </div>
		  <div v-if="qr" class="popup-right">
		  	<qriously :value="qrScan" :size="200" />
			</div>
	  </div>
	</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'QR',
  data () {
    return {
      popup: false,
      qr: false,
      codes: '',
      qrVo: {},
      qrMsg: '',
      driverName: '',
      qrScon: ''
		}
  },
  props: ['startUrl','url','buttonSpan','type','params'],
  mounted () {
  	this.$nextTick(() => {
			
    });
  },
  methods: {
  	qrBtn (){
  		this.qr = false;
  		this.popup = true;
  		if (this.type === 'restStart') {//开始间休
			  this.qrScan = '';
				setTimeout(()=> {
					this.setRestStartInfo();
				},500)
		  } else if (this.type == 'restOver') {//结束间休
		  	this.qrScan = '';
				this.restOverInterval = setInterval(()=>{
					this.qrVo = this.params;
					this.getQrInfo ();
					if (this.qrVo.status == 3) {
						this.qrMsg = '间休结束';
						setTimeout(()=> {
							this.cancelEdit();
						},2000)
						clearInterval(this.restOverInterval)
					}
				},1000);
		  }
		},
		setRestStartInfo() {//01接口
			let self = this;
//			if(this.popup) {
				return axios({
//					method: 'get',
					method: 'post',
					data: this.params,
					url: this.startUrl,
					headers: {'appType': 'web','appid': 'logan'}
			  }).then( (response) => {
			    var data = response.data;
			    if (data.type === 1) {
			    	self.qr = true;
			    	const name = data.result.driverName;
			    	self.driverName = name;
			      self.qrVo = data.result;
			      data.result.driverName = this.utf16to8(data.result.driverName);
			      self.qrScan = JSON.stringify(data.result);
			      self.restStartInterval = setInterval(()=>{//不停地访问02接口，询问手机扫码是否完成了
							self.getQrInfo ();
							if(self.qrVo.status == 2) {
								self.qrMsg = '设备发放成功';
								setTimeout(()=> {
									self.cancelEdit();
								},2000);
								clearInterval(self.restStartInterval)
							}
						},500);
			    }
			  }).catch( (error) => {
			    console.log('网络链接失败');
			  })
//			}
		},
		getQrInfo () {//02接口
			let self = this; 
			return axios({
					method: 'get',
					url: this.url,
					params: {sid: this.qrVo.sid},
					headers: {'appType': 'web','appid': 'logan'}
			  }).then( (response) => {
			    var data = response.data;
			    if (data.type === 1) {
			    	self.qr = true;
			    	if (!self.qrVo){
			    		self.qrVo = data.result;
			    	}
			    	self.qrVo.status = data.result.status;
			      if(!self.qrScan){
			      	data.result.driverName = this.utf16to8(data.result.driverName);
			      	self.qrScan = JSON.stringify(data.result);
			      }
			    }
			  }).catch( (error) => {
			    self.qrVo.trainNo = '网络链接失败';
			  })
		},
		cancelEdit(){//关闭二维码扫描组件
			clearInterval(this.restStartInterval);
			clearInterval(this.restOverInterval);
			this.popup = false;
			this.qrScan = '';
			this.qrVo = {};
			this.qr = false;
			this.qrMsg = '';
			this.$emit("qrClose","qrIsClose")
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
.popup{
  width: 600px;
  height: 600px;
  position: absolute;
  border: 1px solid;
  left: 20%;
  top: 200px;
  background: white;
  z-index: 11111;
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
[class^="icon-"], [class*=" icon-"] {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-top: 1px;
    line-height: 14px;
    vertical-align: text-top;
    background-image: url(../../img/glyphicons-halflings.png);
    background-position: 14px 14px;
    background-repeat: no-repeat;
}
.icon-white{
	background-image: url(../../img/glyphicons-halflings-white.png);
}
.icon-remove {
    background-position: -312px 0;
    right: 0;
    top: 0;
    position: absolute;
    cursor: pointer;
}
.popup .head {
    background-color: #39496a;
    margin-top: -8px;
    padding-bottom: 5px;
    padding-top: 5px;
    color: #ffffff;
    height: 20px;
}
.popup-left{
	display: inline-block;
	width: 30%;
	margin: 20px 0 20px 20px;
	float: left;
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
.prompt{
	margin: 20px 0 !important;
	font-size: 18px;
	font-weight: bold;
}
.btn-md{
	width: 100px;
	height: 32px;
	margin: 10px;
	border-radius: 5px;
	background: #5bc0de;
}
</style>