import { useState } from 'react'

export const FormRegister = ({ title, handleClick }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [username, setUsername] = useState('')

  return (
    <div>
      <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="password" />
      <button onClick={() => handleClick(username, email, pass)}>{title}</button>
    </div>
  )
}
