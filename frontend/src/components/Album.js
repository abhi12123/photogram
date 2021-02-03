//modules
import axios from 'axios';
import React, { useState } from 'react';
//components
import Image from './Image'

const Album = ({albuminfo}) => {
    const {albumname,id} = albuminfo;
    const [viewaddbutton,setViewaddbutton] = useState(false);
    const [viewimages,setViewimages] = useState(false)
    const [images,setImages] = useState([])

    const getimages = () => {
        axios.post("http://localhost:3005/albums/getimages",{id}).then(res=>setImages(res.data))
        setViewimages(true);
    }
    
    return(
        <div class="album" onClick={()=>{setViewaddbutton(true)}}>
            <p>{albumname}</p>
            {
                viewaddbutton ? 
                <div class="viewimages">
                    <form class='uploadfileform' action="http://localhost:3005/albums/uploadimage" method="post" encType="multipart/form-data">
                        <input type="file" name="image" />
                        <input type='hidden' name='id' value={id} />
                        <button type='submit'>Upload</button>
                    </form>
                    <button onClick={getimages}>View Images</button>
                    <div className="loadedimages">
                    {
                        viewimages?
                        images.map(image=><Image image={image} /> )
                        :''
                    }
                    </div>
                </div>
                :''
            }
        </div>
    )
}

export default Album;