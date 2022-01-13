import ttRequest from './index'

export function getBanner(type = 2) {
    return ttRequest.get('/banner', {
        type: type,
    })
}
export function getRankings(idx) {
    return ttRequest.get("/top/list", {
        idx
    })
}

export function getSongMenuList(cat = "全部", limit = 6, offset = 0) {
    return ttRequest.get("/top/playlist", {
        cat,
        limit,
        offset
    })
}
export function getSongMenuDetail(id) {
    return ttRequest.get("/playlist/detail/dynamic", {
      id
    })
  }