module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    ['module:react-native-dotenv', { path: '.env' }],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@hooks': './src/hooks',
          '@domain': './src/domain',
          '@services': './src/services',
          '@infra': './src/infra',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
