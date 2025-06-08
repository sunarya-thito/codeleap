# ==== Tahap 1: Build ====
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Salin file dependency terlebih dahulu (agar cache efisien)
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh source code
COPY . .

# Build aplikasi Next.js (untuk production)
RUN npm run build

# Hapus devDependencies jika tidak diperlukan
RUN npm prune --production

# ==== Tahap 2: Run ====
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Salin hanya hasil build dan node_modules dari tahap build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Opsional: set env untuk production
ENV NODE_ENV=production
ENV PORT=3000

# Expose port default Next.js
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]