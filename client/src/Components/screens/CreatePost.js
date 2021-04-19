import React from 'react';
import './createpost.css';
const CreatePost=()=>{
    return (
        <div className="card-filed">
            <input className="create-input" type="text" placeholder="title"/>
            <input className="create-input" type="text" placeholder="body"/>
            <div className="file-field"> 
                    <span className="btn">Upload image</span>
                    <input className="file-bottom" type="file"/>
            </div>
                <div className="">
                    <input className="create-input" type="text"/>
                </div>
            <button className="btn">
                Submit Post
            </button>
        </div>
    )
}
export default CreatePost;