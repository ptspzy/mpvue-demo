<template>
   <view class='attendance-calendar'>
     <view class="flex box box-tb box-align-center shadow">
      <view class='attendance-calendar-top'>
        <view class='calendar-top-content' :style="'background-color:' + gradientColor[0]">
           <view class='content-left'>{{curYear}}-{{curMonth}}-{{curDate}}</view>
           <view class='content-right'>
           <view class='content-totalMoney'>累计<text class='content-totalMoney-text'>{{totalMoney}}</text></view>
           <view class='content-img'> <image src="../../images/sign-in-money.png" mode="widthFix"></image></view></view>
        </view>
     </view> 
        <view class="calendar pink-color box box-tb">
           <view class="top-handle fs28 box box-lr box-align-center box-pack-center">
              <view class="prev box box-rl" @click="handleCalendar" data-handle="prev">
                <view class="prev-handle box box-lr box-align-center box-pack-center">
                  <view class='prev-triangle' :style="'border-right: 20rpx solid ' + gradientColor[0]">  
                  </view>
                </view>
              </view>
             <view @click="chooseYearAndMonth" class="date-area box box-lr box-align-center box-pack-center" :style="'color:' + gradientColor[0]">{{curYear || "-"}} 年 {{curMonth || "-"}} 月
             </view>
             <view class="next box box-lr" @click="handleCalendar" data-handle="next">
               <view class="next-handle box box-lr box-align-center box-pack-center">
                  <view class='next-triangle' :style="'border-left: 20rpx solid ' + gradientColor[0]">
                  </view>
               </view>
             </view>
           </view>
           <view class="weeks box box-lr box-pack-center box-align-center">
             <view class="flex week fs28" v-for="(item, index) in weeksCh" :key="weekKey(index)" :data-idx="index">{{item}}
             </view>
           </view>
           <view class="days box box-lr box-wrap">
             <view v-if="hasEmptyGrid" class="grid white-color box box-align-center box-pack-center" v-for="(item, index) in empytGrids" :key="empytGridsKey(index)" :data-idx="index">
             </view>
             <view class="grid white-color box box-align-center box-pack-center" v-for="(item, index) in days" :key="daysKey(index)" :data-idx="index">
               <view :style="'background-color:' + item.choosed ? gradientColor[0]:''" class="box box-align-center box-pack-center" :class="{ 'day': true, 'border-radius': item.choosed } " >{{item.day}}
               </view>
             </view>
           </view>
        </view>
      </view>
  </view>
</template>

<script>
let chooseYear = null
let chooseMonth = null
export default {
  data () {
    return {
      hasEmptyGrid: false,
      showPicker: false,
      gradientColor: ['#b5b5b5'],
      curYear: '',
      curMonth: '',
      curDate: new Date().getDate(),
      weeksCh: '',
      days: [],
      empytGrids: [],
      pickerValue: [ ],
      pickerYear: '',
      pickerMonth: ''
    }
  },
  computed: {

  },
  created () {
    const date = new Date()
    const curYear = date.getFullYear()
    const curMonth = date.getMonth() + 1
    const weeksCh = [ '日', '一', '二', '三', '四', '五', '六' ]
    this.calculateEmptyGrids(curYear, curMonth)
    this.calculateDays(curYear, curMonth)
    this.setData({
      curYear,
      curMonth,
      weeksCh
    })
  },
  methods: {
    weekKey (index) { // 注意 :key 不能写表达式， 所以此处写成函数
      return `week${index}`
    },
    empytGridsKey (index) {
      return `empytGrids${index}`
    },
    daysKey (index) {
      return `days${index}`
    },
    getThisMonthDays (year, month) {
      return new Date(year, month, 0).getDate()
    },
    getFirstDayOfWeek (year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay()
    },
    calculateEmptyGrids (year, month) {
      const firstDayOfWeek = this.getFirstDayOfWeek(year, month)
      let empytGrids = []
      if (firstDayOfWeek > 0) {
        for (let i = 0; i < firstDayOfWeek; i++) {
          empytGrids.push(i)
        }
        this.setData({
          hasEmptyGrid: true,
          empytGrids
        })
      } else {
        this.setData({
          hasEmptyGrid: false,
          empytGrids: []
        })
      }
    },
    calculateDays (year, month) {
      let days = []

      const thisMonthDays = this.getThisMonthDays(year, month)

      for (let i = 1; i <= thisMonthDays; i++) {
        days.push({
          day: i,
          choosed: false
        })
      }
      this.setData({
        days
      })
    },
    handleCalendar (e) {
      const handle = e.currentTarget.dataset.handle
      const curYear = this.curYear
      const curMonth = this.curMonth
      if (handle === 'prev') {
        let newMonth = curMonth - 1
        let newYear = curYear
        if (newMonth < 1) {
          newYear = curYear - 1
          newMonth = 12
        }
        this.calculateDays(newYear, newMonth)
        this.calculateEmptyGrids(newYear, newMonth)
        this.setData({
          curYear: newYear,
          curMonth: newMonth
        })
      } else {
        let newMonth = curMonth + 1
        let newYear = curYear
        if (newMonth > 12) {
          newYear = curYear + 1
          newMonth = 1
        }

        this.calculateDays(newYear, newMonth)
        this.calculateEmptyGrids(newYear, newMonth)

        this.setData({
          curYear: newYear,
          curMonth: newMonth
        })
      }
    },
    tapDayItem (e) {
      const idx = e.currentTarget.dataset.idx
      const days = this.days
      days[ idx ].choosed = !days[ idx ].choosed
      this.setData({
        days
      })
    },
    chooseYearAndMonth () {
      const curYear = this.curYear
      const curMonth = this.curMonth
      let pickerYear = []
      let pickerMonth = []
      for (let i = 1900; i <= 2100; i++) {
        pickerYear.push(i)
      }
      for (let i = 1; i <= 12; i++) {
        pickerMonth.push(i)
      }
      const idxYear = pickerYear.indexOf(curYear)
      const idxMonth = pickerMonth.indexOf(curMonth)
      this.setData({
        pickerValue: [ idxYear, idxMonth ],
        pickerYear,
        pickerMonth,
        showPicker: true
      })
    },
    pickerChange (e) {
      const val = e.detail.value
      chooseYear = this.pickerYear[val[0]]
      chooseMonth = this.pickerMonth[val[1]]
    },
    tapPickerBtn (e) {
      const type = e.currentTarget.dataset.type
      const o = {
        showPicker: false
      }
      if (type === 'confirm') {
        o.curYear = chooseYear
        o.curMonth = chooseMonth
        this.calculateEmptyGrids(chooseYear, chooseMonth)
        this.calculateDays(chooseYear, chooseMonth)
      }
      this.setData(o)
    },
    setData (obj) {
      Object.keys(obj).forEach(k => {
        console.log(k, this[k])
        this[k] = obj[k]
      })
    },
    onShareAppMessage () {
      return {
        title: '小程序日历',
        desc: '还是新鲜的日历哟',
        path: 'pages/index/index'
      }
    }
  }
}
</script>

<style scoped>
.attendance{
   display:flex;
   flex-direction: column;
   justify-content: center;
   align-content: center;
   align-items: center;
   background-image: url(http://image.lanstech.cn/FnS7xP7UyKpGVnx3_dyKxXS0saBf?imageView2/0/q/75|imageslim);
   background-size:100% 100%;
  /* position: relative; */
  
}
.layer-coverd{
  display: none;  
  position: absolute;  
  top: 0%;  
  left: 0%;  
  width: 100%;  
  height: 100%;  
  background-color: black;  
  z-index: 1001;  
  /* -moz-opacity: 0.65;   */
  opacity: 0.65;  
   filter: alpha(opacity=70);   
}
.layer-coverd-picture{ 
  display: none;  
  text-align: center;  
  position: absolute;    
  z-index: 1002;  
  overflow: auto;
  width: 100%;
  height: 100%;
}
.rewardMoney{
   position: absolute;
    width: 100%;  
text-align: center;
   margin-top:-48.5%; 

}
.layer-coverd-picture-image{
   width: 100%;
  height:65%;
  margin-top: 35%;
  display: block;

}
.rewardMoneyTxt{
 font-size: 36rpx;
color: #ffd305;
font-weight:bold;
/* padding-left: 10rpx; */
}
.rewardMoney view{
  display: inline;
}
.rewardMoneyImg image{
  width: 32rpx;
  height: 32rpx;
  margin-left: 12rpx;
}
.attendance-click{
  /* position: absolute; */
  box-sizing: border-box;
   width: 100%;
   height: 28%;
   /* border: 1rpx solid red; */
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   /* align-items: center; */
   /* padding-top:50rpx; */
   padding-top:40rpx;
   
   
}
.attendance-click-picture1{
  height:74%;
  width:62%; 
   /* border: 1rpx solid red; */
   background-image:url(http://image.lanstech.cn/FimX_zbD3nrbYUpmvHgyAuJIBpS4?imageView2/0/q/75|imageslim);
   background-size: 100% 100%;
}
.attendance-click-picture2{
  height:74%;
  width:62%; 
   /* border: 1rpx solid red; */
   background-image:url(http://image.lanstech.cn/Fm2oKX0wqFnEUUy6B8wno61dtkLW?imageView2/0/format/png/q/75|imageslim);
   background-size: 100% 100%;
   position: relative;  

}
.attendance-click-day1{
  position: absolute;
  text-align: center;
  top:44%;
   left: 47% 
}
.attendance-click-day2{
  position: absolute;
  text-align: center;
  top:44%;
   left: 45% 
}
.attendance-click-day1 text{
font-size: 38rpx;
color: #ffd305;
font-weight:bold;
}
.attendance-click-day2 text{
font-size: 38rpx;
color: #ffd305;
font-weight:bold;
}
.attendance-click-text{
   display: flex;
   align-items: center;
   color: #333;
   font-size: 26rpx;
   height:24%;
}
.day-numbers{
  /* color: #ff5d5e; */
  font-size: 28rpx;
  font-weight: bold;
}
.attendance-calendar{
  /* position: absolute; */
   width: 89%;
    height: 50%; 
    /* border: 1rpx solid red;  */
    display: flex;
    justify-content: center;
    align-items: center;
    /* box-shadow:2rpx 4rpx 18rpx rgba(204,204,204,0.55); */   
     /* position: relative; */
      padding-top: 8%; 
    
}
.attendance-calendar-top{
  position: absolute;
  width: 100%;
  /* background-color: #ff9eb9; */
  height:10%;
  border-top-left-radius: 10rpx;
  border-top-right-radius: 10rpx;
    box-shadow:2rpx 4rpx 18rpx rgba(204,204,204,0.55);
    /* top:0rpx;  */
    top:-10%;
    left: 0;
  /* margin-bottom: -4.5%;  */
  /* margin-top: 20rpx; */
  /* margin-bottom: -1%; */
}
.calendar-top-content{
  padding:0rpx 50rpx;
  width: 85%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content:space-between;
  align-items: center;
  color: #fff;
  font-size: 30rpx;
}
.content-right{
  display: flex;
}
.content-totalMoney-text{
  font-weight: bold;
  padding: 0rpx 6rpx;
}
.content-img image{
  width:30rpx;
  height:30rpx;
  margin-top:6rpx;
}
.prev-triangle{
border-top: 16rpx solid transparent;
border-bottom: 16rpx solid transparent;
/* border-right: 20rpx solid #ff9eb9; */

}
.next-triangle{
border-top: 16rpx solid transparent;
border-bottom: 16rpx solid transparent;
/* border-left: 20rpx solid #ff9eb9; */

}
.attendance-reward{
  width: 90%;
   height: 22%;
    /* border: 1rpx solid red;   */
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content:space-between;
   /* padding-left:50rpx;
   padding-right:50rpx; */
}
/* .attendance-reward-picture{
  height: 68%;
   width:23%; 
  background-image: url(http://image.lanstech.cn/FgoTiXtIuMOeX8i5oO37JKVJEwz9?imageView2/0/q/75|imageslim);
  background-size: 100% 100%; 
} */
.RewardListBg0{
   height: 68%;
   width:22%;
   border-radius: 10rpx;
   background: rgba(255,158,185,0.2);
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   
}
.RewardListBg1{
   height: 68%;
   width:22%;
   border-radius: 10rpx;
   background: rgba(144,194,255,0.2);
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
}
.RewardListBg2{
   height: 68%;
   width:22%;
   border-radius: 10rpx;
   background: rgba(252,178,90,0.2);
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;   
}
.RewardListBg3{
   height: 68%;
   width:22%;
   border-radius: 10rpx;
   background: rgba(182,157,234,0.2);
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;   
}
.RewardListImg0{
  height:38%;
  width: 86%;
  background-image: url(http://image.lanstech.cn/FhWbp4jJzqNfgkfiL_8pjfvZY-wj?imageView2/0/format/png/q/75|imageslim);
  background-size: 100% 100%;
  margin-top: 15rpx; 
}
.RewardListImg1{
  height:38%;
  width: 86%;
  background-image: url(http://image.lanstech.cn/FndqVX64ykVD7DxNDcQClPRprz5C?imageView2/0/format/png/q/75|imageslim);
  background-size: 100% 100%;
  margin-top: 15rpx; 
}
.RewardListImg2{
  height:38%;
  width: 86%;
  background-image: url(http://image.lanstech.cn/FskRqSD1SMzf2FXG9lRXdrL5Z7J5?imageView2/0/format/png/q/75|imageslim);
  background-size: 100% 100%;
  margin-top: 15rpx; 
}
.RewardListImg3{
  height:38%;
  width: 86%;
  background-image: url(http://image.lanstech.cn/FiCABdAR4uJ3ZpTvj-Y03wZ9eOGQ?imageView2/0/format/png/q/75|imageslim);
  background-size: 100% 100%;
  margin-top: 15rpx; 
}
.RewardListImg-txt1{
  /* height:100%; */
  font-size: 48rpx;
  color: #fff;
  font-weight: bold;
  margin-left:22%;
  line-height:1.5;
}
.RewardListImg-txt2{
  /* height:100%; */
  font-size: 48rpx;
  color: #fff;
  font-weight: bold;
  margin-left:12%;
  line-height:1.5;
}
.RewardListImg-txt3{
  /* height:100%; */
  font-size: 44rpx;
  color: #fff;
  font-weight: bold;
  margin-left:3%; 
  line-height:1.5;
}
.RewardListImg-txt4{
  font-size:36rpx;
color:#fff;
font-weight:bold;
margin-left:2%;
margin-top:10rpx;
line-height:1.5;
}
.RewardListTxt{
  height:50%;  
  padding-top: 10rpx;
  font-size:26rpx;
  color: #444;
  text-align: center;
}
.continuousDays{
  font-weight: bold;
}
/* .attendance-reward-picture:not(:last-child){
  margin-right: 25rpx;
} */

/* page {
	background-color: #fff;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%; 
} */
.box {
	display: flex;
  /* box-shadow:2rpx 4rpx 18rpx rgba(204,204,204,0.55); */
}
.shadow{
  box-shadow:2rpx 4rpx 18rpx rgba(204,204,204,0.55);
}
.box-lr {
	flex-direction: row;
}

.box-rl {
	flex-direction: row-reverse;
}

 .box-tb {
	flex-direction: column;
} 
.box-pack-center {
	justify-content: center;
}

.box-pack-start {
	justify-content: flex-start;
}

.box-pack-end {
	justify-content: flex-end;
}

 .box-pack-between {
	justify-content: space-between;
} 

.box-pack-around {
	justify-content: space-around;
}

.box-align-center {
	align-items: center;
}

.box-align-start {
	align-items: flex-start;
}

.box-align-end {
	align-items: flex-end;
}

.self-align-center {
	align-self: center;
	margin: 0 auto;
}

.self-align-start {
	align-self: flex-start;
}

.self-align-end {
	align-self: flex-end;
}

.self-align-stretch {
	align-self: stretch;
}

.box-wrap {
	flex-wrap: wrap;
}

.box-nowrap {
	flex-wrap: nowrap;
}

.flex {

	flex-grow: 1;
  background-color: #fff;
  padding-left: 3%;
   border-bottom-left-radius: 10rpx;
  border-bottom-right-radius: 10rpx; 
   /* box-shadow:2rpx 4rpx 18rpx rgba(204,204,204,0.55);  */
  /* border-radius: 10rpx; */
  position: relative;

}

.shrink {
	flex-shrink: 1;
}

.bg {
	background-image: linear-gradient(to bottom, #faefe7, #ffcbd7);
	overflow: hidden;
}

.brown-color {
	color: #784344;
}

.pink-color {
	color: #ff629a;
}

.white-color {
	color: #fff;
}

.fs24 {
	font-size: 24rpx;
}

.fs28 {
	font-size: 32rpx;
}

.fs32 {
	font-size: 32rpx;
}

.fs36 {
	font-size: 36rpx;
}

.top-handle {
	height: 80rpx;
}

.prev {
	text-align: right;
	height: 80rpx;
}

.next {
	height: 80rpx;
}

.prev-handle {
	width: 80rpx;
	height: 100%;
}

.next-handle {
	width: 80rpx;
	height: 100%;
}

.date-area {
	width: 32%;
	height: 80rpx;
	text-align: center;
}

.weeks {
	height: 60rpx;
	line-height: 60rpx;
	/* opacity: 0.5; */
  color: #333;
  font-weight:bold;
  width: 95%;
  margin-left: -1%;
}

.week {
	text-align: center;
   font-size: 26rpx; 
}

.days {
	/* height: 500rpx; */
  /* border: 1rpx solid red; */
  /* height: 100%; */
  height:430rpx;
}
.grid {
	width:89.1428571429rpx;
}

.day {
	width: 60rpx;
	height: 60rpx;
	/* color: #88d2ac; */
	font-size: 26rpx;
	/* font-weight: 200; */
  color: #333;
}

.border-radius {
	border-radius: 50%;
	position: relative;
	left: 0;
	top: 0;
	color: #fff;
}

.pink-bg {
	background-color: #ff629a;
}

.purple-bg {
	background-color: #b8b8f1;
}

.right-triangle::after {
	content: "";
	display: block;
	width: 0;
	height: 0;
	border: 15rpx solid transparent;
	border-left-color: #ff629a;
	position: absolute;
	right: -22rpx;
	top: 18rpx;
}

.left-triangle::before {
	content: "";
	display: block;
	width: 0;
	height: 0;
	border: 15rpx solid transparent;
	border-right-color: #ff629a;
	position: absolute;
	left: -22rpx;
	top: 18rpx;
}

.tips {
	text-align: center;
	margin-top: 20rpx;
	margin-bottom: 20rpx;
}

.types {
	background-color: #ffedf4;
	height: 50rpx;
}

.types-desc {
	padding: 0 20rpx;
}

.type-name {
	margin-top: 50rpx;
	margin-bottom: 30rpx;
}

.type-desc {
	padding: 0 35rpx;
	line-height: 38rpx;
}

.explain {
	border-top: 1px solid #eee;
	width: 90%;
	margin: 20rpx 5% 20rpx 5%;
	padding: 20rpx 0;
}

.explain-title {
	font-weight: bold;
	margin-bottom: 15rpx;
}

.explain-item {
	padding: 8rpx 20rpx;
	color: #fff;
}

.left-border-radius {
	border-top-left-radius: 20rpx;
	border-bottom-left-radius: 20rpx;
}

.right-border-radius {
	border-top-right-radius: 20rpx;
	border-bottom-right-radius: 20rpx;
}
</style>



