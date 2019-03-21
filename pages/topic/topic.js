var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:false,
    topic_content: "",
    title: "",
    author: "",
    replycontent: "11",
    focus:false,
    replyname:'',
    topicid:''
  },
  toreply(event){
    let replyname = event.currentTarget.dataset['index'];
    this.setData({ focus: true, replyname: "@"+replyname+" "});
    console.log(replyname);
  },
  bindinput(e){
    this.setData({
      replycontent: e.detail.value
    })
  },
  postreply(){
    let userCode = wx.getStorageSync('loginid');
    let that=this;
    console.log(that.data.replycontent);
    if (that.data.replycontent!=''){
      wx.request({
        url: 'https://cnodejs.org/api/v1/topic/' + that.data.topicid + "/replies",
        data: {
          accesstoken: userCode,
          content:that.data.replycontent
        },
        header: {},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          wx.showToast({
            title: '回复成功',
            icon: 'success',
            duration: 1000
          })
          that.onLoad({ 'id': that.data.topicid});
        },
        fail: function(res) {
          wx.showToast({
            title: '回复失败',
            icon: 'success',
            duration: 1000
          })
        },
        complete: function(res) {},
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let topic_id = options.id;
    this.setData({ topicid: topic_id});
    let that = this;
    wx.request({
      url: 'https://cnodejs.org/api/v1/topic/' + topic_id,
      data: {},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        let contents = res.data.data.content;
        let replies = res.data.data.replies;
        replies.forEach(
          (item) => {
            // console.log(item);
            item.content = item.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"');
          });
        // replies = replies.map((item) => { return item.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"');});
        // for(var i=0;i<=replies.length-1;i++){
        //   replies[i].content = replies[i].content.replace(/\<img/gi, '< img style="max-width:100%;height:auto"')
        // } 
        contents = contents.replace(/\<img/gi, '<img style="max-width:100%;height:auto"'); //这一行是好的
        that.setData({
          topic_content: contents,
          title: res.data.data.title,
          author: res.data.data.author,
          reply: replies
        });
      },
      fail: function(res) {
        that.setData({
          topic_content: "fail"
        })
        console.log("fail");
      },
      complete: function(res) {},
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({ islogin: app.globalData.isLogin});
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