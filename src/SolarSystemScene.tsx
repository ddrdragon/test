import React, { useState, useRef, useEffect, Children } from "react";
import { Canvas } from "@react-three/fiber";
import {Earth, Moon, Sun} from './components/myMesh';

interface IClock {
  currentTime(): void;
}

interface ClockCtor {
  new (h: number, m: number): IClock;
}

class DigitClock implements IClock {
  constructor(h: number, m: number) { }
  currentTime() {

  }
}

const createClock = (ctor: ClockCtor, hour: number, minite: number) => {
  return new ctor(hour, minite);
}

const digit = createClock(DigitClock, 1, 1);

export default function SolarSystemScene() {

  return (
    <div style={{ height: "100vh" }}>
      {/* <Canvas
        style={{ backgroundColor: "black" }}
        camera={{
          fov: 40,
          aspect: 2,
          near: 0.1,
          far: 1000,
          position: [0, 50, 0],
          up: [0, 0, 1],
        }}
      >
        <pointLight color={0xffffff} intensity={3} />
        <SolarSystem>
          <MyMesh.Sun />
          <EarthSystem>
            <Earth />
            <MoonSystem>
              <Moon />
            </MoonSystem>
          </EarthSystem>
        </SolarSystem>
      </Canvas> */}
    </div>
  );
}

// const useRotate = (ref: React.MutableRefObject<Mesh>, speed: number = 1) => {
//   useFrame(({ clock }) => {
//     ref.current.rotation.y = clock.getElapsedTime() * speed;
//   });
// };

// const MySphereGeometry = () => {
//   return <sphereGeometry args={[1, 6, 6]} />;
// };

// const Moon = () => {
//   const ref = useRef<Mesh>(null!);
//   useRotate(ref);
//   return (
//     <mesh ref={ref} scale={[0.5, 0.5, 0.5]}>
//       <MySphereGeometry />
//       <meshPhongMaterial color={0x888888} emissive={new Color(0x222222)} />
//     </mesh>
//   );
// };

// const Earth = () => {
//   const ref = useRef<Mesh>(null!);
//   useRotate(ref);
//   return (
//     <mesh ref={ref}>
//       <MySphereGeometry />
//       <meshPhongMaterial color={0x2233ff} emissive={new Color(0x112244)} />
//     </mesh>
//   );
// };

// const Sun = () => {
//   const ref = useRef<Mesh>(null!);
//   useRotate(ref); 
//   return (
//     <mesh ref={ref} scale={[5, 5, 5]}>
//       <MySphereGeometry />
//       <meshPhongMaterial emissive={new Color(0xffff00)} />
//     </mesh>
//   );
// };

// const MoonSystem: React.FC = (props) => {
//   const ref = useRef<Mesh>(null!);
//   useRotate(ref);
//   return (
//     <group ref={ref} position={[2, 0, 0]}>
//       {props.children}
//     </group>
//   );
// };

// const EarthSystem: React.FC = (props) => {
//   const ref = useRef<Mesh>(null!);
//   useRotate(ref);
//   return (
//     <group ref={ref} position={[10, 0, 0]}>
//       {props.children}
//       {/* <gridHelper renderOrder={1}>
//         <material attach="materal" depthTest />
//       </gridHelper> */}
//     </group>
//   );
// };

// const SolarSystem: React.FC = (props) => {
//   const ref = useRef<Mesh>(null!);
//   useRotate(ref);
//   return <group ref={ref}>{props.children}</group>;
// };
