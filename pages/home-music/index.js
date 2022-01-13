// pages/home-music/index.js
import {
  rankingStore,
} from '../../store/index'

import {
  getBanner,
  getSongMenuList
} from '../../service/api_music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'

const throttleQueryRect = throttle(queryRect, 1000)

Page({
  data: {
    swiperHeight: 0,
    banners: [],
    hotSongMenu: [],
    recommendSongMenu: [],
    recommendSongs: [],
    // rankings: []
    rankings: {
      0: {},
      2: {},
      3: {}
    },
  },

  onLoad: function (options) {
    // 获取页面数据
    this.getPageData()

    // // 发起共享数据的请求
    rankingStore.dispatch("getRankingDataAction")

    // 从store获取共享的数据
    rankingStore.onState("hotRanking", (res) => {
      if (!res.tracks) return
      const recommendSongs = res.tracks.slice(0, 6)
      this.setData({
        recommendSongs
      })
    })
    // rankingStore.onState("newRanking", this.getNewRankingHandler)
    rankingStore.onState("newRanking", this.getRankingHandler(0))
    rankingStore.onState("originRanking", this.getRankingHandler(2))
    rankingStore.onState("upRanking", this.getRankingHandler(3))
  },
  handleMoreClick: function () {
    this.navigateToDetailSongPage("hotRanking")
  },
  handleRankingItemClick: function (event) {
    const rankingMap = {
      0: "newRanking",
      1: "hotRanking",
      2: "originRanking",
      3: "upRanking",
    }
    const idx = Number(event.currentTarget.dataset.idx)
    this.navigateToDetailSongPage(rankingMap[idx])
  },
  navigateToDetailSongPage: function (rankingName) {
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranking=${rankingName}&type=rank`,
    })
  },
  // 网络请求
  getPageData: function () {
    getBanner().then(res => {
      // setData是同步的还是异步的
      // setData在设置data数据上, 是同步的
      // 通过最新的数据对wxml进行渲染, 渲染的过程是异步
      this.setData({
        banners: res.banners
      })

      // react -> setState是异步
      // this.setState({ name: })
      // console.log(this.state.name)
    })
    getSongMenuList().then(res => {
      this.setData({
        hotSongMenu: res.playlists
      })
    })
    getSongMenuList("华语").then(res => {
      this.setData({
        recommendSongMenu: res.playlists
      })
    })
  },

  // 事件处理
  handleSearchClick: function () {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },
  handleToSwiper: function () {
    wx.navigateTo({
      url: '/pages/swiper/index',
    })
  },
  handleSwiperImageLoaded: function () {
    // 获取图片的高度(如果去获取某一个组件的高度)
    throttleQueryRect(".swiper-image").then(res => {
      const rect = res[0]
      this.setData({
        swiperHeight: rect.height
      })
    })
  },

  onUnload: function () {
    // rankingStore.offState("newRanking", this.getNewRankingHandler)
  },


  getRankingHandler: function (idx) {
    return (res) => {
      if (Object.keys(res).length === 0) return
      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const songList = res.tracks.slice(0, 3)
      const rankingObj = {
        name,
        coverImgUrl,
        playCount,
        songList
      }
      const newRankings = {
        ...this.data.rankings,
        [idx]: rankingObj
      }
      this.setData({
        rankings: newRankings
      })
    }
  },
  // getNewRankingHandler: function (res) {
  //   if (Object.keys(res).length === 0) return
  //   const name = res.name
  //   const coverImgUrl = res.coverImgUrl
  //   const songList = res.tracks.slice(0, 3)
  //   const rankingObj = {
  //     name,
  //     coverImgUrl,
  //     songList
  //   }
  //   const originRankings = [...this.data.rankings]
  //   originRankings.push(rankingObj)
  //   this.setData({
  //     rankings: originRankings
  //   })
  // }
})