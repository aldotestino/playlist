import React, { useState, useEffect, useRef } from 'react';
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
    }
    try {
      audio.current.addEventListener('ended', () => {
        setIsPlaying(false);
        if (randomPlaying)
          setPlaying(Math.floor(Math.random() * playlist.length));
        else
          if (playing < playlist.length - 1)
            setPlaying(playing + 1);
          else if (playing === playlist.length - 1)
            setPlaying(0);
      });
    } catch (err) { }
  }, [playing, playlist, randomPlaying]);

  const play = () => {
    setRandomPlaying(true);
    setPlaying(Math.floor(Math.random() * playlist.length));
  }

  return (
    <div className="App">
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
