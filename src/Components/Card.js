import React, { useState } from 'react';
import ders from '../images/ders.png';

export default function Card  ({genelKurslarShow,course, title, text, logo })  {
  const [isHovered, setHovered] = useState(false);

  return (
    <div style={{boxSizing:'border-box',position: 'relative',paddingBottom:'25px'}}
      className={`col-lg-2 ${isHovered ? 'lift-on-hover' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card">
        <a href="#"   onClick={()=>genelKurslarShow(course)}><img src={logo?logo:ders} className="card-img-top" alt="Logo" height={"112"} style={{scale:'1.05'}}/></a>
      
      </div>
      {isHovered && (
        <h6
          className='text-white'
          style={{ position: 'absolute', bottom: '-15%', left: '50%', transform: 'translate(-50%, -50%)',whiteSpace: 'nowrap' }}
        >
          {title}
        </h6>
      )}
    </div>
  );
};