import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { sRGBEncoding } from '@react-three/drei/helpers/deprecated';
import { World, Body, Box, Sphere, Vec3, Material, ContactMaterial } from 'cannon-es';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const Background = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const world = new World();
        world.gravity.set(0, -9.82, 0);

        // Load GLTF models
        const gltfLoader = new GLTFLoader();
        const rgbeLoader = new RGBELoader();
        renderer.outputEncoding = sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 4;

        rgbeLoader.load('models/table/rogland_clear_night_4k.hdr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;

            const loadModel = (url) => {
                return new Promise((resolve, reject) => {
                    gltfLoader.load(url, resolve, undefined, reject);
                });
            };

            Promise.all([
                loadModel('models/stethoscope/scene.gltf'),
                loadModel('models/scissors/scene.gltf'),
                loadModel('models/table/scene.gltf'),
            ]).then(([stethoscopeGltf, scissorsGltf, tableGltf]) => {
                // Create table
                const tableMesh = tableGltf.scene;
                tableMesh.scale.set(1, 1, 1);
                tableMesh.position.set(0, -8.5, 0);
                scene.add(tableMesh);

                const tableBody = new Body({
                    mass: 0,
                    shape: new Box(new Vec3(1, 0.25, 5)),
                    position: new Vec3(0, -5, 0)
                });
                world.addBody(tableBody);

                // Create stethoscope
                const stethoscopeMesh = stethoscopeGltf.scene;
                stethoscopeMesh.scale.set(0.5, 0.5, 0.5);
                scene.add(stethoscopeMesh);

                const stethoscopeBody = new Body({
                    mass: 2,
                    shape: new Sphere(0.5),
                    position: new Vec3(0.5, 7, 0) // Position the stethoscope above the table to ensure collision
                });
                world.addBody(stethoscopeBody);

                // Create scissors
                const scissorsMesh = scissorsGltf.scene;
                scissorsMesh.scale.set(5, 5, 5);
                scene.add(scissorsMesh);

                const scissorsBody = new Body({
                    mass: 1,
                    shape: new Box(new Vec3(0.5, 0.5, 0.5)),
                    position: new Vec3(-0.1, 5, 0),
                    angularVelocity: new Vec3(-0.5, 0, 0.5), // Rotate the scissors
                });
                world.addBody(scissorsBody);

                // Create contact material for better collision handling
                const defaultMaterial = new Material('default');
                const contactMaterial = new ContactMaterial(defaultMaterial, defaultMaterial, {
                    friction: 0.4,
                    restitution: 0.3,
                });
                world.addContactMaterial(contactMaterial);

                camera.position.z = 15;

                const animate = () => {
                    requestAnimationFrame(animate);

                    world.step(1 / 60);

                    stethoscopeMesh.position.copy(stethoscopeBody.position);
                    stethoscopeMesh.quaternion.copy(stethoscopeBody.quaternion);

                    scissorsMesh.position.copy(scissorsBody.position);
                    scissorsMesh.quaternion.copy(scissorsBody.quaternion);

                    renderer.render(scene, camera);
                };

                animate();
            }).catch((err) => {
                console.error('Error loading models', err);
            });
        });

        return () => {
            if (renderer.domElement && mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} />;
};

export default Background;