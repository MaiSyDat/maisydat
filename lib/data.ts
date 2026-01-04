
import { PortfolioItem } from '../types';

export const CONTACT_INFO = {
  address: { en: "Trieu Khuc, Tan Trieu, Thanh Tri, Hanoi", vi: "Triều Khúc, Tân Triều, Thanh Trì, Hà Nội" },
  email: "msdat2002@gmail.com",
  phone: "0337 555 933",
  dob: "18-02-2002",
  github: "https://github.com/MaiSyDat",
  socials: [
    { id: 'fb', icon: 'FB', url: '#' },
    { id: 'zalo', icon: 'Zalo', url: 'https://zalo.me/0337555933' },
    { id: 'tele', icon: 'TG', url: '#' },
    { id: 'git', icon: 'Git', url: 'https://github.com/MaiSyDat' },
    { id: 'ig', icon: 'IG', url: '#' },
    { id: 'tiktok', icon: 'TT', url: '#' },
  ]
};

export const IDENTITY_DATA = {
  intro: {
    name: "MAI SỸ ĐẠT",
    role: "Developer",
    bio: {
      vi: "Mong muốn phát triển sự nghiệp trong lĩnh vực IT, vận dụng kinh nghiệm lập trình và hiểu biết công nghệ để hỗ trợ người dùng và tối ưu hệ thống CNTT của doanh nghiệp.",
      en: "Aspiring to develop an IT career, utilizing programming experience and tech knowledge to support users and optimize enterprise IT systems."
    }
  },
  education: {
    school: { vi: "Cao Đẳng Công nghệ Bách khoa Hà Nội", en: "Hanoi Polytechnic College of Technology" },
    major: { vi: "Công nghệ thông tin", en: "Information Technology" },
    period: "8/2022 - 12/2025",
    gpa: "8.2/10"
  },
  certs: [
    { date: "21/2/2024", name: "Course JavaScript online tại F8", issuer: "F8" },
    { date: "13/06/2023", name: "Course HTML&CSS online tại F8", issuer: "F8" }
  ],
  hobbies: [
    { id: 'sing', name: { vi: "Ca hát", en: "Singing" }, icon: "🎤" },
    { id: 'badminton', name: { vi: "Đánh cầu lông", en: "Badminton" }, icon: "🏸" },
    { id: 'chess', name: { vi: "Chơi cờ vua", en: "Chess" }, icon: "♟️" }
  ]
};

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "about",
    title: "MAI SỸ ĐẠT",
    category: { en: "Profile", vi: "Thông tin" },
    color: "#2ECC71", 
    description: {
      en: "Full-stack Developer | 0337 555 933 | msdat2002@gmail.com. Passionate about building digital solutions with PHP & JS.",
      vi: "Lập trình viên Full-stack | 0337 555 933 | msdat2002@gmail.com. Đam mê xây dựng các giải pháp kỹ thuật số với PHP & JS."
    },
    image: "/images/profile.jpg" 
  },
  // --- SKILLS ---
  {
    id: "skill-frontend",
    title: "Frontend Mastery",
    category: { en: "Skill", vi: "Kỹ năng" },
    color: "#61DAFB",
    description: {
      en: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js (R3F).",
      vi: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js (R3F)."
    }
  },
  {
    id: "skill-backend",
    title: "Backend Core",
    category: { en: "Skill", vi: "Kỹ năng" },
    color: "#4F5B93",
    description: {
      en: "PHP (Laravel), Node.js, RESTful API, MySQL, PostgreSQL, Redis.",
      vi: "PHP (Laravel), Node.js, RESTful API, MySQL, PostgreSQL, Redis."
    }
  },
  {
    id: "skill-tools",
    title: "DevOps & SEO",
    category: { en: "Skill", vi: "Kỹ năng" },
    color: "#F05032",
    description: {
      en: "Git, Docker, Google Indexing API, SEO Automation, Technical SEO.",
      vi: "Git, Docker, Google Indexing API, Tự động hóa SEO, SEO Kỹ thuật."
    }
  },
  // --- EXPERIENCE ---
  {
    id: "work-hupuna",
    title: "HUPUNA GROUP",
    category: { en: "Current Job", vi: "Công việc hiện tại" },
    color: "#10B981",
    description: {
      en: "10/2025 - Present: Managing the baobicarton.net ecosystem. Built 'ToolSeoHupuna' for indexing automation.",
      vi: "10/2025 - Hiện tại: Quản lý hệ sinh thái baobicarton.net. Phát triển 'ToolSeoHupuna' tự động hóa indexing."
    }
  },
  {
    id: "work-freelance",
    title: "FREELANCE DEV",
    category: { en: "Experience", vi: "Kinh nghiệm" },
    color: "#3B82F6",
    description: {
      en: "2024 - 2025: Developed custom WordPress plugins, Shopify themes, and independent web applications.",
      vi: "2024 - 2025: Phát triển các plugin WordPress tùy chỉnh, giao diện Shopify và các ứng dụng web độc lập."
    }
  },
  // --- PROJECTS ---
  {
    id: "proj-maisydat-portfolio",
    title: "Portfolio 3D",
    category: { en: "Project", vi: "Dự án" },
    color: "#2ECC71",
    description: {
      en: "My creative 3D portfolio template built with R3F and GSAP.",
      vi: "Mẫu portfolio 3D sáng tạo được xây dựng bằng R3F và GSAP."
    },
    url: "https://github.com/MaiSyDat/maisydat-portfolio"
  },
  {
    id: "proj-fast-google-index",
    title: "Fast Index API",
    category: { en: "Backend", vi: "Hệ thống" },
    color: "#4285F4",
    description: {
      en: "PHP tool for rapid Google Search indexing using official APIs.",
      vi: "Công cụ PHP giúp index Google Search nhanh chóng sử dụng API chính thức."
    },
    url: "https://github.com/MaiSyDat/fastGoogleIndexAPI"
  },
  {
    id: "proj-dline",
    title: "Dline Task",
    category: { en: "Project", vi: "Dự án" },
    color: "#6366F1",
    description: {
      en: "Comprehensive task management system built with TypeScript.",
      vi: "Hệ thống quản lý công việc toàn diện xây dựng bằng TypeScript."
    },
    url: "https://github.com/MaiSyDat/Dline"
  },
  {
    id: "proj-site-health",
    title: "Site Health Monitor",
    category: { en: "Tool", vi: "Công cụ" },
    color: "#EF4444",
    description: {
      en: "Real-time monitoring tool for website status and performance.",
      vi: "Công cụ giám sát trạng thái và hiệu suất website thời gian thực."
    },
    url: "https://github.com/MaiSyDat/SiteHealthMonitor"
  },
  {
    id: "proj-tool-seo-hupuna",
    title: "Tool SEO Hupuna",
    category: { en: "Work", vi: "Công việc" },
    color: "#F59E0B",
    description: {
      en: "Internal SEO automation tool for media cleaning and indexing.",
      vi: "Công cụ tự động hóa SEO nội bộ để dọn dẹp media và index."
    },
    url: "https://github.com/MaiSyDat/ToolSeoHupuna"
  },
  {
    id: "proj-cf7-woo-sheet",
    title: "CF7 Woo Connect",
    category: { en: "Plugin", vi: "Plugin" },
    color: "#21759B",
    description: {
      en: "WordPress plugin to sync Contact Form 7 and WooCommerce with Google Sheets.",
      vi: "Plugin WordPress đồng bộ Contact Form 7 và WooCommerce với Google Sheets."
    },
    url: "https://github.com/MaiSyDat/pLugin-cf7-woo-sheet-connect"
  },
  {
    id: "proj-seo-hupuna",
    title: "SEO Hupuna PHP",
    category: { en: "Project", vi: "Dự án" },
    color: "#10B981",
    description: {
      en: "Advanced SEO utility suite written in PHP.",
      vi: "Bộ tiện ích SEO nâng cao được viết bằng PHP."
    },
    url: "https://github.com/MaiSyDat/seo-hupuna"
  },
  {
    id: "proj-nextjs-app",
    title: "My Next App",
    category: { en: "Frontend", vi: "Giao diện" },
    color: "#000000",
    description: {
      en: "Personal exploration project using Next.js and Tailwind CSS.",
      vi: "Dự án khám phá cá nhân sử dụng Next.js và Tailwind CSS."
    },
    url: "https://github.com/MaiSyDat/my-app-nextjs"
  },
  {
    id: "proj-puna-tiktok",
    title: "Puna TikTok",
    category: { en: "Project", vi: "Dự án" },
    color: "#FE2C55",
    description: {
      en: "TikTok integration and marketing tool in PHP.",
      vi: "Công cụ tích hợp và marketing TikTok bằng PHP."
    },
    url: "https://github.com/MaiSyDat/puna-tiktok"
  },
  {
    id: "proj-badminton-grad",
    title: "Badminton Shop",
    category: { en: "Graduation", vi: "Đồ án" },
    color: "#84CC16",
    description: {
      en: "Graduation project: Full-featured badminton equipment e-commerce using Blade.",
      vi: "Đồ án tốt nghiệp: Trang thương mại điện tử dụng cụ cầu lông đầy đủ tính năng."
    },
    url: "https://github.com/MaiSyDat/badmintonshop"
  },
  {
    id: "proj-badminton-laravel",
    title: "Badminton Laravel",
    category: { en: "Backend", vi: "Hệ thống" },
    color: "#FF2D20",
    description: {
      en: "Scalable badminton store backend built with Laravel.",
      vi: "Hệ thống backend cửa hàng cầu lông xây dựng bằng Laravel."
    },
    url: "https://github.com/MaiSyDat/BadmintonLaravel"
  },
  {
    id: "proj-badminton-aptech",
    title: "Badminton Aptech",
    category: { en: "Project", vi: "Dự án" },
    color: "#4F46E5",
    description: {
      en: "Full-stack project developed during Aptech training.",
      vi: "Dự án Full-stack được phát triển trong quá trình đào tạo tại Aptech."
    },
    url: "https://github.com/MaiSyDat/badmintonAPTECH"
  },
  {
    id: "proj-intern-report",
    title: "Intern Report",
    category: { en: "Education", vi: "Học tập" },
    color: "#64748B",
    description: {
      en: "Comprehensive internship documentation and project logs.",
      vi: "Tài liệu thực tập toàn diện và nhật ký dự án."
    },
    url: "https://github.com/MaiSyDat/Bao-Cao-Thuc-Tap"
  },
  {
    id: "proj-druit",
    title: "Druit Template",
    category: { en: "Frontend", vi: "Giao diện" },
    color: "#F97316",
    description: {
      en: "Modern JavaScript project template for rapid development.",
      vi: "Mẫu dự án JavaScript hiện đại giúp phát triển nhanh chóng."
    },
    url: "https://github.com/MaiSyDat/druit"
  },
  {
    id: "proj-api-batuyet",
    title: "API Ba Tuyet",
    category: { en: "Backend", vi: "Hệ thống" },
    color: "#9333EA",
    description: {
      en: "Custom backend API service developed for Ba Tuyet.",
      vi: "Dịch vụ API backend tùy chỉnh được phát triển cho Ba Tuyet."
    },
    url: "https://github.com/MaiSyDat/api-batuyet"
  },
  {
    id: "proj-shoppe-ui",
    title: "Shopee Product UI",
    category: { en: "UI/UX", vi: "Giao diện" },
    color: "#EE4D2D",
    description: {
      en: "Pixel-perfect Shopee product page clone using pure CSS.",
      vi: "Giao diện trang sản phẩm Shopee tinh tế sử dụng CSS thuần."
    },
    url: "https://github.com/MaiSyDat/page-product-shoppe"
  },
  {
    id: "proj-music-player",
    title: "Music Player",
    category: { en: "App", vi: "Ứng dụng" },
    color: "#1DB954",
    description: {
      en: "Interactive web-based music player with modern controls.",
      vi: "Trình phát nhạc trên web với các điều khiển hiện đại."
    },
    url: "https://github.com/MaiSyDat/Music-player"
  },
  {
    id: "proj-the-band",
    title: "The Band",
    category: { en: "Frontend", vi: "Giao diện" },
    color: "#334155",
    description: {
      en: "Classic responsive landing page for musical bands.",
      vi: "Trang landing page đáp ứng cổ điển dành cho các ban nhạc."
    },
    url: "https://github.com/MaiSyDat/The-Band"
  }
];
