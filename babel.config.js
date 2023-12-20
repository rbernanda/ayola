module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '~/assets': './src/assets',
          '~/store': './src/store',
          '~/screens': './src/screens',
          '~/styles': './src/styles',
          '~/routes': './src/routes',
          '~/services': './src/services',
          '~/hooks': './src/hooks',
          '~/shared': './src/shared',
          '~/types': './src/types',
          '~/components': './src/components',
        },
      },
    ],
  ],
};
