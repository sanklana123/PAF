import axios from 'axios';
import { useState } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8089/api/v1/student';

function AddPost() {
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${API_URL}/save`, {
        name,
        caption,
        img1,
        img2,
        img3,
      });
      alert('Workout Added Successfully!');
      setName('');
      setCaption('');
      setImg1('');
      setImg2('');
      setImg3('');

      navigate('/'); // Redirect to the home page after successful submission
    } catch (error) {
      setError('Error saving details');
    }
  };

  const handleFileInputChange = async (event, setImageSetter) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setImageSetter(base64);
      } catch (error) {
        setError('Error converting file to base64');
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Add Workout Details</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="caption">Caption</label>
              <input
                type="text"
                className="form-control"
                id="caption"
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="img1">Image1</label>
              <input
                type="file"
                className="form-control-file"
                id="img1"
                onChange={(event) => handleFileInputChange(event, setImg1)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="img2">Image2</label>
              <input
                type="file"
                className="form-control-file"
                id="img2"
                onChange={(event) => handleFileInputChange(event, setImg2)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="img3">Image3</label>
              <input
                type="file"
                className="form-control-file"
                id="img3"
                onChange={(event) => handleFileInputChange(event, setImg3)}
              />
            </div>

            <button type="submit" className="btn btn-primary mt-4">
              Add Workout
            </button>
          </form>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default AddPost;
