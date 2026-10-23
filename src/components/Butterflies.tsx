import { useEffect, useRef, type CSSProperties } from 'react'
import data from '../data/butterflyMotion.json'
import { userAsset } from '../userAssets'

/*
 * The reference's footer butterflies, replayed from recordings of the live site (src/data/butterflyMotion.json,
 * produced by sampling every layer's transform): each butterfly is a container that drifts along a slow ping-pong
 * path, a body group that flips at each turn, and two wings (right and left, each a matrix3d) that flap on their
 * own cycle (about 1.0–2.2s). Boxes, transform origins, blur and z-order are the reference's.
 */

type Wing = (typeof data.items)[number]['groups'][number]['wings'][number]
type Group = (typeof data.items)[number]['groups'][number]
type Item = (typeof data.items)[number]

const loop = (el: HTMLElement | null, keyframes: Keyframe[], duration: number, offset = 0) =>
  el?.animate(keyframes, { duration, iterations: Infinity, easing: 'linear', delay: -offset })

function WingEl({ w, reduce }: { w: Wing; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduce) return
    const a = loop(
      ref.current,
      w.keys.map((transform) => ({ transform })),
      w.dur,
    )
    return () => a?.cancel()
  }, [w, reduce])
  const src = userAsset(`butterfly-${w.img}`)
  return (
    <div
      ref={ref}
      className="bf__wing"
      style={{ left: w.box.l, top: w.box.t, width: w.box.w, height: w.box.h, transformOrigin: w.origin, zIndex: w.z, transform: w.keys[0] } as CSSProperties}
    >
      {src && <img src={src} alt="" draggable={false} style={{ width: w.w, height: w.h }} />}
    </div>
  )
}

function GroupEl({ g, reduce }: { g: Group; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const keys = 'keys' in g ? (g.keys as string[]) : undefined
  const dur = 'dur' in g ? (g.dur as number) : 0
  useEffect(() => {
    if (reduce || !keys) return
    const a = loop(ref.current, keys.map((transform) => ({ transform })), dur)
    return () => a?.cancel()
  }, [keys, dur, reduce])
  return (
    <div
      ref={ref}
      className="bf__group"
      style={{
        left: g.box.l,
        top: g.box.t,
        width: g.box.w,
        height: g.box.h,
        transformOrigin: g.origin,
        filter: 'blur' in g ? (g.blur as string) : undefined,
        transform: keys ? keys[0] : 'staticTf' in g ? (g.staticTf as string) : undefined,
      }}
    >
      {g.wings.map((w) => (
        <WingEl key={w.name} w={w} reduce={reduce} />
      ))}
    </div>
  )
}

function ButterflyEl({ it, reduce }: { it: Item; reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const path = 'path' in it ? (it.path as { dur: number; keys: number[][] }) : undefined
  useEffect(() => {
    if (reduce || !path) return
    const a = loop(
      ref.current,
      path.keys.map(([x, y]) => ({ transform: `translate(${x}px, ${y}px)` })),
      path.dur,
    )
    return () => a?.cancel()
  }, [path, reduce])
  return (
    <div
      ref={ref}
      className="bf"
      style={{
        left: it.box.l,
        top: it.box.t,
        width: it.box.w,
        height: it.box.h,
        zIndex: 'z' in it ? (it.z as number) : undefined,
        filter: 'blur' in it ? (it.blur as string) : undefined,
        transformOrigin: it.origin,
        transform: 'cStatic' in it ? (it.cStatic as string) : path ? `translate(${path.keys[0][0]}px, ${path.keys[0][1]}px)` : undefined,
      }}
    >
      {it.groups.map((g, i) => (
        <GroupEl key={i} g={g} reduce={reduce} />
      ))}
    </div>
  )
}

/** Renders nothing unless the butterfly wing images are present (local study mode). */
export default function Butterflies() {
  if (!userAsset('butterfly-blue-a')) return null
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const w = data.wrapper
  return (
    <div className="bf__wrap" style={{ left: `calc(50% - 720px + ${w.l}px)`, top: w.t, width: w.w, height: w.h }} aria-hidden="true">
      {data.items.map((it) => (
        <ButterflyEl key={it.n} it={it as Item} reduce={reduce} />
      ))}
    </div>
  )
}
