// pages/index/main.js
const app=getApp()
var util = require('../../utils/util.js');
//var time = util.formatTime(new Date);
//var week = util.getDates(util.formatTime(new Date));
//我也不知道为什么 如果先用一个引用js里面的的方法，得到time，再用一次其他的方法得到week
//再手机就显示不出来第二次引用的方法得到的结果，开发工具可以显示出来
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
   // week:week,   
   // time:util.getDates(3,time),
    loadingHidden:false,
    searchValue:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
   
    wx.getLocation({
      type:'wgs84',
      success: function(res) {
        var latitude=res.latitude //纬度
        var longitude=res.longitude //经度
        var location //位置
        var nowlocation //当前位置
        var isShow
        if (options && options.searchValue) {
          location = options.searchValue
          isShow=true
        }
        else {
          location = longitude + ',' + latitude
          isShow=false;
        }
        _this.setData({latitude:latitude,
        longitude:longitude,
        location:location
        })

        
        //var that = this;
        wx.request({
          url: 'https://free-api.heweather.com/s6/weather',
          data: {
            location: location,
            key:'b0bd5e050f8140c69b7ffac111f45e3f',
          },
          method: 'GET',
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
            if (res.statusCode != 200) {
              console.log('接口调用异常');
              _this.setData({
                resultModalHidden: false,
                resultMsg: '接口调用异常'
              })
            }
            //var jsonText=JSON.stringify(res.data)
            var jsonText = res.data.HeWeather6[0]
            if (location == jsonText.basic["location"]) {
              nowlocation = true
            }
            _this.setData({
              imgSrc: '../image/' + jsonText.daily_forecast[0]["cond_code_d"]+".png",
              current_location: jsonText.basic["location"]+'  '+jsonText.basic["parent_city"]+'，'+jsonText.now['tmp']+'℃',
              current_tmp: '今日：'+jsonText.daily_forecast[0]["tmp_min"] + '℃~' + jsonText.daily_forecast[0]["tmp_max"] + '℃，' + jsonText.daily_forecast[0]["cond_txt_d"] +'转'+jsonText.daily_forecast[0]['cond_txt_n']+ '，' + jsonText.now['wind_dir'] + jsonText.now['wind_sc']+'级',
              current_lifestyle: '\n'+jsonText.lifestyle[1]["txt"],
              resultMsg:jsonText,
              imageSrc1: '../image/' + jsonText.daily_forecast[0]["cond_code_d"] + ".png",
              isShowReturn: isShow,
              laterweek: util.getDates(jsonText.daily_forecast[0].date),
              loadingHidden:true
             })
            
          }
        }
        )
      },
      
    });
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log("渲染完成")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  huoqu:function(e){
    wx.getLocation({
      success: function(res) {},
    })
  },

  wxSearchTab:function(){
    wx.redirectTo({
      url: '../search/search'
    })
  },

  wxReturnlocation:function(){
    this.onLoad();
  }
  
})