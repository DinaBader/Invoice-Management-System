import axios from 'axios';

export async function loginUser(username:string, password:string) {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      username,
      password
    });
    return response.data.access_token; 
  } catch (error) {
    throw error; 
  }
}
