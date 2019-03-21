 // components/Content/Content.js
var that;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    topic_list: "asdfasdfasdf",
    page: 1,
    tab: "all",
    scrollH: 450,
    top: 500,
    topbuttom: true,
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    get_top_list() {
      wx.request({
        url: 'https://cnodejs.org/api/v1/topics',
        data: {
          page: that.data.page,
          tab: that.data.tab
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          let topicdata = res.data.data;
          that.setData({
            topic_list: topicdata
          });
          console.log(that.data.topic_list);
        },
        fail: function(res) {
          console.log("fail");
        },
        complete: function(res) {},
      })
    },
    changetap(e) {
      that.setData({
        tab: e.target.dataset.current
      })
      that.get_top_list();
    },
    changepage() {
      let oldtopicdata = that.data.topic_list;
      let addpage = that.data.page
      that.setData({
        page: ++addpage
      })
      wx.request({
        url: 'https://cnodejs.org/api/v1/topics',
        data: {
          page: that.data.page,
          tab: that.data.tab
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          let topicdata = oldtopicdata;
          topicdata = topicdata.concat(res.data.data);
          // console.log(topicdata.length);
          that.setData({
            topic_list: topicdata
          });
          // console.log(topicdata.length);
        },
        fail: function(res) {
          that.setData({
            topic_list: "fail"
          });
          console.log("fail");
        },
        complete: function(res) {},
      })
    },
    scrollchange(e) {
      if (e.detail.scrollTop >= 200) {
        that.setData({
          topbuttom: false
        });
      } else {
        that.setData({
          topbuttom: true
        });
      }
      // console.log(e.detail.scrollTop);
    },
    goTop() {
      that.setData({
        top: 0
      });
    },

  },
  attached() {
    that = this;
    that.get_top_list();
  }
})