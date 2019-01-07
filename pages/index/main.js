// pages/index/main.js
const app=getApp()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: util.formatTime(new Date),
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
        if (options && options.searchValue) {
          location = options.searchValue
        }
        else {
          location = longitude + ',' + latitude
        }
        _this.setData({latitude:latitude,
        longitude:longitude,
        location:location})

        
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
            _this.setData({
              imgSrc: '../image/' + jsonText.daily_forecast[0]["cond_code_d"]+".png",
              current_location: jsonText.basic["location"]+'  '+jsonText.basic["parent_city"]+'，'+jsonText.now['tmp']+'℃',
              current_tmp: '今日：'+jsonText.daily_forecast[0]["tmp_min"] + '℃~' + jsonText.daily_forecast[0]["tmp_max"] + '℃，' + jsonText.daily_forecast[0]["cond_txt_d"] +'转'+jsonText.daily_forecast[0]['cond_txt_n']+ '，' + jsonText.now['wind_dir'] + jsonText.now['wind_sc']+'级',
              current_lifestyle: '\n'+jsonText.lifestyle[1]["txt"],
              resultMsg:jsonText
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
  }
  
})