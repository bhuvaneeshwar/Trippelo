"use client";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */

const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90",
    tag: "Hidden Spots", label: "Discover Secret Waterfalls", sub: "Tamil Nadu"
  },
  {
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=90",
    tag: "Adventure", label: "Push Every Limit", sub: "Kodaikanal Trails"
  },
  {
    img: "https://images.unsplash.com/photo-1608154119029-53f3c6ad12e4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Stranger Trips", label: "Meet Strangers, Make Friends", sub: "Goa Beach Hop"
  },
  {
    img: "https://images.unsplash.com/photo-1612159987512-c3433188d225?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Business Trips", label: "Network Beyond Boardrooms", sub: "Startup Summit"
  },
];

const CATEGORY_CARDS = [
  {
    key: "turf", label: "Turf", icon: "⚽",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",
    color: "#2fac5b", count: "890+ venues",
    desc: "Cricket, Football, Tennis & 7 more sports",
    items: [
      { name: "Football", icon: "⚽", count: "240+ turfs" },
      { name: "Cricket", icon: "🏏", count: "180+ venues" },
      { name: "Tennis", icon: "🎾", count: "95+ courts" },
      { name: "Squash", icon: "🟡", count: "60+ courts" },
      { name: "Badminton", icon: "🏸", count: "130+ courts" },
      { name: "Basketball", icon: "🏀", count: "75+ courts" },
      { name: "Volleyball", icon: "🏐", count: "50+ grounds" },
      { name: "Hockey", icon: "🏑", count: "30+ turfs" },
      { name: "Kabaddi", icon: "🤸", count: "45+ grounds" },
      { name: "Futsal", icon: "🥅", count: "88+ arenas" },
    ]
  },
  {
    key: "entertainment", label: "Entertainment", icon: "🎮",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
    color: "#FF6B9D", count: "620+ centers",
    desc: "Gaming, Trampolines, Skating & more",
    items: [
      { name: "PlayStation Gaming", icon: "🎮", count: "120+ zones" },
      { name: "Indoor Trampoline", icon: "🤸", count: "65+ parks" },
      { name: "Outdoor Trampoline", icon: "🌤️", count: "40+ parks" },
      { name: "Skating", icon: "⛸️", count: "55+ rinks" },
      { name: "Ice Skating", icon: "🧊", count: "20+ rinks" },
      { name: "Soapy Football", icon: "🫧", count: "35+ arenas" },
      { name: "Laser Tag", icon: "🎯", count: "48+ zones" },
      { name: "VR Gaming", icon: "🥽", count: "70+ centers" },
      { name: "Bowling", icon: "🎳", count: "90+ alleys" },
      { name: "Arcade Games", icon: "🕹️", count: "200+ centers" },
    ]
  },
  {
    key: "adventure", label: "Adventure", icon: "🪂",
    img: "https://images.unsplash.com/photo-1604537466573-5e94508fd243?w=600&q=80",
    color: "#ff8f00", count: "340+ thrills",
    desc: "Scuba, Bungee, Go-kart & beyond",
    items: [
      { name: "Scuba Diving", icon: "🤿", count: "35+ spots" },
      { name: "Go-Kart Racing", icon: "🏎️", count: "80+ tracks" },
      { name: "Bungee Jumping", icon: "🪂", count: "15+ platforms" },
      { name: "Rock Climbing", icon: "🧗", count: "55+ walls" },
      { name: "Zip Lining", icon: "🌿", count: "42+ routes" },
      { name: "Paragliding", icon: "🪁", count: "28+ spots" },
      { name: "Water Rafting", icon: "🚣", count: "22+ rivers" },
      { name: "Skydiving", icon: "🌤️", count: "8+ zones" },
      { name: "ATV Riding", icon: "🏍️", count: "60+ trails" },
      { name: "Paintball", icon: "🎯", count: "95+ arenas" },
    ]
  },
  {
    key: "hidden-spots", label: "Hidden Spots", icon: "🗺️",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    color: "#2fac5b", count: "1,200+ spots",
    desc: "Secret places most maps won't show",
    states: [
      { name: "Tamil Nadu", districts: [
        { name: "Ooty", spots: ["Needle Rock Viewpoint", "Kandal Cross Forest", "Parsons Valley"] },
        { name: "Kodaikanal", spots: ["Berijam Lake", "Kukkal Caves", "Pambar Falls"] },
        { name: "Madurai", spots: ["Alagar Kovil Forest", "Meghamalai", "Suruli Falls"] },
      ]},
      { name: "Kerala", districts: [
        { name: "Munnar", spots: ["Lakkam Waterfalls", "Rajamala", "Thoovanam Falls"] },
        { name: "Wayanad", spots: ["Soochipara Falls", "Phantom Rock", "Chembra Peak"] },
        { name: "Idukki", spots: ["Thommankuthu Falls", "Vagamon Meadows", "Kalvari Mount"] },
      ]},
      { name: "Karnataka", districts: [
        { name: "Coorg", spots: ["Abbey Falls Trail", "Nalknad Palace Ruins", "Iruppu Falls"] },
        { name: "Chikmagalur", spots: ["Mullayanagiri Peak", "Bababudangiri", "Hebbe Falls"] },
        { name: "Uttara Kannada", spots: ["Yana Rocks", "Vibhuti Falls", "Magod Falls"] },
      ]},
    ]
  },
  {
    key: "stranger-trips", label: "Stranger Trips", icon: "🤝",
    img: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&q=80",
    color: "#38BDF8", count: "280+ trips",
    desc: "Anyone can join — meet new people on the go", isNew: true,
  },
  {
    key: "business-trips", label: "Business Trips", icon: "💼",
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80",
    color: "#ffc400", count: "95+ retreats",
    desc: "Verified pros only — network & share ideas", isNew: true,
  },
  {
    key: "community", label: "Community", icon: "🌍",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    color: "#23744d", count: "50K+ members",
    desc: "Connect with India's explorer community",
  },
];

const HIDDEN_GEMS = [
  { name: "Needle Rock Viewpoint", state: "Tamil Nadu", dist: "Ooty",
    img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600&q=80",
    tags: ["Nature", "Trek"], rating: 4.9 },
  { name: "Chembra Peak", state: "Kerala", dist: "Wayanad",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
    tags: ["Trek", "Lake"], rating: 4.8 },
  { name: "Yana Rocks", state: "Karnataka", dist: "Uttara Kannada",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
    tags: ["Geology", "Cave"], rating: 4.7 },
  { name: "Magod Falls", state: "Karnataka", dist: "Uttara Kannada",
    img: "https://images.unsplash.com/photo-1431440869543-efaf3388c585?w=600&q=80",
    tags: ["Waterfall", "Remote"], rating: 4.9 },
  { name: "Phantom Rock", state: "Kerala", dist: "Wayanad",
    img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80",
    tags: ["Mystery", "Forest"], rating: 4.6 },
  { name: "Berijam Lake", state: "Tamil Nadu", dist: "Kodaikanal",
    img: "https://images.unsplash.com/photo-1439853949212-36589f9f8e38?w=600&q=80",
    tags: ["Lake", "Wildlife"], rating: 4.8 },
];

const STRANGER_TRIPS_DATA = [
  { title: "Coorg Coffee Trail", date: "Jan 18–20", slots: 6, filled: 4, cost: "₹3,200", badge: "Nature", city: "Coorg, Karnataka",
    img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80", host: "Riya M.", hostImg: "https://i.pravatar.cc/40?img=47" },
  { title: "Goa Beach Hop", date: "Jan 22–24", slots: 8, filled: 3, cost: "₹4,500", badge: "Beach", city: "Goa",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80", host: "Arjun K.", hostImg: "https://i.pravatar.cc/40?img=12" },
  { title: "Ooty Night Trek", date: "Jan 25", slots: 5, filled: 5, cost: "₹1,800", badge: "Trek", city: "Ooty, Tamil Nadu",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80", host: "Sneha R.", hostImg: "https://i.pravatar.cc/40?img=31" },
  { title: "Hampi Heritage Walk", date: "Feb 2–4", slots: 10, filled: 2, cost: "₹2,600", badge: "History", city: "Hampi, Karnataka",
    img: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&q=80", host: "Vikram S.", hostImg: "https://i.pravatar.cc/40?img=8" },
];

const BUSINESS_TRIPS_DATA = [
  { title: "Startup Founders Summit", date: "Jan 20–22", slots: 15, filled: 9, industry: "Tech & SaaS", city: "Bangalore",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80" },
  { title: "FinTech Retreat", date: "Feb 5–7", slots: 12, filled: 7, industry: "Finance", city: "Goa",
    img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80" },
  { title: "Creative Directors Offsite", date: "Feb 14–16", slots: 8, filled: 4, industry: "Design & Media", city: "Coorg",
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80" },
  { title: "E-Commerce Leaders Retreat", date: "Feb 20–22", slots: 20, filled: 11, industry: "Retail", city: "Ooty",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80" },
];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════════ */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
      /* Background */
      --bg: #040a06;
      --surface: rgba(15,20,18,0.92);

      /* Cards */
      --card: #0f1f18;
      --card-2: #162a22;

      /* Borders */
      --border: rgba(255,255,255,0.08);

      /* Text */
      --text: #f2fff7;
      --muted: #92a89d;

      /* Brand */
      --primary: #2fac5b;
      --primary-2: #00e676;

      /* Soft UI */
      --primary-soft: rgba(29,185,84,0.15);

      /* Accent Colors */
      --success: #23744d;
      --orange: #ff8f00;
      --pink: #ff4da6;
      --cyan: #118f3d;
      --gold: #ffc400;
    }

    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); font-family: 'Outfit', sans-serif; overflow-x: hidden; }
    .fu { font-family: 'Unbounded', sans-serif; }
    .fo { font-family: 'Outfit', sans-serif; }

    /* ── Keyframes ── */
    @keyframes fadeUp    { from { opacity:0; transform:translateY(40px) } to { opacity:1; transform:translateY(0) } }
    @keyframes fadeIn    { from { opacity:0 } to { opacity:1 } }
    @keyframes scaleIn   { from { opacity:0; transform:scale(.86) } to { opacity:1; transform:scale(1) } }
    @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
    @keyframes floatR    { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(2deg)} }
    @keyframes glowPulse { 0%,100%{opacity:.3} 50%{opacity:1} }
    @keyframes shimmer   { 0%{background-position:-400% center} 100%{background-position:400% center} }
    @keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes blob      { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
    @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes scanLine  { 0%{top:-4%} 100%{top:104%} }
    @keyframes kenBurns  { 0%{transform:scale(1)} 100%{transform:scale(1.08)} }
    @keyframes slideInL  { from{opacity:0;transform:translateX(-60px)} to{opacity:1;transform:translateX(0)} }
    @keyframes slideInR  { from{opacity:0;transform:translateX(60px)} to{opacity:1;transform:translateX(0)} }
    @keyframes borderPulse { 0%,100%{box-shadow:0 0 0 0 rgba(0,255,178,0)} 50%{box-shadow:0 0 0 6px rgba(0,255,178,0.15)} }

    .a-up    { animation: fadeUp .8s cubic-bezier(.16,1,.3,1) both; }
    .a-in    { animation: fadeIn .5s ease both; }
    .a-scale { animation: scaleIn .5s cubic-bezier(.34,1.56,.64,1) both; }
    .a-float { animation: float 5s ease-in-out infinite; }
    .a-floatR{ animation: floatR 6s ease-in-out infinite; }
    .a-blob  { animation: blob 11s ease-in-out infinite; }
    .a-spin  { animation: spin 30s linear infinite; }
    .a-mq    { animation: marquee 28s linear infinite; }
    .a-ken   { animation: kenBurns 12s ease-in-out infinite alternate; }

    .d1{animation-delay:.1s;opacity:0} .d2{animation-delay:.22s;opacity:0}
    .d3{animation-delay:.36s;opacity:0} .d4{animation-delay:.5s;opacity:0}
    .d5{animation-delay:.65s;opacity:0} .d6{animation-delay:.8s;opacity:0}

    /* ── Text Shimmer ── */
    .shim-g {
      background: linear-gradient(90deg, #00FFB2, #7FFFDF, #00FFB2, #00A370, #00FFB2);
      background-size: 400% auto; -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; background-clip: text;
      animation: shimmer 5s linear infinite;
    }
    .shim-b {
      background: linear-gradient(90deg, var(--cyan), #BAE6FD, var(--cyan), var(--success));
      background-size: 300% auto; -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; background-clip: text;
      animation: shimmer 4s linear infinite;
    }
    .shim-y {
      background: linear-gradient(90deg, var(--gold), #FDE68A, var(--gold), var(--orange));
      background-size: 300% auto; -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; background-clip: text;
      animation: shimmer 4s linear infinite;
    }

    /* ── Glass ── */
    .glass {
      background: var(--surface);
      backdrop-filter: blur(28px) saturate(180%);
      border: 1px solid var(--border);
    }
    .glass-nav {
      background: rgba(4,10,6,.95);
      backdrop-filter: blur(40px);
      border-bottom: 1px solid var(--primary-soft);
    }
    .glass-dark {
      background: rgba(4,10,6,.85);
      backdrop-filter: blur(20px);
    }

    /* ── Cards ── */
    .cat-card {
      position: relative; overflow: hidden; cursor: pointer;
      border-radius: 28px; transition: all .4s cubic-bezier(.34,1.56,.64,1);
      border: 1px solid rgba(255,255,255,.06);
    }
    .cat-card:hover { transform: translateY(-10px) scale(1.02); border-color: rgba(255,255,255,.14); }
    .cat-card:hover .cat-img { transform: scale(1.08); }
    .cat-img { width:100%; height:200px; object-fit:cover; transition: transform .6s ease; display:block; }
    .cat-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(3,11,7,.95) 0%, rgba(3,11,7,.6) 50%, rgba(3,11,7,.1) 100%);
    }

    .gem-card {
      position: relative; overflow: hidden; cursor: pointer; border-radius: 24px;
      border: 1px solid rgba(255,255,255,.06);
      transition: all .4s cubic-bezier(.34,1.56,.64,1);
    }
    .gem-card:hover { transform: translateY(-8px); border-color: rgba(0,255,178,.25); box-shadow: 0 24px 64px rgba(0,255,178,.1); }
    .gem-card:hover .gem-img { transform: scale(1.1); }
    .gem-img { width:100%; height:220px; object-fit:cover; transition: transform .6s ease; display:block; }

    .trip-card {
      border-radius: 22px; overflow: hidden; cursor: pointer;
      border: 1px solid rgba(56,189,248,.1);
      background: rgba(9,20,16,.8); backdrop-filter: blur(16px);
      transition: all .4s cubic-bezier(.34,1.56,.64,1);
    }
    .trip-card:hover { transform: translateY(-7px); border-color: rgba(56,189,248,.3); box-shadow: 0 20px 56px rgba(56,189,248,.12); }
    .trip-card:hover .trip-img { transform: scale(1.08); }
    .trip-img { width:100%; height:180px; object-fit:cover; transition: transform .6s ease; display:block; }

    .biz-card {
      border-radius: 22px; overflow: hidden; cursor: pointer;
      border: 1px solid rgba(251,191,36,.1);
      background: rgba(9,20,16,.8); backdrop-filter: blur(16px);
      transition: all .4s cubic-bezier(.34,1.56,.64,1);
    }
    .biz-card:hover { transform: translateY(-7px); border-color: rgba(251,191,36,.3); box-shadow: 0 20px 56px rgba(251,191,36,.1); }
    .biz-card:hover .biz-img { transform: scale(1.08); }
    .biz-img { width:100%; height:180px; object-fit:cover; display:block; transition: transform .6s ease; }

    .venue-card {
      border-radius: 18px; padding:18px; cursor: pointer;
      border: 1px solid rgba(0,255,178,.08);
      background: rgba(9,20,16,.85);
      transition: all .35s cubic-bezier(.34,1.56,.64,1);
    }
    .venue-card:hover { transform: translateY(-6px) scale(1.02); border-color: rgba(0,255,178,.28); box-shadow: 0 18px 48px rgba(0,255,178,.1); }

    /* ── Buttons ── */
    .btn-g {
      background: linear-gradient(135deg, var(--primary), var(--primary-2));
      color: #030B07; font-family: 'Unbounded', sans-serif; font-weight: 700;
      border: none; cursor: pointer; position: relative; overflow: hidden;
      transition: all .3s ease;
    }
    .btn-g::after {
      content:''; position:absolute; inset:0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent);
      transform: translateX(-100%) skewX(-20deg); transition: transform .55s ease;
    }
    .btn-g:hover::after { transform: translateX(200%) skewX(-20deg); }
    .btn-g:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(0,255,178,.4); }

    .btn-o {
      background: transparent; color: rgba(238,248,243,.8);
      border: 1px solid rgba(255,255,255,.18); font-family: 'Outfit', sans-serif;
      font-weight: 500; cursor: pointer; transition: all .3s ease;
    }
    .btn-o:hover { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.32); color: white; }

    .btn-b {
      background: linear-gradient(135deg, #38BDF8, #0284C7);
      color: #030B07; font-family: 'Unbounded', sans-serif; font-weight: 700;
      border: none; cursor: pointer; transition: all .3s ease;
    }
    .btn-b:hover { transform: translateY(-2px); box-shadow: 0 12px 34px rgba(56,189,248,.4); }

    .btn-y {
      background: linear-gradient(135deg, #FBBF24, #D97706);
      color: #030B07; font-family: 'Unbounded', sans-serif; font-weight: 700;
      border: none; cursor: pointer; transition: all .3s ease;
    }
    .btn-y:hover { transform: translateY(-2px); box-shadow: 0 12px 34px rgba(251,191,36,.4); }

    /* ── Nav ── */
    .nav-link {
      position: relative; font-family: 'Outfit', sans-serif; font-weight: 500;
      background: none; border: none; cursor: pointer; transition: color .2s;
    }
    .nav-link::after {
      content:''; position: absolute; bottom:-4px; left: 50%; transform: translateX(-50%);
      width: 0; height: 2px;
      background: linear-gradient(90deg, #00FFB2, #00C896);
      border-radius: 99px; transition: width .3s cubic-bezier(.34,1.56,.64,1);
    }
    .nav-link:hover::after, .nav-link.act::after { width: 100%; }

    /* ── Tags ── */
    .tag  { background:rgba(0,255,178,.08); border:1px solid rgba(0,255,178,.22); color:#00FFB2; font-size:11px; font-weight:600; padding:3px 10px; border-radius:999px; font-family:'Unbounded',sans-serif; letter-spacing:.3px; }
    .tag-b{ background:rgba(56,189,248,.08); border:1px solid rgba(56,189,248,.22); color:#38BDF8; font-size:11px; font-weight:600; padding:3px 10px; border-radius:999px; font-family:'Unbounded',sans-serif; }
    .tag-y{ background:rgba(251,191,36,.08); border:1px solid rgba(251,191,36,.22); color:#FBBF24; font-size:11px; font-weight:600; padding:3px 10px; border-radius:999px; font-family:'Unbounded',sans-serif; }
    .tag-r{ background:rgba(255,107,157,.08); border:1px solid rgba(255,107,157,.22); color:#FF6B9D; font-size:11px; font-weight:600; padding:3px 10px; border-radius:999px; font-family:'Unbounded',sans-serif; }
    .tag-v{ background:rgba(167,139,250,.08); border:1px solid rgba(167,139,250,.22); color:#A78BFA; font-size:11px; font-weight:600; padding:3px 10px; border-radius:999px; font-family:'Unbounded',sans-serif; }

    /* ── Misc ── */
    .dot-bg {
      background-image: radial-gradient(rgba(0,255,178,.045) 1px, transparent 1px);
      background-size: 32px 32px;
    }
    .grid-lines {
      background-image: linear-gradient(rgba(0,255,178,.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,178,.025) 1px, transparent 1px);
      background-size: 64px 64px;
    }
    .dd-anim { animation: scaleIn .2s cubic-bezier(.34,1.56,.64,1); transform-origin: top right; }
    .page-in { animation: fadeUp .65s cubic-bezier(.16,1,.3,1) both; }
    .scrollbar-hide::-webkit-scrollbar { display:none; }
    .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }
    .progress-g { background: linear-gradient(90deg, #00FFB2, #00C896); border-radius:99px; }
    .progress-b { background: linear-gradient(90deg, #38BDF8, #0EA5E9); border-radius:99px; }
    .progress-y { background: linear-gradient(90deg, #FBBF24, #D97706); border-radius:99px; }
    .vbadge { background:var(--primary-soft); border:1px solid rgba(47,172,91,.3); color:var(--primary-2); border-radius:999px; padding:2px 8px; font-size:10px; font-weight:700; font-family:'Unbounded',sans-serif; }
    input,select,textarea {
      background: rgba(0,255,178,.04)!important;
      border: 1px solid rgba(0,255,178,.16)!important;
      color: #EEF8F3!important;
      border-radius: 12px!important;
      padding: 12px 16px!important;
      font-family: 'Outfit',sans-serif!important;
      outline: none!important;
      width: 100%;
      transition: border-color .2s, box-shadow .2s!important;
    }
    input:focus,select:focus,textarea:focus {
      border-color: rgba(0,255,178,.5)!important;
      box-shadow: 0 0 0 4px rgba(0,255,178,.07)!important;
    }
    input::placeholder { color: rgba(238,248,243,.25)!important; }
    select option { background: #091410; color: #EEF8F3; }
  `}</style>
);

/* ═══════════════════════════════════════════════════════════════
   LOGO
═══════════════════════════════════════════════════════════════ */
function Logo({ onClick }) {
  return (
    <button onClick={onClick} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:10, padding:0 }}>
      <div style={{ position:"relative", width:40, height:40 }}>
        <div style={{ position:"absolute", inset:0, borderRadius:12, background:"linear-gradient(135deg,var(--primary),var(--success))", animation:"borderPulse 3s ease-in-out infinite" }} />
        <div style={{ position:"absolute", inset:0, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Unbounded", fontWeight:900, fontSize:20, color:"#030B07" }}>F</div>
      </div>
      <span style={{ fontFamily:"Unbounded", fontWeight:800, fontSize:19, color:"white", letterSpacing:"-1px" }}>
        fyno<span className="shim-g">explore</span>
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AUTH DROPDOWN
═══════════════════════════════════════════════════════════════ */
function AuthDropdown({ type, onClose, onNav }) {
  return (
    <div className="dd-anim" style={{ position:"absolute", top:"calc(100% + 14px)", right:0, zIndex:300, minWidth:230, background:"rgba(3,11,7,.98)", backdropFilter:"blur(32px)", borderRadius:20, border:"1px solid rgba(0,255,178,.15)", padding:8, boxShadow:"0 32px 80px rgba(0,0,0,.7)" }}>
      {[
        { role:"user",  icon:"👤", label:`${type==="login"?"Login":"Sign up"} as Explorer`, sub:"Book, explore & discover", c:"#00FFB2" },
        { role:"owner", icon:"🏢", label:`${type==="login"?"Login":"Sign up"} as Owner`,    sub:"List & manage your place",  c:"#A78BFA" },
      ].map(o => (
        <button key={o.role} onClick={() => { onNav(`${type}-${o.role}`); onClose(); }}
          style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:"13px 14px", borderRadius:13, border:"none", background:"none", cursor:"pointer" }}
          onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,.04)"}
          onMouseLeave={e => e.currentTarget.style.background="none"}>
          <div style={{ width:38, height:38, borderRadius:11, background:`${o.c}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:19, flexShrink:0 }}>{o.icon}</div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontFamily:"Unbounded", fontWeight:700, fontSize:12, color:"white" }}>{o.label}</div>
            <div style={{ fontSize:12, color:"rgba(238,248,243,.4)", marginTop:2 }}>{o.sub}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════════════ */
function Header({ page, setPage }) {
  const [lo, setLo] = useState(false);
  const [so, setSo] = useState(false);
  const [sc, setSc] = useState(false);
  const [mob, setMob] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setSc(window.scrollY > 30);
    const updateViewport = () => setMob(window.innerWidth < 980);
    updateViewport();
    window.addEventListener("scroll", fn);
    window.addEventListener("resize", updateViewport);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!mob) setMenuOpen(false);
  }, [mob]);

  const NAV = ["Turf","Entertainment","Adventure","Hidden Spots","Community"];

  return (
    <>
      <header style={{ position:"fixed", top:0, left:0, right:0, zIndex:999, height:68, display:"flex", alignItems:"center", padding: mob ? "0 14px" : "0 32px", transition:"all .3s", ...(sc ? { background:"rgba(3,11,7,.96)", backdropFilter:"blur(40px)", borderBottom:"1px solid rgba(0,255,178,.07)", boxShadow:"0 8px 40px rgba(0,0,0,.5)" } : {}) }}>
        <div style={{ maxWidth:1320, width:"100%", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <Logo onClick={() => setPage("home")} />

          {!mob && <nav style={{ display:"flex", gap:4 }}>
            {NAV.map(item => {
              const k = item.toLowerCase().replace(" ","-");
              return (
                <button key={item} onClick={() => setPage(k)}
                  className={`nav-link ${page===k?"act":""}`}
                  style={{ padding:"8px 15px", borderRadius:10, fontSize:14, color: page===k ? "#00FFB2" : "rgba(238,248,243,.6)" }}
                  onMouseEnter={e => { if(page!==k) e.currentTarget.style.color="white"; }}
                  onMouseLeave={e => { if(page!==k) e.currentTarget.style.color="rgba(238,248,243,.6)"; }}>
                  {item}
                </button>
              );
            })}
          </nav>}

          {!mob && <div style={{ display:"flex", gap:10, position:"relative" }}>
            <div style={{ position:"relative" }}>
              <button className="btn-o" style={{ padding:"9px 22px", borderRadius:12, fontSize:14 }} onClick={() => { setLo(!lo); setSo(false); }}>Login</button>
              {lo && <AuthDropdown type="login"  onClose={() => setLo(false)} onNav={setPage} />}
            </div>
            <div style={{ position:"relative" }}>
              <button className="btn-g" style={{ padding:"9px 24px", borderRadius:12, fontSize:14 }} onClick={() => { setSo(!so); setLo(false); }}>Sign Up</button>
              {so && <AuthDropdown type="signup" onClose={() => setSo(false)} onNav={setPage} />}
            </div>
          </div>}

          {mob && (
            <button
              className="btn-o"
              style={{ padding:"8px 12px", borderRadius:12, fontSize:14 }}
              onClick={() => {
                setMenuOpen(!menuOpen);
                setLo(false);
                setSo(false);
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </header>
      {mob && menuOpen && (
        <div style={{ position:"fixed", top:68, left:0, right:0, zIndex:998, padding:"10px 14px 14px" }}>
          <div style={{ background:"rgba(3,11,7,.98)", border:"1px solid rgba(0,255,178,.12)", borderRadius:16, padding:10, boxShadow:"0 20px 60px rgba(0,0,0,.5)" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:8 }}>
              {NAV.map(item => {
                const k = item.toLowerCase().replace(" ","-");
                return (
                  <button
                    key={item}
                    className={`nav-link ${page===k?"act":""}`}
                    style={{ textAlign:"left", padding:"10px 12px", borderRadius:10, fontSize:14, color: page===k ? "#00FFB2" : "rgba(238,248,243,.75)" }}
                    onClick={() => {
                      setPage(k);
                      setMenuOpen(false);
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              <button className="btn-o" style={{ padding:"10px 14px", borderRadius:10, fontSize:13 }} onClick={() => { setLo(!lo); setSo(false); }}>Login</button>
              <button className="btn-g" style={{ padding:"10px 14px", borderRadius:10, fontSize:13 }} onClick={() => { setSo(!so); setLo(false); }}>Sign Up</button>
            </div>
            {(lo || so) && (
              <div style={{ position:"relative", marginTop:8 }}>
                {lo && <AuthDropdown type="login" onClose={() => setLo(false)} onNav={(next) => { setPage(next); setMenuOpen(false); }} />}
                {so && <AuthDropdown type="signup" onClose={() => setSo(false)} onNav={(next) => { setPage(next); setMenuOpen(false); }} />}
              </div>
            )}
          </div>
        </div>
      )}
      {(lo||so) && <div style={{ position:"fixed", inset:0, zIndex:998 }} onClick={() => { setLo(false); setSo(false); }} />}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION — Cinematic slideshow with real photos
═══════════════════════════════════════════════════════════════ */
function Hero({ setPage }) {
  const [slide, setSlide] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 980);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setPrev(slide);
      setTransitioning(true);
      setTimeout(() => {
        setSlide(s => (s + 1) % HERO_SLIDES.length);
        setTransitioning(false);
      }, 600);
    }, 5000);
    return () => clearInterval(t);
  }, [slide]);

  const cur = HERO_SLIDES[slide];

  return (
    <section style={{ position:"relative", height:"100vh", overflow:"hidden", display:"flex", alignItems:"center" }}>
      {/* Background Image */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
        <img
          key={slide}
          src={cur.img}
          alt=""
          className="a-ken"
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", animation:"kenBurns 12s ease-in-out infinite alternate", opacity: transitioning ? 0 : 1, transition:"opacity .6s ease" }}
        />
        {/* Multi-layer gradient overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(3,11,7,.92) 0%, rgba(3,11,7,.6) 40%, rgba(3,11,7,.3) 70%, rgba(3,11,7,.5) 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(3,11,7,1) 0%, transparent 40%)" }} />
        {/* Green tint at bottom */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:300, background:"linear-gradient(to top, rgba(0,255,178,.05), transparent)" }} />
      </div>

      {/* Grid overlay */}
      <div className="grid-lines" style={{ position:"absolute", inset:0, opacity:.4 }} />

      {/* Floating ambient orbs */}
      <div className="a-blob" style={{ position:"absolute", top:"15%", right:"5%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(0,255,178,.07), transparent 70%)", filter:"blur(60px)", pointerEvents:"none" }} />
      <div className="a-blob" style={{ position:"absolute", bottom:"20%", left:"10%", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle, rgba(56,189,248,.06), transparent 70%)", filter:"blur(50px)", pointerEvents:"none", animationDelay:"3s" }} />

      {/* Content */}
      <div style={{ position:"relative", zIndex:10, maxWidth:1320, margin:"0 auto", padding: mobile ? "0 18px" : "0 32px", width:"100%" }}>
        <div style={{ maxWidth:780 }}>
          {/* Breadcrumb tag */}
          <div className="a-up d1" style={{ display:"inline-flex", alignItems:"center", gap:9, background:"rgba(0,255,178,.08)", border:"1px solid rgba(0,255,178,.25)", borderRadius:999, padding:"7px 18px", marginBottom:28 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#00FFB2", animation:"glowPulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily:"Unbounded", fontSize:11, fontWeight:700, color:"#00FFB2", letterSpacing:1.5 }}>
              INDIA'S #1 EXPERIENCE PLATFORM
            </span>
          </div>

          {/* Tagline */}
          <div className="a-up d1" style={{ fontFamily:"Unbounded", fontSize:13, fontWeight:400, color:"rgba(238,248,243,.45)", letterSpacing:3, marginBottom:20, textTransform:"uppercase" }}>
            — explore the unexplore
          </div>

          {/* Main headline */}
          <h1 className="fu a-up d2" style={{ fontSize:"clamp(50px,6.5vw,88px)", fontWeight:900, lineHeight:1.0, color:"white", marginBottom:14 }}>
            Discover<br />
            <span className="shim-g">India's</span><br />
            <span style={{ fontWeight:300, fontStyle:"italic", fontSize:"0.8em" }}>Hidden World</span>
          </h1>

          {/* Slide label */}
          <div className="a-up d3" style={{ display:"flex", alignItems:"center", gap:12, marginBottom:36 }}>
            <div style={{ width:40, height:1, background:"rgba(0,255,178,.4)" }} />
            <span style={{ fontSize:15, color:"rgba(238,248,243,.55)", fontWeight:500 }}>
              <span style={{ color:"#00FFB2", fontWeight:600 }}>{cur.tag}</span> — {cur.label}
            </span>
          </div>

          {/* CTA */}
          <div className="a-up d4" style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:64 }}>
            <button className="btn-g" style={{ padding:"16px 36px", borderRadius:16, fontSize:15 }} onClick={() => setPage("hidden-spots")}>
              Start Exploring →
            </button>
            <button className="btn-b" style={{ padding:"16px 28px", borderRadius:16, fontSize:15 }} onClick={() => setPage("stranger-trips")}>
              🤝 Join a Stranger Trip
            </button>
            <button className="btn-y" style={{ padding:"16px 28px", borderRadius:16, fontSize:15 }} onClick={() => setPage("business-trips")}>
              💼 Business Trips
            </button>
          </div>

          {/* Stats row */}
          <div className="a-up d5" style={{ display:"flex", gap: mobile ? 20 : 48, flexWrap:"wrap" }}>
            {[["2,400+","Venues"],["28","States"],["50K+","Explorers"]].map(([n,l]) => (
              <div key={l}>
                <div className="fu shim-g" style={{ fontSize:30, fontWeight:800 }}>{n}</div>
                <div style={{ fontSize:12, color:"rgba(238,248,243,.38)", marginTop:4, fontFamily:"Unbounded", letterSpacing:.5, textTransform:"uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", gap:8, zIndex:10 }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} style={{ width: i===slide ? 28 : 8, height:8, borderRadius:99, background: i===slide ? "#00FFB2" : "rgba(238,248,243,.25)", border:"none", cursor:"pointer", transition:"all .4s ease" }} />
        ))}
      </div>

      {/* Scroll hint */}
      {!mobile && <div style={{ position:"absolute", bottom:34, right:36, display:"flex", flexDirection:"column", alignItems:"center", gap:8, zIndex:10 }}>
        <div style={{ fontSize:11, fontFamily:"Unbounded", color:"rgba(238,248,243,.28)", letterSpacing:2, writingMode:"vertical-rl" }}>SCROLL</div>
        <div style={{ width:1, height:48, background:"linear-gradient(to bottom, rgba(0,255,178,.5), transparent)", animation:"glowPulse 2s ease-in-out infinite" }} />
      </div>}

      {/* Current slide thumbnail strip */}
      {!mobile && <div style={{ position:"absolute", right:36, top:"50%", transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:10, zIndex:10 }}>
        {HERO_SLIDES.map((sl, i) => (
          <button key={i} onClick={() => setSlide(i)}
            style={{ width:56, height:44, borderRadius:10, overflow:"hidden", border: i===slide ? "2px solid #00FFB2" : "2px solid rgba(255,255,255,.1)", cursor:"pointer", opacity: i===slide ? 1 : .5, transition:"all .3s", padding:0, background:"none" }}>
            <img src={sl.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          </button>
        ))}
      </div>}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════════════════════════ */
function Marquee() {
  const items = ["Turf Booking","Hidden Spots","Adventure","Entertainment","Stranger Trips","Business Trips","Community","Explore India","Uncharted Places"];
  return (
    <div style={{ borderTop:"1px solid rgba(0,255,178,.06)", borderBottom:"1px solid rgba(0,255,178,.06)", padding:"13px 0", overflow:"hidden", background:"rgba(0,255,178,.015)" }}>
      <div className="a-mq" style={{ display:"flex", whiteSpace:"nowrap" }}>
        {[...items,...items].map((item,i) => (
          <span key={i} style={{ display:"flex", alignItems:"center", gap:18, margin:"0 36px", fontSize:11, fontFamily:"Unbounded", fontWeight:600, color:"rgba(238,248,243,.25)", letterSpacing:2 }}>
            {item.toUpperCase()} <span style={{ color:"#00FFB2", opacity:.5 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════ */
function Home({ setPage }) {
  const [joinedTrips, setJoinedTrips] = useState({});

  return (
    <div style={{ background:"var(--dark)" }}>
      <Hero setPage={setPage} />
      <Marquee />

      {/* ── WHAT ARE YOU LOOKING FOR ── */}
      <section className="dot-bg" style={{ padding:"100px clamp(16px,4vw,32px)" }}>
        <div style={{ maxWidth:1320, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:68 }}>
            <div style={{ fontFamily:"Unbounded", fontSize:11, fontWeight:700, color:"#00FFB2", letterSpacing:5, marginBottom:18 }}>WHAT ARE YOU LOOKING FOR?</div>
            <h2 className="fu" style={{ fontSize:"clamp(32px,4vw,52px)", fontWeight:800, color:"white", lineHeight:1.08 }}>
              Every Experience.<br /><span className="shim-g">One Platform.</span>
            </h2>
            <p style={{ fontSize:17, color:"rgba(238,248,243,.45)", marginTop:16, maxWidth:540, margin:"16px auto 0" }}>
              From secret turfs to hidden waterfalls, stranger adventures to elite business retreats.
            </p>
          </div>

          {/* 3-column grid of photo cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:22 }}>
            {CATEGORY_CARDS.map((cat, i) => (
              <div key={cat.key} className="cat-card" onClick={() => setPage(cat.key)} style={{ animationDelay:`${i*.08}s` }}>
                <img src={cat.img} alt={cat.label} className="cat-img" />
                <div className="cat-overlay" />

                {/* NEW badge */}
                {cat.isNew && (
                  <div style={{ position:"absolute", top:16, left:16 }}>
                    <span className="tag-b" style={{ fontSize:10 }}>NEW ✦</span>
                  </div>
                )}

                {/* Content */}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"24px 24px 22px" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
                    <div style={{ fontSize:36 }}>{cat.icon}</div>
                    <span style={{ fontFamily:"Unbounded", fontSize:11, fontWeight:700, color:cat.color, background:`${cat.color}18`, border:`1px solid ${cat.color}30`, padding:"3px 12px", borderRadius:999 }}>{cat.count}</span>
                  </div>
                  <h3 className="fu" style={{ fontWeight:800, fontSize:20, color:"white", marginBottom:6 }}>{cat.label}</h3>
                  <p style={{ fontSize:13, color:"rgba(238,248,243,.5)", lineHeight:1.55 }}>{cat.desc}</p>
                  <div style={{ marginTop:14, display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ flex:1, height:1, background:`linear-gradient(to right, ${cat.color}60, transparent)` }} />
                    <span style={{ fontSize:12, color:cat.color, fontFamily:"Unbounded", fontWeight:600 }}>Explore →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRANGER TRIPS SECTION ── */}
      <section style={{ background:"rgba(56,189,248,.025)", borderTop:"1px solid rgba(56,189,248,.06)", borderBottom:"1px solid rgba(56,189,248,.06)", padding:"100px clamp(16px,4vw,32px)" }}>
        <div style={{ maxWidth:1320, margin:"0 auto" }}>
          {/* Header */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", alignItems:"flex-end", gap:24, marginBottom:56 }}>
            <div>
              <div style={{ fontFamily:"Unbounded", fontSize:11, fontWeight:700, color:"#38BDF8", letterSpacing:5, marginBottom:16 }}>🤝 STRANGER TRIPS</div>
              <h2 className="fu" style={{ fontSize:"clamp(30px,3.5vw,48px)", fontWeight:800, color:"white", lineHeight:1.08 }}>
                No Contacts Needed.<br /><span className="shim-b">Just Show Up.</span>
              </h2>
              <p style={{ fontSize:16, color:"rgba(238,248,243,.48)", marginTop:14, maxWidth:500, lineHeight:1.75 }}>
                Anyone can join. No cliques, no prerequisites — just adventurers sharing the same destination and the same curiosity.
              </p>
            </div>
            <button className="btn-b" style={{ padding:"13px 28px", borderRadius:14, fontSize:14, flexShrink:0, whiteSpace:"nowrap" }} onClick={() => setPage("stranger-trips")}>
              View All Trips →
            </button>
          </div>

          {/* Trip cards with real photos */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:18 }}>
            {STRANGER_TRIPS_DATA.map((trip, i) => (
              <div key={i} className="trip-card" onClick={() => setPage("stranger-trips")}>
                <div style={{ position:"relative", overflow:"hidden" }}>
                  <img src={trip.img} alt={trip.title} className="trip-img" />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(9,20,16,.9) 0%, transparent 60%)" }} />
                  <div style={{ position:"absolute", top:12, left:12 }}><span className="tag-b" style={{ fontSize:10 }}>{trip.badge}</span></div>
                  {trip.filled===trip.slots && <div style={{ position:"absolute", top:12, right:12, background:"rgba(239,68,68,.9)", color:"white", fontSize:10, fontWeight:700, fontFamily:"Unbounded", padding:"3px 10px", borderRadius:999 }}>FULL</div>}
                  {/* Host avatar */}
                  <div style={{ position:"absolute", bottom:12, right:12, display:"flex", alignItems:"center", gap:7 }}>
                    <img src={trip.hostImg} alt={trip.host} style={{ width:28, height:28, borderRadius:"50%", border:"2px solid #38BDF8", objectFit:"cover" }} />
                    <span style={{ fontSize:11, color:"rgba(238,248,243,.8)", fontWeight:500 }}>{trip.host}</span>
                  </div>
                </div>
                <div style={{ padding:"18px" }}>
                  <h3 className="fu" style={{ fontWeight:700, fontSize:14, color:"white", marginBottom:5 }}>{trip.title}</h3>
                  <div style={{ fontSize:12, color:"rgba(238,248,243,.45)", marginBottom:12, display:"flex", gap:8, alignItems:"center" }}>
                    <span>📍 {trip.city}</span> <span style={{ color:"rgba(238,248,243,.2)" }}>•</span> <span>📅 {trip.date}</span>
                  </div>
                  {/* Slots progress */}
                  <div style={{ marginBottom:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                      <span style={{ fontSize:11, color:"rgba(238,248,243,.38)", fontFamily:"Unbounded" }}>Slots</span>
                      <span style={{ fontSize:11, color:"#38BDF8", fontFamily:"Unbounded", fontWeight:700 }}>{trip.filled}/{trip.slots}</span>
                    </div>
                    <div style={{ height:4, background:"rgba(56,189,248,.12)", borderRadius:99 }}>
                      <div className="progress-b" style={{ width:`${(trip.filled/trip.slots)*100}%`, height:"100%" }} />
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontFamily:"Unbounded", fontWeight:700, fontSize:13, color:"#38BDF8" }}>{trip.cost}/person</span>
                    <button className="btn-b" style={{ padding:"7px 16px", borderRadius:10, fontSize:12 }}>
                      {trip.filled===trip.slots ? "Full" : "Join →"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info strip */}
          <div style={{ marginTop:24, display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:14 }}>
            {[
              { i:"🌍", t:"Open to Everyone",   d:"Any age, any background. Just bring your spirit." },
              { i:"🔒", t:"ID-Verified Safety",  d:"All participants verified. Community trust system." },
              { i:"💬", t:"Instant Group Chat",   d:"Auto-added to trip WhatsApp the moment you join." },
            ].map((f,i) => (
              <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", background:"rgba(56,189,248,.04)", border:"1px solid rgba(56,189,248,.08)", borderRadius:16, padding:18 }}>
                <span style={{ fontSize:24, flexShrink:0 }}>{f.i}</span>
                <div>
                  <div className="fu" style={{ fontWeight:700, fontSize:13, color:"white", marginBottom:4 }}>{f.t}</div>
                  <div style={{ fontSize:13, color:"rgba(238,248,243,.45)", lineHeight:1.6 }}>{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS TRIPS SECTION ── */}
      <section style={{ background:"rgba(251,191,36,.02)", borderBottom:"1px solid rgba(251,191,36,.055)", padding:"100px clamp(16px,4vw,32px)" }}>
        <div style={{ maxWidth:1320, margin:"0 auto" }}>
          {/* Header */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", alignItems:"flex-end", gap:24, marginBottom:56 }}>
            <div>
              <div style={{ fontFamily:"Unbounded", fontSize:11, fontWeight:700, color:"#FBBF24", letterSpacing:5, marginBottom:16 }}>💼 BUSINESS TRIPS</div>
              <h2 className="fu" style={{ fontSize:"clamp(30px,3.5vw,48px)", fontWeight:800, color:"white", lineHeight:1.08 }}>
                Think Bigger.<br /><span className="shim-y">Beyond Boardrooms.</span>
              </h2>
              <p style={{ fontSize:16, color:"rgba(238,248,243,.48)", marginTop:14, maxWidth:540, lineHeight:1.75 }}>
                Exclusive retreats for verified professionals only. Share breakthrough ideas, build partnerships, and network in India's most inspiring locations — protected by our community NDA.
              </p>
            </div>
            <button className="btn-y" style={{ padding:"13px 28px", borderRadius:14, fontSize:14, flexShrink:0, whiteSpace:"nowrap" }} onClick={() => setPage("business-trips")}>
              View All Retreats →
            </button>
          </div>

          {/* Biz trip cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:18 }}>
            {BUSINESS_TRIPS_DATA.map((trip, i) => (
              <div key={i} className="biz-card" onClick={() => setPage("business-trips")}>
                <div style={{ position:"relative", overflow:"hidden" }}>
                  <img src={trip.img} alt={trip.title} className="biz-img" />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(9,20,16,.9) 0%, transparent 60%)" }} />
                  <div style={{ position:"absolute", top:12, left:12 }}><span className="tag-y" style={{ fontSize:10 }}>{trip.industry}</span></div>
                  <div style={{ position:"absolute", top:12, right:12 }}><span className="vbadge">✓ Verified</span></div>
                </div>
                <div style={{ padding:"18px" }}>
                  <h3 className="fu" style={{ fontWeight:700, fontSize:14, color:"white", marginBottom:5, lineHeight:1.35 }}>{trip.title}</h3>
                  <div style={{ fontSize:12, color:"rgba(238,248,243,.42)", marginBottom:12, display:"flex", gap:8 }}>
                    <span>📍 {trip.city}</span> <span>📅 {trip.date}</span>
                  </div>
                  <div style={{ marginBottom:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                      <span style={{ fontSize:11, color:"rgba(238,248,243,.38)", fontFamily:"Unbounded" }}>Seats</span>
                      <span style={{ fontSize:11, color:"#FBBF24", fontFamily:"Unbounded", fontWeight:700 }}>{trip.filled}/{trip.slots}</span>
                    </div>
                    <div style={{ height:4, background:"rgba(251,191,36,.1)", borderRadius:99 }}>
                      <div className="progress-y" style={{ width:`${(trip.filled/trip.slots)*100}%`, height:"100%" }} />
                    </div>
                  </div>
                  <button className="btn-y" style={{ width:"100%", padding:"9px", borderRadius:11, fontSize:13 }}>Apply to Join →</button>
                </div>
              </div>
            ))}
          </div>

          {/* NDA notice */}
          <div style={{ marginTop:22, background:"rgba(251,191,36,.04)", border:"1px solid rgba(251,191,36,.14)", borderRadius:16, padding:"16px 22px", display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontSize:26, flexShrink:0 }}>🔐</span>
            <p style={{ fontSize:13, color:"rgba(238,248,243,.5)", lineHeight:1.7 }}>
              <strong style={{ color:"#FBBF24" }}>Business Trips are exclusive to verified professionals.</strong>{" "}
              Your LinkedIn profile and industry are verified before joining or hosting. All ideas shared on trips are protected under our community NDA framework.
            </p>
          </div>
        </div>
      </section>

      {/* ── HIDDEN GEMS ── */}
      <section style={{ padding:"100px 32px" }}>
        <div style={{ maxWidth:1320, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:16, flexWrap:"wrap", marginBottom:52 }}>
            <div>
              <div style={{ fontFamily:"Unbounded", fontSize:11, fontWeight:700, color:"#A78BFA", letterSpacing:5, marginBottom:14 }}>🗺️ HIDDEN GEMS</div>
              <h2 className="fu" style={{ fontSize:"clamp(30px,3.5vw,48px)", fontWeight:800, color:"white" }}>Explore The Unexplored</h2>
            </div>
            <button onClick={() => setPage("hidden-spots")} style={{ background:"none", border:"none", color:"#00FFB2", fontFamily:"Unbounded", fontWeight:700, fontSize:13, cursor:"pointer" }}>View All →</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:22 }}>
            {HIDDEN_GEMS.map((gem, i) => (
              <div key={i} className="gem-card" onClick={() => setPage("hidden-spots")}>
                <div style={{ position:"relative", overflow:"hidden" }}>
                  <img src={gem.img} alt={gem.name} className="gem-img" />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(3,11,7,.92) 0%, transparent 55%)" }} />
                  <div style={{ position:"absolute", top:14, right:14, background:"rgba(3,11,7,.7)", backdropFilter:"blur(8px)", borderRadius:99, padding:"4px 10px", display:"flex", alignItems:"center", gap:5 }}>
                    <span style={{ color:"#FBBF24", fontSize:12 }}>★</span>
                    <span style={{ fontFamily:"Unbounded", fontSize:11, fontWeight:700, color:"white" }}>{gem.rating}</span>
                  </div>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"18px 20px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                      <div>
                        <h3 className="fu" style={{ fontWeight:700, fontSize:16, color:"white", marginBottom:3 }}>{gem.name}</h3>
                        <div style={{ fontSize:12, color:"rgba(238,248,243,.5)" }}>📍 {gem.dist}, {gem.state}</div>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:5, alignItems:"flex-end" }}>
                        {gem.tags.map(t => <span key={t} className="tag" style={{ fontSize:10 }}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding:"0 clamp(16px,4vw,32px) 100px" }}>
        <div style={{ maxWidth:1320, margin:"0 auto" }}>
          <div style={{ position:"relative", borderRadius:36, overflow:"hidden", minHeight:420, display:"flex", alignItems:"center" }}>
            {/* Background */}
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(3,11,7,.92) 0%, rgba(3,11,7,.75) 50%, rgba(3,11,7,.5) 100%)" }} />
            <div style={{ position:"absolute", inset:0 }} className="grid-lines" />
            <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"60%", height:2, background:"linear-gradient(90deg, transparent, #00FFB2, transparent)" }} />

            <div style={{ position:"relative", zIndex:2, padding:"clamp(24px,6vw,64px)", textAlign:"center", width:"100%" }}>
              <div style={{ fontSize:60, marginBottom:18 }}>🌿</div>
              <h2 className="fu" style={{ fontSize:"clamp(28px,4vw,52px)", fontWeight:900, color:"white", marginBottom:16 }}>
                Own a Venue or Hidden Spot?
              </h2>
              <p style={{ fontSize:17, color:"rgba(238,248,243,.55)", marginBottom:36, maxWidth:560, margin:"0 auto 36px", lineHeight:1.7 }}>
                List your turf, adventure spot, or secret location and connect with thousands of explorers across India.
              </p>
              <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
                <button className="btn-g" style={{ padding:"16px 40px", borderRadius:16, fontSize:16 }} onClick={() => setPage("signup-owner")}>
                  List Your Place →
                </button>
                <button className="btn-o" style={{ padding:"16px 30px", borderRadius:16, fontSize:15 }}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CATEGORY PAGE (Turf / Entertainment / Adventure)
═══════════════════════════════════════════════════════════════ */
function CatPage({ catKey }) {
  const cat = CATEGORY_CARDS.find(c => c.key === catKey);
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);
  const items = cat?.items || [];
  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight:"100vh", paddingTop:100, paddingBottom:100 }}>
      {/* Hero */}
      <div style={{ position:"relative", height:320, overflow:"hidden", marginBottom:60 }}>
        <img src={cat?.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(3,11,7,1) 0%, rgba(3,11,7,.6) 50%, rgba(3,11,7,.2) 100%)" }} />
        <div style={{ position:"absolute", bottom:36, left:0, right:0, textAlign:"center" }}>
          <div style={{ fontSize:64, marginBottom:12 }}>{cat?.icon}</div>
          <h1 className="fu page-in" style={{ fontSize:52, fontWeight:900, color:"white", marginBottom:8 }}>{cat?.label}</h1>
          <p style={{ fontSize:16, color:"rgba(238,248,243,.5)" }}>{cat?.desc}</p>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(16px,4vw,32px)" }}>
        <div style={{ maxWidth:440, margin:"0 auto 52px", position:"relative" }}>
          <span style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", color:"rgba(238,248,243,.3)" }}>🔍</span>
          <input style={{ paddingLeft:"44px!important" }} placeholder={`Search ${cat?.label.toLowerCase()}...`} value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:16 }}>
          {filtered.map(item => (
            <div key={item.name} className="venue-card" style={{ textAlign:"center", ...(sel===item.name?{borderColor:`${cat.color}55`,background:`${cat.color}08`}:{}) }} onClick={() => setSel(sel===item.name?null:item.name)}>
              <div style={{ fontSize:40, marginBottom:10 }}>{item.icon}</div>
              <div className="fu" style={{ fontWeight:700, fontSize:13, color:"white", marginBottom:4 }}>{item.name}</div>
              <div style={{ fontSize:11, color:cat.color }}>{item.count}</div>
            </div>
          ))}
        </div>

        {sel && (
          <div className="a-scale" style={{ marginTop:44, background:"rgba(9,20,16,.9)", border:"1px solid rgba(0,255,178,.1)", borderRadius:24, padding:32 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
              <h2 className="fu" style={{ fontSize:22, fontWeight:700, color:"white" }}>{sel} Venues Near You</h2>
              <button onClick={() => setSel(null)} style={{ background:"none", border:"none", color:"rgba(238,248,243,.4)", cursor:"pointer", fontSize:22 }}>✕</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
              {[1,2,3].map(n => (
                <div key={n} className="venue-card">
                  <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:14 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:`${cat.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{cat.icon}</div>
                    <div>
                      <div className="fu" style={{ fontWeight:700, fontSize:13, color:"white" }}>Arena {n} — {sel}</div>
                      <div style={{ fontSize:12, color:"rgba(238,248,243,.4)" }}>📍 {["Chennai","Bangalore","Mumbai"][n-1]}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:13, color:"#FBBF24" }}>★ {(4.4+n*.15).toFixed(1)}</span>
                    <button className="btn-g" style={{ padding:"7px 16px", borderRadius:10, fontSize:12 }}>Book →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HIDDEN SPOTS PAGE
═══════════════════════════════════════════════════════════════ */
function HiddenSpotsPage() {
  const cat = CATEGORY_CARDS.find(c => c.key==="hidden-spots");
  const [ss, setSs] = useState(null);
  const [sd, setSd] = useState(null);

  return (
    <div style={{ minHeight:"100vh", paddingTop:100, paddingBottom:100 }}>
      <div style={{ position:"relative", height:320, overflow:"hidden", marginBottom:60 }}>
        <img src={cat.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(3,11,7,1) 0%, rgba(3,11,7,.5) 50%, rgba(3,11,7,.15) 100%)" }} />
        <div style={{ position:"absolute", bottom:36, left:0, right:0, textAlign:"center" }}>
          <div style={{ fontSize:60, marginBottom:12 }}>🗺️</div>
          <h1 className="fu" style={{ fontSize:52, fontWeight:900, color:"white", marginBottom:8 }}>Hidden Spots</h1>
          <p style={{ fontSize:16, color:"rgba(238,248,243,.5)" }}>Discover places most maps won't show you</p>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(16px,4vw,32px)" }}>
        <div style={{ fontFamily:"Unbounded", fontSize:11, fontWeight:700, color:"#A78BFA", letterSpacing:3, marginBottom:18 }}>STEP 1 — SELECT STATE</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16, marginBottom:44 }}>
          {cat.states.map(s => (
            <button key={s.name} onClick={() => { setSs(s); setSd(null); }}
              style={{ background: ss?.name===s.name ? "rgba(167,139,250,.08)" : "rgba(9,20,16,.8)", border:`1px solid ${ss?.name===s.name ? "rgba(167,139,250,.5)" : "rgba(167,139,250,.1)"}`, borderRadius:20, padding:"22px 26px", cursor:"pointer", textAlign:"left", transition:"all .3s" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>🗾</div>
              <div className="fu" style={{ fontWeight:700, fontSize:18, color:"white", marginBottom:5 }}>{s.name}</div>
              <div style={{ fontSize:13, color:"#A78BFA" }}>{s.districts.length} districts</div>
            </button>
          ))}
        </div>

        {ss && (
          <div className="a-scale" style={{ marginBottom:44 }}>
            <div style={{ fontFamily:"Unbounded", fontSize:11, fontWeight:700, color:"#A78BFA", letterSpacing:3, marginBottom:18 }}>STEP 2 — SELECT DISTRICT IN {ss.name.toUpperCase()}</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
              {ss.districts.map(d => (
                <button key={d.name} onClick={() => setSd(d)}
                  style={{ background: sd?.name===d.name ? "rgba(167,139,250,.08)" : "rgba(9,20,16,.8)", border:`1px solid ${sd?.name===d.name ? "rgba(167,139,250,.5)" : "rgba(167,139,250,.1)"}`, borderRadius:18, padding:"18px 22px", cursor:"pointer", textAlign:"left", transition:"all .3s" }}>
                  <div style={{ fontSize:26, marginBottom:9 }}>📍</div>
                  <div className="fu" style={{ fontWeight:700, fontSize:16, color:"white", marginBottom:4 }}>{d.name}</div>
                  <div style={{ fontSize:12, color:"#A78BFA" }}>{d.spots.length} hidden spots</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {sd && (
          <div className="a-scale">
            <div style={{ fontFamily:"Unbounded", fontSize:11, fontWeight:700, color:"#A78BFA", letterSpacing:3, marginBottom:18 }}>HIDDEN SPOTS IN {sd.name.toUpperCase()}</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:18 }}>
              {sd.spots.map((spot, i) => (
                <div key={spot} className="venue-card" style={{ cursor:"pointer" }}>
                  <div style={{ height:120, borderRadius:12, marginBottom:14, overflow:"hidden" }}>
                    <img src={HIDDEN_GEMS[i%HIDDEN_GEMS.length]?.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                  <h3 className="fu" style={{ fontWeight:700, fontSize:14, color:"white", marginBottom:7 }}>{spot}</h3>
                  <div style={{ fontSize:12, color:"rgba(238,248,243,.38)", marginBottom:12 }}>📍 {sd.name}, {ss.name}</div>
                  <div style={{ display:"flex", gap:6 }}>
                    <span className="tag-v" style={{ fontSize:10 }}>Hidden</span>
                    <span className="tag" style={{ fontSize:10 }}>Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STRANGER TRIPS PAGE
═══════════════════════════════════════════════════════════════ */
function StrangerPage() {
  const [modal, setModal] = useState(false);
  const [joined, setJoined] = useState({});
  const more = [
    { title:"Meghamalai Trek", date:"Feb 8–9", slots:8, filled:2, cost:"₹2,200", badge:"Trek", city:"Meghamalai, TN",
      img:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80", host:"Dev P.", hostImg:"https://i.pravatar.cc/40?img=5" },
    { title:"Pondicherry Heritage Walk", date:"Feb 15", slots:6, filled:1, cost:"₹1,500", badge:"Culture", city:"Pondicherry",
      img:"https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&q=80", host:"Priya K.", hostImg:"https://i.pravatar.cc/40?img=44" },
  ];
  const all = [...STRANGER_TRIPS_DATA, ...more];

  return (
    <div style={{ minHeight:"100vh", paddingTop:100, paddingBottom:100 }}>
      {/* Banner */}
      <div style={{ position:"relative", height:340, overflow:"hidden", marginBottom:0 }}>
        <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1400&q=85" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(3,11,7,.9) 0%, rgba(3,11,7,.55) 50%, rgba(3,11,7,.8) 100%)" }} />
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", textAlign:"center", padding:"0 32px" }}>
          <div style={{ fontSize:60, marginBottom:16 }}>🤝</div>
          <h1 className="fu" style={{ fontSize:"clamp(36px,5vw,64px)", fontWeight:900, color:"white", marginBottom:12 }}>Stranger Trips</h1>
          <p style={{ fontSize:17, color:"rgba(238,248,243,.6)", maxWidth:560, margin:"0 auto 28px", lineHeight:1.7 }}>
            No prior connections. No judgment. Pack your bags, click join, and share the journey with fellow adventurers.
          </p>
          <button className="btn-b" style={{ padding:"13px 30px", borderRadius:14, fontSize:15 }} onClick={() => setModal(true)}>+ Host a Trip</button>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"60px clamp(16px,4vw,32px)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20, marginBottom:64 }}>
          {all.map((trip, i) => (
            <div key={i} style={{ display:"flex", flexWrap:"wrap", gap:0, background:"rgba(9,20,16,.8)", border:`1px solid ${joined[i]?"rgba(56,189,248,.4)":"rgba(56,189,248,.1)"}`, borderRadius:22, overflow:"hidden", cursor:"pointer", transition:"all .4s cubic-bezier(.34,1.56,.64,1)" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 20px 56px rgba(56,189,248,.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ width:"100%", maxWidth:220, minWidth:160, flexShrink:0, overflow:"hidden" }}>
                <img src={trip.img} alt={trip.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              </div>
              <div style={{ flex:1, minWidth:220, padding:"20px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <h3 className="fu" style={{ fontWeight:700, fontSize:16, color:"white" }}>{trip.title}</h3>
                  <span className="tag-b" style={{ fontSize:10, flexShrink:0, marginLeft:8 }}>{trip.badge}</span>
                </div>
                <div style={{ display:"flex", gap:12, marginBottom:14, fontSize:13, color:"rgba(238,248,243,.45)" }}>
                  <span>📍 {trip.city}</span><span>📅 {trip.date}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                  <img src={trip.hostImg} alt="" style={{ width:24, height:24, borderRadius:"50%", objectFit:"cover", border:"2px solid #38BDF8" }} />
                  <span style={{ fontSize:12, color:"rgba(238,248,243,.5)" }}>Hosted by <strong style={{ color:"white" }}>{trip.host}</strong></span>
                </div>
                <div style={{ marginBottom:12 }}>
                  <div style={{ height:4, background:"rgba(56,189,248,.12)", borderRadius:99 }}>
                    <div className="progress-b" style={{ width:`${(trip.filled/trip.slots)*100}%`, height:"100%" }} />
                  </div>
                  <div style={{ fontSize:11, color:"rgba(238,248,243,.38)", fontFamily:"Unbounded", marginTop:4 }}>{trip.filled}/{trip.slots} joined</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <span className="fu" style={{ fontWeight:700, fontSize:14, color:"#38BDF8" }}>{trip.cost}/person</span>
                  <button className={joined[i]?"btn-o":"btn-b"} style={{ padding:"8px 18px", borderRadius:10, fontSize:13 }} onClick={() => setJoined(j => ({...j,[i]:!j[i]}))}>
                    {joined[i] ? "✓ Joined" : trip.filled===trip.slots ? "🔴 Full" : "Join →"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(3,11,7,.9)", backdropFilter:"blur(16px)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:28 }} onClick={() => setModal(false)}>
          <div className="a-scale" style={{ background:"rgba(9,20,16,.99)", border:"1px solid rgba(56,189,248,.22)", borderRadius:28, padding:44, maxWidth:500, width:"100%" }} onClick={e => e.stopPropagation()}>
            <h2 className="fu" style={{ fontWeight:800, fontSize:26, color:"white", marginBottom:6 }}>Host a Stranger Trip</h2>
            <p style={{ fontSize:14, color:"rgba(238,248,243,.45)", marginBottom:28 }}>Share the adventure with new people</p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <input placeholder="Trip title (e.g. Coorg Weekend Hike)" />
              <input placeholder="Destination" />
              <input type="date" />
              <input type="number" placeholder="Max participants" />
              <input placeholder="Cost per person (₹)" />
              <textarea placeholder="Trip description..." rows={3} style={{ resize:"none" }} />
            </div>
            <button className="btn-b" style={{ width:"100%", marginTop:22, padding:"14px", borderRadius:14, fontSize:15 }} onClick={() => setModal(false)}>Create Trip →</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BUSINESS TRIPS PAGE
═══════════════════════════════════════════════════════════════ */
function BusinessPage() {
  const [applyFor, setApplyFor] = useState(null);
  const more = [
    { title:"Women in Tech Retreat", date:"Mar 3–5", slots:10, filled:6, industry:"Tech", city:"Munnar, Kerala", img:"https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&q=80" },
    { title:"Real Estate Leaders Retreat", date:"Mar 10–12", slots:14, filled:9, industry:"Real Estate", city:"Jaipur, Rajasthan", img:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80" },
  ];
  const all = [...BUSINESS_TRIPS_DATA, ...more];

  return (
    <div style={{ minHeight:"100vh", paddingTop:100, paddingBottom:100 }}>
      {/* Banner */}
      <div style={{ position:"relative", height:340, overflow:"hidden", marginBottom:0 }}>
        <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1400&q=85" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, rgba(3,11,7,.92) 0%, rgba(3,11,7,.55) 50%, rgba(3,11,7,.82) 100%)" }} />
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", textAlign:"center", padding:"0 32px" }}>
          <div style={{ fontSize:60, marginBottom:16 }}>💼</div>
          <h1 className="fu" style={{ fontSize:"clamp(34px,5vw,62px)", fontWeight:900, color:"white", marginBottom:12 }}>Business Trips</h1>
          <p style={{ fontSize:17, color:"rgba(238,248,243,.6)", maxWidth:580, margin:"0 auto 14px", lineHeight:1.7 }}>
            Exclusive retreats for verified professionals. Network, share ideas, and build partnerships in India's most inspiring locations.
          </p>
          <div style={{ display:"inline-flex", alignItems:"center", gap:9, background:"rgba(251,191,36,.1)", border:"1px solid rgba(251,191,36,.25)", borderRadius:999, padding:"7px 18px" }}>
            <span>🔒</span><span className="fu" style={{ fontSize:12, fontWeight:700, color:"#FBBF24" }}>Verified Professionals Only</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"60px clamp(16px,4vw,32px)" }}>
        {/* Feature row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16, marginBottom:60 }}>
          {[
            { i:"🤝", t:"Verified Network",  d:"LinkedIn-verified participants only" },
            { i:"🧠", t:"Idea Sessions",     d:"Structured workshops on every retreat" },
            { i:"🔐", t:"NDA Protected",     d:"All shared ideas legally protected" },
            { i:"🗺️", t:"Premium Venues",    d:"Curated locations across India" },
          ].map((f,i) => (
            <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", background:"rgba(251,191,36,.04)", border:"1px solid rgba(251,191,36,.09)", borderRadius:18, padding:20 }}>
              <span style={{ fontSize:28, flexShrink:0 }}>{f.i}</span>
              <div>
                <div className="fu" style={{ fontWeight:700, fontSize:13, color:"white", marginBottom:5 }}>{f.t}</div>
                <div style={{ fontSize:13, color:"rgba(238,248,243,.45)", lineHeight:1.6 }}>{f.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
          {all.map((trip, i) => (
            <div key={i} style={{ display:"flex", flexWrap:"wrap", gap:0, background:"rgba(9,20,16,.85)", border:"1px solid rgba(251,191,36,.1)", borderRadius:22, overflow:"hidden", cursor:"pointer", transition:"all .4s cubic-bezier(.34,1.56,.64,1)" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 20px 56px rgba(251,191,36,.1)"; e.currentTarget.style.borderColor="rgba(251,191,36,.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor="rgba(251,191,36,.1)"; }}>
              <div style={{ width:"100%", maxWidth:220, minWidth:160, flexShrink:0, overflow:"hidden", position:"relative" }}>
                <img src={trip.img} alt={trip.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                <div style={{ position:"absolute", top:10, left:10 }}><span className="vbadge" style={{ fontSize:10 }}>✓</span></div>
              </div>
              <div style={{ flex:1, minWidth:220, padding:"22px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <h3 className="fu" style={{ fontWeight:700, fontSize:15, color:"white", lineHeight:1.3 }}>{trip.title}</h3>
                </div>
                <div style={{ display:"flex", gap:10, marginBottom:14 }}>
                  <span className="tag-y" style={{ fontSize:10 }}>{trip.industry}</span>
                  <span style={{ fontSize:12, color:"rgba(238,248,243,.42)" }}>📍 {trip.city}</span>
                  <span style={{ fontSize:12, color:"rgba(238,248,243,.42)" }}>📅 {trip.date}</span>
                </div>
                <div style={{ marginBottom:16 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ fontSize:11, color:"rgba(238,248,243,.38)", fontFamily:"Unbounded" }}>Seats</span>
                    <span style={{ fontSize:11, color:"#FBBF24", fontFamily:"Unbounded", fontWeight:700 }}>{trip.filled}/{trip.slots}</span>
                  </div>
                  <div style={{ height:5, background:"rgba(251,191,36,.1)", borderRadius:99 }}>
                    <div className="progress-y" style={{ width:`${(trip.filled/trip.slots)*100}%`, height:"100%" }} />
                  </div>
                </div>
                <button className="btn-y" style={{ padding:"10px 22px", borderRadius:12, fontSize:13 }} onClick={() => setApplyFor(trip)}>Apply to Join →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {applyFor && (
        <div style={{ position:"fixed", inset:0, background:"rgba(3,11,7,.92)", backdropFilter:"blur(16px)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:28 }} onClick={() => setApplyFor(null)}>
          <div className="a-scale" style={{ background:"rgba(10,16,8,.99)", border:"1px solid rgba(251,191,36,.25)", borderRadius:28, padding:44, maxWidth:500, width:"100%" }} onClick={e => e.stopPropagation()}>
            <h2 className="fu" style={{ fontWeight:800, fontSize:24, color:"white", marginBottom:5 }}>Apply to Join</h2>
            <p style={{ fontSize:13, color:"rgba(238,248,243,.45)", marginBottom:26 }}>{applyFor.title}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <input placeholder="Full name" />
              <input placeholder="Professional email" />
              <input placeholder="LinkedIn profile URL" />
              <input placeholder="Company & Role" />
              <select><option>Select industry</option><option>Tech & SaaS</option><option>Finance</option><option>Design & Media</option><option>Real Estate</option><option>Healthcare</option><option>Other</option></select>
              <textarea placeholder="Why do you want to join this retreat? (max 200 words)" rows={3} style={{ resize:"none" }} />
            </div>
            <div style={{ background:"rgba(251,191,36,.05)", border:"1px solid rgba(251,191,36,.15)", borderRadius:12, padding:"12px 16px", marginTop:16, fontSize:12, color:"rgba(238,248,243,.48)", lineHeight:1.7 }}>
              🔐 Application reviewed within 48 hrs. Ideas shared on trips are protected under our community NDA.
            </div>
            <button className="btn-y" style={{ width:"100%", marginTop:18, padding:"14px", borderRadius:14, fontSize:15 }} onClick={() => setApplyFor(null)}>Submit Application →</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMMUNITY PAGE
═══════════════════════════════════════════════════════════════ */
function CommunityPage() {
  return (
    <div style={{ minHeight:"100vh", paddingTop:100, paddingBottom:100 }}>
      <div style={{ position:"relative", height:300, overflow:"hidden", marginBottom:60 }}>
        <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=85" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(3,11,7,1) 0%, rgba(3,11,7,.55) 60%, rgba(3,11,7,.2) 100%)" }} />
        <div style={{ position:"absolute", bottom:36, left:0, right:0, textAlign:"center" }}>
          <h1 className="fu" style={{ fontSize:52, fontWeight:900, color:"white", marginBottom:10 }}>Community</h1>
          <p style={{ fontSize:16, color:"rgba(238,248,243,.5)" }}>Connect with 50,000+ explorers across India</p>
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(16px,4vw,32px)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 }}>
          {[
            { i:"📸", t:"Share Your Journey",    d:"Post photos and stories from your adventures for others to discover." },
            { i:"🤝", t:"Find Trip Buddies",      d:"Connect with explorers heading to the same destination." },
            { i:"⭐", t:"Rate & Review",          d:"Help others by reviewing places you've visited." },
            { i:"💬", t:"Discussion Forums",      d:"Ask questions, share insider tips, and get local knowledge." },
            { i:"🎯", t:"Challenges & Events",   d:"Join community challenges and win exclusive explorer badges." },
            { i:"🗺️", t:"Explore Together",      d:"Plan group expeditions with verified local guides." },
          ].map((item,i) => (
            <div key={i} className="venue-card" style={{ padding:28, cursor:"pointer" }}>
              <div style={{ fontSize:44, marginBottom:18 }}>{item.i}</div>
              <h3 className="fu" style={{ fontWeight:700, fontSize:16, color:"white", marginBottom:10 }}>{item.t}</h3>
              <p style={{ fontSize:14, color:"rgba(238,248,243,.48)", lineHeight:1.68 }}>{item.d}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop:44, borderRadius:28, overflow:"hidden", position:"relative" }}>
          <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1400&q=80" alt="" style={{ width:"100%", height:260, objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"rgba(3,11,7,.8)", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
            <h2 className="fu" style={{ fontWeight:800, fontSize:36, color:"white", marginBottom:12 }}>Join 50,000+ Explorers</h2>
            <p style={{ fontSize:15, color:"rgba(238,248,243,.5)", marginBottom:28 }}>India's fastest growing adventure community</p>
            <button className="btn-g" style={{ padding:"14px 36px", borderRadius:14, fontSize:16 }}>Join the Community</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AUTH PAGE
═══════════════════════════════════════════════════════════════ */
function AuthPage({ type, role, setPage }) {
  const il = type==="login", io = role==="owner";
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"100px 28px", position:"relative", overflow:"hidden" }}>
      {/* Background */}
      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.12 }} />
      <div style={{ position:"absolute", inset:0, background:"rgba(3,11,7,.85)" }} />

      <div className="a-scale" style={{ width:"100%", maxWidth:460, position:"relative", zIndex:2 }}>
        <div style={{ background:"rgba(9,20,16,.96)", border:"1px solid rgba(0,255,178,.15)", borderRadius:28, padding:48, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"55%", height:1, background:"linear-gradient(90deg,transparent,#00FFB2,transparent)" }} />
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:58, marginBottom:16 }}>{io?"🏢":"👤"}</div>
            <h1 className="fu" style={{ fontWeight:900, fontSize:30, color:"white", marginBottom:8 }}>{il?"Welcome Back":"Join Fyno"}</h1>
            <p style={{ fontSize:14, color:"rgba(238,248,243,.45)" }}>
              {il?"Sign in to your":"Create your"} <span style={{ color:"#00FFB2", fontWeight:700 }}>{io?"Owner":"Explorer"}</span> account
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {!il && <input placeholder="Full name" />}
            <input type="email" placeholder="Email address" />
            {!il && io && <input placeholder="Venue / business name" />}
            <input type="password" placeholder="Password" />
            {!il && <input type="password" placeholder="Confirm password" />}
          </div>
          <button className="btn-g" style={{ width:"100%", marginTop:24, padding:"14px", borderRadius:14, fontSize:15 }}>{il?"Sign In →":"Create Account →"}</button>
          <div style={{ textAlign:"center", marginTop:20 }}>
            <span style={{ fontSize:14, color:"rgba(238,248,243,.38)" }}>{il?"Don't have an account? ":"Already have an account? "}</span>
            <button style={{ background:"none", border:"none", color:"#00FFB2", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"Unbounded" }} onClick={() => setPage(il?`signup-${role}`:`login-${role}`)}>{il?"Sign Up":"Sign In"}</button>
          </div>
          <div style={{ textAlign:"center", marginTop:8 }}>
            <button style={{ background:"none", border:"none", color:"rgba(238,248,243,.3)", fontSize:12, cursor:"pointer" }} onClick={() => setPage(il?`login-${io?"user":"owner"}`:`signup-${io?"user":"owner"}`)}>Switch to {io?"User":"Owner"} account →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
function Footer({ setPage }) {
  return (
    <footer style={{ borderTop:"1px solid rgba(0,255,178,.06)", padding:"72px clamp(16px,4vw,32px) 40px", position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:1320, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:28, marginBottom:56 }}>
          <div>
            <Logo onClick={() => setPage("home")} />
            <p style={{ fontSize:14, color:"rgba(238,248,243,.38)", marginTop:18, lineHeight:1.85, maxWidth:280 }}>
              India's first platform connecting adventurers, businesses, and strangers through unforgettable experiences and hidden places.
            </p>
            <div style={{ display:"flex", gap:10, marginTop:24 }}>
              {["📘","📸","🐦","▶️"].map((s,i) => (
                <div key={i} style={{ width:36, height:36, borderRadius:10, background:"rgba(0,255,178,.045)", border:"1px solid rgba(0,255,178,.09)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:15, transition:"all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background="rgba(0,255,178,.1)"; e.currentTarget.style.borderColor="rgba(0,255,178,.25)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(0,255,178,.045)"; e.currentTarget.style.borderColor="rgba(0,255,178,.09)"; }}
                >{s}</div>
              ))}
            </div>
          </div>
          {[
            { title:"Explore",  links:["Turf","Entertainment","Adventure","Hidden Spots","Stranger Trips","Business Trips"] },
            { title:"Platform", links:["How It Works","For Owners","Mobile App","Community"] },
            { title:"Company",  links:["About Us","Careers","Contact","Help Center"] },
          ].map(col => (
            <div key={col.title}>
              <div className="fu" style={{ fontWeight:700, fontSize:11, color:"rgba(238,248,243,.5)", letterSpacing:2, marginBottom:20 }}>{col.title.toUpperCase()}</div>
              {col.links.map(link => (
                <div key={link} style={{ fontSize:14, color:"rgba(238,248,243,.38)", marginBottom:12, cursor:"pointer", transition:"color .2s" }}
                  onMouseEnter={e => e.target.style.color="#00FFB2"} onMouseLeave={e => e.target.style.color="rgba(238,248,243,.38)"}
                  onClick={() => setPage(link.toLowerCase().replace(" ","-"))}>{link}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.04)", paddingTop:28, display:"flex", justifyContent:"space-between", alignItems:"center", gap:14, flexWrap:"wrap" }}>
          <div style={{ fontSize:13, color:"rgba(238,248,243,.22)" }}>© 2025 Fyno Explore. Made with 🌿 for India's hidden wonders.</div>
          <div style={{ display:"flex", gap:24 }}>
            {["Privacy","Terms","Cookies"].map(l => <span key={l} style={{ fontSize:13, color:"rgba(238,248,243,.22)", cursor:"pointer" }}>{l}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");

  const render = () => {
    switch(page) {
      case "home":           return <Home setPage={setPage} />;
      case "turf":           return <CatPage catKey="turf" />;
      case "entertainment":  return <CatPage catKey="entertainment" />;
      case "adventure":      return <CatPage catKey="adventure" />;
      case "hidden-spots":   return <HiddenSpotsPage />;
      case "community":      return <CommunityPage />;
      case "stranger-trips": return <StrangerPage />;
      case "business-trips": return <BusinessPage />;
      case "login-user":     return <AuthPage type="login"  role="user"  setPage={setPage} />;
      case "login-owner":    return <AuthPage type="login"  role="owner" setPage={setPage} />;
      case "signup-user":    return <AuthPage type="signup" role="user"  setPage={setPage} />;
      case "signup-owner":   return <AuthPage type="signup" role="owner" setPage={setPage} />;
      default:               return <Home setPage={setPage} />;
    }
  };

  return (
    <>
      <Styles />
      <div style={{ background:"#030B07", minHeight:"100vh", color:"#EEF8F3" }}>
        <Header page={page} setPage={setPage} />
        <main key={page} className="page-in">{render()}</main>
        <Footer setPage={setPage} />
      </div>
    </>
  );
}
