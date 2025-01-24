import React, { useState } from 'react'
import { API_BASE_URL } from '../utils/api';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [name, setName] = useState("")
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const userData = { email, password, role, name }
      const data = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      console.log("suceess");
      setEmail("");
      setPassword("")
      setRole("")
      setName("")
      console.log('Registered user:', data);
      navigate("/login")
    } catch (error) {
      console.log(error);

    }
  }

  return (

    <div className="  gap-8 p-8 i justify-center  bg-opacity- min-h-screen"
      style={{
        backgroundImage: `url('./bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      {/* Registration Section */}
      <div class="register-container flex items-center justify-center h-screen  border-gray-300 ">
        <div class="register-form bg-white max-w-md p-8 rounded-lg shadow-lg">
          <h1 class="text-3xl font-bold  text-center mb-4">REGISTER</h1>
          <form onSubmit={handleSubmit}>
            <input
              class="w-full px-3 py-2 mb-4 border border-gray-300  rounded-lg focus:outline-none focus:border-indigo-500"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name..."
              required
            />
            <input
              class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email..."
              required
            />
            <input
              class="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button
              type="submit"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </form>

          <Link to="/login">
            <button className='mt-2 ml-[160px]  font-bold text-blue-500  p-2 rounded-lg items-center align-center'>
              Login
            </button>


          </Link>
        </div>
      </div>


    </div>
  );
};



export default Register