import React, { useState } from 'react';

const API_HOST = 'http://localhost:8000'; // тут надо добавить ip для телефонов или переписать это прикол в целом

const UploadForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [status, setStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setStatus('');
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setStatus('Пожалуйста, выберите файл для загрузки.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile); 

        setStatus('Загрузка...');

        try {
            const response = await fetch(`${API_HOST}/api/tracks/upload`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || 'Произошла ошибка на сервере');
            }
            
            setStatus(`Файл "${result.filename}" успешно загружен!`);
            
        } catch (error) {
            console.error('Ошибка при загрузке:', error);
            setStatus(`Ошибка: ${error.message}`);
        }
    };

    return (
        <div className="upload-container">
            <h3>Добавить трек в плейлист</h3>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile}>Загрузить</button>
            {status && <p className="upload-status">{status}</p>}
        </div>
    );
};

export default UploadForm;