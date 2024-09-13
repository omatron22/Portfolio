import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface ThreeDModelViewerProps {
  modelPath: string;
}

const ThreeDModelViewer: React.FC<ThreeDModelViewerProps> = ({ modelPath }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onLoad = () => {
      document.getElementById('loading-overlay')?.remove();
    };

    const dimensions = {
      width: mountRef.current?.clientWidth || window.innerWidth,
      height: mountRef.current?.clientHeight || window.innerHeight,
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(dimensions.width, dimensions.height);
    mountRef.current?.appendChild(renderer.domElement);

    const loader = new GLTFLoader(loadingManager);

    loader.load(
      modelPath,
      (gltf) => {
        scene.add(gltf.scene);

        // Rotate and align the model
        gltf.scene.rotation.y = -1.5;
        gltf.scene.rotation.x = 0.25;

        // Center the model in the scene
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = new THREE.Vector3();
        box.getCenter(center);
        gltf.scene.position.sub(center);

        // Scale the model to be smaller
        gltf.scene.scale.set(1, 1, 1); // Adjust this value to make the model smaller

        const animate = function () {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    // Lighting and camera positioning
    const ambientLight = new THREE.AmbientLight(0xffffff, 3); // Brighter ambient light
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight1.position.set(5, 5, 5);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(ambientLight);
    scene.add(directionalLight1);
    scene.add(directionalLight2);

    camera.position.z = 4; // Adjust camera distance for visibility

    // Orbit controls for zoom/rotate
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.maxDistance = 12; // Max zoom out
    controls.minDistance = 3; // Min zoom in
    controls.update();

    const currentMount = mountRef.current; // Save mountRef value

    return () => {
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [modelPath]);

  return (
    <div className="relative w-full h-full">
      <div id="loading-overlay" className="absolute w-full h-full bg-[rgba(0,0,0,0.3)] animate-pulse flex justify-center items-center">
        <span>Loading 3D Model</span>
      </div>
      <div ref={mountRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default ThreeDModelViewer;
