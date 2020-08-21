import {getData} from './until'
function render(container, state) {
  const {data, page, searchStr} = state
  let listHtml = ''
  if (data.length > 0) {
    let itemsHtml = data
      .map(item => {
        return createListItem(item)
      })
      .join()
    listHtml = `<ul class="list" >${itemsHtml}</ul>`
  }
  let searchHtml = '<div><input id="search" /><button id="go">go</button></div>'
  let buttonsHtml = `<div>
    <button id='before'>上一页</button>
    <button id='after'>下一页</button>
  </div>`
  let appHtml = searchHtml + listHtml + buttonsHtml
  container.innerHTML = appHtml
  let input = document.getElementById('search')
  input.value = searchStr
  input.addEventListener('change', event => {
    let value = event.target.value
    setState(container, state, {searchStr: value})
  })
  document.getElementById('go').addEventListener('click', async () => {
    let data = await getData({
      query: searchStr,
      limit: 10,
      page: 1,
    })
    setState(container, state, {data: state.data.concat(data.results)})
  })
  let beforeButton = document
    .getElementById('before')
    .addEventListener('click', async () => {
      console.log('click', page)
      if (page <= 1) {
        return
      }
      let data = await getData({
        query: searchStr,
        limit: 10,
        page: page,
      })
      setState(container, state, {data: state.data.concat(data.results)})
    })
  let afterButton = document
    .getElementById('after')
    .addEventListener('click', async () => {
      let data = await getData({
        query: searchStr,
        limit: 10,
        page: page + 1,
      })
      setState(container, state, {data: state.data.concat(data.results)})
    })
}
function createListItem(element) {
  const template = `<li class='item'>
    <img src='${element.image_url}' onerror="this.src='./error.jpeg'; this.onerror=null;"  />
    <p>${element.title}</p>
  </li>`
  return template
}

function setState(container, oldState, change) {
  let newState = Object.assign(oldState, change)
  render(container, newState)
}
async function initialize() {
  let data = await getData({
    query: '我',
    limit: 10,
    page: 1,
  })
  const state = {data: data.results, page: 1, searchStr: ''}
  const container = document.getElementById('app')
  render(container, state)
}

initialize()
