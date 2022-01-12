// pages/swiper/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 轮播图二当前突出图片索引
        currentIndex4: 0,
        swiperTwoInfo: [{
                key: '21',
                imgSrc: 'http://p3.music.126.net/nNg4YjkcK1AwCX1FrN8VOQ==/109951166578333625.jpg'
            },
            {
                key: '22',
                imgSrc: 'http://p4.music.126.net/zaLqUvz-C_H1u4n8-0MQcw==/109951166868150028.jpg'
            },
            {
                key: '233',
                imgSrc: 'http://p3.music.126.net/yN1ke1xYMJ718FiHaDWtYQ==/109951165076380471.jpg'
            },
        ],
    },

    /* 实现控制中间凸显图片的样式 */
    handleChangeTwo: function (e) {
        this.setData({
            currentIndex4: e.detail.current
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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