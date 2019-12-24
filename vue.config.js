module.exports = {
  devServer: {
    port: 1234,
  },
  pwa: {
    name: "My App",
    themeColor: "#000000",
    msTileColor: "#000000",
    icons: [
      {
        src: "./img/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "./img/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    manifestOptions: {
      start_url: '/home'
    },
    display: "standalone",
    background_color: "#000000"
  },
  transpileDependencies: [
    'vuetify'
  ]
};