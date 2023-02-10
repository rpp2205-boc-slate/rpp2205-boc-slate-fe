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

const ModalComponentBio = (props) => {
  console.log(props.selfProfile)
  const [open, setOpen] = useState(false);
  const [url, setURL] = useState('');

  const handleClose = () => {
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen(true);
  }

  useEffect(() => {
    setURL(props.selfProfile.photos ? null : props.photos[0].photo_url)
  }, [props.selfProfile]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const onSubmit = (e) => {
    e.preventDefault(props.selfProfile.photos, "34");
    console.log(props.selfProfile.photos, '42');
    var first_name = props.selfProfile.first_name;
    var last_name = props.selfProfile.last_name;
    var name = props.selfProfile.username;
    var email = props.selfProfile.email;
    var picture = props.selfProfile.photos[0].photo_url;
    var bio = document.getElementById("textfield-bio").value;
    console.log("picture", picture)
    axios.post(`/user/${props.selfProfile.user_id}/profile`, {name, first_name, last_name, email, bio, picture})
      .then(response => {
        handleClose();
        props.changeBio(bio);
        console.log("uploaded")
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <>
      <Button sx={{m: 2}} onClick={handleOpen} id="editAbout" variant="contained">
        Edit About
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit your bio below:
          </Typography>
          <div class="profile-bio">
              Bio:
              <TextField id="textfield-bio" defaultValue={props.selfProfile.bio} variant="outlined" multiline rows={4} maxRows={10} readOnly={true}/>
          </div>
          <div class="submit-button">
            <Button sx={{m: 2}} onClick={onSubmit} variant="contained">Submit</Button>
          </div>

        </Box>
      </Modal>
    </>
  )
}

export default ModalComponentBio;
