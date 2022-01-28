import axios from 'axios';
import { root } from '../index';

const WEB_HOOK_URL = process.env.SLACK_WEBHOOK_URL;
export const alertToSlack = async (message: any) => {
  if(WEB_HOOK_URL === undefined) {
    console.error(`slack message noti failed: ${message}`);
    return;
  }

  const user = root.firebaseSessionStore.user;
  return await axios.post(WEB_HOOK_URL, {
    channel: '#alert-webhook',
    text: `유저: ${user?.email}\n 환경: \`${process.env.NODE_ENV}\`\n\n\`\`\`${JSON.stringify(message)}\`\`\``,
  }, {
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
    },
    timeout: 5000,
  });
}

