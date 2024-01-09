const url = 'http://13.200.89.117:3512'
const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
export const endpoints = {
  auth: {
    login: `${url}/api/user/login`,
    register: `${url}/api/user/signup`,
  },
  users: {
    createUSer: `${url}/api/user/addUser`,
    addPlaylistToUser: `${url}/api/playlist/allotPlayList/`,
    removePlaylistFromUser: `${url}/api/playlist/deleteUserTypePlaylist/`,
    deleteUser: `${url}/api/user/deleteUser/`,
    getAllUsers: `${url}/`
  },
  playlist: {
    createPlaylist: `${url}/api/playlist/addPlaylist`,
    updatePlaylist: `${url}/`,
    deletePlaylist: `${url}/api/playlist/removePlaylist/`,
    addVideos: `${url}/api/video/uploadData`,
    getAllVideos: `${url}/api/video`,
    deleteVideo: `${url}/api/video/delete/`,
    getVideosByPlaylist: `${url}/api/video/getData/`
  },
  youtubeApi: {
    search: `${BASE_URL}/search?part=snippet&q=`,
    getVideoDetails: `${BASE_URL}/videos?part=snippet,statistics&id=`,
    getRelatedVideos: `${BASE_URL}/search?part=snippet&relatedToVideoId=`,
  }
}