import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import * as axios from 'axios';

function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, { username, password });
      alert('Registrado com sucesso! Faça login.');
    } catch (error) {
      alert('Erro ao registrar: ' + error.response?.data?.error);
    }
  };

  const login = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { username, password });
      localStorage.setItem('token', data.token);
      navigate('/chat');
    } catch (error) {
      alert('Erro ao logar: ' + error.response?.data?.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl mb-4">Login / Registro</h1>
        <Input
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2"
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <div className="flex gap-2">
          <Button onClick={register}>Registrar</Button>
          <Button onClick={login}>Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Auth;