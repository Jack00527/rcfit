"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Minimize,
  MapPin,
  Users,
  Dumbbell,
  Heart,
  Waves,
  Coffee,
  Car,
  X,
  Info,
  Navigation,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import * as THREE from "three"

// Tour locations data
const tourLocations = [
  {
    id: "entrance",
    name: "Main Entrance",
    description: "Welcome to PowerFit! Our modern reception area with friendly staff ready to help.",
    icon: <MapPin className="h-5 w-5" />,
    position: [0, 0, 0],
    hotspots: [
      { id: "cardio", position: [2, 0, -3], target: "cardio" },
      { id: "weights", position: [-2, 0, -3], target: "weights" },
    ],
    features: ["Reception Desk", "Member Check-in", "Retail Store", "Lounge Area"],
  },
  {
    id: "cardio",
    name: "Cardio Zone",
    description: "State-of-the-art cardio equipment with entertainment systems and city views.",
    icon: <Heart className="h-5 w-5" />,
    position: [0, 0, 0],
    hotspots: [
      { id: "entrance", position: [-2, 0, 3], target: "entrance" },
      { id: "weights", position: [3, 0, -1], target: "weights" },
      { id: "classes", position: [0, 0, -3], target: "classes" },
    ],
    features: ["50+ Cardio Machines", "Entertainment Systems", "Heart Rate Monitoring", "Towel Service"],
  },
  {
    id: "weights",
    name: "Weight Training Area",
    description: "Premium free weights and strength training equipment for serious lifters.",
    icon: <Dumbbell className="h-5 w-5" />,
    position: [0, 0, 0],
    hotspots: [
      { id: "entrance", position: [2, 0, 3], target: "entrance" },
      { id: "cardio", position: [-3, 0, -1], target: "cardio" },
      { id: "functional", position: [0, 0, -3], target: "functional" },
    ],
    features: ["Free Weights", "Power Racks", "Cable Machines", "Olympic Platforms"],
  },
  {
    id: "classes",
    name: "Group Fitness Studio",
    description: "Spacious studio for yoga, HIIT, dance, and other group fitness classes.",
    icon: <Users className="h-5 w-5" />,
    position: [0, 0, 0],
    hotspots: [
      { id: "cardio", position: [0, 0, 3], target: "cardio" },
      { id: "functional", position: [3, 0, 0], target: "functional" },
      { id: "recovery", position: [-3, 0, 0], target: "recovery" },
    ],
    features: ["Mirrored Walls", "Sound System", "Yoga Props", "Dance Floor"],
  },
  {
    id: "functional",
    name: "Functional Training",
    description: "Open space for functional movements, TRX, and athletic training.",
    icon: <Waves className="h-5 w-5" />,
    position: [0, 0, 0],
    hotspots: [
      { id: "weights", position: [0, 0, 3], target: "weights" },
      { id: "classes", position: [-3, 0, 0], target: "classes" },
      { id: "recovery", position: [0, 0, -3], target: "recovery" },
    ],
    features: ["TRX Systems", "Battle Ropes", "Agility Ladders", "Medicine Balls"],
  },
  {
    id: "recovery",
    name: "Recovery Lounge",
    description: "Relax and recover with massage chairs, stretching area, and wellness amenities.",
    icon: <Coffee className="h-5 w-5" />,
    position: [0, 0, 0],
    hotspots: [
      { id: "classes", position: [3, 0, 0], target: "classes" },
      { id: "functional", position: [0, 0, 3], target: "functional" },
      { id: "locker", position: [-3, 0, 0], target: "locker" },
    ],
    features: ["Massage Chairs", "Stretching Mats", "Foam Rollers", "Hydration Station"],
  },
  {
    id: "locker",
    name: "Locker Rooms",
    description: "Clean, modern locker rooms with showers, sauna, and premium amenities.",
    icon: <Car className="h-5 w-5" />,
    position: [0, 0, 0],
    hotspots: [
      { id: "recovery", position: [3, 0, 0], target: "recovery" },
      { id: "entrance", position: [0, 0, 3], target: "entrance" },
    ],
    features: ["Private Lockers", "Showers", "Sauna", "Grooming Stations"],
  },
]

// Hotspot component
function Hotspot({
  position,
  onClick,
  isActive,
}: { position: [number, number, number]; onClick: () => void; isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
    }
  })

  return (
    <mesh ref={meshRef} position={position} onClick={onClick}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color={isActive ? "#dc2626" : "#ef4444"}
        emissive={isActive ? "#dc2626" : "#ef4444"}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
      <Html distanceFactor={10}>
        <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
          Click to explore
        </div>
      </Html>
    </mesh>
  )
}

// 360 Environment component
function Environment360({ currentLocation }: { currentLocation: string }) {
  const { scene } = useThree()

  useEffect(() => {
    // Create a large sphere for the 360° environment
    const geometry = new THREE.SphereGeometry(50, 60, 40)
    geometry.scale(-1, 1, 1) // Invert to see from inside

    // Create different materials for different locations
    const materials: { [key: string]: THREE.MeshBasicMaterial } = {
      entrance: new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.2, 0.1, 0.1),
        transparent: true,
        opacity: 0.8,
      }),
      cardio: new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.15, 0.1, 0.15),
        transparent: true,
        opacity: 0.8,
      }),
      weights: new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.2, 0.05, 0.05),
        transparent: true,
        opacity: 0.8,
      }),
      classes: new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.15, 0.05, 0.1),
        transparent: true,
        opacity: 0.8,
      }),
      functional: new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.1, 0.1, 0.15),
        transparent: true,
        opacity: 0.8,
      }),
      recovery: new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.15, 0.1, 0.05),
        transparent: true,
        opacity: 0.8,
      }),
      locker: new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.1, 0.1, 0.1),
        transparent: true,
        opacity: 0.8,
      }),
    }

    const sphere = new THREE.Mesh(geometry, materials[currentLocation] || materials.entrance)
    scene.add(sphere)

    return () => {
      scene.remove(sphere)
      geometry.dispose()
      Object.values(materials).forEach((material) => material.dispose())
    }
  }, [currentLocation, scene])

  return null
}

// Main Virtual Tour component
export function VirtualTour() {
  const images = [
    { src: "/rcfit1.jpg", label: "RC Fit 1" },
    { src: "/rcfit2.jpg", label: "RC Fit 2" },
    { src: "/rcfit3.jpg", label: "RC Fit 3" },
    { src: "/rcfit4.jpg", label: "RC Fit 4" },
    { src: "/rcfit5.jpg", label: "RC Fit 5" },
    { src: "/rcfit6.jpg", label: "RC Fit 6" },
    { src: "/rcfit7.jpg", label: "RC Fit 7" },
    { src: "/rcfit8.jpg", label: "RC Fit 8" },
  ]
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length, isHovered])

  const goPrev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  const goNext = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))

  return (
    <div
      className="w-full flex flex-col items-center -mt-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image display, bezel-less */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[current].src}
        alt={images[current].label}
        className="w-full h-96 lg:h-[32rem] object-cover object-center select-none rounded-sm"
        draggable="false"
        style={{ border: 0, boxShadow: "none", padding: 0, margin: 0 }}
      />
      {/* Label overlay */}
      {/* Mini nav: arrows and dots */}
      <div className="flex items-center space-x-4 mt-6">
        <button
          onClick={goPrev}
          aria-label="Previous"
          className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition-colors text-white flex items-center justify-center w-10 h-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`w-3 h-3 rounded-full ${current === idx ? "bg-red-500" : "bg-gray-600"}`}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          aria-label="Next"
          className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition-colors text-white flex items-center justify-center w-10 h-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
