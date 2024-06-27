import axios from 'axios';

export async function loginUser(username, password) {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      username,
      password
    });
    return response; 
  } catch (error) {
    throw error; 
  }
}
