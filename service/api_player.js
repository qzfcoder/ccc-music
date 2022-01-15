import ttRequest from './index'

export function getSongDetail(ids) {
    return ttRequest.get('/song/detail', {
        ids
    })
}
export function getSongLyric(id) {
    return ttRequest.get('/lyric', {
        id
    })
}
