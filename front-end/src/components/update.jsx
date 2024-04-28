import axios from 'axios';
import { useState, useEffect } from "react";
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8089/api/v1/student';

function UpdatePost() {
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { studentId } = useParams();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${API_URL}/search/${studentId}`);
        setName(response.data.name);
        setCaption(response.data.caption);
        setImg1(response.data.img1);
        setImg2(response.data.img2);
        setImg3(response.data.img3);

      } catch (error) {
        setError('Error fetching details');
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleFileInputChange = async (event, setImageSetter) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setImageSetter(base64);
      } catch (error) {
        setError('Error converting image to base64');
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`${API_URL}/edit/${studentId}`, {
        name,
        caption,
        img1,
        img2,
        img3,
      });
      alert('Successfully Updated!');
      navigate('/'); // Redirect to the student list page after successful update
    } catch (error) {
      setError('Error updating details');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Update Workout Details</h1>
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
              {img1 && <img src={img1} alt="Image1" style={{ maxWidth: '100px' }} />}
            </div>
            <div className="form-group">
              <label htmlFor="img2">Image2</label>
              <input
                type="file"
                className="form-control-file"
                id="img2"
                onChange={(event) => handleFileInputChange(event, setImg2)}
              />
              {img2 && <img src={img2} alt="Image2" style={{ maxWidth: '100px' }} />}
            </div>
            <div className="form-group">
              <label htmlFor="img3">Image3</label>
              <input
                type="file"
                className="form-control-file"
                id="img3"
                onChange={(event) => handleFileInputChange(event, setImg3)}
              />

              {img3 && <img src={img3} alt="Image3" style={{ maxWidth: '100px' }} />}
            </div>

            <button type="submit" className="btn btn-primary mt-4">
              Update
            </button>
          </form>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;
