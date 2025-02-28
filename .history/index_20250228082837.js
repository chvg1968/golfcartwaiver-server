import { Resend } from 'resend';
const resend = new Resend('re_hwQZygpX_Biof8BSXcYaDrMkLVgYecBRX');

(async function() {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: 'conradovilla@gmail.com',
      subject: 'Hello World',
      html: '<strong>Funciona perfectamente</strong>'
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();