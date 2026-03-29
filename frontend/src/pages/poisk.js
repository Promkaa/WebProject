import React, { useState } from 'react';
import Fuse from 'fuse.js';
import SearchBar from '../components/searchbar';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import Pleer from '../components/pleer';
import { IconContext } from "react-icons";

const Poisk = ({onBack}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const tracks = [
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55', album: 'A Night at the Opera' },
    { id: 2, title: 'Imagine', artist: 'John Lennon', duration: '3:04', album: 'Imagine' },
    { id: 3, title: 'Billie Jean', artist: 'Michael Jackson', duration: '4:54', album: 'Thriller' },
    { id: 4, title: 'Like a Rolling Stone', artist: 'Bob Dylan', duration: '6:13', album: 'Highway 61 Revisited' },
    { id: 5, title: 'Smells Like Teen Spirit', artist: 'Nirvana', duration: '5:01', album: 'Nevermind' },
    { id: 6, title: 'Hotel California', artist: 'Eagles', duration: '6:30', album: 'Hotel California' },
    { id: 7, title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02', album: 'Led Zeppelin IV' },
    { id: 8, title: 'Hey Jude', artist: 'The Beatles', duration: '7:11', album: 'The Beatles' },
    { id: 9, title: 'Purple Haze', artist: 'Jimi Hendrix', duration: '2:51', album: 'Are You Experienced' },
    { id: 10, title: 'Wonderwall', artist: 'Oasis', duration: '4:18', album: "(What's the Story) Morning Glory?" },
    { id: 11, title: 'Shape of You', artist: 'Ed Sheeran', duration: '3:53', album: '÷' },
    { id: 12, title: 'Rolling in the Deep', artist: 'Adele', duration: '3:48', album: '21' },
    { id: 13, title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', album: 'After Hours' },
    { id: 14, title: 'Bad Guy', artist: 'Billie Eilish', duration: '3:14', album: 'When We All Fall Asleep, Where Do We Go?' },
    { id: 15, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', duration: '4:30', album: 'Uptown Special' }
  ];

  const options = {
    keys: ['title', 'artist', 'album'], 
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 1
  };

  const fuse = new Fuse(tracks, options);
  const getFilteredTracks = () => {
    if (!searchTerm.trim()) {
      return tracks;
    }
    const results = fuse.search(searchTerm);
    return results.map(result => result.item);
  };

  const filteredTracks = getFilteredTracks();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBack = () => {
    if (onBack) {
        onBack(); 
    }
};

  return (
    <div className="poisk-container">
        <title>Поиск песен</title>
      <SearchBar 
        onChange={handleSearchChange}
        placeholder="Поиск треков по названию, исполнителю или альбому..."
        value={searchTerm}
      />
      
      <div className="tracks-list">
        {filteredTracks.length > 0 ? (
          filteredTracks.map(track => (
            <div key={track.id} className="track-item">
              <div className="track-info">
                <div className="track-title">{track.title}</div>
                <div className="track-artist">{track.artist}</div>
              </div>
              <div className="track-duration">{track.duration}</div>
              <IconContext.Provider value={{ size: "3em", color: "#da6900" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>Ничего не найдено</p>
          </div>
        )}
      </div>
      
      <div className="tracks-count">
        Найдено треков: {filteredTracks.length} из {tracks.length}
      </div>
      <Pleer />
    </div>
  );
};

export default Poisk;