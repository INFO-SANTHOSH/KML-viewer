const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure basePath is set correctly for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/kml-viewer' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/kml-viewer/' : '',
}

export default nextConfig

