// pages/gopost/gopost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist: [],
    title:'',
    content:''
  },
  addpost(){
    let userCode = wx.getStorageSync('loginid');
    let that=this;
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      data: {
        accesstoken: userCode,
        title: that.data.title,
        tab:'dev',
        content: that.data.content
        },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 1000
        })
        let id=res.data.topic_id;
        wx.navigateTo({
          url: '../topic/topic?id='+id,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  titlechange(e){
    this.setData({
      title: e.detail.value
    })
  },
  contentchange(e) {
    this.setData({
      content: e.detail.value
    })
  },
  addimg(e) {
    let that = this;
    let img_list = that.data.imglist;
    //选择图片
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        let tempFiles = res.tempFiles
        //把选择的图片 添加到集合里
        for (let i in tempFiles) {
          img_list.push(tempFiles[i])
        }
        console.log("上传");
        //显示
        that.setData({
          imglist: img_list,
        });
        console.log(that.data.imglist);
      }
    })
  },
  deleteimg(e) {
    let img_list = this.data.imglist;
    let index = e.currentTarget.dataset.index;
    img_list.splice(index, 1);
    this.setData({
      imglist: img_list
    });
  },
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {

},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function() {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function() {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

}
})