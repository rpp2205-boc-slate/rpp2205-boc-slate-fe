import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Form from 'react-bootstrap/Form';
import config from './config_profile.js';

const ModalComponent = (props) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen(true);
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var files = document.getElementById('image-file').files;
    var name = document.getElementById('textfield-username').value;
    var first_name = document.getElementById('textfield-firstname').value;
    var last_name = document.getElementById('textfield-lastname').value;
    var email = document.getElementById('textfield-email').value;
    console.log(files[0], name, first_name, last_name, email);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", `${config.cloudinary_preset}`);
    axios.post("https://api.cloudinary.com/v1_1/dwcubhwiw/image/upload", formData)
    .then(response => {
      var picture = response.data.url;
      props.changeImage(picture);
      axios.post(`/user/${props.selfProfile.user_id}/profile`, {picture, name, first_name, last_name, email})
        .then(response => {
          handleClose();
          console.log("uploaded")
        })
        .catch(err => {
          console.error(err);
        })
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <>
      <Button onClick={handleOpen}>
        Edit Profile
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit your profile information below:
          </Typography>
            <Form.Group>
              <Form.Label>Add a New Profile Photo:</Form.Label>
              <Form.Control id="image-file" type="file" />
            </Form.Group>
          <div class="profile-editusername">
              Username:
              <TextField id="textfield-username" defaultValue={props.selfProfile.username} variant="outlined" />
          </div>
          <div class="profile-editfirstname">
              First Name:
              <TextField id="textfield-firstname" defaultValue={props.selfProfile.first_name} variant="outlined" />
          </div>
          <div class="profile-editlastname">
              Last Name:
              <TextField id="textfield-lastname" defaultValue={props.selfProfile.last_name} variant="outlined" />
          </div>
          <div class="profile-email">
              Email:
              <TextField id="textfield-email" defaultValue={props.selfProfile.email} variant="outlined" readOnly={true}/>
          </div>
          <div class="submit-button">
            <Button onClick={onSubmit}>Submit</Button>
          </div>

        </Box>
      </Modal>
    </>
  )
}

export default ModalComponent;
