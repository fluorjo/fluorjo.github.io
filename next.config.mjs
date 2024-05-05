
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
      },
      output: "export",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'vyfkwfwikstziyoxdiap.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
        ],
    },
};

export default nextConfig;