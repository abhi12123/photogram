//modules
import React from 'react';

const Image = ({image}) => {
    const {imagename} = image;
    const src = 'http://localhost:3005/img/'+imagename;
    
    return(
        <div className='images'>
            <img src={src}></img>
        </div>
    )
}

export default Image;
