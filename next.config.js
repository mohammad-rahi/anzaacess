/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fyuasfbrtueynwagzrda.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
