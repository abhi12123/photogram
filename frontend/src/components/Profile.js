//modules
import React,{ useState} from 'react';
import Album from './Album';
import axios from 'axios';

const Profile = ({session}) => {
    const {id,username} = session;
    const [inputgalleryname,setInputgalleryname] = useState(false);
    const [galleryname,setGalleryname] = useState();
    const [alert,setAlert] = useState();
    const [albumarray,setAlbumarray] = useState([]);

    const addgallery = () => {
        setInputgalleryname(!inputgalleryname);
    }

    const creategallery = () =>{
        if(galleryname){
            setAlert();
            axios.post('http://localhost:3005/albums/creategallery',{id,galleryname});
            window.location.reload();
        }else{
            setAlert('Field is not filled')
        }
    }

    const viewfolders = () => {
        axios.post('http://localhost:3005/albums/getgallery',{id}).then(res=>setAlbumarray(res.data))
    }

    return(
        <div className='profile'>
            <h1>{username}'s Profile</h1>
                <div className='addgallerycontainer'>
                    <div className='addgallery' onClick={addgallery}>
                        <i class="fa fa-plus fa-5x" aria-hidden="true"></i>
                    </div>
                    {
                        inputgalleryname ? 
                        <div>
                            <input type='text' name='galleryname' onChange={(e)=>{setGalleryname(e.target.value);}}/>
                            <button onClick={creategallery}>Create Gallery</button>
                            <p className='alert'>{alert}</p>
                        </div>:''
                    }
                </div>
                <button onClick={viewfolders}>View Folders</button>
                <div className='gallery'>
                    {
                        albumarray.map(x=><Album albuminfo={x}/>)
                    }
                </div>
            </div>
    )
}

export default Profile;