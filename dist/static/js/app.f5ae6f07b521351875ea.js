webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Hello__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Hello___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Hello__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_controllerCenter_controller_center__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_controllerCenter_controller_center___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_controllerCenter_controller_center__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_systemSet_systemSet__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_systemSet_systemSet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_systemSet_systemSet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_trainPlan_trainPlan__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_trainPlan_trainPlan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_trainPlan_trainPlan__);







__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    name: 'Hello',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Hello___default.a
  }, {
    path: '/controller',
    name: 'controllerCenter',
    component: __WEBPACK_IMPORTED_MODULE_3__components_controllerCenter_controller_center___default.a
  }, {
    path: '/sys',
    name: 'sys',
    component: __WEBPACK_IMPORTED_MODULE_4__components_systemSet_systemSet___default.a
  }, {
    path: '/trainPlan',
    name: 'tp',
    component: __WEBPACK_IMPORTED_MODULE_5__components_trainPlan_trainPlan___default.a
  }]
}));

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(38)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(31),
  /* template */
  __webpack_require__(52),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  data() {
    return {
      homeName: "上 海 铁 路 局",
      currentdate: '',
      autoListLength: '',
      singAndDanceHtml: '',
      manuallyListLength: '',
      singTime: 0,
      singInterval: 33000,
      rightList: {}
    };
  },
  filters: {
    forMatTime: function (value) {
      let minute = parseInt(value / 60);
      if (parseInt(value / 60) < 10) {
        minute = '0' + minute;
      }
      return minute + ':' + value % 60;
    }
  },
  mounted() {
    this.$nextTick(function () {
      setInterval(() => {
        this.getRightList();
      }, 5000);
      this.getRightList();
    });
    setInterval(() => {
      this.filterTime();
    }, 1000);
  },
  methods: {
    filterTime() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.currentdate = "<div>" + date.getFullYear() + "-" + month + "-" + strDate + "</div>" + "<div>" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "</div>";
    },
    filters: {
      forMatTime: function (value) {
        return value % 60 + ":" + value / 60;
      }
    },
    getRightList() {
      //获取控制中心右侧列表信息，接口12
      this.rightList = {};
      let self = this;
      clearInterval(this.timeGoingInterval);
      return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
        method: 'get',
        url: '/static/rightList.json',
        headers: { 'appType': 'web', 'appid': 'logan' }
      }).then(response => {
        var data = response.data;
        if (data.type === 1) {
          self.rightList = data.result;
          self.manuallyListLength = self.rightList.manuallyList.length;
          self.timeGoingInterval = setInterval(() => {
            let manuallyList = self.rightList.manuallyList;
            for (let i = 0; i < manuallyList.length; i++) {
              manuallyList[i].timeGoingOn++;
            }
          }, 1000);
          let nowData = new Date();
          nowData = nowData.getTime();
          if (self.rightList.singAndDance) {
            if (nowData - self.singTime > self.singInterval) {
              self.singTime = nowData;
              self.singAndDanceHtml = '<video style="display: none" controls="" autoplay="" name="media"><source src="/static/callbed.mp3" type="audio/mpeg"></video>';
              setTimeout(() => {
                self.singAndDanceHtml = '';
              }, self.singInterval);
            }
          }
          self.autoListLength = self.rightList.autoList.length;
        }
      }).catch(error => {
        console.log("右侧列表数据获取失败");
      });
    }
  }
});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'hello'
});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'QR',
	data() {
		return {
			popup: false,
			qr: false,
			codes: '',
			qrVo: {},
			qrMsg: '',
			qrScon: ''
		};
	},
	props: ['startUrl', 'url', 'buttonSpan', 'type', 'params', 'startRest'],
	watch: {
		startRest: 'setRestStartInfo'
	},
	mounted() {
		this.$nextTick(() => {
			//		var self = this
			//
			//			document.onkeydown = function(evt) {
			//				var key;
			//				if(window.event) {// IE/Chrome/Opera(新版本)
			//				 	key = evt.keyCode;
			//				}
			//				else if(evt.which){ // Netscape/Firefox/Opera/Chrome/IE（新版本）
			//					key = evt.which;
			//				}
			//				if(key == 13 && self.qrVo.bedNo &&　self.popup){
			//					self.setRestStartInfo();
			//				}
			//			}
		});
	},
	methods: {
		qrBtn() {
			this.qr = false;
			this.popup = true;
			if (this.type === 'restStart') {
				this.qrVo = this.params;
				this.qrScan = '';
				let self = this;
				this.qrVo.bedNo = '';
				setTimeout(function () {
					document.getElementById("bedNo").focus();
				}, 500);
			} else if (this.type == 'restOver') {
				var restOverInterval = setInterval(() => {
					this.getQrInfo();
					if (this.qrVo.status == 3) {
						this.qrMsg = '间休结束';
						setTimeout(() => {
							this.cancelEdit();
						}, 2000);
						clearInterval(restOverInterval);
					}
				}, 1000);
			}
		},
		setRestStartInfo() {
			//01接口
			this.qr = true;
			let self = this;
			if (this.qrVo.bedNo && this.popup) {
				return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
					method: 'get',
					//				method: 'post',
					url: this.startUrl,
					//				data: this.qrVo,
					headers: { 'appType': 'web', 'appid': 'logan' }
				}).then(response => {
					var data = response.data;
					if (data.type === 1) {
						self.qrVo = data.result;
						self.qrVo.driverName = this.utf16to8(self.qrVo.driverName);
						self.qrScan = JSON.stringify(data.result);
						self.restStartInterval = setInterval(() => {
							self.getQrInfo();
							if (self.qrVo.status === 2) {
								self.qrMsg = '设备发放成功';
								setTimeout(() => {
									self.cancelEdit();
								}, 2000);
								clearInterval(self.restStartInterval);
							}
						}, 500);
					}
				}).catch(error => {
					this.qrVo.trainNo = '网络链接失败';
				});
			}
		},
		getQrInfo() {
			//02接口
			let self = this;
			return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
				method: 'get',
				//				method: 'post',
				url: this.url,
				//				data: params,
				headers: { 'appType': 'web', 'appid': 'logan' }
			}).then(response => {
				var data = response.data;
				if (data.type === 1) {
					self.qrVo = data.result;
					if (!self.qrScan) {
						self.qrScan = JSON.stringify(data.result);
					}
				}
			}).catch(error => {
				self.qrVo.trainNo = '网络链接失败';
			});
		},
		cancelEdit() {
			clearInterval(this.restStartInterval);
			this.popup = false;
			this.qrScan = '';
			this.qrVo = {};
			this.qr = false;
			this.qrMsg = '';
		},
		utf16to8(str) {
			var out, i, len, c;
			out = "";
			len = str.length;
			for (i = 0; i < len; i++) {
				c = str.charCodeAt(i);
				if (c >= 0x0001 && c <= 0x007F) {
					out += str.charAt(i);
				} else if (c > 0x07FF) {
					out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
					out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
					out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
				} else {
					out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
					out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
				}
			}
			return out;
		}
	}
});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_QRCode_QR__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_QRCode_QR___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_QRCode_QR__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * con:controller缩写
 */


/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'controllerCenter',
	data() {
		return {
			aheadOfTime: 50,
			controllerPopup: false,
			getRestOverBedNo: false,
			checkInPage: false,
			bedNo: '',
			restOverScan: '',
			restOverVo: {},
			qrMsg: '',
			errMsg: '',
			checkInInfo: '',
			startRest: false,
			con: new Object()
		};
	},
	components: { qr: __WEBPACK_IMPORTED_MODULE_1__components_QRCode_QR___default.a },
	mounted() {
		this.$nextTick(() => {
			this.fetchData();
			setInterval(() => {
				this.fetchData();
			}, 50000);
		});
		let self = this;
		document.onkeydown = function (evt) {
			var key;
			if (window.event) {
				// IE/Chrome/Opera(新版本)
				key = evt.keyCode;
			} else if (evt.which) {
				// Netscape/Firefox/Opera/Chrome/IE（新版本）
				key = evt.which;
			}
			if (key === 13 && self.getRestOverBedNo && !self.controllerPopup && self.bedNo) {
				self.restOverInterval = setInterval(() => {
					self.restOver();
				}, 200);
			} else if (key === 13) {
				self.startRest = !self.startRest;
			}
		};
	},
	methods: {
		fetchData() {
			let self = this;
			return __WEBPACK_IMPORTED_MODULE_0_axios___default()({ //控制中心左侧接口
				method: 'get',
				url: '/static/controllerLeft.json',
				//				url: 'http://localhost:9180/app/time',
				headers: { 'appType': 'web', 'appid': 'logan' }
			}).then(response => {
				var response = response.data;
				if (response.type === 1) {
					self.con = response.result;
					for (let i = 0; i < self.con.notArrangedList.length; i++) {
						self.getRemindPlanedTime1(self.con.notArrangedList[i], i);
					}
				}
			}).catch(error => {
				console.log("网络连接失败");
			});
		},
		devCheckIn() {
			this.checkInPage = true;
			let self = this;
			return __WEBPACK_IMPORTED_MODULE_0_axios___default()({ //21接口，获取设备登记信息
				method: 'get',
				url: '/static/checkIn.json',
				//				url: 'http://localhost:9180/app/time',
				headers: { 'appType': 'web', 'appid': 'logan' }
			}).then(response => {
				var response = response.data;
				if (response.type === 1) {
					response.result.name = this.utf16to8(response.result.name);
					self.checkInInfo = JSON.stringify(response.result);
				}
			}).catch(error => {
				alert("获取设备登记信息失败");
			});
		},
		cancelCheckInPage() {
			this.checkInInfo = '';
			this.checkInPage = false;
		},
		getRestOver() {
			//点击结束间休，弹出弹出框
			this.getRestOverBedNo = true;
			this.setFocu("restOverBedNo");
		},
		setFocu(id) {
			setTimeout(() => {
				document.getElementById(id).focus();
			}, 500);
		},
		cancelRestOverBedNoPage() {
			//结束间休弹出框关闭
			this.restOverVo = {};
			this.getRestOverBedNo = false;
			this.controllerPopup = false;
			clearInterval(this.restOverInterval);
		},
		restOver() {
			//接口02，判断退勤是否结束以及接受退勤信息
			let self = this;
			return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
				method: 'get',
				url: '/static/qr.json',
				//			data: this.bedNo,
				headers: { 'appType': 'web', 'appid': 'logan' }
			}).then(response => {
				var data = response.data;
				if (data.type === 1) {
					self.restOverVo = data.result;
					self.controllerPopup = true;
					if (!self.restOverScan) {
						self.restOverScan = JSON.stringify(data.result);
					};
					if (self.restOverVo.status == 3) {
						self.qrMsg = '扫描成功！间休结束';
						self.cancelRestOverBedNoPage();
					};
				}
			}).catch(error => {
				self.restOverVo.trainNo = '网络链接失败';
			});
		},
		addnotArrangedList() {
			let notArranged = {
				"sid": "",
				"status": "",
				"remindPlanedTime1": "",
				"trainNo": "",
				"driverName": "",
				"trainDt": "",
				"startTime": "",
				"bedNo": ""
			};
			this.con.notArrangedList.push(notArranged);
		},
		getRemindPlanedTime1(notArranged, index) {
			let hour = '';
			let min = '';
			if (!this.con.notArrangedList[index].trainDt.match(/^([0][0-9]|[1][0-9]|[2][0-3]):([1-5][0-9]|[0][0-9])$/)) {
				this.con.notArrangedList[index].trainDt = '';
				this.con.notArrangedList[index].remindPlanedTime1 = '';
				this.errMsg = '第' + index + 1 + '行开车时间格式错误！正确格式为（HH:MM）';
				return null;
			} else {
				this.errMsg = '';
			}
			let trainDtArr = this.con.notArrangedList[index].trainDt.split(":");
			let trainDtMin = parseInt(trainDtArr[0] * 60) + parseInt(trainDtArr[1]);
			let remindPlanedTime1 = trainDtMin - this.aheadOfTime;
			if (remindPlanedTime1 < 0) {
				remindPlanedTime1 = remindPlanedTime1 + 1440;
				hour = parseInt(remindPlanedTime1 / 60) < 10 ? '0' + parseInt(remindPlanedTime1 / 60) : parseInt(remindPlanedTime1 / 60);
				min = remindPlanedTime1 % 60;
			} else {
				hour = parseInt(remindPlanedTime1 / 60) < 10 ? '0' + parseInt(remindPlanedTime1 / 60) : parseInt(remindPlanedTime1 / 60);
				min = remindPlanedTime1 % 60;
			}
			this.con.notArrangedList[index].remindPlanedTime1 = hour + ':' + min;
			this.$set(this.con.notArrangedList, index, this.con.notArrangedList[index]);
		},
		testRemindPlanedTime1(notArranged, index) {
			if (!this.con.notArrangedList[index].remindPlanedTime1.match(/^([0][0-9]|[1][0-9]|[2][0-3]):([1-5][0-9]|[0][0-9])$/)) {
				this.con.notArrangedList[index].remindPlanedTime1 = '';
				this.errMsg = '第' + index + 1 + '行叫班时间格式错误！正确格式为（HH:MM）';
				return null;
			} else {
				this.errMsg = '';
			};
		},
		utf16to8(str) {
			var out, i, len, c;
			out = "";
			len = str.length;
			for (i = 0; i < len; i++) {
				c = str.charCodeAt(i);
				if (c >= 0x0001 && c <= 0x007F) {
					out += str.charAt(i);
				} else if (c > 0x07FF) {
					out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
					out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
					out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
				} else {
					out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
					out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
				}
			}
			return out;
		}
	}
});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * todo：设定(设定提前叫班时间)修改之后。控制中心的 (设定提前叫班时间)也要改
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'systemSet',
  data() {
    return {
      sys: {}
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getSysInfo();
    });
  },
  methods: {
    getSysInfo() {
      //接口22，获取系统设置
      let self = this;
      return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
        method: 'get',
        url: '/static/sysInfo.json',
        headers: { 'appType': 'web', 'appid': 'logan' }
      }).then(response => {
        var data = response.data;
        if (data.type == 1) {
          self.sys = data.result;
        }
      }).catch(error => {
        console.log('系统信息获取失败');
      });
    },
    setSysInfo() {
      //接口23，更新系统设置
      let self = this;
      return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
        method: 'post',
        url: '/web/update-config',
        data: self.sys,
        headers: { 'appType': 'web', 'appid': 'logan' }
      }).then(response => {
        var data = response.data;
        if (data.type != 1) {
          self.getSysInfo();
          console.log('系统信息更新失败');
        }
      }).catch(error => {
        console.log('系统信息更新失败');
      });
    }
  }
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * todo:1.添加按钮应该要两个input都有值才可以点击,vue的表单验证？
 * 		2.表格内的和新增的两个开车时间的正则验证，
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'trainPlan',
  data() {
    return {
      tp: {},
      tpVo: {
        delFlag: 0
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getTrainPlan();
    });
  },
  methods: {
    getTrainPlan() {
      //接口34，计划车次维护(查看)
      let self = this;
      return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
        method: 'get',
        url: '/static/trainPlan.json',
        headers: { 'appType': 'web', 'appid': 'logan' }
      }).then(response => {
        var data = response.data;
        if (data.type == 1) {
          self.tp = data.result;
        }
      }).catch(error => {
        console.log('计划车次获取失败');
      });
    },
    addTP() {
      //接口31，计划车次维护(增加)
      let self = this;
      return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
        method: 'post',
        url: '/web/plan/save',
        data: this.tpVo,
        headers: { 'appType': 'web', 'appid': 'logan' }
      }).then(response => {
        var data = response.data;
        if (data.type == 1) {
          self.getTrainPlan();
        }
      }).catch(error => {
        console.log('计划车次添加失败');
        self.getTrainPlan(); //现在没有后台程序。肯定失败，暂时在失败这里也放上，模仿成功的情况
      });
    },
    deletTP(tp) {
      //接口31，计划车次维护(删除)
      let self = this;
      return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
        method: 'get',
        url: '/web/plan/delete',
        params: { sid: tp.sid },
        headers: { 'appType': 'web', 'appid': 'logan' }
      }).then(response => {
        var data = response.data;
        if (data.type == 1) {
          self.getTrainPlan();
        }
      }).catch(error => {
        console.log('计划车次获取失败');
        self.getTrainPlan(); //现在没有后台程序。肯定失败，暂时在失败这里也放上，模仿成功的情况
      });
    },
    updateTP(tp) {
      //接口33，计划车次维护(修改)
      let self = this;
      return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
        method: 'post',
        url: '/web/plan/update',
        data: tp,
        headers: { 'appType': 'web', 'appid': 'logan' }
      }).then(response => {
        var data = response.data;
        if (data.type == 1) {
          self.getTrainPlan();
        }
      }).catch(error => {
        console.log('计划车次添加失败');
        self.getTrainPlan(); //现在没有后台程序。肯定失败，暂时在失败这里也放上，模仿成功的情况
      });
    }
  }
});

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_qriously__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_qriously___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_qriously__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.






//import './assets/css/twitter/3.3.7/bootstrap.min.css'
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_4_vue_qriously___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_3_axios___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].prototype.$http = __WEBPACK_IMPORTED_MODULE_3_axios___default.a; //如何把axios变成全局变量

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 41 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 42 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 43 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 44 */,
/* 45 */,
/* 46 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRERjY2NkYwMDRBNTExRTdBNTJEQUJEMDNBQjZDN0Q1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRERjY2NkYxMDRBNTExRTdBNTJEQUJEMDNBQjZDN0Q1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RERGNjY2RUUwNEE1MTFFN0E1MkRBQkQwM0FCNkM3RDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RERGNjY2RUYwNEE1MTFFN0E1MkRBQkQwM0FCNkM3RDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4cV1WnAAABmElEQVR42rSUPSwEQRTHb2QJJ4jIKXwkrqQhVGpUEh+JIFGo0GpFsbuiOJXuClFI7kShUGmoiEKnE+2Rk9AcEluIWP8nb5Jn7uZiFy/53eybufnPvjdvn/I8L2GxK9AH7kAo5tvBE+gFgeu63zYpFmwDKyAF3sAIGAInLEyCisc0mANFsA9qwTPYg3iBBAfhXIB6XqCNASiAJtDMc9peQQl0gBY+JAnqwLiDn0sWSiZimA7Z932K5JgEr0E/OOWQu6IIQugRwz0YADckOAzWGQr1IOJLjnHOt8C2ErcccJKXIgqukhBC/8pzjbHYECONKemYgh88boJDMb8BdoSfBbv8HFYT1DYBZoQ/CRaFT3U4X2mjY/i63qhoO8V8ketU2y3XXZnJNwz5K/mVmSG//7Wg+i9BZYgr47/KdrhjyWE3aBVr5PcIP21ckvWWdQ4zxjed4a6jbY3bVlkdSsFGbk1kOeOgvOFnxfOLLYcPYDrGPUzZ3nAWnHEIpR/ceMgNmDQWKgmeg1GwLDpxNdOdPYdOc6QnPwUYALGLWK581142AAAAAElFTkSuQmCC"

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(39)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(32),
  /* template */
  __webpack_require__(53),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-60c549a9",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(40)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(33),
  /* template */
  __webpack_require__(54),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(43)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(34),
  /* template */
  __webpack_require__(57),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(42)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(35),
  /* template */
  __webpack_require__(56),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(41)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(36),
  /* template */
  __webpack_require__(55),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('div', {
    staticClass: "app-title"
  }, [_c('span', {
    staticClass: "homeName",
    domProps: {
      "textContent": _vm._s(_vm.homeName)
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "app-time",
    domProps: {
      "innerHTML": _vm._s(_vm.currentdate)
    }
  }), _vm._v(" "), _c('nav', [_c('router-link', {
    attrs: {
      "to": "/controller"
    }
  }, [_c('span', [_vm._v("控制中心")])]), _vm._v(" "), _c('i', {
    staticClass: "headNavLine"
  }), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/trainPlan"
    }
  }, [_c('span', [_vm._v("计划维护")])]), _vm._v(" "), _c('i', {
    staticClass: "headNavLine"
  }), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": ""
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "headNavLine"
  }), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": ""
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "headNavLine"
  }), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/sys"
    }
  }, [_c('span', [_vm._v("系统设置")])])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "callBed",
    staticStyle: {
      "margin": "90px 30px 0 30px",
      "width": "65%",
      "display": "inline-block"
    }
  }, [_c('router-view')], 1), _vm._v(" "), _c('div', {
    staticClass: "callBedTable mainTable"
  }, [_c('div', {
    staticClass: "rightList"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "manually-list-info"
  }, [_c('span', {
    domProps: {
      "textContent": _vm._s(_vm.manuallyListLength)
    }
  }), _vm._v("人需人工叫班\n  \t\t\t\t"), _c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.singAndDanceHtml)
    }
  })]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-bottom": "20px"
    }
  }, [_c('table', {
    staticClass: "table-hover",
    staticStyle: {
      "width": "95%",
      "margin": "0 13px"
    }
  }, [_vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('tbody', _vm._l((_vm.rightList.manuallyList), function(manually, $index) {
    return _c('tr', {
      class: {
        isCallBed: manually.remindResponse, notCallBed: !manually.remindResponse
      }
    }, [_c('td', [_c('div', {
      staticStyle: {
        "max-width": "60px"
      },
      domProps: {
        "textContent": _vm._s($index + 1)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "75px"
      },
      domProps: {
        "textContent": _vm._s(manually.trainNo)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "95px"
      },
      domProps: {
        "textContent": _vm._s(manually.remindPlanedTime)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "75px"
      },
      domProps: {
        "textContent": _vm._s(manually.driverName)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "75px"
      },
      domProps: {
        "textContent": _vm._s(manually.bedNo)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "95px"
      }
    }, [_c('span', {
      staticClass: "manually-time"
    }, [_vm._v(_vm._s(manually.remindTimes + '次'))]), _vm._v(_vm._s(_vm._f("forMatTime")(manually.timeGoingOn)))])]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "40px"
      }
    }, [_vm._v(_vm._s(manually.remindResponse ? '有' : '无'))])])])
  }))])])]), _vm._v(" "), _c('div', {
    staticClass: "rightList"
  }, [_vm._m(3), _vm._v(" "), _c('div', {
    staticClass: "manually-list-info"
  }, [_c('span', {
    domProps: {
      "textContent": _vm._s(_vm.autoListLength)
    }
  }), _vm._v("人手表一震动，暂不需要干预\n  \t\t\t")]), _vm._v(" "), _vm._l((_vm.rightList.autoList), function(auto) {
    return _c('div', {
      staticStyle: {
        "margin-left": "20px"
      }
    }, [_c('span', [_vm._v("\n  \t\t\t\t\t" + _vm._s(auto.trainNo + "叫班时间  " + auto.remindRealTime + " 已过") + "\n  \t\t\t\t")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(auto.remindResponse ? '有响应' : '无响应'))])])
  })], 2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "head",
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('div', [_vm._v("人工待叫列表")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('colgroup', [_c('col', {
    staticStyle: {
      "width": "60px"
    }
  }), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col', {
    staticStyle: {
      "width": "120px"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("序号")]), _vm._v(" "), _c('th', [_vm._v("车次")]), _vm._v(" "), _c('th', [_vm._v("叫班时间")]), _vm._v(" "), _c('th', [_vm._v("司机")]), _vm._v(" "), _c('th', [_vm._v("铺位号")]), _vm._v(" "), _c('th', [_vm._v("叫班次数")]), _vm._v(" "), _c('th', [_vm._v("有无响应")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "head",
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('div', [_vm._v("自动叫醒记录")])])
}]}

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hello"
  })
},staticRenderFns: []}

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('button', {
    staticClass: "btn btn-mini",
    attrs: {
      "type": "button"
    },
    domProps: {
      "textContent": _vm._s(_vm.buttonSpan)
    },
    on: {
      "click": _vm.qrBtn
    }
  }), _vm._v(" "), (_vm.popup) ? _c('div', {
    staticClass: "modal-backdrop fade in",
    staticStyle: {
      "z-index": "1040"
    },
    attrs: {
      "modal-animation-class": "fade",
      "modal-backdrop": "modal-backdrop",
      "modal-animation": "true"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.popup) ? _c('div', {
    staticClass: "popup"
  }, [_c('div', {
    staticClass: "head",
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('h3'), _vm._v(" "), _c('i', {
    staticClass: "icon-remove icon-white",
    on: {
      "click": function($event) {
        _vm.cancelEdit()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "popup-left"
  }, [_c('div', [_vm._v("接续车次："), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.qrVo.trainNo)
    }
  })]), _vm._v(" "), _c('div', [_vm._v("司机："), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.qrVo.driverName)
    }
  })]), _vm._v(" "), _c('div', [_vm._v("开车时间："), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.qrVo.trainDt)
    }
  })]), _vm._v(" "), _c('div', [_vm._v("叫班时间："), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.qrVo.remindPlanedTime1)
    }
  })]), _vm._v(" "), _c('div', [_vm._v("铺位号："), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.qrVo.bedNo),
      expression: "qrVo.bedNo"
    }],
    staticStyle: {
      "width": "55px"
    },
    attrs: {
      "id": "bedNo",
      "type": "text"
    },
    domProps: {
      "value": (_vm.qrVo.bedNo)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.qrVo.bedNo = $event.target.value
      }
    }
  })]), _vm._v(" "), (_vm.qr) ? _c('div', {
    staticClass: "prompt"
  }, [_vm._v("请扫描二维码!")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "prompt",
    domProps: {
      "textContent": _vm._s(_vm.qrMsg)
    }
  })]), _vm._v(" "), (_vm.qr) ? _c('div', {
    staticClass: "popup-right"
  }, [_c('qriously', {
    attrs: {
      "value": _vm.qrScan,
      "size": 200
    }
  })], 1) : _vm._e()]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "tp"
  }, [_c('div', [_c('label', {
    attrs: {
      "for": "trainNo"
    }
  }, [_vm._v("车次：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tpVo.trainNo),
      expression: "tpVo.trainNo"
    }],
    staticStyle: {
      "width": "120px"
    },
    attrs: {
      "type": "text",
      "name": "trainNo",
      "id": "trainNo"
    },
    domProps: {
      "value": (_vm.tpVo.trainNo)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tpVo.trainNo = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('label', {
    attrs: {
      "for": "trainDt"
    }
  }, [_vm._v("开车时间:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tpVo.trainDt),
      expression: "tpVo.trainDt"
    }],
    attrs: {
      "type": "text",
      "name": "trainDt",
      "id": "trainDt"
    },
    domProps: {
      "value": (_vm.tpVo.trainDt)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.tpVo.trainDt = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('div', {
    staticClass: "btn-lg btn-success",
    attrs: {
      "disabled": ""
    },
    on: {
      "click": _vm.addTP
    }
  }, [_vm._v("添加")])])]), _vm._v(" "), _c('div', {
    staticClass: "callBedTable"
  }, [_c('table', {
    staticClass: "table-hover",
    staticStyle: {
      "width": "50%"
    }
  }, [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('tbody', _vm._l((_vm.tp.list), function(tp, $index) {
    return _c('tr', [_c('td', [_c('div', {
      staticStyle: {
        "max-width": "60px"
      },
      attrs: {
        "type": "text"
      },
      domProps: {
        "textContent": _vm._s($index + 1)
      }
    })]), _vm._v(" "), _c('td', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (tp.trainNo),
        expression: "tp.trainNo"
      }],
      staticStyle: {
        "min-width": "135px"
      },
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (tp.trainNo)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          tp.trainNo = $event.target.value
        }
      }
    })]), _vm._v(" "), _c('td', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (tp.trainDt),
        expression: "tp.trainDt"
      }],
      staticStyle: {
        "min-width": "185px"
      },
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (tp.trainDt)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          tp.trainDt = $event.target.value
        }
      }
    })]), _vm._v(" "), _c('td', {
      staticClass: "table-handle"
    }, [_c('div', {
      staticStyle: {
        "max-width": "120px"
      }
    }, [_c('img', {
      staticClass: "deleteTn",
      attrs: {
        "src": __webpack_require__(46),
        "onerror": "javascript:this.src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496385415687&di=cfb8c3b6a69be436172b2fbcf2d35748&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F55%2F73%2F39I58PICCqK_1024.png'"
      },
      on: {
        "click": function($event) {
          _vm.deletTP(tp)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "btn-sm btn-info btn-table",
      on: {
        "click": function($event) {
          _vm.updateTP(tp)
        }
      }
    }, [_vm._v("提交")])])])
  }))])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('colgroup', [_c('col', {
    staticStyle: {
      "width": "60px"
    }
  }), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col', {
    staticStyle: {
      "width": "120px"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("序号")]), _vm._v(" "), _c('th', [_vm._v("车次")]), _vm._v(" "), _c('th', [_vm._v("开车时间")]), _vm._v(" "), _c('th')])
}]}

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sys"
  }, [_c('div', [_c('label', {
    attrs: {
      "for": "roomName"
    }
  }, [_vm._v("间休室名称：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.sys.name),
      expression: "sys.name"
    }],
    staticStyle: {
      "width": "120px"
    },
    attrs: {
      "type": "text",
      "name": "roomName",
      "id": "roomName"
    },
    domProps: {
      "value": (_vm.sys.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.sys.name = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('label', {
    attrs: {
      "for": "timeAhead"
    }
  }, [_vm._v("设定提前叫班时间:")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.sys.timeAhead),
      expression: "sys.timeAhead"
    }],
    attrs: {
      "type": "text",
      "name": "timeAhead",
      "id": "timeAhead"
    },
    domProps: {
      "value": (_vm.sys.timeAhead)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.sys.timeAhead = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('label', {
    attrs: {
      "for": "interval"
    }
  }, [_vm._v("叫班间隔：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.sys.interval),
      expression: "sys.interval"
    }],
    attrs: {
      "type": "text",
      "name": "interval",
      "id": "interval"
    },
    domProps: {
      "value": (_vm.sys.interval)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.sys.interval = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('label', {
    attrs: {
      "for": "timeOut"
    }
  }, [_vm._v("响应超时时间：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.sys.timeOut),
      expression: "sys.timeOut"
    }],
    attrs: {
      "type": "text",
      "name": "timeOut",
      "id": "timeOut"
    },
    domProps: {
      "value": (_vm.sys.timeOut)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.sys.timeOut = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('label', {
    attrs: {
      "for": "timeToLeave"
    }
  }, [_vm._v("办理间休延迟：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.sys.timeToLeave),
      expression: "sys.timeToLeave"
    }],
    attrs: {
      "type": "text",
      "name": "timeToLeave",
      "id": "timeToLeave"
    },
    domProps: {
      "value": (_vm.sys.timeToLeave)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.sys.timeToLeave = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('span', {
    staticClass: "btn-lg btn-success",
    on: {
      "click": _vm.setSysInfo
    }
  }, [_vm._v("提交")])])])
},staticRenderFns: []}

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "controllerCenter"
  }, [_c('div', {
    staticClass: "controllerSys"
  }, [_vm._m(0), _vm._v(" "), _c('div', [_c('span', [_vm._v("手表叫班响应率：")]), _c('span', {}, [_vm._v("98%")])]), _vm._v(" "), _c('div', [_c('span', [_vm._v("出发及时率：")]), _c('span', {}, [_vm._v("100%")])]), _vm._v(" "), _c('div', [_c('span', [_vm._v("设定提前叫班时间：")]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.aheadOfTime),
      expression: "aheadOfTime"
    }],
    domProps: {
      "value": (_vm.aheadOfTime)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.aheadOfTime = $event.target.value
      }
    }
  }), _vm._v("分钟")])]), _vm._v(" "), _c('div', {
    staticClass: "controllerBtn"
  }, [_c('span', {
    staticClass: "devRegister",
    on: {
      "click": function($event) {
        _vm.devCheckIn()
      }
    }
  }, [_vm._v("设备登记")]), _vm._v(" "), _c('span', {
    staticClass: "getRestOver",
    on: {
      "click": function($event) {
        _vm.getRestOver()
      }
    }
  }, [_vm._v("结束间休")]), _vm._v(" "), _c('span', {
    staticClass: "err-msg",
    domProps: {
      "textContent": _vm._s(_vm.errMsg)
    }
  })]), _vm._v(" "), (_vm.checkInPage) ? _c('div', {
    staticClass: "popup"
  }, [_c('div', {
    staticClass: "head",
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('h3'), _vm._v(" "), _c('i', {
    staticClass: "icon-remove icon-white",
    on: {
      "click": function($event) {
        _vm.cancelCheckInPage()
      }
    }
  })]), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "popup-right",
    staticStyle: {
      "width": "65%"
    }
  }, [_c('qriously', {
    attrs: {
      "value": _vm.checkInInfo,
      "size": 300
    }
  })], 1)]) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.getRestOverBedNo),
      expression: "getRestOverBedNo"
    }],
    staticClass: "popup"
  }, [_c('div', {
    staticClass: "head",
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('h3'), _vm._v(" "), _c('i', {
    staticClass: "icon-remove icon-white",
    on: {
      "click": function($event) {
        _vm.cancelRestOverBedNoPage()
      }
    }
  })]), _vm._v(" "), (!_vm.controllerPopup) ? _c('div', {
    staticClass: "over-bedNo"
  }, [_c('span', [_vm._v("铺位号：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.bedNo),
      expression: "bedNo"
    }],
    staticClass: "input-over-bedNo",
    attrs: {
      "type": "text",
      "id": "restOverBedNo"
    },
    domProps: {
      "value": (_vm.bedNo)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.bedNo = $event.target.value
      }
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.controllerPopup) ? _c('div', {
    staticClass: "popup restOverPopup"
  }, [_c('div', {
    staticClass: "popup-left"
  }, [_c('div', [_vm._v("接续车次："), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.restOverVo.trainNo)
    }
  })]), _vm._v(" "), _c('div', [_vm._v("司机："), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.restOverVo.driverName)
    }
  })]), _vm._v(" "), _c('div', [_vm._v("开车时间："), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.restOverVo.trainDt)
    }
  })]), _vm._v(" "), _c('div', [_vm._v("叫班时间："), _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.restOverVo.remindPlanedTime1)
    }
  })]), _vm._v(" "), _c('div', [_vm._v("铺位号："), _c('span', {
    staticStyle: {
      "width": "55px"
    },
    attrs: {
      "id": "bedNo",
      "type": "text"
    },
    domProps: {
      "textContent": _vm._s(_vm.restOverVo.bedNo)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "prompt"
  }, [_vm._v("请扫描二维码!")]), _vm._v(" "), _c('div', {
    staticClass: "prompt",
    domProps: {
      "textContent": _vm._s(_vm.qrMsg)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "popup-right"
  }, [_c('qriously', {
    attrs: {
      "value": _vm.restOverScan,
      "size": 200
    }
  })], 1)]) : _vm._e()]), _vm._v(" "), _c('div', [_c('span', [_vm._v("当日已结束")]), _vm._v(" "), _c('div', {
    staticClass: "callBedTable"
  }, [_c('table', {
    staticClass: "table-hover",
    staticStyle: {
      "width": "100%"
    }
  }, [_vm._m(2), _vm._v(" "), _vm._m(3), _vm._v(" "), _c('tbody', _vm._l((_vm.con.completedList), function(completed, $index) {
    return _c('tr', [_c('td', [_c('div', {
      staticStyle: {
        "max-width": "60px"
      },
      domProps: {
        "textContent": _vm._s($index + 1)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "95px"
      },
      domProps: {
        "textContent": _vm._s(completed.trainNo)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "95px"
      },
      domProps: {
        "textContent": _vm._s(completed.driverName)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "125px"
      },
      domProps: {
        "textContent": _vm._s(completed.startTime)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "125px"
      },
      domProps: {
        "textContent": _vm._s(completed.remindRealTime1)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "125px"
      },
      domProps: {
        "textContent": _vm._s(completed.remindRealTime2)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "125px"
      },
      domProps: {
        "textContent": _vm._s(completed.adminRemindTime)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "125px"
      },
      domProps: {
        "textContent": _vm._s(completed.endRealTime)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "125px"
      },
      domProps: {
        "textContent": _vm._s(completed.mid)
      }
    })])])
  }))])]), _vm._v(" "), _c('span', [_vm._v("当日已安排：未结束")]), _vm._v(" "), _c('div', {
    staticClass: "callBedTable"
  }, [_c('table', {
    staticClass: "table-hover",
    staticStyle: {
      "width": "100%"
    }
  }, [_vm._m(4), _vm._v(" "), _vm._m(5), _vm._v(" "), _c('tbody', _vm._l((_vm.con.notFinishedList), function(notFinished, $index) {
    return _c('tr', [_c('td', [_c('div', {
      staticStyle: {
        "max-width": "60px"
      },
      domProps: {
        "textContent": _vm._s($index + 1)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "135px"
      },
      domProps: {
        "textContent": _vm._s(notFinished.trainNo)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "135px"
      },
      domProps: {
        "textContent": _vm._s(notFinished.driverName)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "185px"
      },
      domProps: {
        "textContent": _vm._s(notFinished.trainDt)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "135px"
      },
      domProps: {
        "textContent": _vm._s(notFinished.bedNo)
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "min-width": "185px"
      },
      domProps: {
        "textContent": _vm._s(notFinished.remindPlanedTime1)
      }
    })])])
  }))])]), _vm._v(" "), _c('span', [_vm._v("当日未安排")]), _c('button', {
    staticClass: "callBedButton btn-md",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.addnotArrangedList()
      }
    }
  }, [_vm._v("临时增加")]), _vm._v(" "), _c('div', {
    staticClass: "callBedTable"
  }, [_c('table', {
    staticClass: "table-hover",
    staticStyle: {
      "width": "100%"
    }
  }, [_vm._m(6), _vm._v(" "), _vm._m(7), _vm._v(" "), _c('tbody', _vm._l((_vm.con.notArrangedList), function(notArranged, $index) {
    return _c('tr', [_c('td', [_c('div', {
      staticStyle: {
        "max-width": "60px"
      },
      attrs: {
        "type": "text"
      },
      domProps: {
        "textContent": _vm._s($index + 1)
      }
    })]), _vm._v(" "), _c('td', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (notArranged.trainNo),
        expression: "notArranged.trainNo"
      }],
      staticStyle: {
        "min-width": "135px"
      },
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (notArranged.trainNo)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          notArranged.trainNo = $event.target.value
        }
      }
    })]), _vm._v(" "), _c('td', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (notArranged.driverName),
        expression: "notArranged.driverName"
      }],
      staticStyle: {
        "min-width": "135px"
      },
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (notArranged.driverName)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          notArranged.driverName = $event.target.value
        }
      }
    })]), _vm._v(" "), _c('td', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (notArranged.trainDt),
        expression: "notArranged.trainDt"
      }],
      staticStyle: {
        "min-width": "185px"
      },
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (notArranged.trainDt)
      },
      on: {
        "blur": function($event) {
          _vm.getRemindPlanedTime1(notArranged, $index)
        },
        "input": function($event) {
          if ($event.target.composing) { return; }
          notArranged.trainDt = $event.target.value
        }
      }
    })]), _vm._v(" "), _c('td', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (notArranged.remindPlanedTime1),
        expression: "notArranged.remindPlanedTime1"
      }],
      staticStyle: {
        "min-width": "185px"
      },
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (notArranged.remindPlanedTime1)
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          notArranged.remindPlanedTime1 = $event.target.value
        }
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticStyle: {
        "max-width": "120px"
      }
    }, [_c('qr', {
      attrs: {
        "startUrl": "/static/restStart.json",
        "url": "/static/qr.json",
        "type": "restStart",
        "params": notArranged,
        "buttonSpan": "开始",
        "startRest": _vm.startRest
      }
    })], 1)])])
  }))])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('span', [_vm._v("总共接待：")]), _c('span', [_vm._v("50人次")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "popup-left"
  }, [_c('div', {
    staticClass: "prompt"
  }, [_vm._v("请扫描二维码！")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('colgroup', [_c('col', {
    staticStyle: {
      "width": "60px"
    }
  }), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col', {
    staticStyle: {
      "width": "120px"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("序号")]), _vm._v(" "), _c('th', [_vm._v("车次")]), _vm._v(" "), _c('th', [_vm._v("司机")]), _vm._v(" "), _c('th', [_vm._v("到达时间")]), _vm._v(" "), _c('th', [_vm._v("首次叫班")]), _vm._v(" "), _c('th', [_vm._v("二次叫班")]), _vm._v(" "), _c('th', [_vm._v("人工叫班")]), _vm._v(" "), _c('th', [_vm._v("结束间休")]), _vm._v(" "), _c('th', [_vm._v("设备编号")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('colgroup', [_c('col', {
    staticStyle: {
      "width": "60px"
    }
  }), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col', {
    staticStyle: {
      "width": "120px"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("序号")]), _vm._v(" "), _c('th', [_vm._v("车次")]), _vm._v(" "), _c('th', [_vm._v("司机")]), _vm._v(" "), _c('th', [_vm._v("开车时间")]), _vm._v(" "), _c('th', [_vm._v("铺位号")]), _vm._v(" "), _c('th', [_vm._v("叫班时间")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('colgroup', [_c('col', {
    staticStyle: {
      "width": "60px"
    }
  }), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col'), _vm._v(" "), _c('col', {
    staticStyle: {
      "width": "120px"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("序号")]), _vm._v(" "), _c('th', [_vm._v("车次")]), _vm._v(" "), _c('th', [_vm._v("司机")]), _vm._v(" "), _c('th', [_vm._v("开车时间")]), _vm._v(" "), _c('th', [_vm._v("叫班时间")]), _vm._v(" "), _c('th')])
}]}

/***/ })
],[37]);
//# sourceMappingURL=app.f5ae6f07b521351875ea.js.map