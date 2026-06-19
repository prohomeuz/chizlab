'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { TOTAL_DURATION, CHAR_FADE } from '@/data/heroConstants'

// === DATA ===
const SCROLL_DISTANCE = 600
const MAX_STEP = 0.1
const SCRUB = 0.1
const FADE_DUR = 0.7

// === BUSINESS LOGIC ===
// setLoaderDone is a stable React setter — safe to omit from deps
export function useHeroAnimation(refs, { setLoaderDone, fadeIn }) {
  useEffect(() => {
    const {
      arcRef,
      charsRef,
      scene1Ref,
      scene2Ref,
      scene3Ref,
      scene4Ref,
      handStrokeRef,
      handFillRef,
      handOverlayRef,
      laptopStrokeRef,
      laptopFillRef,
      s3CharsRef,
      endSvgRef,
      s4CharsRef,
      heroContainerRef,
      contentSectionRef,
      scrollIndicatorRef,
      indicatorClickRef,
      soundHintRef,
      loaderRef,
      loaderImgRef,
      loaderCountRef,
    } = refs

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'

    // --- Pre-init Scene 2 ---
    const handStroke = handStrokeRef.current
    const handFill = handFillRef.current
    let handTl = null
    if (handStroke && handFill) {
      const len = handStroke.getTotalLength()
      gsap.set(handStroke, { strokeDasharray: len, strokeDashoffset: len })
      gsap.set(handFill, { opacity: 0 })
      handTl = gsap.timeline({ paused: true })
      handTl
        .to(handStroke, { strokeDashoffset: 0, ease: 'none', duration: 2 }, 0)
        .to(handFill, { opacity: 1, ease: 'power1.in', duration: 0.5 }, 2)
    }

    // --- Pre-init Scene 3 ---
    const laptopStroke = laptopStrokeRef.current
    const laptopFill = laptopFillRef.current
    const s3Chars = s3CharsRef.current.filter(Boolean)
    let s3Tl = null
    if (laptopStroke && laptopFill && s3Chars.length) {
      const laptopLen = laptopStroke.getTotalLength()
      gsap.set(laptopStroke, { strokeDasharray: laptopLen, strokeDashoffset: laptopLen })
      gsap.set(laptopFill, { opacity: 0 })
      gsap.set(s3Chars, { opacity: 0 })
      const s3Stagger = (2.5 - CHAR_FADE) / (s3Chars.length - 1)
      s3Tl = gsap.timeline({ paused: true })
      s3Tl
        .to(s3Chars, { opacity: 1, duration: CHAR_FADE, stagger: s3Stagger, ease: 'none' }, 0)
        .to(laptopStroke, { strokeDashoffset: 0, ease: 'none', duration: 2 }, 0)
        .to(laptopFill, { opacity: 1, ease: 'power1.in', duration: 0.5 }, 2)
    }

    // --- Pre-init Scene 4 ---
    const endSvgEl = endSvgRef.current
    const s4Chars = s4CharsRef.current.filter(Boolean)
    let s4Tl = null
    let s4Paths = []
    if (endSvgEl && s4Chars.length) {
      s4Paths = Array.from(endSvgEl.querySelectorAll('path'))
      s4Paths.forEach((path) => {
        const len = path.getTotalLength()
        gsap.set(path, { fill: '#B8926A', fillOpacity: 0, strokeDasharray: len, strokeDashoffset: len })
      })
      gsap.set(s4Chars, { opacity: 0 })
      gsap.set(endSvgEl, { y: 60 })
      const s4Stagger = (2.5 - CHAR_FADE) / (s4Chars.length - 1)
      s4Tl = gsap.timeline({ paused: true })
      s4Tl
        .to(s4Chars, { opacity: 1, duration: CHAR_FADE, stagger: s4Stagger, ease: 'none' }, 0)
        .to(s4Paths, { strokeDashoffset: 0, duration: 2, ease: 'none' }, 0)
        .to(endSvgEl, { y: 0, duration: 2.5, ease: 'power2.out' }, 0)
        .to(s4Paths, { fillOpacity: 1, duration: 0.5, ease: 'power1.in' }, 2)
    }

    // --- Scene transition system ---
    const sceneEls = [scene1Ref.current, scene2Ref.current, scene3Ref.current, scene4Ref.current]

    const handProxy = { p: 0 }
    let handTarget = 0
    const s3Proxy = { p: 0 }
    let s3Target = 0
    const s4Proxy = { p: 0 }
    let s4Target = 0

    let current = 0
    let busy = false
    let cooldownUntil = 0
    let fadeOutEl = null
    let fadeOutTimer = null
    let bodyScrollOpen = false
    let wheelAttached = false

    function attachWheel() {
      if (!wheelAttached) {
        window.addEventListener('wheel', onWheel)
        wheelAttached = true
      }
    }
    function detachWheel() {
      window.removeEventListener('wheel', onWheel)
      wheelAttached = false
    }

    gsap.set(sceneEls[0], { zIndex: 1 })

    function clearFadeOut(instant) {
      if (fadeOutTimer) { clearTimeout(fadeOutTimer); fadeOutTimer = null }
      if (!fadeOutEl) return
      const el = fadeOutEl
      const wasScene2 = el === scene2Ref.current
      fadeOutEl = null
      if (instant) {
        gsap.set(el, { opacity: 0, zIndex: 0 })
        if (wasScene2) gsap.set(handOverlayRef.current, { opacity: 0 })
      } else {
        gsap.to(el, { opacity: 0, duration: 0.4, overwrite: true, onComplete: () => gsap.set(el, { zIndex: 0 }) })
        if (wasScene2) gsap.to(handOverlayRef.current, { opacity: 0, duration: 0.4, overwrite: true })
      }
    }

    function stepFadeOut(p) {
      if (!fadeOutEl) return
      const t = Math.min(1, p / 0.25)
      if (t >= 1) {
        clearFadeOut(true)
      } else {
        gsap.set(fadeOutEl, { opacity: 1 - t })
        if (fadeOutEl === scene2Ref.current) gsap.set(handOverlayRef.current, { opacity: 1 - t })
      }
    }

    function transitionTo(next) {
      if (busy || next === current || next < 0 || next >= sceneEls.length) return
      busy = true
      clearFadeOut(true)
      const forward = next > current

      const scrollEl = scrollIndicatorRef.current
      if (scrollEl) {
        if (next === 2) {
          gsap.to(scrollEl, { opacity: 0, duration: 0.5, ease: 'power1.out', onComplete: () => { scrollEl.style.pointerEvents = 'none' } })
        } else if (next === 1 && current === 2) {
          scrollEl.style.pointerEvents = 'auto'
          gsap.to(scrollEl, { opacity: 1, duration: 0.5, ease: 'power1.in' })
        }
      }

      if (current === 1) gsap.killTweensOf(handProxy)
      if (current === 2) gsap.killTweensOf(s3Proxy)
      if (current === 3) gsap.killTweensOf(s4Proxy)

      if (next === 1) { handTarget = forward ? 0 : 1; handProxy.p = handTarget; handTl?.progress(handTarget) }
      if (next === 2) { s3Target = forward ? 0 : 1; s3Proxy.p = s3Target; s3Tl?.progress(s3Target) }
      if (next === 3) { s4Target = forward ? 0 : 1; s4Proxy.p = s4Target; s4Tl?.progress(s4Target) }

      const from = sceneEls[current]
      const to = sceneEls[next]

      if (forward) {
        gsap.set(to, { opacity: 1, zIndex: 1 })
        gsap.set(from, { zIndex: 2 })
        if (next === 1) gsap.set(handOverlayRef.current, { opacity: 1 })
        fadeOutEl = from
        fadeOutTimer = setTimeout(() => clearFadeOut(false), 500)
        current = next
        busy = false
        cooldownUntil = Date.now() + 200
      } else {
        gsap.set(to, { opacity: 1, zIndex: 1 })
        gsap.set(from, { zIndex: 2 })
        if (next === 1) gsap.set(handOverlayRef.current, { opacity: 1 })
        gsap.to(from, { opacity: 0, duration: 0.35, ease: 'power1.out', overwrite: true, onComplete: () => gsap.set(from, { zIndex: 0 }) })
        current = next
        busy = false
        cooldownUntil = Date.now() + 360
      }
    }

    function driveScene2(dir, absDelta) {
      const step = Math.min(absDelta / SCROLL_DISTANCE, MAX_STEP)
      handTarget = Math.max(0, Math.min(1, handTarget + dir * step))
      if (dir > 0 && handTarget >= 1) {
        gsap.killTweensOf(handProxy); handProxy.p = 1; handTl?.progress(1); transitionTo(2); return
      }
      if (dir < 0 && handTarget <= 0) {
        gsap.to(handProxy, { p: 0, duration: SCRUB, ease: 'power1.out', overwrite: true, onUpdate: () => handTl?.progress(handProxy.p), onComplete: () => { if (handTarget <= 0) transitionTo(0) } })
        return
      }
      gsap.to(handProxy, { p: handTarget, duration: SCRUB, ease: 'power1.out', overwrite: true, onUpdate: () => { handTl?.progress(handProxy.p); stepFadeOut(handProxy.p) } })
    }

    function driveScene3(dir, absDelta) {
      const step = Math.min(absDelta / SCROLL_DISTANCE, MAX_STEP)
      s3Target = Math.max(0, Math.min(1, s3Target + dir * step))
      if (dir > 0 && s3Target >= 1) {
        gsap.killTweensOf(s3Proxy); s3Proxy.p = 1; s3Tl?.progress(1); transitionTo(3); return
      }
      if (dir < 0 && s3Target <= 0) {
        gsap.to(s3Proxy, { p: 0, duration: SCRUB, ease: 'power1.out', overwrite: true, onUpdate: () => s3Tl?.progress(s3Proxy.p), onComplete: () => { if (s3Target <= 0) transitionTo(1) } })
        return
      }
      gsap.to(s3Proxy, { p: s3Target, duration: SCRUB, ease: 'power1.out', overwrite: true, onUpdate: () => { s3Tl?.progress(s3Proxy.p); stepFadeOut(s3Proxy.p) } })
    }

    function driveScene4(dir, absDelta) {
      const step = Math.min(absDelta / SCROLL_DISTANCE, MAX_STEP)
      s4Target = Math.max(0, Math.min(1, s4Target + dir * step))
      if (dir > 0 && s4Target >= 1) {
        gsap.killTweensOf(s4Proxy); s4Proxy.p = 1; s4Tl?.progress(1); openBodyScroll(); return
      }
      if (dir < 0 && s4Target <= 0) {
        gsap.to(s4Proxy, { p: 0, duration: SCRUB, ease: 'power1.out', overwrite: true, onUpdate: () => s4Tl?.progress(s4Proxy.p), onComplete: () => { if (s4Target <= 0) transitionTo(2) } })
        return
      }
      gsap.to(s4Proxy, { p: s4Target, duration: SCRUB, ease: 'power1.out', overwrite: true, onUpdate: () => s4Tl?.progress(s4Proxy.p) })
    }

    function openBodyScroll() {
      if (bodyScrollOpen) return
      bodyScrollOpen = true
      detachWheel()

      const heroEl = heroContainerRef.current
      const contentEl = contentSectionRef.current

      if (contentEl) {
        contentEl.style.pointerEvents = 'auto'
        contentEl.scrollTop = 0
        gsap.to(contentEl, { opacity: 1, duration: FADE_DUR, ease: 'power2.inOut' })
        contentEl.addEventListener('wheel', onContentScrollRewindCheck)
      }
      if (heroEl) gsap.to(heroEl, { opacity: 0, duration: FADE_DUR, ease: 'power2.inOut' })

      const scrollEl = scrollIndicatorRef.current
      if (scrollEl) {
        gsap.to(scrollEl, { opacity: 0, duration: 0.4, overwrite: true, onComplete: () => { scrollEl.style.pointerEvents = 'none' } })
      }
      const hintEl = soundHintRef.current
      if (hintEl) {
        gsap.to(hintEl, { opacity: 0, duration: 0.3, overwrite: true, onComplete: () => { hintEl.style.display = 'none' } })
      }
    }

    function onContentScrollRewindCheck(e) {
      if (!bodyScrollOpen) return
      const contentEl = contentSectionRef.current
      if ((contentEl?.scrollTop ?? 0) <= 0 && e.deltaY < 0) closeBodyScroll(Math.abs(e.deltaY))
    }

    function closeBodyScroll(firstDelta) {
      if (!bodyScrollOpen) return
      bodyScrollOpen = false
      const heroEl = heroContainerRef.current
      const contentEl = contentSectionRef.current

      if (contentEl) {
        contentEl.removeEventListener('wheel', onContentScrollRewindCheck)
        contentEl.style.pointerEvents = 'none'
        gsap.to(contentEl, { opacity: 0, duration: FADE_DUR, ease: 'power2.inOut', onComplete: () => { contentEl.scrollTop = 0 } })
      }
      if (heroEl) {
        gsap.to(heroEl, { opacity: 1, duration: FADE_DUR, ease: 'power2.inOut', onComplete: () => { attachWheel(); if (firstDelta) driveScene4(-1, firstDelta) } })
      }
    }

    function onWheel(e) {
      if (busy || Date.now() < cooldownUntil) return
      const dir = e.deltaY > 0 ? 1 : -1
      const absDelta = Math.abs(e.deltaY)
      if (current === 1) { driveScene2(dir, absDelta); return }
      if (current === 2) { driveScene3(dir, absDelta); return }
      if (current === 3) { driveScene4(dir, absDelta); return }
      if (dir > 0) transitionTo(current + 1)
      else transitionTo(current - 1)
    }

    // --- Touch handling ---
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    let touchStartY = 0
    let touchLastY = 0

    function onTouchStart(e) { if (bodyScrollOpen) return; touchStartY = e.touches[0].clientY; touchLastY = touchStartY }
    function onTouchMove(e) {
      if (bodyScrollOpen) return
      e.preventDefault()
      const y = e.touches[0].clientY
      const deltaY = touchLastY - y
      touchLastY = y
      const absDelta = Math.abs(deltaY)
      if (absDelta < 1 || busy || Date.now() < cooldownUntil) return
      const dir = deltaY > 0 ? 1 : -1
      if (current === 1) driveScene2(dir, absDelta * 3)
      else if (current === 2) driveScene3(dir, absDelta * 3)
      else if (current === 3) driveScene4(dir, absDelta * 3)
    }
    function onTouchEnd() {
      if (bodyScrollOpen) return
      const totalDelta = touchStartY - touchLastY
      if (Math.abs(totalDelta) < 25) return
      const dir = totalDelta > 0 ? 1 : -1
      if (dir > 0 && current === 0) transitionTo(1)
    }
    function onContentTouchStart(e) { touchStartY = e.touches[0].clientY }
    function onContentTouchEnd(e) {
      if (!bodyScrollOpen) return
      const contentEl = contentSectionRef.current
      if (!contentEl || contentEl.scrollTop > 5) return
      const endY = e.changedTouches[0]?.clientY ?? touchStartY
      if (touchStartY - endY < -30) closeBodyScroll(Math.abs(touchStartY - endY))
    }

    if (isTouchDevice) {
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: false })
      window.addEventListener('touchend', onTouchEnd, { passive: true })
      const cEl = contentSectionRef.current
      if (cEl) {
        cEl.addEventListener('touchstart', onContentTouchStart, { passive: true })
        cEl.addEventListener('touchend', onContentTouchEnd, { passive: true })
      }
    }

    indicatorClickRef.current = function handleIndicatorClick() {
      if (current === 0) {
        transitionTo(1)
        setTimeout(() => { for (let i = 0; i < 5; i++) driveScene2(1, 90) }, 250)
      } else if (current === 1) {
        const stepsLeft = Math.ceil((1 - handTarget) / 0.1) + 1
        for (let i = 0; i < stepsLeft; i++) driveScene2(1, 90)
        setTimeout(() => { for (let i = 0; i < 5; i++) driveScene3(1, 90) }, 300)
      } else if (current === 2) {
        const stepsLeft = Math.ceil((1 - s3Target) / 0.1) + 1
        for (let i = 0; i < stepsLeft; i++) driveScene3(1, 90)
        setTimeout(() => { for (let i = 0; i < 5; i++) driveScene4(1, 90) }, 300)
      }
    }

    // --- Scene 1 animation ---
    const arc = arcRef.current
    const chars = charsRef.current.filter(Boolean)
    if (!arc || !chars.length) return

    const arcLen = arc.getTotalLength()
    gsap.set(arc, { strokeDasharray: arcLen, strokeDashoffset: arcLen })
    gsap.set(chars, { opacity: 0 })

    const stagger = (TOTAL_DURATION - CHAR_FADE) / (chars.length - 1)
    let tl = null

    const loaderProxy = { angle: 0 }

    const updateLoader = () => {
      const el = loaderImgRef.current
      if (!el) return
      const mask = `conic-gradient(from -90deg, #000 ${loaderProxy.angle}deg, transparent ${loaderProxy.angle}deg)`
      el.style.webkitMaskImage = mask
      el.style.maskImage = mask
      const pct = Math.round((loaderProxy.angle / 360) * 100)
      if (loaderCountRef.current) loaderCountRef.current.textContent = pct + '%'
    }

    const rnd = (min, max) => min + Math.random() * (max - min)
    const totalTime = rnd(2.4, 3.2)
    const numMid = Math.random() < 0.5 ? 1 : 2
    const midAngles = Array.from({ length: numMid }, () => Math.round(rnd(72, 270))).sort((a, b) => a - b)
    const targets = [...midAngles, 360]
    const weights = targets.map((_, i) => {
      if (i === 0) return rnd(0.6, 1.0)
      if (i === targets.length - 1) return rnd(0.2, 0.4)
      return rnd(0.9, 1.6)
    })
    const wSum = weights.reduce((a, b) => a + b, 0)
    const durations = weights.map((w) => (w / wSum) * totalTime)

    const startEases = ['power2.out', 'power1.out', 'power3.out']
    const midEases = ['power1.inOut', 'none', 'power1.in', 'sine.inOut']
    const endEases = ['power3.in', 'power2.in', 'expo.in']
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

    const loaderTween = gsap.timeline({
      onComplete: () => {
        const loaderEl = loaderRef.current
        if (!loaderEl) return
        gsap.to(loaderEl, {
          y: '-100%',
          duration: 1.4,
          ease: 'expo.inOut',
          onComplete: () => {
            setLoaderDone(true)
            tl = gsap.timeline({ onComplete: () => attachWheel() })
            tl.to(arc, { strokeDashoffset: 0, duration: TOTAL_DURATION, ease: 'none' }, 0)
            tl.to(chars, { opacity: 1, duration: CHAR_FADE, stagger, ease: 'none' }, 0)
            fadeIn()
          },
        })
      },
    })

    targets.forEach((angle, i) => {
      const ease = i === 0 ? pick(startEases) : i === targets.length - 1 ? pick(endEases) : pick(midEases)
      loaderTween.to(loaderProxy, { angle, duration: durations[i], ease, onUpdate: updateLoader })
    })

    return () => {
      loaderTween.kill()
      tl?.kill()
      handTl?.kill()
      s3Tl?.kill()
      s4Tl?.kill()
      clearFadeOut(true)
      document.body.style.overflow = ''
      detachWheel()
      contentSectionRef.current?.removeEventListener('wheel', onContentScrollRewindCheck)
      gsap.killTweensOf([handProxy, s3Proxy, s4Proxy])
      if (isTouchDevice) {
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
        const cEl = contentSectionRef.current
        if (cEl) {
          cEl.removeEventListener('touchstart', onContentTouchStart)
          cEl.removeEventListener('touchend', onContentTouchEnd)
        }
      }
    }
  }, []) // empty deps — intentional, closure captures stable refs
}
