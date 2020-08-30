import React, { useState, useEffect, useRef } from 'react';
import file from './trap.json';
import Brano from './Brano';
import Player from './Player';
import Info from './Info';

function App() {

  const [playlist] = useState(file.tracks.items);
  const [playing, setPlaying] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  let audio = useRef();

  try {
    audio.current.addEventListener('ended', () => {
      setIsPlaying(false);
    });
  } catch (err) { }

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
  }, [playing, playlist]);

  return (
    <div className="App">
      <div className="playlist-container">
        <Info info={file} />
        <div className="playlist">
          {playlist.map((brano, index) => <Brano key={index} brano={brano.track} playing={playing} playlist={playlist} setPlaying={setPlaying} index={index} />)}
        </div>
      </div>
      <Player brano={playing === -1 ? null : playlist[playing]} setPlaying={setPlaying} audio={audio} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </div>
  );
}

export default App;
