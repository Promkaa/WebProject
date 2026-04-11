import React, { useState, useEffect, useMemo, useCallback } from 'react'; 
import Fuse from 'fuse.js';
import SearchBar from '../components/searchbar';
import { AiFillPlayCircle } from "react-icons/ai";
import Pleer from '../components/pleer';
import { IconContext } from "react-icons";
import UploadForm from '../components/UploadForm';

const API_URL = 'http://localhost:8000'; // тут надо добавить ip для телефонов или переписать это прикол в целом

const Poisk = ({onBack}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTracks = useCallback(async () => {

    try {
      const response = await fetch(`${API_URL}/api/tracks`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const adaptedTracks = data.map(track => ({
        id: track.id,
        title: track.title,
        duration: '?:??'                
      }));

      setTracks(adaptedTracks); 
      setError(null);

    } catch (err) {
      console.error("Ошибка при загрузке треков:", err);
      setError("Не удалось загрузить список песен. Проверьте, запущен ли сервер.");
    } finally {
      setLoading(false); 
    }
  }, []);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]); 

  const fuse = useMemo(() => {
    const options = {
      keys: ['title', 'artist'], 
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 1
    };
    return new Fuse(tracks, options);
  }, [tracks]);

  const getFilteredTracks = () => {
    if (!Array.isArray(tracks)) return [];
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

  if (loading) {
    return <div className="poisk-container">Загрузка треков...</div>;
  }

  if (error) {
    return <div className="poisk-container error-message">{error}</div>;
  }

  return (
    <div className="poisk-container">
      
        <title>Поиск песен</title>
      <SearchBar 
        onChange={handleSearchChange}
        placeholder="Поиск треков по названию или исполнителю..."
        value={searchTerm}
      />
      <UploadForm onUploadSuccess={fetchTracks} />
      
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
            <p>{searchTerm ? "Ничего не найдено" : "Треки отсутствуют"}</p>
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