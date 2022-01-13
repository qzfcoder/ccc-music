import ttRequest from './index'

export function getSearchHot() {
    return ttRequest.get('/search/hot')
}

export function getSearchSuggest(keywords) {
    return ttRequest.get("/search/suggest", {
      keywords,
      type: "mobile"
    })
  }
  
  export function getSearchResult(keywords) {
    return ttRequest.get("/search", {
      keywords
    })
  }