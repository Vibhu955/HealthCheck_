// // Set up scene
// import * as THREE from 'three';
// import { useEffect, useRef } from "react";
// import React from 'react';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// function Background() {

//     const refContainer = useRef(null);
//     useEffect(() => {

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0.02, 0.02, 0.02)
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 15;
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     const controls = new OrbitControls(camera, renderer.domElement);

//     const geometry = new THREE.ConeGeometry(6, 6, 32);
//     const texture = new THREE.TextureLoader().load('https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg' ); 

//     const material = new THREE.MeshBasicMaterial({color:"white", map:texture});
//     // color:"rgb(110 ,99, 197)", map:texture,PointsMaterial,Points,size:0.1
//     const cube = new THREE.Line(geometry, material);
//     scene.add(cube)

//     let q = 0;
//     // Animation function
//     const animate = () => {
//         controls.update();
//         //     cube.position.x = Math.sin(q += 0.01);
//         //     // Rotate the cube
//         //     cube.rotation.x += 0.01;
//         //     cube.rotation.y += 0.01;
//         //     cube.rotation.z += 0.01;
//         renderer.render(scene, camera);

//         requestAnimationFrame(animate);
//     }
//     animate();
// },[loc])
//     return (

//         <div ref={refContainer}>{console.log("first")}</div>
//     )
// }

// export default Background

// import React, { useRef,useEffect } from 'react'
// import * as THREE from 'three';
// import { useLocation } from 'react-router-dom';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as CANNON from 'cannon-es'
// const ThreeScene = () => {
//     const canvasRef = useRef();

//     useEffect(() => {
//         const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
//         const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
//         const scene = new THREE.Scene();
//         const orbit = new OrbitControls(camera, renderer.domElement);

//         renderer.setSize(window.innerWidth, window.innerHeight);
//         document.body.appendChild(renderer.domElement);

//         camera.position.set(10, 30, -40);
//         orbit.update();

//         const groundGeo = new THREE.PlaneGeometry(30, 30);
//         const groundMat = new THREE.MeshBasicMaterial({
//             color: 0xffffff,
//             side: THREE.DoubleSide,
//             wireframe: true
//         });
//         const groundMesh = new THREE.Mesh(groundGeo, groundMat);
//         scene.add(groundMesh);

//         const world = new CANNON.World({
//             gravity: new CANNON.Vec3(0, -9.81, 0)
//         });

//         const timeStep = 1 / 60;

//         function animate() {
//             world.step(timeStep);
//             renderer.render(scene, camera);
//         }

//         renderer.setAnimationLoop(animate);

//         window.addEventListener('resize', function () {
//             camera.aspect = window.innerWidth / window.innerHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//         });

//         return () => {
//             window.removeEventListener('resize', function () {
//                 camera.aspect = window.innerWidth / window.innerHeight;
//                 camera.updateProjectionMatrix();
//                 renderer.setSize(window.innerWidth, window.innerHeight);
//             });
//         };
//     }, []);

//     return <canvas ref={canvasRef} />;
// };

// export default ThreeScene;
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';

import { extend } from '@react-three/fiber';
import { OrbitControls, TransformControls , BoxGeometry } from 'three'
extend({BoxGeometry})



function MyRotatingBox() {
    const myMesh = React.useRef();
    extend({ BoxGeometry, THREE })

    useFrame(({ clock }) => {
        const a = clock.getElapsedTime();
        myMesh.current.rotation.x = a;
    });
    return (
        <mesh ref={myMesh}>
            <BoxGeometry args={[2, 2, 2]} />
            <meshBasicMaterial color="royalblue" />
        </mesh>
    );
}


function Background() {

    return (
        <div id="canvas-container">
            <Canvas >
                <MyRotatingBox />

                <ambientLight intensity={0.1} />
                <directionalLight color="red" position={[0, 0, 5]} />

            </Canvas>
        </div>
    )
}

export default Background;