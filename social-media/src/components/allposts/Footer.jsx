import React from 'react'

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from 'react-router';

export const Footer = () => {
    const navigate= useNavigate()
  return (
    <div>
              <div className="footer">
        <div onClick={()=>navigate('/allposts')}>
          <HomeIcon />
        </div>
        <div  onClick={()=>navigate('/profile')}>
          <PersonIcon />
        </div>
      </div></div>
  )
}
