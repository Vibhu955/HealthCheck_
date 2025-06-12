// import * as THREE from 'three';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer({ alpha: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// camera.position.z = 30;

// // const boxCount = max;
// const boxes = [];
// const boxSize = 0.5;

// const addBox = () => {
//     const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
//     const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     const box = new THREE.Mesh(geometry, material);
//     box.position.set(
//         (Math.random() - 0.5) * 20,
//         (Math.random() - 0.5) * 20,
//         (Math.random() - 0.5) * 20
//     );
//     box.userData = {
//         velocity: new THREE.Vector3(
//             (Math.random() - 0.5) * 0.1,
//             (Math.random() - 0.5) * 0.1,
//             (Math.random() - 0.5) * 0.1
//         )
//     };
//     scene.add(box);
//     boxes.push(box);
// }
// for (let i = 0; i < 100; i++) {
//     addBox();
// }
// setInterval(addBox, 100);



// const animate = () => {
//     requestAnimationFrame(animate);

//     boxes.forEach(box => {
//         box.position.add(box.userData.velocity);

//         // // Bounce the boxes off the walls
//         // if (box.position.x > 50 || box.position.x < -50) box.userData.velocity.x *= -1;
//         // if (box.position.y > 50 || box.position.y < -50) box.userData.velocity.y *= -1;
//         // if (box.position.z > 50 || box.position.z < -50) box.userData.velocity.z *= -1;
//     });

//     renderer.render(scene, camera);
// };

// animate();
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BackHome = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);
        camera.position.z = 30;

        const boxes = [];
        const boxSize = 0.5;

        const addBox = () => {
            const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
            const material = new THREE.MeshStandardMaterial({
                color: Math.random() * 0xffffff,
                emissive: Math.random() * 0xffffff,
                emissiveIntensity: 0.5
            });


            const box = new THREE.Mesh(geometry, material);
            box.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            box.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1
                )
            };
            scene.add(box);
            boxes.push(box);
        };

        for (let i = 0; i < 100; i++) {
            addBox();
        }
        const intervalId = setInterval(addBox, 100);

        const animate = () => {
            requestAnimationFrame(animate);

            boxes.forEach(box => {
                box.position.add(box.userData.velocity);

                // // Bounce the boxes off the walls
                // if (box.position.x > 10 || box.position.x < -10) box.userData.velocity.x *= -1;
                // if (box.position.y > 10 || box.position.y < -10) box.userData.velocity.y *= -1;
                // if (box.position.z > 10 || box.position.z < -10) box.userData.velocity.z *= -1;
            });

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', handleResize);
            if (renderer.domElement && mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef}  style={{ position: 'absolute', top: 0 , left:0 , width: '100%', height: '100%', zIndex: -1 }} />;
};

export default BackHome;