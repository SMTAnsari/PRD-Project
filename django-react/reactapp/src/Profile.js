/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import img from "./profile.png";
import Avatar from 'react-avatar-edit';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Profile = () => {
  const [dialogs, setdialogs] = useState(false);
  const [imgCrop, setimgCrop] = useState(null);
  const [storeImage, setstoreImage] = useState([]);

  const onCrop = (view) => {
    setimgCrop(view);
  };

  const onClose = () => {
    setimgCrop(null);
  };

  const saveImage = async () => {

      if (imgCrop) {

        fetch(imgCrop)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'cropped-image.png', { type: blob.type });

            const formData = new FormData();
            formData.append('profile_image', file);
            axios.post('http://127.0.0.1:8000/api/update-profile-image/', formData).
              then(res => {
                setstoreImage([{ imgCrop }]);
                setdialogs(false);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log('Error converting data URL to file:', error);
          });
      }
  
   
  };


  const profileImageShow = storeImage.map((item) => item.imgCrop);
  
  return (
    <div className='main2'>
      <div className='submain'>
        <Dialog
          className='dialog'
          visible={dialogs}
          header={() => (
            <p className='text-2x1 front-semibold textColor'>
              Update Profile
            </p>
          )}
          onHide={() => setdialogs(false)}
        >
          <div className="img1">
            <div className="img2">
              <div className="img3">
              <Avatar width={400} height={300} onClose={onClose} onCrop={onCrop} />
                <Button className = 'button-27' onClick={saveImage} label="Save" icon="pi pi-check" />
              </div>
            </div>
          </div>
        </Dialog>

        <img
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            objectFit: "cover",
            background: "white",
          }}
          src={profileImageShow.length ? profileImageShow : img}
          alt=''
          onClick={() => setdialogs(true)}
        />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className='main'>
      <h1 className='heading' style={{
        color: "initial",
      }}>Profile Page</h1>
      <Profile />
    </div>
  );
};

export default App;
