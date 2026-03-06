import {
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function BlogHeroAnimation() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const [tick, setTick] = useState(0);

  const cards = [
    { title: "Design Systems", tag: "Design", color: "#6366f1", delay: 0 },
    { title: "React Patterns", tag: "Code", color: "#ec4899", delay: 0.3 },
    { title: "Typography", tag: "Art", color: "#f59e0b", delay: 0.6 },
    { title: "AI & Writing", tag: "Trends", color: "#10b981", delay: 0.9 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width;
    const H = canvas.height;

    particlesRef.current = Array.from({ length: 38 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.15,
      hue: [240, 310, 45, 160][i % 4],
    }));

    let frame = 0;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;
      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        const pulse = Math.sin(frame * 0.018 + i * 0.7) * 0.18;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${Math.max(0.05, p.alpha + pulse)})`;
        ctx.fill();
        particlesRef.current.slice(i + 1).forEach((q) => {
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 72) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(${p.hue}, 70%, 70%, ${0.12 * (1 - dist / 72)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        });
      });
      animRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 50);
    return () => clearInterval(id);
  }, []);

  const t = tick * 0.05;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        borderRadius: "24px",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a0f2e 50%, #0f1a1a 100%)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      {[
        { x: 25, y: 30, color: "99,102,241", size: 180 },
        { x: 72, y: 65, color: "236,72,153", size: 140 },
        { x: 50, y: 80, color: "16,185,129", size: 100 },
      ].map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            transform: `translate(-50%, -50%) scale(${1 + 0.08 * Math.sin(t + i * 2.1)})`,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(${orb.color},0.22) 0%, transparent 70%)`,
            transition: "transform 0.05s linear",
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 160,
          height: 160,
          transform: `translate(-50%, -50%) rotate(${t * 18}deg)`,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.07)",
          boxShadow: "0 0 0 1px rgba(99,102,241,0.18)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#818cf8",
            boxShadow: "0 0 12px 3px rgba(129,140,248,0.7)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 220,
          height: 220,
          transform: `translate(-50%, -50%) rotate(${-t * 11}deg)`,
          borderRadius: "50%",
          border: "1px dashed rgba(236,72,153,0.2)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -5,
            left: "50%",
            transform: "translateX(-50%)",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#f472b6",
            boxShadow: "0 0 14px 4px rgba(244,114,182,0.6)",
          }}
        />
      </div>

      {cards.map((card, i) => {
        const angle = (i / cards.length) * Math.PI * 2 + t * 0.22;
        const radiusX = 115;
        const radiusY = 88;
        const cx = 50 + (radiusX / 2) * Math.cos(angle);
        const cy = 50 + (radiusY / 2) * Math.sin(angle);
        const floatY = Math.sin(t * 1.1 + card.delay * 6) * 5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${cx}%`,
              top: `calc(${cy}% + ${floatY}px)`,
              transform: "translate(-50%, -50%)",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              border: `1px solid rgba(255,255,255,0.1)`,
              borderRadius: 12,
              padding: "8px 12px",
              minWidth: 100,
              boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px ${card.color}22`,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: card.color,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 3,
                fontFamily: "monospace",
              }}
            >
              {card.tag}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.85)",
                fontWeight: 600,
                fontFamily: "Georgia, serif",
                whiteSpace: "nowrap",
              }}
            >
              {card.title}
            </div>
            <div
              style={{
                marginTop: 5,
                height: 1.5,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${card.color}, transparent)`,
                width: `${60 + 30 * Math.sin(t + i)}%`,
                transition: "width 0.05s linear",
              }}
            />
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${1 + 0.05 * Math.sin(t * 1.5)})`,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #ec4899)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 30px rgba(99,102,241,0.5), 0 0 60px rgba(236,72,153,0.2)",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          pointerEvents: "none",
          borderRadius: "inherit",
        }}
      />
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      navigate("/all");
    }
  }, [isLoaded, user, navigate]);

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized performance with blazing-fast page loads and instant publishing"
    },
    {
      icon: "🔒",
      title: "Secure & Safe",
      description: "Enterprise-grade security with Clerk authentication and data encryption"
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Track engagement, views, and reader demographics in real-time"
    },
    {
      icon: "🎨",
      title: "Modern Design",
      description: "Beautiful, responsive templates that look amazing on all devices"
    },
    {
      icon: "🚀",
      title: "Easy Deployment",
      description: "One-click publishing with automatic SEO optimization included"
    },
    {
      icon: "👥",
      title: "Community",
      description: "Connect with other creators and grow your audience together"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      text: "BlogSphere transformed how I share my stories. The platform is intuitive and powerful!",
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "Tech Blogger",
      text: "Finally found a blogging platform built for modern creators. Highly recommended!",
      avatar: "MC"
    },
    {
      name: "Emma Williams",
      role: "Freelance Writer",
      text: "The analytics features help me understand my audience better than ever before.",
      avatar: "EW"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Writers" },
    { number: "50K+", label: "Published Stories" },
    { number: "500K+", label: "Monthly Readers" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-3xl"></span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BlogSphere
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition">Features</a>
              <a href="#stats" className="text-gray-600 hover:text-gray-900 font-medium transition">Stats</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium transition">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition">Pricing</a>
            </div>

            <div className="flex items-center gap-3">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="text-gray-600 hover:text-gray-900 font-medium">Sign In</button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <button
                  onClick={() => navigate("/all")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
                >
                  Dashboard
                </button>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Share Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Stories</span> with the World
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Create, publish, and grow your audience with our modern blogging platform. No coding required. Built for creators, by creators.
              </p>
              <div className="flex gap-4">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg">
                      Start Writing Free
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <button
                    onClick={() => navigate("/new")}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                  >
                    Create New Story
                  </button>
                </SignedIn>
                <button
                  onClick={() => navigate("/all")}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-xl font-bold text-lg hover:border-gray-400 transition"
                >
                  Explore Stories
                </button>
              </div>
              <div className="mt-8 flex gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-2xl font-bold text-blue-600">{stat.number}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Replaced static SVG with live animation */}
            <div className="relative">
              <BlogHeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-blue-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features for Creators</h3>
            <p className="text-xl text-gray-600">Everything you need to write, publish, and grow</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 transition-all hover:shadow-xl">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold">Trusted by Creators Worldwide</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-lg opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Loved by Creators</h3>
            <p className="text-xl text-gray-600">See what our community says</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-blue-50 to-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h3>
            <p className="text-xl text-gray-600">Choose the plan that works for you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "Free", features: ["5 Published Blogs", "Basic Analytics", "Community Support"] },
              { name: "Creator", price: "$9", period: "/month", features: ["Unlimited Blogs", "Advanced Analytics", "Priority Support", "Custom Domain"] },
              { name: "Pro", price: "$29", period: "/month", features: ["Everything in Creator", "Team Collaboration", "API Access", "Premium Templates"] }
            ].map((plan, idx) => (
              <div key={idx} className={`p-8 rounded-2xl border-2 transition-all ${idx === 1 ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-purple-50 scale-105' : 'border-gray-200 bg-white'}`}>
                <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
                <p className="text-4xl font-bold mb-6">
                  {plan.price}<span className="text-lg text-gray-600">{plan.period}</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3">
                      <span className="text-blue-600 text-xl">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <SignedOut>
                  <SignUpButton mode="modal" redirectUrl="/all">
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
                      Get Started
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <button
                    onClick={() => navigate("/all")}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                  >
                    Start Using
                  </button>
                </SignedIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to Share Your Stories?</h3>
          <p className="text-xl mb-8 opacity-90">Join thousands of creators and start publishing today. It takes less than 2 minutes to get started.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <SignedOut>
              <SignUpButton mode="modal" redirectUrl="/all">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105">
                  Start Free Trial
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <button
                onClick={() => navigate("/new")}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105"
              >
                Write Your First Story
              </button>
            </SignedIn>
            <button
              onClick={() => navigate("/all")}
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition"
            >
              Explore Community
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl"></span> BlogSphere
              </h4>
              <p className="text-sm">Empowering creators to share their stories with the world.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate("/all")} className="hover:text-white transition">Explore</button></li>
                <li><a href="#" className="hover:text-white transition">Creators</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} BlogSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;