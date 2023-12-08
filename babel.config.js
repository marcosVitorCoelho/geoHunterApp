module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', "@babel/preset-typescript"],
    plugins: [
      'nativewind/babel',
      'expo-router/babel',
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@storage': './src/storage',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@configs': './src/configs',
            '@routes': './src/routes',
            '@hooks': './src/hooks',
          }
        }
      ]
    ]
  };
};
