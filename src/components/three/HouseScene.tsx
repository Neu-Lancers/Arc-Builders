import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { createContext, useContext, useMemo, useRef, type MutableRefObject, type ReactNode } from 'react'
import * as THREE from 'three'

/* Shared, smoothed scroll progress (0 → 1) */
const PCtx = createContext<MutableRefObject<number>>({ current: 0 })
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (k: number) => 1 - Math.pow(1 - k, 3)
const prog = (p: number, a: number, b: number) => easeOut(clamp01((p - a) / (b - a)))

/* ---------- palette ---------- */
const C = {
  slab: '#c9c0b0', col: '#e3dccf', wall: '#eee5da', roof: '#1d4a35', wood: '#a9835a', darkwood: '#6b4a2f',
  glass: '#7fb6a0', sofa: '#2c5f46', gold: '#c0955a', ground: '#0f2218', path: '#d6cdbb', leaf: '#2f7a52', leaf2: '#3f9467',
}

/** Box that rises from its base between progress a → b. */
function Rise({ a, b, x = 0, y = 0, z = 0, w, h, d, color, rough = 0.7, emissive, ei = 0, metal = 0 }: {
  a: number; b: number; x?: number; y?: number; z?: number; w: number; h: number; d: number; color: string; rough?: number; emissive?: string; ei?: number; metal?: number
}) {
  const g = useRef<THREE.Group>(null)
  const P = useContext(PCtx)
  useFrame(() => {
    const k = prog(P.current, a, b)
    if (!g.current) return
    g.current.scale.y = Math.max(k, 0.0001)
    g.current.visible = k > 0.001
  })
  return (
    <group ref={g} position={[x, y, z]}>
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} roughness={rough} metalness={metal} emissive={emissive ?? '#000'} emissiveIntensity={ei} />
      </mesh>
    </group>
  )
}

/** Wrapper that scales a group in (all axes) between a → b. */
function Pop({ a, b, position, children }: { a: number; b: number; position?: [number, number, number]; children: ReactNode }) {
  const g = useRef<THREE.Group>(null)
  const P = useContext(PCtx)
  useFrame(() => {
    const k = prog(P.current, a, b)
    if (!g.current) return
    g.current.scale.setScalar(Math.max(k, 0.0001))
    g.current.visible = k > 0.001
  })
  return <group ref={g} position={position}>{children}</group>
}

function Glass({ a, b, x, y, z, w, h, d = 0.06 }: { a: number; b: number; x: number; y: number; z: number; w: number; h: number; d?: number }) {
  const m = useRef<THREE.MeshStandardMaterial>(null)
  const P = useContext(PCtx)
  useFrame(() => { if (m.current) m.current.opacity = 0.32 * prog(P.current, a, b) })
  return (
    <mesh position={[x, y + h / 2, z]}>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial ref={m} color={C.glass} transparent opacity={0} roughness={0.05} metalness={0.4} depthWrite={false} />
    </mesh>
  )
}

function Tree({ x, z, s = 1, a }: { x: number; z: number; s?: number; a: number }) {
  return (
    <Pop a={a} b={a + 0.06} position={[x, 0, z]}>
      <group scale={s}>
        <mesh position={[0, 0.8, 0]}><cylinderGeometry args={[0.12, 0.18, 1.6, 8]} /><meshStandardMaterial color={C.darkwood} roughness={1} /></mesh>
        <mesh position={[0, 2.3, 0]}><icosahedronGeometry args={[1.1, 1]} /><meshStandardMaterial color={C.leaf} roughness={0.9} flatShading /></mesh>
        <mesh position={[0.5, 1.8, 0.3]}><icosahedronGeometry args={[0.7, 1]} /><meshStandardMaterial color={C.leaf2} roughness={0.9} flatShading /></mesh>
      </group>
    </Pop>
  )
}

function Lamp({ x, z, a }: { x: number; z: number; a: number }) {
  return (
    <Pop a={a} b={a + 0.05} position={[x, 0, z]}>
      <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.04, 0.04, 1, 6]} /><meshStandardMaterial color="#222" /></mesh>
      <mesh position={[0, 1.1, 0]}><sphereGeometry args={[0.14, 12, 12]} /><meshStandardMaterial color="#ffe2a8" emissive="#ffd68a" emissiveIntensity={2.2} /></mesh>
    </Pop>
  )
}

/* ---------- the house ---------- */
function House() {
  const FL = 0.3 // finished floor level
  const H1 = 3.2
  const cols = useMemo(() => {
    const out: [number, number][] = []
    for (const x of [-6, -2, 2, 6]) for (const z of [-4, 4]) out.push([x, z])
    out.push([-6, 0], [6, 0])
    return out
  }, [])
  return (
    <group>
      {/* foundation + plot */}
      <Rise a={0.02} b={0.1} w={13} h={FL} d={9} y={0} color={C.slab} />
      {[[0, -9, 26, 0.12], [0, 9, 26, 0.12]].map(([x, z, w, d], i) => <Rise key={i} a={0} b={0.05} x={x} z={z} w={w} h={0.06} d={d} color={C.gold} />)}
      {[-13, 13].map((x) => <Rise key={x} a={0} b={0.05} x={x} z={0} w={0.12} h={0.06} d={18} color={C.gold} />)}

      {/* columns */}
      {cols.map(([x, z], i) => <Rise key={i} a={0.1 + i * 0.008} b={0.2 + i * 0.008} x={x} y={FL} z={z} w={0.4} h={H1} d={0.4} color={C.col} />)}

      {/* ground-floor slab / ceiling */}
      <Rise a={0.2} b={0.27} y={FL + H1} w={13} h={0.28} d={9} color={C.slab} />

      {/* ground floor walls: back, left, right */}
      <Rise a={0.26} b={0.35} x={0} y={FL} z={-4} w={12} h={H1} d={0.3} color={C.wall} />
      <Rise a={0.28} b={0.37} x={-6} y={FL} z={0} w={0.3} h={H1} d={8} color={C.wall} />
      <Rise a={0.28} b={0.37} x={6} y={FL} z={0} w={0.3} h={H1} d={8} color={C.wall} />
      {/* front: lintel over door + glass panes */}
      <Rise a={0.34} b={0.4} x={0} y={FL + 2.7} z={4} w={1.9} h={0.5} d={0.3} color={C.wall} />
      <Glass a={0.4} b={0.46} x={-3.45} y={FL} z={4} w={5.1} h={H1} />
      <Glass a={0.4} b={0.46} x={3.45} y={FL} z={4} w={5.1} h={H1} />
      {/* door frame */}
      <Rise a={0.38} b={0.44} x={-0.98} y={FL} z={4} w={0.1} h={2.7} d={0.34} color={C.gold} metal={0.6} />
      <Rise a={0.38} b={0.44} x={0.98} y={FL} z={4} w={0.1} h={2.7} d={0.34} color={C.gold} metal={0.6} />

      {/* upper floor */}
      <Rise a={0.36} b={0.45} x={0} y={FL + H1 + 0.28} z={-0.5} w={10.4} h={2.9} d={7} color={C.wall} />
      {/* window strips (emissive at night) */}
      <Rise a={0.44} b={0.5} x={0} y={FL + H1 + 1.2} z={3.02} w={8.4} h={1.2} d={0.06} color="#1b3a2c" emissive="#ffd9a0" ei={1.1} />
      <Rise a={0.44} b={0.5} x={5.22} y={FL + H1 + 1.2} z={-0.5} w={0.06} h={1.2} d={4.6} color="#1b3a2c" emissive="#ffd9a0" ei={1.1} />
      {/* balcony */}
      <Rise a={0.46} b={0.5} x={0} y={FL + H1 + 0.28} z={4.2} w={9} h={0.18} d={2.4} color={C.slab} />
      <Glass a={0.48} b={0.54} x={0} y={FL + H1 + 0.46} z={5.38} w={9} h={0.9} />

      {/* roof + porch canopy */}
      <Rise a={0.48} b={0.56} y={FL + H1 + 0.28 + 2.9} x={0} z={-0.4} w={11.6} h={0.34} d={8.6} color={C.roof} />
      <Rise a={0.5} b={0.56} x={0} y={FL + 3.25} z={5.2} w={4.4} h={0.14} d={2.6} color={C.wood} />
      {[-1.9, 1.9].map((x) => <Rise key={x} a={0.5} b={0.56} x={x} y={FL} z={6.3} w={0.18} h={3.25} d={0.18} color={C.wood} />)}

      {/* path + garden */}
      <Rise a={0.54} b={0.62} x={0} y={0} z={10} w={2.2} h={0.08} d={12} color={C.path} />
      <Rise a={0.54} b={0.6} x={0} y={0} z={5.2} w={5} h={0.1} d={2.6} color={C.path} />
      {[[-9, 7, 1.1], [9, 7, 1.2], [-8, 14, 1.3], [8.5, 13, 1], [-12, 0, 1.2], [12, -1, 1.3], [-8, -8, 1.2], [8, -8, 1], [0, -8.5, 1.4], [-4, 17, 1], [5, 18, 1.2]].map(([x, z, s], i) => (
        <Tree key={i} x={x} z={z} s={s} a={0.52 + i * 0.012} />
      ))}
      {[[-1.9, 8], [1.9, 8], [-1.9, 12], [1.9, 12], [-1.9, 16], [1.9, 16]].map(([x, z], i) => <Lamp key={i} x={x} z={z} a={0.58 + i * 0.01} />)}

      {/* ---------- interior ---------- */}
      <Interior />
    </group>
  )
}

function Interior() {
  const a = 0.5, b = 0.62
  return (
    <group>
      <Pop a={a} b={b} position={[0, 0.3, 0]}>
        {/* floor */}
        <mesh position={[0, 0.04, 0]}><boxGeometry args={[11.6, 0.08, 7.7]} /><meshStandardMaterial color={C.wood} roughness={0.55} /></mesh>
        {/* rug */}
        <mesh position={[-2.6, 0.1, -0.8]}><boxGeometry args={[4.4, 0.03, 3.2]} /><meshStandardMaterial color="#e8dcc6" roughness={1} /></mesh>
        {/* sofa */}
        <mesh position={[-2.6, 0.38, 0.5]}><boxGeometry args={[3.6, 0.5, 1.1]} /><meshStandardMaterial color={C.sofa} roughness={0.9} /></mesh>
        <mesh position={[-2.6, 0.8, 0.95]}><boxGeometry args={[3.6, 0.7, 0.25]} /><meshStandardMaterial color={C.sofa} roughness={0.9} /></mesh>
        {[-3.7, -2.6, -1.5].map((x) => <mesh key={x} position={[x, 0.72, 0.4]}><boxGeometry args={[1, 0.22, 0.85]} /><meshStandardMaterial color="#3a7658" roughness={0.9} /></mesh>)}
        {/* coffee table */}
        <mesh position={[-2.6, 0.3, -1]}><boxGeometry args={[1.8, 0.1, 0.9]} /><meshStandardMaterial color={C.darkwood} roughness={0.4} /></mesh>
        <mesh position={[-2.6, 0.15, -1]}><boxGeometry args={[1.5, 0.2, 0.6]} /><meshStandardMaterial color="#222" /></mesh>
        {/* TV wall */}
        <mesh position={[-2.6, 1.4, -3.78]}><boxGeometry args={[4.2, 2.2, 0.1]} /><meshStandardMaterial color={C.darkwood} roughness={0.6} /></mesh>
        <mesh position={[-2.6, 1.5, -3.7]}><boxGeometry args={[2.4, 1.3, 0.04]} /><meshStandardMaterial color="#05070a" emissive="#3a6ea5" emissiveIntensity={0.9} /></mesh>
        {/* dining */}
        <mesh position={[3.2, 0.82, -1.2]}><boxGeometry args={[2.8, 0.1, 1.2]} /><meshStandardMaterial color={C.darkwood} roughness={0.4} /></mesh>
        {[[-1.2, -0.45], [1.2, -0.45], [-1.2, 0.45], [1.2, 0.45]].map(([x, z], i) => <mesh key={i} position={[3.2 + x * 0.55, 0.38, -1.2 + z * 1.6]}><boxGeometry args={[0.1, 0.76, 0.1]} /><meshStandardMaterial color="#222" /></mesh>)}
        {[-0.8, 0.8].flatMap((x) => [-1.1, 1.1].map((z) => [x, z])).map(([x, z], i) => (
          <mesh key={i} position={[3.2 + x, 0.42, -1.2 + z * 0.75]}><boxGeometry args={[0.5, 0.1, 0.5]} /><meshStandardMaterial color={C.gold} roughness={0.7} /></mesh>
        ))}
        {/* kitchen island */}
        <mesh position={[1, 0.55, -3.2]}><boxGeometry args={[3.2, 1.1, 0.9]} /><meshStandardMaterial color="#f4efe6" roughness={0.3} /></mesh>
        <mesh position={[1, 1.12, -3.2]}><boxGeometry args={[3.3, 0.06, 1]} /><meshStandardMaterial color="#2b2b2b" roughness={0.2} metalness={0.3} /></mesh>
        {/* plants */}
        {[[-5.2, 3], [5.2, 3], [-5.2, -3.2]].map(([x, z], i) => (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.28, 0.2, 0.5, 10]} /><meshStandardMaterial color="#d9d0c0" /></mesh>
            <mesh position={[0, 0.9, 0]}><icosahedronGeometry args={[0.5, 1]} /><meshStandardMaterial color={C.leaf2} flatShading /></mesh>
          </group>
        ))}
        {/* pendant lights */}
        {[2.2, 3.2, 4.2].map((x) => (
          <group key={x} position={[x, 2.3, -1.2]}>
            <mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.01, 0.01, 1, 4]} /><meshStandardMaterial color="#111" /></mesh>
            <mesh><sphereGeometry args={[0.2, 14, 14]} /><meshStandardMaterial color="#fff1d6" emissive="#ffd68a" emissiveIntensity={2.4} /></mesh>
          </group>
        ))}
        {/* ceiling downlights */}
        {[-4, -1, 2, 5].flatMap((x) => [-2.5, 0.8].map((z) => [x, z])).map(([x, z], i) => (
          <mesh key={i} position={[x, 2.9, z]}><cylinderGeometry args={[0.15, 0.15, 0.04, 14]} /><meshStandardMaterial color="#fff" emissive="#ffe6b8" emissiveIntensity={2.4} /></mesh>
        ))}
      </Pop>
    </group>
  )
}

/* ---------- camera path ---------- */
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)
const camPts = [
  V(24, 28, 30), V(32, 20, 8), V(22, 15, -22), V(-18, 13, -20), V(-26, 9, 8), V(-14, 5.5, 19), V(-4, 2.8, 15),
  V(0, 1.8, 9.5), V(0, 1.7, 6), V(0.5, 1.7, 3.2), V(2.5, 1.8, 2.6), V(4.5, 2.0, 2.8), V(4.8, 2.1, 0.4), V(-4.8, 2.0, 2.8), V(-3, 2.3, 3.1),
]
const tgtPts = [
  V(0, 0, 0), V(0, 1, 0), V(0, 2, 0), V(0, 2.5, 0), V(0, 2.5, 0), V(0, 2.5, 2), V(0, 2.3, 3),
  V(0, 1.8, 4), V(0, 1.6, 0), V(-2, 1.4, -2), V(-2.5, 1.2, -2), V(-1, 1.2, -2.5), V(-2, 1.1, -1.8), V(3, 1.0, -2), V(1, 1.3, -3),
]
const camCurve = new THREE.CatmullRomCurve3(camPts, false, 'centripetal')
const tgtCurve = new THREE.CatmullRomCurve3(tgtPts, false, 'centripetal')

function Rig({ target, shared }: { target: MutableRefObject<number>; shared: MutableRefObject<number> }) {
  const { camera, scene, size } = useThree()
  const look = useMemo(() => new THREE.Vector3(), [])
  const bg = useMemo(() => new THREE.Color(), [])
  const c0 = useMemo(() => new THREE.Color('#0b1a13'), [])
  const c1 = useMemo(() => new THREE.Color('#2a2118'), [])
  const lightIn = useRef<THREE.PointLight>(null)
  const lightIn2 = useRef<THREE.PointLight>(null)
  const sun = useRef<THREE.DirectionalLight>(null)
  useFrame((_, dt) => {
    shared.current += (target.current - shared.current) * (1 - Math.exp(-dt * 3.2))
    const p = shared.current
    camCurve.getPoint(p, camera.position)
    tgtCurve.getPoint(p, look)
    camera.lookAt(look)
    const cam = camera as THREE.PerspectiveCamera
    const fov = (size.width / size.height < 0.85 ? 70 : 50) + 12 * prog(p, 0.6, 0.72)
    if (Math.abs(cam.fov - fov) > 0.05) { cam.fov = fov; cam.updateProjectionMatrix() }
    // sky/fog warms as we step inside
    bg.copy(c0).lerp(c1, prog(p, 0.66, 0.8))
    scene.background = bg
    if (scene.fog) (scene.fog as THREE.Fog).color.copy(bg)
    const on = prog(p, 0.54, 0.68)
    if (lightIn.current) lightIn.current.intensity = 14 * on
    if (lightIn2.current) lightIn2.current.intensity = 10 * on
    if (sun.current) sun.current.intensity = 1.6 * (1 - prog(p, 0.62, 0.72) * 0.8)
  })
  return (
    <>
      <fog attach="fog" args={['#0b1a13', 30, 90]} />
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#bcd6c6', '#1a2a20', 0.6]} />
      <directionalLight ref={sun} position={[14, 22, 16]} intensity={1.6} color="#fff0d6" />
      <pointLight ref={lightIn} position={[-1, 2.9, 0]} color="#ffead0" distance={14} decay={1.6} intensity={0} />
      <pointLight ref={lightIn2} position={[3, 2.7, -2]} color="#ffead0" distance={12} decay={1.6} intensity={0} />
    </>
  )
}

function CityContext() {
  const blocks = useMemo(() => {
    let seed = 7; const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    return Array.from({ length: 46 }, () => {
      const a = r() * Math.PI * 2, d = 46 + r() * 40
      return { x: Math.cos(a) * d, z: Math.sin(a) * d, w: 3 + r() * 5, h: 3 + r() * 16, dd: 3 + r() * 5, win: r() > 0.4 }
    })
  }, [])
  return (
    <group>
      {blocks.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.dd]} />
          <meshStandardMaterial color="#16301f" roughness={0.9} emissive={b.win ? '#c0955a' : '#000'} emissiveIntensity={b.win ? 0.1 : 0} />
        </mesh>
      ))}
    </group>
  )
}

function Ground() {
  const m = useRef<THREE.GridHelper>(null)
  const P = useContext(PCtx)
  useFrame(() => {
    const g = m.current
    if (g) (g.material as THREE.Material).opacity = 0.5 * (1 - prog(P.current, 0.1, 0.35))
  })
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color={C.ground} roughness={1} />
      </mesh>
      <gridHelper ref={m} args={[60, 60, '#c0955a', '#2f5a45']} position={[0, 0.01, 0]} material-transparent material-opacity={0.5} />
    </>
  )
}

export default function HouseScene({ progress, active }: { progress: MutableRefObject<number>; active: boolean }) {
  const shared = useRef(0)
  return (
    <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.25]} camera={{ fov: 50, near: 0.1, far: 200, position: [20, 24, 24] }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <PCtx.Provider value={shared}>
        <Rig target={progress} shared={shared} />
        <Ground />
        <CityContext />
        <House />
      </PCtx.Provider>
    </Canvas>
  )
}
