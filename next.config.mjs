/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Required for GSAP in server components
  transpilePackages: ["gsap"],

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Webpack: handle GLSL shader files
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader"],
    });
    return config;
  },
};

export default nextConfig;
