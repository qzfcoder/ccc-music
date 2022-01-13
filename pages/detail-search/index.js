// pages/detail-search/index.js
import {
    getSearchHot,
    getSearchSuggest,
    getSearchResult
} from '../../service/api_search'
import {
    debounce
} from '../../utils/debounce'
import stringToNodes from '../../utils/string2nodes'
const debounceGetSearchSuggest = debounce(getSearchSuggest)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotKeywords: [],
        suggestSongs: [],
        searchValue: '',
        suggestSongsNodes: [],
        resultSongs: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPageData()
    },
    getPageData: function () {
        getSearchHot().then(res => {
            this.setData({
                hotKeywords: res.result.hots
            })
        })
    },
    handleSearchChange: function (event) {
        const searchValue = event.detail
        this.setData({
            searchValue: searchValue
        })
        if (!searchValue.length) {
            this.setData({
                suggestSongs: []
            })
            return
        }
        debounceGetSearchSuggest(searchValue).then(res => {
            const suggestSongs = res.result.allMatch
            this.setData({
                suggestSongs: res.result.allMatch
            })
            const suggestKeywords = suggestSongs.map(item => item.keyword)
            const suggestSongsNodes = []
            for (const keyword of suggestKeywords) {
                const nodes = stringToNodes(keyword, searchValue)
                suggestSongsNodes.push(nodes)
            }
            this.setData({
                suggestSongsNodes
            })
        })
    },
    handleSearchAction: function () {
        getSearchResult(this.data.searchValue).then(res => {
            this.setData({
                resultSongs: res.result.songs
            })
        })
    },
    // handleSuggestItemClick: function (event) {
    //     this.setData({
    //         searchValue: event.currentTarget.dataset.item.keyword
    //     })
    //     this.handleSearchAction()
    // },
    // handleTagItemClick: function (event) {
    //     console.log(event)
    //     this.setData({
    //         searchValue: event.currentTarget.dataset.item
    //     })
    //     this.handleSearchAction()
    // },
    handleKeywordItemClick: function (event) {
        console.log(event)
        this.setData({
            searchValue: event.currentTarget.dataset.item
        })
        this.handleSearchAction()
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