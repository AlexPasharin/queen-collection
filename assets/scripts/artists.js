window.onload = () => {
  const artistList = document.getElementById('artist-list')

  // note - artistList.children is a live HTML collection, not array
  // [...] is an ES6 way to convert it to an array
  const artistNodes = [...artistList.children]

  artistNodes.forEach(el => {
    const entryTypesEl = el.getElementsByClassName('entry-typies')[0]
    const id = el.dataset.artistId

    el.addEventListener('click', () => {
      if (!entryTypesEl.classList.contains('hidden')) {
        entryTypesEl.classList.add('hidden')
        return
      }

      getArtistsTypes(id)
        .then(types => {
          const typeList = document.createElement('ul')

          types.forEach(t => {
            const {id, name} = t
            const typeLi = document.createElement('li')
            typeLi.innerHTML = `${name}s`
            typeList.appendChild(typeLi)
          })

          const entryTypesElChildren = [...entryTypesEl.children]
          entryTypesElChildren.forEach(c => {
            entryTypesEl.removeChild(c)
          })

          entryTypesEl.appendChild(typeList)
          entryTypesEl.classList.remove('hidden')
        })
    })
  })
}

const getArtistsTypes = (artistID) =>
  fetch(`/types?artist=${artistID}`)
    .then(data => data.json())
