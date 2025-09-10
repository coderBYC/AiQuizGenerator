'use client';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Brain, Zap, Users, CheckCircle, Star, ArrowRight, Trophy, Clock, Target, Globe, Shield, Rocket, Menu, X } from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Trigger stats animation after initial load
    setTimeout(() => setStatsVisible(true), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800 relative overflow-hidden">
      
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
         'bg-white backdrop-blur-lg border-b border-blue-400/20 shadow-lg' 
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500/20 backdrop-blur-lg rounded-xl border border-blue-400/30">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-blue-600">AI Quiz Generator</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-blue-600 hover:text-blue-500 transition-colors duration-200 font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-blue-600 hover:text-blue-500 transition-colors duration-200 font-medium">
                How It Works
              </a>
              <a href="#stats" className="text-blue-600 hover:text-blue-500 transition-colors duration-200 font-medium">
                Stats
              </a>
              <a href="#contact" className="text-blue-600 hover:text-blue-500 transition-colors duration-200 font-medium">
                Contact
              </a>
              <Link href='/api/auth/signin'>
                <Button className="bg-white text-blue-900 hover:bg-blue-100 font-semibold px-6 py-2 rounded-xl">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-blue-300 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-blue-900/95 backdrop-blur-lg border-t border-blue-400/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-500/20 rounded-md transition-all duration-200">
                  Features
                </a>
                <a href="#how-it-works" className="block px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-500/20 rounded-md transition-all duration-200">
                  How It Works
                </a>
                <a href="#stats" className="block px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-500/20 rounded-md transition-all duration-200">
                  Stats
                </a>
                <a href="#contact" className="block px-3 py-2 text-blue-100 hover:text-white hover:bg-blue-500/20 rounded-md transition-all duration-200">
                  Contact
                </a>
                <div className="pt-2">
                  <Link href='/api/auth/signin'>
                    <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Hero Section */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
        
        {/* Enhanced Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute bg-blue-300/40 rounded-full animate-bounce ${
              i % 3 === 0 ? 'w-3 h-3' : i % 3 === 1 ? 'w-2 h-2' : 'w-1 h-1'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-16">
        
        {/* Hero Section */}
        <div id="hero" className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            {/* Enhanced Logo with Animation */}
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-br from-blue-500/20 to-indigo-500/30 backdrop-blur-lg rounded-3xl border border-blue-400/30 shadow-2xl animate-pulse">
              <Brain className="w-12 h-12 text-blue-300 animate-pulse" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
                AI Quiz
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">Generator</span>
            </h1>
            
            {/* Enhanced Subtitle */}
            <p className="text-2xl md:text-3xl text-blue-100/90 mb-6 max-w-4xl mx-auto leading-relaxed font-medium">
              Transform any topic into engaging quizzes instantly
            </p>
            <p className="text-lg md:text-xl text-blue-200/70 mb-12 max-w-3xl mx-auto">
              Powered by cutting-edge AI technology for educators, students, and knowledge enthusiasts
            </p>
          </div>

          {/* Enhanced CTA Section */}
          <div className="mb-16">
            <Link href='/api/auth/signin'>
              <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 transition-all duration-300 border-2 border-blue-400/40 hover:border-blue-300/60">
                <span className="relative z-10 flex items-center gap-3">
                  <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  Get Started Free
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </button>
            </Link>
            
            <p className="text-blue-200/60 mt-4 text-sm">No credit card required • Get started in seconds</p>
          </div>

          {/* Enhanced Features Grid */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
            {[
              { 
                icon: Sparkles, 
                title: "AI-Powered Generation", 
                desc: "Advanced AI creates intelligent questions from any content",
                color: "from-yellow-400/20 to-orange-400/20"
              },
              { 
                icon: Zap, 
                title: "Lightning Fast", 
                desc: "Generate comprehensive quizzes in under 30 seconds",
                color: "from-green-400/20 to-emerald-400/20"
              },
              { 
                icon: Users, 
                title: "Team Collaboration", 
                desc: "Share, collaborate, and track progress with your team",
                color: "from-purple-400/20 to-pink-400/20"
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className={`group p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br ${feature.color} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-blue-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">{feature.title}</h3>
                <p className="text-blue-100/80 text-lg leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div id="stats" className="relative z-10 bg-white/5 backdrop-blur-lg border-y border-white/10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { number: "30+", label: "Quizzes Created", icon: Target },
              { number: "10+", label: "Happy Users", icon: Users },
              { number: "99.9%", label: "Uptime", icon: CheckCircle },
              { number: "4.9★", label: "User Rating", icon: Star }
            ].map((stat, index) => (
              <div key={stat.label} className="group">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-blue-300" />
                </div>
                <div className="text-4xl font-black text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{stat.number}</div>
                <div className="text-blue-100/70 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It <span className="bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
              Create professional quizzes in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: "1", 
                title: "Input Your Content", 
                desc: "Paste text, upload documents, or describe your topic",
                icon: Globe 
              },
              { 
                step: "2", 
                title: "AI Generates Quiz", 
                desc: "Our AI analyzes and creates relevant questions instantly",
                icon: Brain 
              },
              { 
                step: "3", 
                title: "Share & Track", 
                desc: "Distribute your quiz and monitor performance analytics",
                icon: Trophy 
              }
            ].map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white font-bold text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <step.icon className="w-8 h-8 text-blue-300 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-blue-100/80 leading-relaxed">{step.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-400/60" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="relative z-10 bg-white/5 backdrop-blur-lg border-y border-white/10 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-400" />
              <span className="text-white font-medium">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-400" />
              <span className="text-white font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-white font-medium">GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your <span className="bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">Teaching?</span>
          </h2>
          <p className="text-xl text-blue-100/80 mb-8 max-w-2xl mx-auto">
            Join us who are already using AI to create better learning experiences
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href='/api/auth/signin'>
              <Button className="px-8 py-4 bg-white text-blue-900 hover:bg-blue-50 font-bold text-lg rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300">
                Start Creating Quizzes
              </Button>
            </Link>
            
          </div>
        </div>
      </div>

      {/* Enhanced Social Links */}
      <div id="contact" className="relative z-10 py-16 border-t border-white/10">
        <div className={`max-w-4xl mx-auto px-4 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col items-center gap-6">
            <span className="text-blue-100/80 text-lg">Connect with Bryan Chen</span>
            <div className="flex gap-6">
              <a 
                href="https://www.linkedin.com/in/bryan-chen-69b631302/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 text-blue-300 hover:text-white hover:bg-blue-500/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/byc9487" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 text-blue-300 hover:text-white hover:bg-blue-500/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-900 via-blue-900/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

