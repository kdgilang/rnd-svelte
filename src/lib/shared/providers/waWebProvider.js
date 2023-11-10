import { Client, LocalAuth } from 'whatsapp-web.js';

// const { Client, LocalAuth } = Whatsapp;

export const waWebProvider = new Client({
  authStrategy: new LocalAuth(),
  // proxyAuthentication: { username: 'username', password: 'password' },
  puppeteer: {
    // args: ['--proxy-server=proxy-server-that-requires-authentication.example.com'],
    headless: false
  }
});

waWebProvider.on('qr', (qr) => {
  // Generate and scan this code with your phone
  console.log('QR RECEIVED', qr);
});

waWebProvider.on('ready', () => {
  console.log('Client is ready!');
});

waWebProvider.on('message', msg => {
  if (msg.body == '!ping') {
    msg.reply('pong');
  }
});

waWebProvider.initialize();
