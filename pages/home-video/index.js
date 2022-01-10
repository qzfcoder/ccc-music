// pages/home-video/index.js
import {
    getTopMV,
    getMVUrl,
    getMVDetail
} from '../../service/api_video'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topMVs: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const res = await getTopMV(0)
        this.setData({
            topMVs: res.data
        })
        // getTopMV(0, 10).then(res => {
        //     this.setData({
        //         topMVs: res.data.data
        //     })
        // })
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