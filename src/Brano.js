import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const Brano = ({ brano, playing, setPlaying, index, setRandomPlaying }) => {

  const playSong = () => {
    setRandomPlaying(false);
    setPlaying(index);
  }

  return (
    <>
      <div className={index === playing ? "Brano playing" : "Brano"}>
        <button className="select" onClick={playSong}><FontAwesomeIcon icon={faPlay} /></button>
        <h2 className="title">{brano.name}</h2>
        <h2 className="artist">{brano.artists[0].name}</h2>
        <h2 className="album">{brano.album.name}</h2>
      </div>
      <hr />
    </>
  )
}

export default Brano;
