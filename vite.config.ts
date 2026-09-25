import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig, Plugin } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function graphicAssetUploaderPlugin(): Plugin {
  return {
    name: 'graphic-asset-uploader',
    configureServer(server) {
      server.middlewares.use('/api/upload-hero-image', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { dataBase64 } = JSON.parse(body);
              if (dataBase64) {
                const cleanData = dataBase64.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(cleanData, 'base64');
                const targetPath = path.resolve(__dirname, 'public/image-1.png');
                fs.writeFileSync(targetPath, buffer);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, url: '/image-1.png' }));
                return;
              }
            } catch (err) {
              console.error('Hero upload error:', err);
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to upload hero image' }));
          });
          return;
        }
      });

      server.middlewares.use('/api/upload-graphic-asset', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { filename, dataBase64 } = JSON.parse(body);
              if (filename && dataBase64) {
                const cleanData = dataBase64.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(cleanData, 'base64');
                const targetDir = path.resolve(__dirname, 'public/images/graphic-design');
                if (!fs.existsSync(targetDir)) {
                  fs.mkdirSync(targetDir, { recursive: true });
                }
                const targetPath = path.join(targetDir, filename);
                fs.writeFileSync(targetPath, buffer);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, url: `/images/graphic-design/${filename}` }));
                return;
              }
            } catch (err) {
              console.error('Asset upload error:', err);
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to upload asset' }));
          });
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), graphicAssetUploaderPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

