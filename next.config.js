module.exports = {
    distDir: 'build',
    serverRuntimeConfig:{
NEXT_PUBLIC_MAPBOX_API_TOKEN:process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN ,

NEXT_PUBLIC_FIREBASE_API_KEY:process.env.NEXT_PUBLIC_FIREBASE_API_KEY ,
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ,
NEXT_PUBLIC_FIREBASE_PROJECT_ID:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ,
FIREBASE_CLIENT_EMAIL:process.env.FIREBASE_CLIENT_EMAIL ,
FIREBASE_PRIVATE_KEY:process.env.FIREBASE_PRIVATE_KEY ,

CLOUDINARY_SECRET:process.env.CLOUDINARY_SECRET ,
NEXT_PUBLIC_CLOUDINARY_KEY:process.env.NEXT_PUBLIC_CLOUDINARY_KEY ,
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ,

DATABASE_URL:process.env.DATABASE_URL ,


    },
   future: {
    webpack5: true,
  },
  webpack: function (config, options) {
    config.experiments = {};
    return config;
  },
    publicRuntimeConfig: {
      // add your public runtime environment variables here with NEXT_PUBLIC_*** prefix
    }
   
  }
  