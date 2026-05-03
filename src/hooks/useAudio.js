import { useContext } from 'react'
import { AudioStateContext } from '../contexts/audioStateContext'

export function useAudio() {
  const context = useContext(AudioStateContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
