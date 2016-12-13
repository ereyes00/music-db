import React from 'react'
const youtubeVideo = props => {
  return (
    <div>
      <iframe id="ytplayer" type="text/html" width="640" height="360"
        src={`${props.youtube_url.replace('watch?v=', 'embed/')}?origin=http://localhost:9999.com`}>
      </iframe>
    </div>
  )
}
export default youtubeVideo