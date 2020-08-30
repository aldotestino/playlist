import React from 'react'

const Info = ({ info }) => {
  return (
    <div className="playlist-info">
      <h1>{info.name}</h1>
      <img src={info.images[0].url} alt="playlist cover" />
      <div className="info">
        <h2>{info.owner.display_name}</h2>
        <h2>{info.tracks.total} Brani</h2>
        <h2>Followers: {info.followers.total}</h2>
      </div>
    </div>
  )
}

export default Info
