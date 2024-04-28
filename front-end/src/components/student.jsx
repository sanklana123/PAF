import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8089/api/v1/student';

function Student() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleNavigateToAddStudent = () => {
    navigate('/post');
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/getall`);
      setStudents(response.data);
    } catch (error) {
      setError('Error fetching details. Please check your API endpoint.');
    }
  };

  const handleEditStudent = (studentId) => {
    navigate(`/editpost/${studentId}`);
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`${API_URL}/delete/${studentId}`);
      alert('Successfully Deleted');
      fetchStudents();
    } catch (error) {
      setError('Error deleting workout details. Please check your API functionality.');
    }
  };

  return (
    <div>
      <h1>Workout Details</h1>
      <button className="btn btn-primary mt-4" onClick={handleNavigateToAddStudent}>
        Add Workout Details
      </button>

      {error && <div className="alert alert-danger">{error}</div>}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Caption</th>
              <th scope="col">Image1</th>
              <th scope="col">Image2</th>
              <th scope="col">Image3</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.caption}</td>
                <td>{student.img1 && <img src={student.img1} alt="Image1" style={{ maxWidth: '100px' }} />}</td>
                <td>{student.img2 && <img src={student.img2} alt="Image2" style={{ maxWidth: '100px' }} />}</td>
                <td>{student.img3 && <img src={student.img3} alt="Image3" style={{ maxWidth: '100px' }} />}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning mr-2"
                    onClick={() => handleEditStudent(student._id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteStudent(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
