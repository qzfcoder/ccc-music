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
    // 网络请求的数据
    currentSong: {},
    lyricInfos: [],
    duration: 0,

    currentTime: 0,
    currentLyricIndex: 0,
    currentLyricText: '',

    playModeIndex: 0, // 0 循环播放 1 单曲循环 2 随机播放

    isPlay: false
  },
  actions: {
    playMusicWithSongIdAction(ctx, {
      id
    }) {
      ctx.isPlay = true
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
              console.log(currentIndex)
              ctx.currentLyricText = currentLyricInfo
              ctx.currentLyricIndex = currentIndex
            }
            break
          }
        }
      })
    },
    changeMusicPlayStatus(ctx) {
      ctx.isPlay = !ctx.isPlay
      if (ctx.isPlay) {
        audioContext.play()
      } else {
        audioContext.pause()
      }
    }
  }
})
export {
  audioContext,
  playerStore
}