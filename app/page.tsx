"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dumbbell,
  Users,
  Clock,
  Award,
  Star,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  Play,
  Heart,
  Zap,
  Target,
  Facebook,
  Instagram,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import { VirtualTour } from "./components/virtual-tour"
import { HeroVideoDialog } from "./components/hero-video-dialog"

// 3D Dumbbell Component
function Dumbbell3D() {
  const dumbbellRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (dumbbellRef.current) {
      dumbbellRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      dumbbellRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  return (
    <group ref={dumbbellRef}>
      {/* Dumbbell Handle */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 16]} />
        <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Left Weight */}
      <mesh position={[-0.6, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.3, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Right Weight */}
      <mesh position={[0.6, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.3, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

export default function GymWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const features = [
    {
      icon: <Dumbbell className="h-8 w-8 text-red-400" />,
      title: "State-of-the-Art Equipment",
      description: "Latest fitness technology and premium equipment for optimal results",
    },
    {
      icon: <Users className="h-8 w-8 text-red-400" />,
      title: "Expert Trainers",
      description: "Certified professionals to guide your fitness journey",
    },
    {
      icon: <Clock className="h-8 w-8 text-red-400" />,
      title: "2 Branches",
      description: "Now open at 2 convenient locations for you.",
    },
    {
      icon: <Award className="h-8 w-8 text-red-400" />,
      title: "Group Classes",
      description: "Dynamic group sessions for motivation and community",
    },
  ]

  const equipment = [
    { name: "Cardio Zone", items: ["Treadmills", "Ellipticals", "Rowing Machines", "Spin Bikes"] },
    { name: "Strength Training", items: ["Free Weights", "Cable Machines", "Smith Machine", "Power Racks"] },
    { name: "Functional Training", items: ["TRX Systems", "Battle Ropes", "Kettlebells", "Medicine Balls"] },
    { name: "Recovery Zone", items: ["Massage Chairs", "Stretching Area", "Foam Rollers", "Sauna"] },
  ]

  const plans = [
    {
      name: "Gym",
      price: "₹1000",
      period: "/month",
      features: ["Gym Access", "Locker Room", "Basic Equipment", "Mobile App"],
      popular: false,
    },
    {
      name: "Gym + Cardio",
      price: "₹1500",
      period: "/month",
      features: [
        "Everything in Basic",
        "Group Classes",
        "Personal Training Session",
        "Nutrition Consultation",
        "Guest Passes",
      ],
      popular: true,
    },
    {
      name: "Personal Trainer",
      price: "₹2500",
      period: "/month",
      features: [
        "Everything in Premium",
        "Unlimited Personal Training",
        "Meal Planning",
        "Recovery Services",
        "VIP Lounge Access",
      ],
      popular: false,
    },
  ]

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing facility with top-notch equipment. The trainers are incredibly knowledgeable and supportive!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "Best gym I've ever been to. Clean, modern, and the 24/7 access is perfect for my schedule.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Davis",
      rating: 5,
      comment: "The group classes are fantastic! Great community and excellent results in just 3 months.",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="RC Fitness Logo" width={56} height={56} className="h-14 w-14" />
              <span className="text-xl font-bold">RC Fitness</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#home" className="hover:text-red-400 transition-colors">
                Home
              </Link>
              <Link href="#tour" className="hover:text-red-400 transition-colors">
                Virtual Tour
              </Link>
              <Link href="#features" className="hover:text-red-400 transition-colors">
                Features
              </Link>
              <Link href="#equipment" className="hover:text-red-400 transition-colors">
                Equipment
              </Link>
              <Link href="#pricing" className="hover:text-red-400 transition-colors">
                Pricing
              </Link>
              <Link href="#reviews" className="hover:text-red-400 transition-colors">
                Reviews
              </Link>
              <Button className="bg-red-600 hover:bg-red-700">Join Now</Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4 items-center text-center">
                <Link href="#home" className="hover:text-red-400 transition-colors w-full block">
                  Home
                </Link>
                <Link href="#tour" className="hover:text-red-400 transition-colors w-full block">
                  Virtual Tour
                </Link>
                <Link href="#features" className="hover:text-red-400 transition-colors w-full block">
                  Features
                </Link>
                <Link href="#equipment" className="hover:text-red-400 transition-colors w-full block">
                  Equipment
                </Link>
                <Link href="#pricing" className="hover:text-red-400 transition-colors w-full block">
                  Pricing
                </Link>
                <Link href="#reviews" className="hover:text-red-400 transition-colors w-full block">
                  Reviews
                </Link>
                <Button className="bg-red-600 hover:bg-red-700 w-full mx-auto">Join Now</Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Smooth left-to-right black-to-transparent gradient overlay for aesthetic fade */}
        <div className="absolute left-0 top-0 h-full w-1/2 z-10 bg-gradient-to-r from-black via-black/80 to-transparent" />
        {/* Fullscreen hero image, visible on the right and fading in from the left */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Man deadlifting in gym"
          fill
          className="object-cover object-center opacity-90 z-0"
          priority
        />
        <div className="container mx-auto px-4 z-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">RC Fitness 1st</Badge>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Unleash Your
                <span className="text-red-500 block">Inner Beast</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg">
                Push beyond your limits with cutting-edge equipment, expert guidance, and a community that never settles
                for less.
              </p>
            </div>

            <div className="flex flex-row gap-4 w-full max-w-full">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-lg px-8 flex-1 min-w-0"
              >
                <span className="block sm:hidden">Join Us</span>
                <span className="hidden sm:block">Start Your Journey</span>
              </Button>
              <HeroVideoDialog
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
                thumbnailSrc="/images/hero-bg.jpg"
                trigger={
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-600 text-lg px-8 flex-1 min-w-0 bg-transparent hover:bg-red-600/40 hover:text-red-400 flex items-center transition-colors"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    <span className="z-10 text-white">Watch Tour</span>
                  </Button>
                }
              />
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">500+</div>
                <div className="text-sm text-gray-400">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">2</div>
                <div className="text-sm text-gray-400">Branches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">15+</div>
                <div className="text-sm text-gray-400">Expert Trainers</div>
              </div>
            </div>
          </div>

          {/* Remove the inline hero image on the right, as it's now the background */}
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section id="tour" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mb-4">Virtual Tour</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Virtual Tour
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our elite training facility from anywhere with our immersive gallery.
            </p>
          </div>
          <VirtualTour />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-red-500/10 text-red-400 border-none mb-4">Why Choose PowerFit</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              Dominate Your <span className="text-red-500">Fitness Goals</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
              Experience the perfect fusion of power, precision, and performance in our elite training facility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900/80 shadow-xl rounded-2xl p-8 border-none transition-all hover:shadow-2xl hover:-translate-y-1 duration-300"
              >
                <CardHeader className="flex flex-col items-start gap-4 p-0 mb-4">
                  <div className="bg-gray-800/60 p-4 rounded-full mb-2">{feature.icon}</div>
                  <CardTitle className="text-2xl font-semibold tracking-tight text-white mb-1">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-400 text-base font-light leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section id="equipment" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-red-500/10 text-red-400 border-none mb-4">Premium Equipment</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              <span className="text-red-500">Premium Equipment</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
              Train with professional-grade equipment designed for champions and built to last.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipment.map((zone, index) => (
              <Card key={index} className="bg-gray-800/60 shadow-lg rounded-2xl p-6 border-none">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-xl font-semibold text-red-400 mb-2">{zone.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-2">
                    {zone.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-gray-300 font-light">
                        <CheckCircle className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-red-500/10 text-red-400 border-none mb-4">Membership Plans</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              Choose Your <span className="text-red-500">Power Level</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
              Flexible membership options designed to match your ambition and accelerate your results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-gray-900/80 shadow-xl rounded-2xl p-8 border-none transition-all duration-300 ${plan.popular ? "ring-2 ring-red-500/40 shadow-2xl scale-105 z-10" : "hover:shadow-2xl hover:-translate-y-1"}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600/90 text-white px-6 py-2 rounded-full shadow-lg text-sm font-semibold tracking-wide">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center p-0 mb-6">
                  <CardTitle className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-red-500' : 'text-white'}`}>{plan.name}</CardTitle>
                  <div className="text-5xl font-extrabold text-red-500 mb-1">
                    {plan.price}
                    <span className="text-lg text-gray-400 font-normal">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-0">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300 font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-red-500/10 text-red-400 border-none mb-4">Success Stories</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              What Our <span className="text-red-500">Regulars Say</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
              Real transformations, real power, real people sharing their PowerFit journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-gray-900/80 shadow-xl rounded-2xl p-8 border-none flex flex-col items-center text-center">
                <div className="mb-4 flex flex-col items-center">
                  <div className="bg-gray-800/60 p-3 rounded-full mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-red-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25v.75A2.25 2.25 0 0 1 5.25 11.25H4.5m0 0v2.25A2.25 2.25 0 0 0 6.75 15.75h.75m-3-4.5h.75A2.25 2.25 0 0 0 9 9.75V9m0 0V8.25A2.25 2.25 0 0 1 11.25 6h.75m0 0h2.25A2.25 2.25 0 0 1 16.5 8.25V9m0 0v.75A2.25 2.25 0 0 0 18.75 12h.75m0 0v2.25A2.25 2.25 0 0 1 17.25 16.5h-.75" />
                    </svg>
                  </div>
                  <Image
                    src={review.image || "/placeholder.svg"}
                    alt={review.name}
                    width={72}
                    height={72}
                    className="rounded-full border-4 border-gray-800 shadow-lg mb-2 object-cover"
                  />
                  <h4 className="font-semibold text-lg text-white mt-2">{review.name}</h4>
                  <div className="flex justify-center mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current opacity-80" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 italic text-base font-light max-w-xs mx-auto">"{review.comment}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:justify-between w-full space-y-6 md:space-y-0 text-center md:text-left">
            {/* Left: Logo and brand name */}
            <div className="flex flex-col items-center md:flex-row md:items-center space-x-0 md:space-x-2 mb-2 md:mb-0">
              <Image src="/logo.png" alt="RC Fitness Logo" width={56} height={56} className="h-14 w-14 mx-auto md:mx-0" />
              <span className="text-xl font-bold mt-2 md:mt-0">RC Fitness</span>
            </div>
            {/* Center: Address */}
            <div className="flex flex-col items-center mb-2 md:mb-0">
              <div className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2 text-red-500" />
                Opp. Railway Co-op Store, Kamakhya Colony, Bara Bazar, Pandu, Guwahati, Assam 781012
              </div>
              <div className="flex items-center text-gray-400 mt-1">
                <MapPin className="h-5 w-5 mr-2 text-red-500" />
                Opp. Railway higher secondary school, Maligaon Gate No. 1, Guwahati, Assam 781011
              </div>
            </div>
            {/* Right: Phone number and Social icons */}
            <div className="flex flex-col items-center md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <span className="text-gray-400">+91 7002434440</span>
              <div className="flex space-x-4 justify-center">
                <div className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors cursor-pointer">
                  <Facebook className="h-5 w-5" />
                </div>
                <div className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors cursor-pointer">
                  <Instagram className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
