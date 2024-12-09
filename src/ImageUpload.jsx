import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !username || !password) {
      alert('Please fill all fields and select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });

      alert(`Upload Successful! File URL: ${response.data.fileUrl}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleUpload}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        style={{ width: '400px' }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Image</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            className="w-full"
            onChange={handleFileChange}
          />
        </div>

        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded h-4 mb-4">
            <div
              className="bg-blue-500 h-4 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
   