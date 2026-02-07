
import { PortfolioItem } from '../types';

export const CONTACT_INFO = {
  address: { en: "Trieu Khuc, Tan Trieu, Thanh Tri, Hanoi", vi: "Triều Khúc, Tân Triều, Thanh Trì, Hà Nội" },
  email: "msdat2002@gmail.com",
  phone: "0337 555 933",
  dob: "18-02-2002",
  github: "https://github.com/MaiSyDat",
  socials: [
    { id: 'fb', icon: 'FB', url: 'https://www.facebook.com/sdat.02' },
    { id: 'zalo', icon: 'Zalo', url: 'https://zalo.me/0337555933' },
    { id: 'tele', icon: 'TG', url: '#' },
    { id: 'git', icon: 'Git', url: 'https://github.com/MaiSyDat' },
    { id: 'ig', icon: 'IG', url: 'https://www.instagram.com/dat_02/' },
    { id: 'tiktok', icon: 'TT', url: 'https://www.tiktok.com/@swdat_msdat2002@gmail.com' },
  ]
};

export const IDENTITY_DATA = {
  intro: {
    name: "MAI SỸ ĐẠT",
    role: "WordPress Developer (PHP)",
    bio: {
      vi: "Lập trình viên WordPress với gần 1 năm kinh nghiệm thực chiến trong việc phát triển Plugin, Theme và Chrome Extension. Biết về tối ưu hệ thống SEO, quản trị dữ liệu và tùy biến Flatsome/Elementor. Mong muốn đóng góp kỹ năng lập trình để xây dựng các giải pháp CNTT tối ưu cho doanh nghiệp.",
      en: "WordPress Developer with nearly 1 year of hands-on experience in developing Plugins, Themes, and Chrome Extensions. Proficient in SEO optimization, data management, and custom Flatsome/Elementor development. Aiming to contribute programming skills to build optimal IT solutions for businesses."
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
    category: { en: "The Protagonist", vi: "Nhân vật chính" },
    color: "#2ECC71",
    description: {
      en: "IT Enthusiast | 0337 555 933 | msdat2002@gmail.com. Passionate about system optimization and problem-solving.",
      vi: "Nhân viên IT | 0337 555 933 | msdat2002@gmail.com. Đam mê tối ưu hóa hệ thống và giải quyết vấn đề."
    },
    image: "/images/profile.jpg"
  },

  // --- EXPERIENCES (STORY CHRONOLOGY) ---
  {
    id: "work-hupuna",
    title: "HUPUNA GROUP",
    category: { en: "Experience", vi: "Kinh nghiệm" },
    color: "#2ECC71",
    period: "10/2025 - 02/2026",
    description: {
      en: "Developed SEO support tools and Google Sheets integration plugins. Managed 14 satellite websites, optimized UI/UX on Flatsome/Elementor, and built internal Chrome Extensions.",
      vi: "Phát triển công cụ hỗ trợ SEO và plugin kết nối Google Sheets. Quản trị hệ thống 14 website vệ tinh, tối ưu UI/UX trên Flatsome/Elementor và xây dựng Chrome Extension nội bộ."
    },
    location: { en: "Hanoi", vi: "Hà Nội" },
    image: "/images/hupuna.png"
  },
  {
    id: "work-military",
    title: "NATIONAL SERVICE",
    category: { en: "Next Chapter", vi: "Chương kế tiếp" },
    color: "#064E3B",
    period: "After Lunar New Year 2026",
    description: {
      en: "Fulfilling national duty. A transformation from developer to soldier, building discipline and resilience.",
      vi: "Thực hiện nghĩa vụ quân sự. Sự chuyển mình từ lập trình viên thành người lính, rèn luyện kỷ luật và bản lĩnh."
    },
    image: "/images/quandoinhandan.jpg"
  },
  {
    id: "work-ovatheme",
    title: "OVatheme",
    category: { en: "Experience", vi: "Kinh nghiệm" },
    color: "#3B82F6",
    period: "04/2025 - 10/2025",
    description: {
      en: "Converted Figma designs to WordPress Themes. Developed custom Elementor widgets and Booking plugin modules. Optimized page performance and provided technical support.",
      vi: "Chuyển đổi thiết kế Figma thành WordPress Theme. Lập trình Elementor widgets và module cho Plugin Booking. Tối ưu hiệu suất trang và hỗ trợ kỹ thuật."
    },
    image: "/images/ovatheme.jpg"
  },
  {
    id: "work-lsd",
    title: "LSD Technology",
    category: { en: "Internship", vi: "Thực tập" },
    color: "#6366F1",
    period: "01/2025 - 04/2025",
    description: {
      en: "Intern focusing on HTML, CSS, ReactJS, and Laravel. Participated in real-world software development cycles.",
      vi: "Thực tập sinh tập trung vào HTML, CSS, ReactJS và Laravel. Tham gia vào chu kỳ phát triển phần mềm thực tế."
    },
    image: "/images/lsd.jpg"
  },

  // --- PROJECTS ---
  {
    id: "proj-brw",
    title: "BRW – Booking Rental WooCommerce",
    category: { en: "Backend Project", vi: "Dự án Backend" },
    color: "#F59E0B",
    period: "09/2025 - 10/2025",
    description: {
      en: "Developed and bug-fixed a WooCommerce rental plugin supporting multiple types (Day, Hours, Mixed, Hotel). Built Elementor shortcodes and a calendar system with pricing and email notifications.",
      vi: "Tham gia phát triển và fix bug cho plugin đa dạng rental type (Day, Hours, Mixed, Hotel). Xây dựng Elementor shortcode và hệ thống lịch hiển thị giá, gửi email thông báo."
    }
  },
  {
    id: "proj-hotel",
    title: "WooCommerce Hotel Booking",
    category: { en: "Backend Project", vi: "Dự án Backend" },
    color: "#8B5CF6",
    period: "07/2025 - 09/2025",
    description: {
      en: "Built Admin Settings, Meta Boxes for Hotel products, and integrated Easepick Calendar for reservation management, pricing, and services.",
      vi: "Xây dựng hệ thống Admin Setting, Meta Box cho sản phẩm Hotel và tích hợp Easepick Calendar để quản lý đặt phòng, tính toán giá và dịch vụ."
    }
  },
  {
    id: "proj-remons",
    title: "Remons Care",
    category: { en: "Frontend Project", vi: "Dự án Frontend" },
    color: "#EC4899",
    period: "04/2025 - 07/2025",
    description: {
      en: "Developed custom Elementor widgets (Blog, Booking, Gallery, etc.) and implemented Figma designs into a complete WordPress medical theme.",
      vi: "Xây dựng các Elementor widget tùy chỉnh (Blog, Booking, Gallery...) và hiện thực hóa thiết kế Figma thành giao diện theme WordPress y tế hoàn chỉnh."
    }
  },
  {
    id: "proj-cf7-gsheet",
    title: "CF7 Google Sheet Connector",
    category: { en: "Automation", vi: "Tự động hóa" },
    color: "#34A853",
    period: "2025",
    description: {
      en: "Synchronizes customer and order data from Contact Form 7 and WooCommerce to Google Sheets using OAuth 2.0 and Google Sheets API.",
      vi: "Đồng bộ hóa dữ liệu khách hàng và đơn hàng từ Contact Form 7 và WooCommerce sang Google Sheets sử dụng OAuth 2.0 và Google Sheets API."
    }
  },
  {
    id: "proj-seo-tool",
    title: "Fast Google Indexing API",
    category: { en: "Automation", vi: "Tự động hóa" },
    color: "#10B981",
    period: "2025",
    description: {
      en: "Automates URL submission to Google Search Console for immediate indexing using Google Indexing API.",
      vi: "Tự động hóa việc gửi URL bài viết lên Google Search Console để lập chỉ mục ngay lập tức qua Google Indexing API."
    },
    url: "https://github.com/MaiSyDat/fast-google-indexing-api"
  },
  {
    id: "proj-health",
    title: "Site Health Monitor",
    category: { en: "Utility", vi: "Tiện ích" },
    color: "#F43F5E",
    period: "2025",
    description: {
      en: "Real-time monitoring system for website health and performance status.",
      vi: "Hệ thống giám sát thời gian thực cho sức khỏe và trạng thái hiệu suất của website."
    },
    url: "https://github.com/MaiSyDat/SiteHealthMonitor"
  },
  {
    id: "proj-dsmash",
    title: "DSmash Badminton",
    category: { en: "Full-stack", vi: "Full-stack" },
    color: "#EF4444",
    period: "03/2025 - 05/2025",
    description: {
      en: "E-commerce platform for badminton gear built with Laravel. Features advanced admin dashboard.",
      vi: "Nền tảng thương mại điện tử cho dụng cụ cầu lông xây dựng bằng Laravel. Có bảng điều khiển admin nâng cao."
    },
    url: "https://github.com/MaiSyDat/BadmintonLaravel/"
  },
  {
    id: "proj-faker",
    title: "KKSR Data Faker",
    category: { en: "Utility", vi: "Tiện ích" },
    color: "#3B82F6",
    period: "2025",
    description: {
      en: "Generates automated social proof by increasing star ratings and sales based on real visitor behavior with database-level control.",
      vi: "Tạo bằng chứng xã hội (Social Proof) tự động, tăng số lượt đánh giá và lượt bán dựa trên hành vi khách hàng với xử lý Database riêng."
    },
    url: "https://github.com/MaiSyDat/kkrs-data-faker"
  },
  {
    id: "proj-tiktok",
    title: "Puna TikTok",
    category: { en: "Web", vi: "Web" },
    color: "#000000",
    period: "2025",
    description: {
      en: "Short video interface with infinite scroll, multi-source embedding, and guest comment system.",
      vi: "Giao diện video ngắn với tính năng Infinite Scroll, nhúng video đa nguồn và hệ thống bình luận không cần đăng nhập."
    },
    url: "https://github.com/MaiSyDat/puna-tiktok"
  },
  {
    id: "proj-games",
    title: "Chrome Game Hub",
    category: { en: "Extension", vi: "Extension" },
    color: "#FACC15",
    period: "2025",
    description: {
      en: "A collection of Chrome extensions including Gomoku, Snake, and Tank Battle.",
      vi: "Bộ sưu tập các tiện ích Chrome bao gồm Cờ caro, Rắn săn mồi và Bắn xe tăng."
    },
    url: "https://github.com/hopcarton/Tic-Tac-Toe-Gomoku"
  },

  // --- SKILLS ---
  {
    id: "skill-wp",
    title: "WordPress Professional",
    category: { en: "Skill", vi: "Chuyên môn" },
    color: "#21759B",
    description: {
      en: "Theme & Plugin development, Flatsome/Elementor widgets, WooCommerce API, Hook & Filter system.",
      vi: "Phát triển Theme & Plugin chuyên sâu, tùy biến Flatsome/Elementor, WooCommerce API, Hook & Filter."
    }
  },
  {
    id: "skill-stack",
    title: "Dev Stack",
    category: { en: "Skill", vi: "Kỹ năng" },
    color: "#4F5B93",
    description: {
      en: "PHP (Laravel), JavaScript (NextJS, ReactJS), HTML5/CSS3 (Tailwind, SASS, Bootstrap).",
      vi: "PHP (Laravel), JavaScript (NextJS, ReactJS), HTML5, CSS3 (Tailwind, SASS, Bootstrap)."
    }
  },
  {
    id: "skill-other",
    title: "Systems & Advanced",
    category: { en: "Skill", vi: "Hệ thống" },
    color: "#EC4899",
    description: {
      en: "Chrome Extension API, Google APIs, SEO/Performance optimization, Server/Hosting management, MySQL, MongoDB.",
      vi: "Chrome Extension API, Google API, tối ưu SEO & Performance, quản trị Server/Hosting, MySQL, MongoDB."
    }
  }
];
