import Whatsapp from 'whatsapp-web.js';

let waWebProvider;

export const waProvider = {
  name: 'waProvider',
  configureServer() {
    initWaWebProvider()
  }
}

export const initWaWebProvider = async () => {
  try {
    const { Client, LocalAuth } = Whatsapp;

    if (!waWebProvider) {
      
      waWebProvider = new Client({
        authStrategy: new LocalAuth({
          dataPath: './'
        }),
        // proxyAuthentication: { username: 'username', password: 'password' },
        puppeteer: {
          args: ['--no-sandbox'],
          headless: false,
        }
      });

      await waWebProvider.initialize();
    }
  
    return waWebProvider;
  } catch(err) {
    console.log(err);
  }
}

// waWebProvider.on('qr', (qr) => {
//   // Generate and scan this code with your phone
//   console.log('QR RECEIVED', qr);
// });

// waWebProvider.on('ready', () => {
//   console.log('Client is ready!');
// });

// waWebProvider.on('message', msg => {
//   if (msg.body == '!ping') {
//     msg.reply('pong');
//   }
// });

// (async function() {


//   try {
    
    
//   } catch (err) {
//     console.log(err);
//   }

// })