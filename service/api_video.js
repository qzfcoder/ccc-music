import ttRequest from './index'

export function getTopMV(offset, limit) {
    return ttRequest.get('/top/mv', {
        offset: 0,
        limit: 10
    })
}