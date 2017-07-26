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
	  	<div>连续车次：<span v-text="qrVo.trainNo"></span></div>
	  	<div>司机：<span v-text="qrVo.driverName"></span></div>
	  	<div>开车时间：<span v-text="qrVo.trainDt"></span></div>
	  	<div>叫班时间：<span v-text="qrVo.remindPlanedTime1"></span></div>
	  	<div>铺位号：<span v-text="qrVo.bedNo"></span></div>
	  	<div class="prompt">请扫描二维码</span></div>
	  	<div class="prompt" v-if="scanQrSuccess" v-text="qrVo.msg"></div>
	  </div>
	  <div class="popup-right">
	  	<div id='code'></div>
			<canvas id="canvas"></canvas>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
import axios from 'axios'
import QRCode from 'qrcode'
export default {
  name: 'QR',
  data () {
    return {
      popup: false,
      scanQrSuccess: false,
      codes: '',
      qrVo: {}
    }
  },
  mounted () {
  	this.$nextTick(() => {
  		this.useqrcode()
    });
  },
  props: ['startUrl','url','buttonSpan','type','params'],
  methods: {
  	qrBtn (){
  		if (this.type === 'restStart') {
		  var params = this.params;
		  return axios({
			method: 'get',
//			method: 'post',
			url: this.startUrl,
//			data: params,
			headers: {'appType': 'web','appid': 'logan'}
		  })
		  .then( (response) => {
		    var data = response.data;
		    if (data.type === 1) {
		      this.qrVo = data.result;
		      this.popup = true;
//		      qrcode.makeCode(this.qrVo);
		    }
		  }).catch( (error) => {
		    alert("网络连接失败")
		  })
		};
	},
	useqrcode(){
		var canvas = document.getElementById('canvas')
		
		QRCode.toCanvas(canvas, 'http://www.baidu.com', function (error) {
			if (error) 
			console.error(error)
			console.log('success!');
		})
	},
	cancelEdit(){
		this.popup = false;
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
	width: 64%;
	margin: 15px;
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
</style>