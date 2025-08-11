import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SELF_URL = process.env.SELF_URL || 'https://frog-viper.onrender.com'; // наприклад: 'https://your-bot.onrender.com'

if (SELF_URL) {
  cron.schedule('*/5 * * * *', async () => {
    try {
      await axios.get(`${SELF_URL}/ping`);
      console.log('🔁 Self-ping sent');
    } catch (err: any) {
      console.error('❌ Self-ping failed:', err.message);
    }
  });
} else {
  console.warn('⚠️ SELF_URL не вказано, self-ping не буде працювати');
}
