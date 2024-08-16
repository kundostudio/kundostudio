const path = require("path");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  swcMinify: true,
  images: {
    // ADD in case you need to import SVGs in next/image component
    // dangerouslyAllowSVG: true,
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
  },
  // add @import 'styles/_functions'; to all scss files.
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import '~/styles/_functions';`,
  },
  webpack: (config, options) => {
    // handle font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/fonts/",
          outputPath: "static/fonts/",
          name: "[name].[ext]",
          esModule: false,
        },
      },
    });

    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /url$/,
          use: "raw-loader",
        },
        {
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                memo: true,
                dimensions: false,
                svgoConfig: {
                  multipass: true,
                  plugins: [
                    "removeDimensions",
                    "removeOffCanvasPaths",
                    "reusePaths",
                    "removeElementsByAttr",
                    "removeStyleElement",
                    "removeScriptElement",
                    // "prefixIds",
                    {
                      name: "convertPathData",
                      params: {
                        floatPrecision: 1,
                      },
                    },
                    {
                      name: "convertTransform",
                      params: {
                        floatPrecision: 1,
                      },
                    },
                    {
                      name: "cleanupListOfValues",
                      params: {
                        floatPrecision: 1,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    });

    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

module.exports = () => {
  const plugins = [];
  return plugins.reduce((acc, plugin) => plugin(acc), {
    ...nextConfig,
  });
};
