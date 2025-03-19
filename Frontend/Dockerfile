# ==============================
# Stage One --> Build React App
# ==============================
FROM node:16.17.0-alpine AS builder
WORKDIR /app

# نسخ ملفات الباكج أولًا لتقليل إعادة بناء الكاش عند تحديث الكود
COPY package.json package-lock.json ./
RUN npm install

# نسخ باقي المشروع وبناؤه
COPY . .
RUN npm run build

# ==============================
# Stage Two --> Serve with Nginx
# ==============================
FROM nginx@sha256:0a399eb16751829e1af26fea27b20c3ec28d7ab1fb72182879dcae1cca21206a

WORKDIR /usr/share/nginx/html

# تنظيف المجلد قبل النسخ
RUN rm -rf ./*

# نسخ الملفات المبنية من المرحلة الأولى
COPY --from=builder /app/build/ .

# نسخ إعدادات Nginx (اختياري)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
