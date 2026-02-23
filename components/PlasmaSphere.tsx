import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

const MatrixParticleSphere = () => {
    const pointsRef = useRef<THREE.Points>(null);

    // Create particles
    const particleCount = 1500;
    const positions = React.useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const radius = 1.3;
        for (let i = 0; i < particleCount; i++) {
            // Random point on sphere surface
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            // Add some jitter/noise for "Matrix" imperfection
            pos[i * 3] = x + (Math.random() - 0.5) * 0.1;
            pos[i * 3 + 1] = y + (Math.random() - 0.5) * 0.1;
            pos[i * 3 + 2] = z + (Math.random() - 0.5) * 0.1;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            const time = state.clock.getElapsedTime();
            pointsRef.current.rotation.y = time * 0.15;
            pointsRef.current.rotation.z = time * 0.05;

            // Subtle "breathing" scale
            const scale = 1 + Math.sin(time * 1.5) * 0.05;
            pointsRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.035}
                color="#FBBF24" // amber-400
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export const DysonSphere = () => {
    return (
        <div className="w-full h-full relative">
            <Canvas camera={{ position: [0, 0, 3.5] }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />
                <MatrixParticleSphere />
            </Canvas>
        </div>
    );
};

// Keeping original PlasmaSphere for backward compatibility if used elsewhere (Header)
const PlasmaContent = () => {
    const sphereRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (sphereRef.current) {
            sphereRef.current.rotation.z = time * 0.2;
            sphereRef.current.rotation.x = time * 0.2;
            const scale = 1 + Math.sin(time * 2) * 0.15 + 0.15;
            sphereRef.current.scale.set(scale, scale, scale);
        }
    });
    return (
        <Sphere args={[1, 64, 64]} ref={sphereRef}>
            <MeshDistortMaterial color="#10B981" distort={0.4} speed={4} roughness={0.2} metalness={0.8} emissive="#059669" emissiveIntensity={0.5} />
        </Sphere>
    );
};

const PlasmaSphere = () => {
    return (
        <div className="w-full h-40 absolute top-0 left-0 right-0 z-0 overflow-hidden rounded-t-3xl opacity-90 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 3] }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#34D399" />
                <PlasmaContent />
            </Canvas>
        </div>
    );
};

export default PlasmaSphere;
