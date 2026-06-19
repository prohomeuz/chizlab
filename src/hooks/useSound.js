'use client'

import { useRef, useState, useCallback } from 'react'

// === DATA ===
const FADE_IN_DURATION = 1.6
const FADE_OUT_DURATION = 1.4
const TARGET_GAIN = 0.5
const PAUSE_DELAY_MS = 1500

// === BUSINESS LOGIC ===
export function useSound() {
  const audioRef = useRef(null)
  const audioCtxRef = useRef(null)
  const gainNodeRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const initAudio = useCallback(() => {
    if (audioRef.current) return
    const AudioCtx = window.AudioContext || window['webkitAudioContext']
    const audio = new Audio('/sound.mp3')
    audio.loop = true
    audio.preload = 'none'
    audioRef.current = audio

    const ctx = new AudioCtx()
    audioCtxRef.current = ctx

    const gain = ctx.createGain()
    gain.gain.value = 0
    gainNodeRef.current = gain

    const source = ctx.createMediaElementSource(audio)
    source.connect(gain)
    gain.connect(ctx.destination)
  }, [])

  const fadeIn = useCallback(() => {
    const audio = audioRef.current
    const ctx = audioCtxRef.current
    const gain = gainNodeRef.current
    if (!audio || !ctx || !gain) return
    ctx.resume().then(() => {
      gain.gain.cancelScheduledValues(ctx.currentTime)
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(TARGET_GAIN, ctx.currentTime + FADE_IN_DURATION)
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    })
  }, [])

  const fadeOut = useCallback(() => {
    const audio = audioRef.current
    const ctx = audioCtxRef.current
    const gain = gainNodeRef.current
    if (!audio || !ctx || !gain) return
    gain.gain.cancelScheduledValues(ctx.currentTime)
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + FADE_OUT_DURATION)
    setIsPlaying(false)
    setTimeout(() => {
      audio.pause()
      gain.gain.value = 0
    }, PAUSE_DELAY_MS)
  }, [])

  const toggleAudio = useCallback(() => {
    initAudio()
    if (isPlaying) {
      fadeOut()
    } else {
      fadeIn()
    }
  }, [isPlaying, initAudio, fadeIn, fadeOut])

  const cleanup = useCallback(() => {
    audioRef.current?.pause()
    audioCtxRef.current?.close()
    audioRef.current = null
    audioCtxRef.current = null
    gainNodeRef.current = null
  }, [])

  return { isPlaying, toggleAudio, fadeIn, initAudio, cleanup }
}
