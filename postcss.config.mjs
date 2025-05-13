export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    "postcss-preset-env": {
      stage: 3, // 設置支持的 CSS 特性階段
      features: {
        "cascade-layers": true
      }
    }
  }
}
