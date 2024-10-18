import React from "react"

interface AudioPlayerProps {
  src: string
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  return (
    <audio
      src={src}
      controls
      controlsList="nodownload"
      className="w-full focus:outline-none"
    >
      Your browser does not support the audio element.
    </audio>
  )
}
