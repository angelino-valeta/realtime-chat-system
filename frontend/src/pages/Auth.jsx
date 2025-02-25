import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { axios } from "axios"

function Auth() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const register = async () => {
    await axios.post('http://localhost:3000/auth/register', { username,  password })
    alert('Registrado com sucesso! Faça login')
  }

  const login = async () => {
    const { data } = await axios.post('http://localhost:3000/auth/login', { username, password })
    localStorage.setItem('token', data.token)
    navigate('/chat')
  }

  return (
    <div className="">

    </div>
  )
}

export default Auth