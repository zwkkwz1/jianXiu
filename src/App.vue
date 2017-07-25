<template>
  <div id="app">
  	<div class="app-title">
  		<!--<img src="./img/SHTLJ.jpg" alt="" />-->
  		<span class="homeName" v-text="homeName"></span>
  		<span class="app-time" v-html="currentdate">
  		</span>
	  	<nav>
		  	<router-link to="/controller">
		  		<span>控制中心</span>
		  	</router-link>
		  	<i class="headNavLine"></i>
		  	<router-link to="">
		  		<span>计划维护</span>
		  	</router-link>
		  	<i class="headNavLine"></i>
		  	<router-link to=""></router-link>
		  	<i class="headNavLine"></i>
		  	<router-link to=""></router-link>
		  	<i class="headNavLine"></i>
		  	<router-link to=""></router-link>
	  	</nav>
	  </div>
  	<div style="margin: 140px 30px 0 30px;">
  		<router-view></router-view>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
  	return {
  		homeName:"上 海 铁 路 局",
  		currentdate : ''
  	}
  },
  filters : {
		
  },
  mounted () {
  	this.$nextTick(function () {
      
    });
    setInterval(()=>{
  	 this.filterTime ();
  	},1000);
  },
  methods: {
	  filterTime () {
	  	var date = new Date();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.currentdate = "<div>" + date.getFullYear() + "-" + month + "-" + strDate + "</div>" 
            + "<div>" + date.getHours() + ":" + date.getMinutes()
            + ":" + date.getSeconds() + "</div>";
    }
  }
}
</script>

<style>
body{
	margin: 0;
	padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}
ul{
	margin-top: 0;
}
.app-title{
	width: 100%;
	height: 66px;
	position: fixed;
	top: 0;
	background-image: linear-gradient(to top, #39496a, #4a5f89);
	color: white;
}
.homeName{
	position: relative;
	left: 200px;
	font-size: 24px;
	font-family: "微软雅黑";
	line-height: 66px;
}
.app-time{
	display: inline-block;
	position: relative;
	left: 300px;
	top: 6px;
	text-align: center;
	margin-top: 1px;
}
nav{
	height: 65px;
	position: relative;
	background: #425575;
	color: white;
}
nav a{
	cursor: pointer;
  transition: all 0.18s ease-out 0s;
  position: relative;
	width: 118px;
  line-height: 65px;
  display: inline-block;
  text-align: center;
}
nav a span{
	color: white;
}
.headNavLine{
  border-left: 1px solid #2c3a54;
  border-right: 1px solid #566a8e;
  display: inline-block;
  height: 39px;
  position: relative;
  top: 15px;
}
a:link {
  text-decoration: none;
  color: #F60;
}
a:visited {
  text-decoration: none;
}
a:hover {
	text-decoration: none;
}
a:active {
	text-decoration: none;
	font-size: 14px;
	font-weight: bold;
}
</style>
