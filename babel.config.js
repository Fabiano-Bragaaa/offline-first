module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@theme': './src/theme',
          '@hooks': './src/hooks',
          '@translate': './src/translate',
          '@domain': './src/domain',
          '@services': './src/services',
          '@api': './src/api',
          '@infra': './src/infra',
          '@errors': './src/errors',
        },
      },
    ],
  ],
};
