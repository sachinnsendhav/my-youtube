const url = 'http://173.214.174.234:3005'
// const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';
const API_KEY = 'AIzaSyAcPNJtBXci-Wg7MHNEkLf_9fVZS1sj5ms'
export const endpoints = {
  auth: {
    login: `${url}/api/user/login`, //admin,,,,parent
    register: `${url}/api/user/signup`,
    generateOtp: `${url}/api/generateOtp`,
    generateOtp: `${url}/api/generateOtp`,
    userLogin:`${url}/api/userType/login`  //user,,,child
  },
  users: {
    createUSer: `${url}/api/user/addUser`,
    addPlaylistToUser: `${url}/api/playlist/allotPlayList`,
    removePlaylistFromUser: `${url}/api/playlist/deleteUserTypePlaylist`,
    deleteUser: `${url}/api/user/deleteUser`,
    getAllUsers: `${url}/api/usersByAdminId`,
    getUserDetails: `${url}/api/userTypeDetail`,

  },
  playlist: {
    createPlaylist: `${url}/api/playlist/addPlaylist`,
    getPlaylistByParents: `${url}/api/playlist/getPlaylist`,
    updatePlaylist: `${url}/`,
    deletePlaylist: `${url}/api/playlist/removePlaylist`,
  },
  video: {
    addVideos: `${url}/api/video/uploadData`,
    getAllVideos: `${url}/api/video`,
    deleteVideo: `${url}/api/video/delete`,
    getVideosByPlaylist: `${url}/api/video/getData`
  },
  youtubeApi: {
    search: `${BASE_URL}/search?key=${API_KEY}&part=snippet&q=`,
    getVideoDetails: `${BASE_URL}/videos?key=${API_KEY}&part=snippet,statistics&id=`,
    getRelatedVideos: `${BASE_URL}/search?key=${API_KEY}&part=snippet&relatedToVideoId=`,
  }
}