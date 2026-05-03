import React, { useRef, useState, useEffect } from 'react'
import { audio } from '../data'
import { AudioStateContext } from './audioStateContext'

function AudioProvider({ children }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    audioRef.current = new Audio(audio.background)
    audioRef.current.loop = audio.loop
    audioRef.current.volume = audio.volume

    audioRef.current.addEventListener('play', () => setIsPlaying(true))
    audioRef.current.addEventListener('pause', () => setIsPlaying(false))
    audioRef.current.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const play = async () => {
    if (!audioRef.current) return
    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch {
      /* autoplay / user gesture policies may block play */
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const value = {
    audioRef,
    isPlaying,
    play,
    pause,
  }

  return (
    <AudioStateContext.Provider value={value}>
      {children}
    </AudioStateContext.Provider>
  )
}

export default AudioProvider
