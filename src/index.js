import {getData} from './until'
function render(container, state) {
  const {data} = state
  let listHtml = ''
  if (data.length > 0) {
    let itemsHtml = data
      .map(item => {
        return createListItem(item)
      })
      .join()
    listHtml = `<ul class="list" >${itemsHtml}</ul>`
  }
  let searchHtml = '<input id="search" />'
  let buttonsHtml = `<div>
    <button id='before'>上一页</button>
    <button id='after'>下一页</button>
  </div>`
  let appHtml = searchHtml + listHtml + buttonsHtml
  container.innerHTML = appHtml
  document.getElementById('search').addEventListener('input', async event => {
    let data = await getData({
      query: event.target.value,
      limit: 10,
      page: 1,
    })
    console.log(data)
    // setState(container, state, {data: state.data.concat(data)})
  })
}
function createListItem(element) {
  console.log(element)
  const template = `<li class='item'>
    <img src='${element.image_url}' onerror="this.src='./error.jpeg'; this.onerror=null;"  />
    <p>${element.title}</p>
  </li>`
  return element
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
  console.log(data)
  const state = {data: data.results, page: 1}
  const container = document.getElementById('app')
  render(container, state)
}

initialize()
