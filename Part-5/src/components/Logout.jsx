import React from 'react'

function Logout() {
  const handleLogout = () => {
    window.localStorage.removeItem('UserLogged')
    window.location.reload()
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
