// Load configuration from environment or config file
const path = require('path');

// Environment variable overrides
const config = {
  disableHotReload: process.env.DISABLE_HOT_RELOAD === 'true',
};

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig, { env }) => {
      
      // Disable hot reload completely if environment variable is set
      if (config.disableHotReload) {
        // Remove hot reload related plugins
        webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
          return !(plugin.constructor.name === 'HotModuleReplacementPlugin');
        });
        
        // Disable watch mode
        webpackConfig.watch = false;
        webpackConfig.watchOptions = {
          ignored: /.*/, // Ignore all files
        };
      } else {
        // Add ignored patterns to reduce watched directories
        webpackConfig.watchOptions = {
          ...webpackConfig.watchOptions,
          ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            '**/public/**',
          ],
        };
      }

      // Production optimizations
      if (env === 'production') {
        // Split chunks for better caching
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
                maxSize: 244000, // 244KB
              },
              common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                maxSize: 244000,
              },
              // Separate chunk for large libraries
              icons: {
                test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
                name: 'icons',
                chunks: 'all',
              },
              radix: {
                test: /[\\/]node_modules[\\/](@radix-ui)[\\/]/,
                name: 'radix',
                chunks: 'all',
              }
            }
          },
          // Runtime chunk for better caching
          runtimeChunk: 'single'
        };
      }

      // Optimize images
      const imageInlineSizeLimit = 4096; // 4KB
      const fileLoaderRule = webpackConfig.module.rules.find(rule => 
        rule.oneOf?.some(r => r.test && r.test.toString().includes('png|jpg|jpeg|gif'))
      );
      
      if (fileLoaderRule) {
        const imageRule = fileLoaderRule.oneOf.find(rule => 
          rule.test && rule.test.toString().includes('png|jpg|jpeg|gif')
        );
        
        if (imageRule) {
          imageRule.parser = {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit
            }
          };
          // Add WebP support
          imageRule.test = /\.(png|jpg|jpeg|gif|webp)$/i;
        }
      }
      
      return webpackConfig;
    },
  },
};