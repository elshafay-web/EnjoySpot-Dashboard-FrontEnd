/* eslint-disable react/jsx-props-no-spreading */

interface YouTubeIFrameProps {
  iframeSrc?: string | undefined
}

export default function YouTubeIFrame({ iframeSrc }: YouTubeIFrameProps) {
  return (
    
      iframeSrc && iframeSrc?.includes('youtube.com') ? (
        <div className="youtube-video-container">
          <iframe
            src={iframeSrc}
            allow="accelerometer; autoplay; clipboard-write;"
            allowFullScreen
            title="YouTube video player"
            className="w-full h-[500px]"
          />
        </div>
      )
      :(
        <div className="text-xl font-bold text-center mt-5">
          No video available
        </div>
      )

  )
}
