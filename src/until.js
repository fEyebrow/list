function get(url) {
  return fetch(url, {
    method: 'GET',
  }).then(response => response.json())
}

export function getData({query = '', limit = 10, page = 1}) {
  let url = `https://api.jikan.moe/v3/search/anime?
  q=${query}&limit=${limit}&page=${page}`
  return get(url)
}
