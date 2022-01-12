import {
  HYEventStore
} from 'hy-event-store'

import {
  getRankings
} from '../service/api_music'

const rankingMap = {
  0: "newRanking",
  1: "hotRanking",
  2: "originRanking",
  3: "upRanking",
}
const rankingStore = new HYEventStore({
  state: {
    newRanking: {},
    hotRanking: {},
    originRanking: {},
    upRanking: {},
  },
  actions: {
    getRankingDataAction(ctx) {
      // 0: 新歌榜 1： 热门榜  2： 原创榜 3： 飙升榜
      for (let i = 0; i < 4; i++) {
        getRankings(i).then(res => {
          // ctx.hotRanking = res.playlist
          const rankingName = rankingMap[i]
          ctx[rankingName] = res.playlist
          // switch (i) {
          //   case 0:
          //     ctx.newRanking = res.playlist
          //     break
          //   case 1:
          //     ctx.hotRanking = res.playlist
          //     break
          //   case 2:
          //     ctx.orignRanking = res.playlist
          //     break
          //   case 3:
          //     ctx.upRanking = res.playlist
          //     break
          // }
        })
      }
    }

  }
})

export {
  rankingStore
}