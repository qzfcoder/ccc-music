import {
    getMVDetail,
    getMVUrl,
    getRelatedVideo
} from "../../service/api_video"

// pages/detail-view/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mvURLInfo: {},
        mvDetail: {},
        relateVideos: [],
        danmuList: [{
            text: '第 1s 出现的弹幕',
            color: '#ff0000',
            time: 1
        }, {
            text: '第 3s 出现的弹幕',
            color: '#ff00ff',
            time: 3
        }],
    },
    // 点击事件
    handleVideoItemClick: function (event) {
        const id = event.currentTarget.dataset.item.vid
        console.log('点击', event.currentTarget.dataset.item.vid)
        wx.navigateTo({
            url: '/pages/detail-video/index?id=' + id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const id = options.id
        console.log(id)
        // 请求播放地址
        this.getPageData(id)

    },
    getPageData: function (id) {
        getMVUrl(id).then(res => {
            this.setData({
                mvURLInfo: res.data
            })
        })
        // 请求视频信息
        getMVDetail(id).then(res => {
            this.setData({
                mvDetail: res.data
            })
        })
        // 请求相关视频
        getRelatedVideo(id).then(res => {
            this.setData({
                relateVideos: res.data
            })
        })
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

    }
})