import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};
module.exports = {
  images: {
    domains: ["www.modi.ru", "encrypted-tbn0.gstatic.com", "ohapka63.ru"], // Добавьте домен, с которого вы хотите загружать изображения
  },
};

export default nextConfig;
