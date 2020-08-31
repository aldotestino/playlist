import React, { useState, useEffect, useRef } from 'react';
import addNotification, { Notifications } from 'react-push-notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import file from './trap.json';
import Brano from './Brano';
import Player from './Player';
import Info from './Info';

function App() {

  const [playlist] = useState(file.tracks.items);
  const [playing, setPlaying] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [randomPlaying, setRandomPlaying] = useState(false);
  let audio = useRef();

  useEffect(() => {
    if (playing >= 0 && playing < playlist.length) {
      try {
        audio.current.pause();
        audio.current.currentTime = 0;
      } catch (err) { }
      setIsPlaying(true);
      audio.current = new Audio(playlist[playing].track.preview_url);
      audio.current.play();
      addNotification({
        title: 'Now playing',
        subtitle: `${playlist[playing].track.name}`,
        message: `${playlist[playing].track.artists[0].name}`,
        backgroundTop: '#1ED760',
        duration: 5000,
        closeButton: <FontAwesomeIcon icon={faTimesCircle} />
      });
    }
    try {
      audio.current.addEventListener('ended', () => {
        setIsPlaying(false);
        if (randomPlaying)
          setPlaying(Math.round(Math.random() * 10000 % playlist.length));
        else
          if (playing < playlist.length)
            setPlaying(playing + 1);
      });
    } catch (err) { }
  }, [playing, playlist, randomPlaying]);

  const play = () => {
    setRandomPlaying(true);
    setPlaying(Math.round(Math.random() * 10000 % playlist.length));
  }

  return (
    <div className="App">
      <Notifications />
      <div className="playlist-container">
        <Info info={file} play={play} />
        <div className="playlist">
          {playlist.map((brano, index) => <Brano key={index} brano={brano.track} playing={playing} playlist={playlist} setPlaying={setPlaying} index={index} setRandomPlaying={setRandomPlaying} />)}
        </div>
      </div>
      <Player brano={playing === -1 ? null : playlist[playing]} setPlaying={setPlaying} audio={audio} isPlaying={isPlaying} setIsPlaying={setIsPlaying} len={playlist.length} playing={playing} />
    </div>
  );
}

export default App;
