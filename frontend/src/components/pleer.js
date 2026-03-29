import React, { useState, useRef, useEffect } from "react";
import track from '../assets/Seum Dero - Bind Us.mp3';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import '../css/main.css';

const Pleer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currTime, setCurrTime] = useState({
    min: "0",
    sec: "0"
  });
  const [duration, setDuration] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Получаем длительность трека при загрузке
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioData = () => {
        setDuration(audio.duration);
      };

      const setAudioTime = () => {
        setSeconds(audio.currentTime);
        const min = Math.floor(audio.currentTime / 60);
        const sec = Math.floor(audio.currentTime % 60);
        setCurrTime({
          min: min.toString(),
          sec: sec.toString()
        });
      };

      // Добавляем обработчики событий
      audio.addEventListener('loadedmetadata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);
      audio.addEventListener('ended', () => setIsPlaying(false));

      // Очищаем обработчики при размонтировании
      return () => {
        audio.removeEventListener('loadedmetadata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
        audio.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, []);

  const playingButton = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimelineChange = (e) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setSeconds(time);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  return (
    <div className="component">
    
      <audio ref={audioRef} src={track} preload="metadata" />
      <div className="nameTrack">
        <h3 className="title">Название</h3>
        <p className="subTitle">Автор</p>
      </div>
      <center>
      <div>
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#8a8a8a" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#8a8a8a" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#8a8a8a" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#8a8a8a" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>

        <div>
          <div className="time">
            <p>{formatTime(seconds)}</p>
            <p>{formatTime(duration)}</p>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={seconds}
            className="timeline"
            onChange={handleTimelineChange}
          />
        </div>
      </div>
      </center>
    </div>
  );
};

export default Pleer;