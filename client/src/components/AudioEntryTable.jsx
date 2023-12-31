import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAudioFiles, setToChange } from '../redux/reducer';
import { removeEntry, updateFamLevel } from '../api';

const AudioTable = () => {
    const dispatch = useDispatch();
    const audioFiles = useSelector((state) => state.some.audioFiles);
    const change = useSelector((state) => state.some.toChange);
  
    useEffect(() => {
        const fetchAudioList = async () => {
            try {
              const response = await fetch('http://localhost:5000/audio-list');
              const data = await response.json();
              console.log(data);
              dispatch(setAudioFiles(data));
            } catch (error) {
              console.error('Error fetching audio list:', error);
            }
        };
    
        fetchAudioList();
    }, [change]);

    const handleDelete = (polish_path, english_path) => {
      const fetching = async () => {
        const data = await removeEntry({polish_path: polish_path, english_path: english_path});
        console.log(data);
        dispatch(setToChange(change + 1));
      }
      fetching();
    }

    const handleFamChange = (event, id) => {
      const fetching = async () => {
        const data = await updateFamLevel({id: id, familiarity_level: event.target.value});
        console.log(data);
        dispatch(setToChange(change + 1));
      }
      fetching();
    }
  
    return (
      <div>
        <h3>List of Saved Files</h3>
        <div>Familiarty levels</div>
        <div> 1- never seen this word/phrase before</div>
        <div> 2- I recognize this word/phrase, but do not know it</div>
        <div> 3- I am in the process of learning this word/phrase</div>
        <div> 4- I can translate this word/phrase both ways relatively consistently</div>
        <div> 5- I can apply this word/phrase to a sentence in conversation</div>
        {audioFiles && audioFiles.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Word</th>
                <th>Play</th>
                <th>Length</th>
                <th>Familiarity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {audioFiles.map((file, index) => (
                <tr key={index}>
                  <td>{file.word}</td>
                  <td>
                    <audio controls>
                      <source src={`http://localhost:5000/audio/${file.polish_path}`} type="audio/webm" />
                      Your browser does not support the audio element.
                    </audio>
                  </td>
                  <td>{file.polish_length}</td>
                  <>
                    <select id="dropdown" value={file.familiarity} onChange={(event) => handleFamChange(event, file.id)}>
                        <option value="">-- Choose an option --</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                  </>
                  <td>
                    <button onClick={() => handleDelete(file.polish_path, file.english_path)}>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No audio files found.</p>
        )}
      </div>
    );
  };
  
  export default AudioTable;
