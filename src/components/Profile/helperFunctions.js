import axios from "axios";


const getProfile = (type, identifier, cb) => {
    if (type === 'user') {

    } else {
      identifier = 'ai-the-somnium-files-nirvana-initiative'; //for testing purpose only
      axios.get(`/games/slug/${identifier}`)
        .then(response => {
          cb(null, response.data);
        })
        .catch(err => {
          console.error(err);
          cb(err)
        })
    }
  }

  export default getProfile;