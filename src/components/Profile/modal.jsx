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
    var first_name = document.getElementById('textfield-firstname').value;
    var last_name = document.getElementById('textfield-lastname').value;
    var name = props.selfProfile.username;
    var email = props.selfProfile.email;
    var bio = props.selfProfile.bio;
    var files = document.getElementById('image-file').files;
    if (files.length === 0) {
      var picture = props.selfProfile.photos[0].photo_url;
      axios.post(`/user/${props.selfProfile.user_id}/profile`, {picture, name, first_name, last_name, email, bio, picture})
        .then(response => {
          props.changeImage(picture);
          props.changeFirstName(first_name);
          props.changeLastName(last_name);
          handleClose();
          console.log("uploaded")
        })
        .catch(err => {
          console.error(err);
        })
    } else {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", `${config.cloudinary_preset}`);
      axios.post("https://api.cloudinary.com/v1_1/dwcubhwiw/image/upload", formData)
      .then(response => {
        var picture = response.data.url;
        props.changeImage(picture);
        props.changeFirstName(first_name);
        props.changeLastName(last_name);
        axios.post(`/user/${props.selfProfile.user_id}/profile`, {picture, name, first_name, last_name, email, bio})
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
    }



  return (
    <>
      <Button onClick={handleOpen} variant="contained">
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
              <Typography>Username: </Typography>
              <TextField disabled id="textfield-username" defaultValue={props.selfProfile.username} variant="outlined" />
          </div>
          <div class="profile-editfirstname">

              <Typography>First Name: </Typography>
              <TextField id="textfield-firstname" defaultValue={props.selfProfile.first_name} variant="outlined" />
          </div>
          <div class="profile-editlastname">

              <Typography>Last Name: </Typography>
              <TextField id="textfield-lastname" defaultValue={props.selfProfile.last_name} variant="outlined" />
          </div>
          <div class="profile-email">
              <Typography>Email: </Typography>
              <TextField disabled id="textfield-email" defaultValue={props.selfProfile.email} variant="outlined" readOnly={true}/>
          </div>
          <div class="submit-button" >
            <Button sx={{m: 2}} onClick={onSubmit} variant="outlined">Submit</Button>
            <Button sx={{m: 2}} onClick={handleClose} variant="outlined">Cancel</Button>
          </div>

        </Box>
      </Modal>
    </>
  )
}

export default ModalComponent;
