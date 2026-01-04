# Public Assets

Thư mục này chứa các file tĩnh như ảnh, favicon, và các assets khác.

## Cấu trúc đề xuất:

```
public/
├── favicon.ico          # Favicon của website
├── images/              # Thư mục chứa ảnh
│   ├── profile.jpg      # Ảnh profile của bạn
│   ├── education.jpg     # Ảnh cho section education
│   ├── certificates.jpg # Ảnh cho section certificates
│   ├── contact.jpg      # Ảnh cho section contact
│   └── hobbies.jpg       # Ảnh cho section hobbies
└── README.md            # File này
```

## Cách sử dụng:

Trong Next.js, các file trong thư mục `public` có thể được truy cập trực tiếp từ root URL.

Ví dụ:
- `/favicon.ico` → `public/favicon.ico`
- `/images/profile.jpg` → `public/images/profile.jpg`

