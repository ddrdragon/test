import React from 'react';
import "@react-three/fiber";
import { Color } from 'three';

const MySphereGeometry = () => {
  return <sphereGeometry args={[1, 6, 6]} />;
};

export const Earth = () => {
  return (
    <mesh>
      <MySphereGeometry />
      <meshPhongMaterial color={0x2233ff} emissive={new Color(0xffff00)} />
    </mesh>
  )
}

export const Moon = () => {
  return (
    <mesh scale={[0.5, 0.5, 0.5]}>
      <MySphereGeometry />
      <meshPhongMaterial color={0x888888} emissive={new Color(0xffff00)} />
    </mesh>
  )
}
export const Sun = () => {
  return (
    <mesh scale={[5, 5, 5]}>
      <MySphereGeometry />
      <meshPhongMaterial emissive={new Color(0xffff00)} />
    </mesh>
  )
}