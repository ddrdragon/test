import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Camera,
  Canvas,
  extend,
  Object3DNode,
  ThreeEvent,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import {
  Box3,
  Clock,
  Color,
  DoubleSide,
  Euler,
  Group,
  Mesh,
  MeshBasicMaterial,
  NearestFilter,
  PerspectiveCamera,
  Quaternion,
  RepeatWrapping,
  Scene,
  TextureLoader,
  Vector2,
  Vector3,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Drop, {ContextMenu} from "./contextMenu";
import { Checkbox, Dropdown, Menu, Radio, Slider } from "antd";

extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>;
    }
  }
}

interface Props {
  name?: string;
  position?: Vector3;
  rotation?: Euler;
}

interface T extends Props {
  
}

export default function Test() {

  const [r, setR] = useState(2);
  const [x, setX] = useState(0);
  const [y, setY] = useState(3);
  const [z, setZ] = useState(0);
  const [small, setSmall] = useState(true);
  const [big, setBig] = useState(true);

  const [update, setUpdate] = useState(true);

  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);
  const [rz, setRz] = useState(0);
  const mesh = useRef<Mesh>(null!);

  useEffect(() => {
    if(mesh.current) {
      const x = new Quaternion().setFromAxisAngle(new Vector3(1, 1 ,1).normalize(), rx);
      const y = new Quaternion().setFromAxisAngle(new Vector3(0, 1 ,0).normalize(), ry);
      const z = new Quaternion().setFromAxisAngle(new Vector3(0, 0 ,1).normalize(), rz);
      mesh.current.setRotationFromQuaternion(y.multiply(x).multiply(z));
    }
  })

  // console.log('main')

  const contextMenuu = useCallback(() => {
    // console.log('context')
    return (
      <Menu>
        <Menu.Item>1</Menu.Item>
        <Menu.Item>2</Menu.Item>
        <Menu.Item>2</Menu.Item>
    </Menu>
    )
  }, [])

  const props: Props = {
    name: 'test',
    position: new Vector3(5,0,5),
    rotation: new Euler(0,0,Math.PI/4),
  }

  return (
    <div>
    <Dropdown trigger={['contextMenu']} overlay={contextMenuu()}>

    <div style={{ height: "100vh" }}>
      <Canvas
        frameloop="demand"
        style={{ backgroundColor: "black" }}
        camera={{
          fov: 45,
          aspect: 2,
          near: 0.1,
          far: 100,
          position: [0, 40, 40],
        }}
      >
        <Controls update={update} setUpdate={setUpdate} />
        <pointLight color="0xFFFFFF" intensity={1} position={[10, 10, 10]} />
        {/* <pointLight color="0xFFFFFF" intensity={1} position={[-10, 10, -10]} /> */}

        <Suspense fallback={null}>
          <Plane />
          <Cube />
        </Suspense>

        <mesh ref={mesh} position={[-5, 2, 0]}>
          <boxGeometry args={[4, 4, 4]} />
          <meshPhongMaterial color="#8AC" />
        </mesh>

        {big && <Sphere />}
        {small && <Sphere_small r={r} pos={[x, y, z]} />}

        {/* <Compass /> */}

        <Rbox {...props as T} />

          
      </Canvas>

      
    </div>
    </Dropdown>
    
    {/* controls */}

    <React.Fragment>
        <Slider defaultValue={0} step={5} min={-360} max={360} onChange={(v: number) => {setRx(v * Math.PI / 180)}} />
        <Slider defaultValue={0} step={5} min={-360} max={360} onChange={(v: number) => {setRy(v * Math.PI / 180)}} />
        <Slider defaultValue={0} step={5} min={-360} max={360} onChange={(v: number) => {setRz(v * Math.PI / 180)}} />
        <br></br>
        <Slider defaultValue={3} max={6} step={0.1} onChange={(v: number) => setR(v)} />
        <Slider defaultValue={0} min={-10} max={10} step={0.1} onChange={(v: number) => setX(v)} />
        <Slider defaultValue={3} min={-10} max={10} step={0.1} onChange={(v: number) => setY(v)} />
        <Slider defaultValue={0} min={-10} max={10} step={0.1} onChange={(v: number) => setZ(v)} />
        <button onClick={() => {setSmall(!small)}}>small: {small ? 'on' : 'off'}</button>
        <button onClick={() => {setBig(!big)}}>big: {big ? 'on' : 'off'}</button>
        <br></br>
      </React.Fragment>
    
    </div>
    

  );
}

const Rbox = ({position = new Vector3(), rotation = new Euler()}: T) => {
  console.log(rotation)
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial />
    </mesh>
  )
}

const Compass = () => {
  const {camera} = useThree();
  const ref = useRef<Mesh>(null!);

  // useEffect(() => {
  //   const v = new Vector3(0,0,0.5).unproject(camera);
  //   ref.current.position.set(v.x, v.y, v.z);
  //   console.log('pos ====>', ref.current.position);
  // }, [camera.position.x, camera.position.y, camera.position.z])

  useFrame(() => {
    const v = new Vector3(0,0,0.5).unproject(camera);
    ref.current.position.set(v.x, v.y, v.z);
  })

  return (
    
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[0.01, 0.01, 0.01]} />
      <meshPhongMaterial color="red" />
  </mesh>
  )
}

const Sphere_small = ({r, pos}: {r: number, pos: number[]}) => {
  return (
    <mesh position={[pos[0], pos[1], pos[2]]}>
      <sphereGeometry args={[r, 32, 16]} />
      <meshPhongMaterial 
        color="red"
        transparent={true}
        opacity={0.8}
        // depthTest={false}
        // depthWrite={false}
      />
    </mesh>
  );
};

const Sphere = () => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <group>
      <mesh position={[0, 3, 0]} onClick={handleClick}>
        <sphereGeometry args={[3, 32, 16]} />
        <meshPhongMaterial 
          color="blue"
          transparent={true}
          opacity={0.8}
          // depthTest={false}
          // depthWrite={false}
        />
      </mesh>
      {clicked && <SphereHandler />}
    </group>
  );
};

const Controls = ({update, setUpdate}: {update: boolean; setUpdate: (u: boolean) => void}) => {
  const { gl, camera, scene } = useThree();
  const controls = useRef<OrbitControls>(null!);

  const render = () => {
    gl.render(scene, camera);
  };

  const end = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    if (controls.current) {
      controls.current.addEventListener("change", render);
      controls.current.addEventListener("end", end);
    }

    return () => {
      if (controls.current) {
        controls.current.removeEventListener("change", render);
        controls.current.removeEventListener("end", end);
      }
    };
  }, [update]);
  return <orbitControls ref={controls} args={[camera, gl.domElement]} />;
};

const Plane = () => {
  const texture = useLoader(
    TextureLoader,
    "https://threejsfundamentals.org/threejs/resources/images/checker.png"
  );
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.magFilter = NearestFilter;
  texture.repeat.set(20, 20);
  return (
    <mesh rotation={[Math.PI * -0.5, 0, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshPhongMaterial map={texture} />
    </mesh>
  );
};

const Cube = () => {
  const texture = useLoader(
    TextureLoader,
    "https://threejsfundamentals.org/threejs/resources/images/wall.jpg"
  );
  const material = [
    new MeshBasicMaterial({
      map: useLoader(
        TextureLoader,
        "https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg"
      ),
      side: DoubleSide,
      transparent: true,
      opacity: 0.5
    }),
    new MeshBasicMaterial({
      map: useLoader(
        TextureLoader,
        "https://threejsfundamentals.org/threejs/resources/images/flower-2.jpg"
      ),
      side: DoubleSide,
      transparent: true,
      opacity: 0.5
    }),
    new MeshBasicMaterial({
      map: useLoader(
        TextureLoader,
        "https://threejsfundamentals.org/threejs/resources/images/flower-3.jpg"
      ),
      side: DoubleSide,
      transparent: true,
      opacity: 0.5
    }),
    new MeshBasicMaterial({
      map: useLoader(
        TextureLoader,
        "https://threejsfundamentals.org/threejs/resources/images/flower-4.jpg"
      ),
      side: DoubleSide,
      transparent: true,
      opacity: 0.5
    }),
    new MeshBasicMaterial({
      map: useLoader(
        TextureLoader,
        "https://threejsfundamentals.org/threejs/resources/images/flower-5.jpg"
      ),
      side: DoubleSide,
      transparent: true,
      opacity: 0.5
    }),
    new MeshBasicMaterial({
      map: useLoader(
        TextureLoader,
        "https://threejsfundamentals.org/threejs/resources/images/flower-6.jpg"
      ),
      side: DoubleSide,
      transparent: true,
      opacity: 0.5
    }),
  ];

  return (
    <mesh position={[5, 2, 0]}>
      <boxGeometry args={[4, 4, 4]} />
      <meshPhongMaterial 
        color="yellow"
        side={DoubleSide}
        transparent={true}
        opacity={0.5}
        // depthTest={false}
        // depthWrite={false}
      />
    </mesh>
  );
};

const SphereHandler = () => {
  return (
    <mesh position={[0, 0, 3.5]}>
      <sphereGeometry args={[0.25, 32, 16]} />
      <meshPhongMaterial color="red" />
    </mesh>
  );
};
