// imageTransformPlugin.js
export default function imageTransformPlugin() {
  return {
    name: 'image-transform',
    transform(code) {
      // Transform image paths for production builds
      // This plugin is kept for compatibility but can be removed if not needed
      return code;
    }
  };
}