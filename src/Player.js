import React from 'react';
import blankCanvas from './blankCanvas.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBackward, faForward, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({ brano, setPlaying, isPlaying, setIsPlaying, audio, len, playing }) => {

  const nextSong = () => {
    if(playing === -1)
      return;
    if (playing < len - 1)
      setPlaying(prevPlaying => prevPlaying + 1);
  }

  const prevSong = () => {
    if(playing === -1)
      return;
    if (playing > 0)
      setPlaying(prevPlaying => prevPlaying - 1);
  }

  return (
    <div className="Player">
      <div className="cover">
        <img src={brano == null ? blankCanvas : brano.track.album.images[0].url} alt="cover" />
        <div className="info">
          <span className="h1">{brano == null ? "" : brano.track.name}</span>
          <span className="h2">{brano == null ? "" : brano.track.artists[0].name}</span>
        </div>
      </div>
      <div className="comandi">
        <button className="prev" onClick={prevSong}><FontAwesomeIcon icon={faBackward} size="lg" /></button>
        <button className="play" onClick={() => {
          try {
            if (!isPlaying)
              audio.current.play();
            else
              audio.current.pause();
            setIsPlaying(!isPlaying);
          } catch (err) { }
        }}><FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="lg" /></button>
        <button className="next" onClick={nextSong}><FontAwesomeIcon icon={faForward} size="lg" /></button>
      </div>
    </div>
  );
}

export default Player;
