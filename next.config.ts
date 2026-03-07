import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "host",
            value: "citiory.com",
          },
        ],
        destination: "https://www.citiory.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "host",
            value: "www.citiory.com",
          },
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://www.citiory.com/:path*",
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
