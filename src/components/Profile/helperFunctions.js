import axios from "axios";


// var exampleData = {
//   username: "Sarah114",
//   user_id: "",
//   email: "sarah114@mail.co",
//   photos: [{photo_id: 10001, photo_url: "https://picsum.photos/200"}],
//   bio: "Hello game fans! My name is Sarah and I am currently a student at XX University. My favourite game is Grand Theft Auto V, I'm currently playing it at Xbox. I would like to know more friends who are interested in games so please feel free to add me as your friend! I am currently a student at XX University. My favourite game is Grand Theft Auto V, I'm currently playing it at Xbox. I would like to know more friends who are interested in games so please feel free to add me as your friend. Thank you for visiting my page!",
//   "fav_games": [
//       {
//           "game_id": 1795
//       }
//   ],
//   "friends": [{user_id: 667}, {user_id: 1002}],
//   "blocked_users": [
//       {
//           "user_id": 302
//       }
//   ],
//   "received_req_from": [
//       {
//           "user_id": 38
//       }
//   ]
// };

const getProfile = function (type, identifier, cb) {
    if (type === 'user') {
      axios.get(`/user/${identifier}/profile`)
        .then(response => {
          //cb(null, response.data);
          console.log('3333heloer', response.data)
          cb(null, response.data);
        })
        .catch(err => {
          console.error(err);
          cb(err)
        })
    } else {
      // identifier = 'ai-the-somnium-files-nirvana-initiative'; //for testing purpose only
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


  export {getProfile} ;