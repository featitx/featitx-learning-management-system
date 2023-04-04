import React from 'react';
import  Styles from './VideoPlayer.css';


const VideoPlayer=({ })=> {
   
  return (
    <div className={Styles.videoAdDiv}>
      <div className={Styles.videoDiv}>
        <iframe
          title="Mohamad Alaloush's Story"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          width="560"
          height="315"
          frameborder="0"
        ></iframe>
      </div>
      <div className={Styles.content}>
        <h2 className={Styles.heading}>Transform your life through education</h2>
        <p className={Styles.about}>
          Mohamad Alaloush launched a new career in software development by
          taking courses on Udemy. What will you be able to do?
        </p>
      </div>
    </div>
  );
}
  
  
  export default VideoPlayer;