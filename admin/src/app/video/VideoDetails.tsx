'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Header, Sidenav } from '../components'
import { Playlist, Video, YoutubeApi } from '@/services';
import ReactPlayer from 'react-player';
import './video.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import YouTube from 'react-youtube';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css'; // Import video.js styles
// import '@videojs/http-streaming';
// import { clpp } from "@castlabs/prestoplay";
// import "@castlabs/prestoplay/cl.mse";
// import "@castlabs/prestoplay/cl.dash";

// declare global {
//   interface Window {
//     YT: any; // Declare YT object
//   }
// }

function VideoDetails({ id }: any) {
  const router = useRouter()
  const [isDrowerOn, setIsDrowerOn] = useState(false)
  const [menu, setMenu] = useState('');
  const [videoDetails, setVideoDetails] = useState<any>();
  const [relatedVideos, setRelatedVideos] = useState<any>();
  const [playlist, setPlaylist] = useState<any>([])
  const [playlistId, setPlaylistId] = useState('')
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    getVideoDetails(id);
    getRelatedVideos(id);
    getPlaylist()
  }, [id])

  const getVideoDetails = async (id: string) => {
    if (id) {
      try {
        const result: any = await YoutubeApi.getVideoDetails(id)
        setVideoDetails(result.items[0])
      } catch (err) {
        console.error(err, 'errrr-----')
      }
    }
  }
  const getRelatedVideos = async (id: string) => {
    if (id) {
      try {
        const result: any = await YoutubeApi.getRelatedVideos(id)
        setRelatedVideos(result.items)
      } catch (err) {
        console.log(err, 'errrr-----')
      }
    }
  }
  const getPlaylist = async () => {
    try {
      const result: any = await Playlist.getAllPlaylist(token)
      setPlaylist(result?.data)
    } catch (err: any) {
      if (err.response.data.message === 'Unauthorized') {
        router.push('/auth/signin');
      }
      console.error(err, 'error')
    }
  }
  const addVideoToPlaylist = async () => {
    if (playlistId === "") {
      alert('Please Select Playlist')
    } else {
      const data = {
        videoName: videoDetails?.snippet?.title,
        videoDescription: videoDetails?.snippet?.description,
        videoUrl: `https://www.youtube.com/watch?v=${id}`,
        playListId: playlistId
      }
      try {
        const resp = await Video.addVideoToPlaylist(token, data)
        alert('video added!')
        console.log("first", resp)

      } catch (err) {
        console.error(err)
      }
    }
  }

  // const videoRef: any = useRef(null);

  // useEffect(() => {
  //   // Initialize video.js player
  //   const player = videojs(videoRef?.current, {
  //     fluid: true, // Make the player responsive
  //     html5: {
  //       hls: {
  //         withCredentials: false // Allow playing YouTube videos without credentials
  //       }
  //     },
  //     sources: [{
  //       src: 'https://www.youtube.com/watch?v=CUDEVgDeCfI', // YouTube video URL
  //       type: 'video/youtube'
  //     }]
  //   });

  //   return () => {
  //     // Clean up the player on unmount
  //     if (player) {
  //       player.dispose();
  //     }
  //   };
  // }, []);

  // const videoRef:any = useRef(null);

  // useEffect(() => {
  //   const player:any = new clpp.Player(videoRef.current);
  //   player.use(clpp.dash.DashComponent);

  //   player.load({
  //     source: "https://content.players.castlabs.com/demos/clear-segmented/manifest.mpd"
  //   });

  //   // Clean up function to remove the player when the component unmounts
  //   return () => {
  //     player.dispose();
  //   };
  // }, []);



  // const playerRef = useRef(null);

  // useEffect(() => {
  //   if (window.YT && window.YT.Player) {
  //     const player = new window.YT.Player(playerRef.current, {
  //       videoId: 'tgbNymZ7vqY', // YouTube video ID
  //       width: 420,
  //       height: 315,
  //       playerVars: {
  //         // Additional player options
  //       },
  //     });
  //     return () => player.destroy(); // Cleanup on unmount
  //   }
  // }, []);


  // const iframeRef = useRef(null);

  // useEffect(() => {
  //   const iframe: any = iframeRef.current;
  //   console.log("sbigningd")

  //   if (iframe) {
  //     console.log("sdifram")

  //     const onLoad = () => {
  //       console.log("sdonload")

  //       // Access the iframe's contentWindow and document
  //       const iframeWindow = iframe.contentWindow;
  //       const iframeDocument = iframeWindow.document;

  //       // Modify the CSS of elements within the iframe
  //       const iframeBody = iframeDocument.body;
  //       console.log("sd")
  //       if (iframeBody) {
  //         iframeBody.style.backgroundColor = 'lightblue';
  //         iframeBody.style.color = 'white';
  //       }
  //     };

  //     // Add event listener for iframe load
  //     iframe.addEventListener('load', onLoad);

  //     // Remove event listener on cleanup
  //     return () => {
  //       iframe.removeEventListener('load', onLoad);
  //     };
  //   }
  // }, []);

  const playerRef: any = useRef(null);

  useEffect(() => {
    // Hide YouTube title and controls
    const player = playerRef.current?.internalPlayer;
    if (player) {
      player.getIframe().then((iframe: any) => {
        if (iframe) {
          // Hide YouTube title
          iframe.setAttribute('title', '');
          // Hide YouTube controls
          iframe.setAttribute('controls', '0');
        }
      });
    }
  }, []);
  return (
    <div className="flex bg-gray-200">
      <Sidenav isDrowerOn={isDrowerOn} menu={menu} setMenu={setMenu} />
      <div className='w-full h-screen overflow-y-scroll'>
        <Header setIsDrowerOn={setIsDrowerOn} isDrowerOn={isDrowerOn} />
        <div className='px-5 py-3'>
          {/* <iframe  /> */}
          {/* <video ref={videoRef} id="video" controls></video> */}
          {/* <iframe
            ref={iframeRef}
            width="420"
            height="315"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
            title="YouTube video player"
          /> */}
          {/* <div ref={playerRef}></div> */}
          {/* <video width="320" height="240" controls>
            <source src="https://www.youtube.com/embed/tgbNymZ7vqY" type="" />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video> */}
          {/* <YouTube
            videoId='tgbNymZ7vqY'
            opts={{
              playerVars: {
                origin: window.location.origin, // Set origin to match the website's origin
                // Add additional player parameters here
              },
            }}
            ref={playerRef}
          /> */}

          <iframe className="react-player"
            src={`https://www.youtube.com/embed/${id}`}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation=false">
          </iframe>

          {/* <ReactPlayer
            url={`https://www.youtube.com/embed/${id}`}
            className="react-player"
            // controls={true}
            controls={false} // Enable custom controls
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 0, // Hide YouTube logo
                  rel: 0, // Prevent display of related videos at the end
                  controls: 0, // Hide player controls
                  showinfo: 0 // Hide video title and uploader information
                }
              }
            }}
            
          // pip={true}
          // width="100%"
          // height="100%"
          // playing={true}
          // onContextMenu={(e: any) => e.preventDefault()}
          // config={{
          //   youtube: {
          //     playerVars: {
          //       modestbranding: 1,
          //       fs: 0,
          //     },
          //   },
          // }}
          /> */}
          <div className='p-2 my-2 border border-gray-600 w-full flex justify-between'>
            <div className='text-gray-600'>
              <p className='text-sm font-semibold'>{videoDetails?.snippet?.title}</p>
              <p className='text-xs font-semibold'>{videoDetails?.snippet?.channelTitle}</p>
            </div>
            {playlist.length > 0 ?
              <div className='flex'>
                <select
                  onChange={(e) => setPlaylistId(e.target.value)}
                  className='focus:outline-none mr-3 bg-white rounded-sm border border-gray-500 text-gray-600'>
                  <option disabled selected>please Select Playlist</option>
                  {playlist.map((item: any, index: number) => {
                    return (
                      <option key={index} value={item._id}>{item.name}</option>
                    )
                  })}
                </select>
                <Button text='Add Video' functionName={addVideoToPlaylist} />
              </div>
              : <Link href='/playlist/add'><Button text='Create New Playlist' /></Link>}
          </div>
          <div className='grid grid-cols-12'>
            {
              relatedVideos?.map((item: any) => {
                return (
                  item.id.videoId &&
                  <div className='col-span-3 text-black p-1'>
                    <Link href={`/video/${item?.id?.videoId}`}>
                      <div className='border border-gray-200'>
                        <img src={item?.snippet?.thumbnails?.medium?.url} className='w-full h-28 object-cover' />
                        <div className='py-1 px-2'>
                          <p className='line-clamp-2 text-xs text-gray-500'>{item?.snippet?.title}</p>
                          <p className='line-clamp-1 text-sm text-gray-700'>{item?.snippet?.channelTitle}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>

        {/* <div data-vjs-player>
          <video ref={videoRef} className="video-js vjs-big-play-centered" controls></video>
        </div> */}
      </div>
    </div>
  )
}

export default VideoDetails