const Knex = require('knex')

const show = obj => console.log(JSON.stringify(obj, null, 4))

const knex = Knex({
  client: 'mysql',
  connection: {
    user: 'root',
    database: 'QueenCollection'
  }
})

const getReleases = entry =>
  knex
    .select()
    .from('Release')
    .where({
      entry_id: entry
    })

const getFormats = () => knex('Format').select()

const entry = 2
const artist = 1

const A = [
  {
    name: 'Brighton Rock',
    version: 'album version',
    compositor: ['Brian May']
  },
  {
    name: 'Killer Queen',
    version: 'album version',
    compositor: ['Freddie Mercury']
  },
  {
    name: 'Tenement Funster',
    version: 'album version',
    compositor: ['Roger Taylor']
  },
  {
    name: 'Flick Of The Wrist',
    version: 'album version',
    compositor: ['Freddie Mercury']
  },
  {
    name: 'Lily Of The Valley',
    version: 'album version',
    compositor: ['Freddie Mercury']
  },
  {
    name: "Now I'm Here",
    version: 'album version',
    compositor: ['Brian May']
  },
]

const B = [
  {
    name: 'In The Lap Of The Gods',
    version: 'album version',
    compositor: ['Freddie Mercury']
  },
  {
    name: 'Stone Cold Crazy',
    version: 'album version',
    compositor: ['Freddie Mercury', 'Brian May', 'Roger Taylor', 'John Deacon']
  },
  {
    name: 'Dear Friends',
    version: 'album version',
    compositor: ['Freddie Mercury']
  },
  {
    name: 'Misfire',
    version: 'album version',
    compositor: ['John Deacon']
  },
  {
    name: 'Bring Back That Leroy Brown',
    version: 'album version',
    compositor: ['Freddie Mercury']
  },
  {
    name: 'She Makes Me (Stormtrooper In Stilettoes)',
    version: 'album version',
    compositor: ['Brian May']
  },
  {
    name: 'In The Lap Of The Gods... revisited',
    version: 'album version',
    compositor: ['Freddie Mercury']
  },
  {
    name: 'Stone Cold Crazy',
    releases: [{
      version: '1991 Remix By Michael Wagener',
      release_ids: [247]
    }],
  },
]

const places = [
  {
    name: "Bonus EP",
    release_id: 229,
    tracks:
      [{
        name: 'Keep Yourself Alive',
        version: 'De Lane Lea Demo',
        compositor: ['Brian May'],
        subversion: '2011 remaster by Adam Ayan'
      },
      {
        name: 'The Night Comes Down',
        version: 'De Lane Lea Demo',
        compositor: ['Brian May'],
        subversion: '2011 remaster by Adam Ayan'
      },
      {
        name: 'Great King Rat',
        version: 'De Lane Lea Demo',
        compositor: ['Freddie Mercury'],
        subversion: '2011 remaster by Adam Ayan'
      },
      {
        name: 'Jesus',
        version: 'De Lane Lea Demo',
        compositor: ['Freddie Mercury'],
        subversion: '2011 remaster by Adam Ayan'
      },
      {
        name: 'Liar',
        version: 'De Lane Lea Demo',
        compositor: ['Freddie Mercury'],
        subversion: '2011 remaster by Adam Ayan'
      },
      {
        name: 'Mad The Swine',
        version: '1991 remix',
        compositor: ['Freddie Mercury'],
        subversion: '2011 remaster by Adam Ayan',
        dontAddTrack: true
      }]
  }
]

const tracks = [...A, ...B]

let placesTracks = []

for (let p of places) {
  placesTracks = [...placesTracks, ...p.tracks]
}

const newTracks = []  // [...tracks, ...placesTracks].filter(t => t.compositor)

const getCompositionIDByName = async name => {
  const composition = await knex('Composition')
    .select('id')
    .first()
    .where({ name })
    .then(({ id }) => id)

  return composition
}

const addCompositionIDToTracks = tracks =>
  tracks.map(async t => ({
    ...t,
    id: await getCompositionIDByName(t.name)
  }))

const getTrackIDByNameAndVersion = async (name, version) => {
  const composition_id = await getCompositionIDByName(name)

  return knex('Track')
    .select('id')
    .where({
      composition_id,
      version
    })
    .first()
    .then(({ id }) => id)
}

const flatten = arr =>
  arr.reduce((acc, next) => [...acc, ...next], [])

const addTracks = async (stop) => {
  //insert new compositions
  await knex('Composition').insert(newTracks.map(t => ({
    name: t.name
  })))

  // add compositors
  await Promise.all(newTracks
    .map(t =>
      knex('Composition')
        .select('id')
        .where({ name: t.name })
        .first()
        .then(async ({ id }) => {
          const authors = await Promise.all(t.compositor.map(c =>
            knex('Artist').select('id').first().where({ name: c })
          ))

          return knex('Compositor').
            insert(authors.map(a => ({
              composition_id: id,
              author_id: a.id
            })))
        })
    ))

  if (!stop) return

  // add tracks

  // add composition id's to tracks
  const enhancedTracks = await Promise.all(addCompositionIDToTracks(tracks))

  const versions = enhancedTracks.filter(t => !!t.version).map(t => ({
    composition_id: t.id,
    alt_name: t.r_name,
    version: t.version,
    performer_id: artist
  }))

  const alt_versions = enhancedTracks
    .filter(t => !!t.releases)
    .map(t => t.releases.map(r => ({
      composition_id: t.id,
      alt_name: t.r_name,
      version: r.version,
      performer_id: artist
    })))
    .reduce((acc, versions) => [...acc, ...versions], [])

  const enhancedPlaceTracks = await Promise.all(places.map(async p => ({
    ...p,
    tracks: await Promise.all(addCompositionIDToTracks(p.tracks))
  })
  ))

  const placeVersions = enhancedPlaceTracks.reduce((acc, place) =>
    ([...acc, ...place.tracks])
    , []).filter(t => !t.dontAddTrack).map(t => ({
      composition_id: t.id,
      alt_name: t.r_name,
      version: t.version,
      performer_id: artist
    }))

  // await knex('Track').insert(versions)
  // await knex('Track').insert(alt_versions)
  //  await knex('Track').insert(placeVersions)

  // const enhancedPlaces = await Promise.all(places.map(async place => {
  //   const newTracks

  //   return ({
  //     ...place,
  //     tracks: enhancedPlaceTracks
  //   })
  // }))

  // await Promise.all(places.map(p => knex('Track').insert(
  //   p.tracks
  // )

  // add releases tracks
  const [
    releases,
    formats,
    versionTracks
  ] = await Promise.all([
    getReleases(entry),
    getFormats(),
    Promise.all(enhancedTracks.map(async t => {
      const baseTrack = t.version ? await knex('Track')
        .select()
        .where({
          composition_id: t.id,
          version: t.version
        })
        .first()
        .then(result => ({
          track_id: result.id
        }))
        :
        { track_id: null }

      let releasesTracks

      if (t.releases) {
        releasesTracks = await Promise.all(t.releases.map(r =>
          knex('Track')
            .select()
            .where({
              composition_id: t.id,
              version: r.version
            })
            .first()
            .then(result => ({
              track_id: result.id,
              release_ids: r.release_ids
            }))
        ))
      }

      return ({
        ...baseTrack,
        releases: releasesTracks
      })
    }))
  ])

  for (let release of releases) {
    const hasSides = (formats.find(f => f.id === release.format)).hasSides === 1

    let r_tracks

    if (hasSides) {
      const aTracks = versionTracks.slice(0, A.length).map((t, idx) => {
        let track_id = t.track_id

        if (t.releases) {
          const version = t.releases.find(r => r.release_ids.includes(release.id))

          if (version) {
            track_id = version.track_id
          }
        }

        return ({
          release_id: release.id,
          track_id,
          number: 'A' + (idx + 1)
        })
      }).filter(t => t.track_id !== null)

      const bTracks = versionTracks.slice(A.length).map((t, idx) => {
        let track_id = t.track_id

        if (t.releases) {
          const version = t.releases.find(r => r.release_ids.includes(release.id))

          if (version) {
            track_id = version.track_id
          }
        }
        return ({
          release_id: release.id,
          track_id,
          number: 'B' + (idx + 1)
        })
      }).filter(t => t.track_id !== null)

      r_tracks = [...aTracks, ...bTracks]
    } else {
      r_tracks = versionTracks.map((t, idx) => {
        let track_id = t.track_id

        if (t.releases) {
          const version = t.releases.find(r => r.release_ids.includes(release.id))

          if (version) {
            track_id = version.track_id
          }
        }
        return ({
          release_id: release.id,
          track_id,
          number: idx + 1 < 10 ? "0" + (idx + 1) : "" + (idx + 1)
        })
      }).filter(t => t.track_id !== null)
    }

    // console.log({ release_id: release.id })
    // console.log(JSON.stringify(r_tracks, null, 4))
    // console.log()
    // console.log()
    // console.log()

    //    await knex('Release_track').insert(r_tracks)
  }

  const placeReleaseTracks = await Promise.all(places.map(async p =>
    await Promise.all(p.tracks.map(async (pt, idx) => ({
      place: p.name,
      release_id: p.release_id,
      subversion: pt.subversion,
      track_id: await getTrackIDByNameAndVersion(pt.name, pt.version),
      number: idx + 1 < 10 ? "0" + (idx + 1) : "" + (idx + 1)
    })))
  ))

  //  show(flatten(placeReleaseTracks))
  await knex('Release_track').insert(flatten(placeReleaseTracks))
}

const script = () => addTracks(true)

script()//
  //.then(console.log)
  .then(knex.destroy)
  .catch(e => {
    knex.destroy()

    throw e
  })
