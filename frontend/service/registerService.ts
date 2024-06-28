import axios from 'axios';

export async function RegisterUser(firstName:string,lastName:string,username:string, password:string) {
  try {
    const response = await axios.post('http://localhost:3000/auth/signup', {
      username,
      password,  
      firstName,
      lastName,
    });
    return response.data.access_token; 
  } catch (error) {
    throw error; 
  }
}
