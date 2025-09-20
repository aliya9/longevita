import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className="topnav" aria-label="Primary">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined}>Home</NavLink>
      <NavLink to="/journal" className={({ isActive }) => isActive ? 'active' : undefined}>Journal</NavLink>
      <NavLink to="/community" className={({ isActive }) => isActive ? 'active' : undefined}>Community</NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : undefined}>Profile</NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : undefined}>Settings</NavLink>
    </nav>
  )
}


