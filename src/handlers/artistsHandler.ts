type artist = {
  id: string
  name: string
  group?: string
  number_in_group: number
}

export const resortArtistsByGroups = (artists: artist[]) => {
  const groups: any[] = []

  artists.forEach(artist => {
    const {group, ...rest} = artist

    const artistGroup = groups.find(g => g.name === group)

    if (!artistGroup) {
      groups.push({
        name: group,
        artists: [
          {...rest}
        ],
      })
    } else {
      artistGroup.artists.push({
        ...rest
      })
    }
  })

  groups.forEach(g =>
    g.artists.sort((a, b) =>
      a.number_in_group > b.number_in_group
    )
  )

  return groups
}
