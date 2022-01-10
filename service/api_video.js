import ttRequest from './index'

export function getTopMV(offset, limit = 10) {
    return ttRequest.get('/top/mv', {
        offset: 0,
        limit: 10
    })
}

export function getMVUrl(id) {
    return ttRequest.get('/mv/url', {
        id
    })
}
// 请求mv详情
export function getMVDetail(mvid) {
    return ttRequest.get('/mv/detail', {
        mvid
    })
}