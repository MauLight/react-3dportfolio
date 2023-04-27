import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'



const Computers = ({ isMobile }) => {

  const computer = useGLTF('./desktop_pc/scene.gltf')
  const oldcomputer = useGLTF('./old_computers/scene.gltf')
  const blackhole = useGLTF('./black_hole/scene.gltf')
  const police = useGLTF('./police/scene.gltf')
  const walkman = useGLTF('./walkman/scene.gltf')


  return (
    <mesh>
      <hemisphereLight
        intensity={0.15}
        groundColor="black"
      />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={walkman.scene}
        scale={isMobile ? 0.65 : 0.85}
        position={isMobile ? [-13, -5.25, -5] : [-5, -5.25, -5]}
        rotation={[0, -5.5, 0]}
      />
    </mesh>
  )
}

const ComputerCanvas = () => {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {

    //Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 700px)")

    //Set the initial value of the isMobile state variable
    setIsMobile(mediaQuery.matches)

    //Define a callback function to handle changes to the mediaQuery
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches)
    }
    mediaQuery.addEventListener('change', handleMediaQueryChange)

    //Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])


  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [30, 10, 15], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}


export default ComputerCanvas