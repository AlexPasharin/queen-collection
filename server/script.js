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

const entry = 14
const artist = 1

const A =
  [{
    name: 'One Vision',
    version: 'album version',
    compositor: ['Brian May', 'Roger Taylor', 'Freddie Mercury', 'John Deacon']
  },
  {
    name: 'A Kind Of Magic',
    version: 'album version',
    compositor: ['Roger Taylor']
  },
  {
    name: 'One Year Of Love',
    version: 'album version',
    compositor: ['John Deacon']
  },
  {
    name: 'Pain Is So Close To Pleasure',
    version: 'album version',
    compositor: ['Freddie Mercury', 'John Deacon']
  },
  {
    name: 'Friends Will Be Friends',
    version: 'album version',
    compositor: ['Freddie Mercury', 'John Deacon']
  },
  ]
const B = [{
  name: 'Who Wants To Live Forever',
  version: 'album version',
  compositor: ['Brian May']
},
{
  name: 'Gimme The Prize',
  version: 'album version',
  compositor: ['Brian May']
},
{
  name: 'Don\'t Lose Your Head',
  version: 'album version',
  compositor: ['Roger Taylor']
},
{
  name: 'Princes Of The Universe',
  version: 'album version',
  compositor: ['Freddie Mercury']
},
{
  name: 'A Kind Of Magic',
  r_name: 'A Kind Of \'A Kind Of Magic\'',
  releases: [{
    version: 'A Kind Of \'A Kind Of Magic\' - Extended Edit',
    release_ids: [203, 268, 556]
  }],
},
{
  name: 'Friends Will Be Friends',
  r_name: 'Friends Will Be Friends Will Be Friends...',
  releases: [{
    version: 'Friends Will Be Friends Will Be Friends... - Extended Edit',
    release_ids: [203, 268, 556]
  }],
},
{
  name: 'Who Wants To Live Forever',
  r_name: 'Forever',
  releases: [{
    version: 'Forever - piano version',
    release_ids: [203, 268, 556, 256]
  }],
},
{
  name: 'One Vision',
  releases: [{
    version: 'Extended Vision',
    release_ids: [256]
  }],
},
]

const places = [
  {
    name: "Bonus EP",
    release_id: 240,
    tracks:
      [{
        name: 'A Kind Of Magic',
        version: 'Highlander Version',
        subversion: '2011 remaster by Adam Ayan'
      },
      {
        name: 'One Vision',
        version: 'single edit',
        subversion: '2011 remaster by Adam Ayan'
      },
      {
        name: 'Pain Is So Close To Pleasure',
        version: 'single remix',
        subversion: '2011 remaster by Adam Ayan'
      },
      {
        name: 'Who Wants To Live Forever',
        version: 'Forever - piano version',
        subversion: '2011 remaster by Adam Ayan',
        dontAddTrack: true
      },
      {
        name: 'A Kind Of Magic',
        r_name: 'A Kind Of Vision',
        version: 'Demo August 1985'
      },
      {
        name: 'One Vision',
        version: 'Live at Wembley Stadium 11.7.1986',
        subversion: '2011 remaster bonus track'
      },
      {
        name: 'Friends Will Be Friends',
        version: 'Friends Will Be Friends Will Be Friends... - Extended Edit',
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

const newTracks = [...tracks, ...placesTracks].filter(t => t.compositor)

const getCompositionIDByName = async name => {
  const composition = await knex('Composition')
    .select('id')
    .first()
    .where({ name })
    .then(res => res.id)
    .catch(() => console.log("choked on " + name))

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

const addTracks = async () => {
  //insert new compositions
  await knex('Composition').insert(newTracks.map(t => ({
    name: t.name
  })))

  console.log("Added compositions")

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

  console.log("Added compositors")

  // add tracks

  // add composition id's to tracks
  const enhancedTracks = await Promise.all(addCompositionIDToTracks(tracks))

  const versions = enhancedTracks.filter(t => !!t.version).map(t => ({
    composition_id: t.id,
    alt_name: t.r_name,
    version: t.version,
    performer_id: t.performer_id || artist
  }))

  const alt_versions = enhancedTracks
    .filter(t => !!t.releases)
    .map(t => t.releases.map(r => ({
      composition_id: t.id,
      alt_name: t.r_name,
      version: r.version,
      performer_id: r.performer_id || artist
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
      performer_id: t.performer_id || artist
    }))

  await knex('Track').insert(versions)
  console.log("Added versions")
  await knex('Track').insert(alt_versions)
  console.log("Added alt versions")
  await knex('Track').insert(placeVersions)
  console.log("Added place versions")

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

    await knex('Release_track').insert(r_tracks)

    console.log("Added releases for " + release.id)
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
  console.log("added places tracks")
}

const script = () => addTracks(true)

script()//
  //.then(console.log)
  .then(knex.destroy)
  .catch(e => {
    knex.destroy()

    throw e
  })
