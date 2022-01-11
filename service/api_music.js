import ttRequest from './index'

export function getBanner(type = 2) {
    return ttRequest.get('/banner', {
        type: type,
    })
}