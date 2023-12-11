import React, { useState } from 'react';


export default function Card  ({ course,selectCourse,title, text, logo })  {
  
    

  return (
    <div 
      className="col-lg-6"
     
    >
      <div className="card"><a href="#" onClick={()=>{selectCourse(course)}}><img style={{borderRadius:'7px'}} src={logo} className="card-img-top" alt="Logo" height={"112"}/></a>
        
        
      </div>
        
        <h6
          className='text-white pt-2'
         
        >
          {title}
        </h6>
     
    </div>
  );
};