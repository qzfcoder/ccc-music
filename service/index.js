const BASE_URL = "http://123.207.32.32:9001"
class TTRequest {
    request(url, method, param) {
        return new Promise((request, reject) => {
            wx.request({
                url: BASE_URL + url,
                method: method,
                data: param,
                success: function (res) {
                    request(res.data)
                },
                fail: function (err) {
                    request(err)
                }
            })
        })
    }
    get(url, params) {
        return this.request(url, "GET", params)
    }
    post(url, data) {
        return this.request(url, "POST", data)
    }
}

const ttRequest = new TTRequest()

export default ttRequest