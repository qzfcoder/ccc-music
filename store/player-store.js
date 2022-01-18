import {
  getSongDetail,
  getSongLyric
} from '../service/api_player'
import {
  parseLyric
} from '../utils/parseLyric'

const audioContext = wx.createInnerAudioContext()
import {
  HYEventStore
} from 'hy-event-store'
const playerStore = new HYEventStore({
  state: {
    id: 0,
    // 网络请求的数据
    currentSong: {},
    lyricInfos: [],
    duration: 0,

    currentTime: 0,
    currentLyricIndex: 0,
    currentLyricText: '',

    playModeIndex: 0, // 0 循环播放 1 单曲循环 2 随机播放

    isPlay: false,

    playListSongs: [],
    playListIndex: 0
  },
  actions: {
    playMusicWithSongIdAction(ctx, {
      id,
      isRefresh = false
    }) {
      if (ctx.id === id && !isRefresh) {
        this.dispatch("changeMusicPlayStatus", true)
        return
      }
      ctx.id = id
      ctx.isPlay = true

      ctx.currentSong = {}
      ctx.duration = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ""
      // ctx.playModeIndex = 0
      // 1、请求数据
      // 请求歌曲详情
      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.duration = res.songs[0].dt
      })
      // 请求歌词信息
      getSongLyric(id).then(res => {
        const lyricString = res.lrc.lyric
        const lyrics = parseLyric(lyricString)
        ctx.lyricInfos = lyrics
      })
      // 2、播放歌曲
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true

      this.dispatch("setupAudioContextListenerAction")

    },
    setupAudioContextListenerAction(ctx) {
      audioContext.onCanplay(() => {
        audioContext.play()
        // audioContext.stop()
      })
      //监听时间的改变
      audioContext.onTimeUpdate(() => {
        // 获取当前时间
        const currentTime = audioContext.currentTime * 1000
        //根据当前时间修改currentTime
        ctx.currentTime = currentTime

        if (!ctx.lyricInfos) return
        // 根据时间找到歌词
        for (let i = 0; i < ctx.lyricInfos.length; i++) {
          const lyricInfo = ctx.lyricInfos[i]
          if (currentTime < lyricInfo.time) {
            // console.log(i)
            const currentIndex = i - 1
            const currentLyricInfo = ctx.lyricInfos[currentIndex].lyricText
            if (ctx.currentLyricText !== currentLyricInfo) {
              // console.log(currentIndex)
              ctx.currentLyricText = currentLyricInfo
              ctx.currentLyricIndex = currentIndex
            }
            break
          }
        }
      })
      audioContext.onEnded(()=>{
        this.dispatch("changeNewMusicAction")
      })
    },
    changeMusicPlayStatus(ctx, isPlaying = true) {
      console.log(ctx.playModeIndex)
      ctx.isPlay = isPlaying
      if (ctx.isPlay) {
        audioContext.play()
      } else {
        audioContext.pause()
      }
    },
    changeMusicAction(ctx) {
      console.log("切换歌曲")
    },
    changeNewMusicAction(ctx, isNext = true) {
      // 1.获取当前索引
      let index = ctx.playListIndex

      // 2.根据不同的播放模式, 获取下一首歌的索引
      switch (ctx.playModeIndex) {
        case 0: // 顺序播放
          index = isNext ? index + 1 : index - 1
          if (index === -1) index = ctx.playListSongs.length - 1
          if (index === ctx.playListSongs.length) index = 0
          break
        case 1: // 单曲循环
          break
        case 2: // 随机播放
          index = Math.floor(Math.random() * ctx.playListSongs.length)
          break
      }

      console.log(index)

      // 3.获取歌曲
      let currentSong = ctx.playListSongs[index]
      if (!currentSong) {
        currentSong = ctx.currentSong
      } else {
        // 记录最新的索引
        ctx.playListIndex = index
      }

      // 4.播放新的歌曲
      this.dispatch("playMusicWithSongIdAction", {
        id: currentSong.id,
        isRefresh: true
      })
    }
  }
})
export {
  audioContext,
  playerStore
}