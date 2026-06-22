'use client'

import { VolumeOff, Volume2 } from 'lucide-react'

export default function MobileVolumeButton({ isPlaying, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="hidden mobile:flex fixed bottom-6 left-6 z-50 bg-primary rounded-full p-3.5 items-center justify-center shadow-lg [-webkit-tap-highlight-color:transparent]"
      aria-label={isPlaying ? "Ovozni o'chirish" : "Ovozni yoqish"}
    >
      {isPlaying ? <Volume2 color="white" size={22} /> : <VolumeOff color="white" size={22} />}
    </button>
  )
}
