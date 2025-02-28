import { Resend } from 'resend';
const resend = new Resend('re_hwQZygpX_Biof8BSXcYaDrMkLVgYecBRX');

const TEST_EMAIL = "conradovilla@gmail.com" ; 

const formData = {
    guestName: "Conrado Villa",
    license: "123456789",
    issuingState: "Puerto Rico",
    address: "123 Main St",
    signatureDate: "2024-01-01",
    formId: "123456789"
}

const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">Golf Cart Liability Waiver</h1>
            
            <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
                <h2>Waiver Details</h2>
                <p><strong>Guest Name:</strong> ${formData.guestName}</p>
                <p><strong>License:</strong> ${formData.license}</p>
                <p><strong>Issuing State:</strong> ${formData.issuingState}</p>
                <p><strong>Address:</strong> ${formData.address}</p>
                <p><strong>Signature Date:</strong> ${formData.signatureDate}</p>
                <p><strong>Form ID:</strong> ${formData.formId}</p>
            </div>
            <footer style="margin-top: 20px; font-size: 0.8em; color: #666;">
                <p>Sent: ${new Date().toLocaleString('es-ES', { timeZone: 'America/New_York' })}</p>
            </footer>
        </div>
    `;

const emailPayload = {
    from: `Luxe Properties Golf Cart Waiver: ${formData.guestName} <onboarding@resend.dev>`, 
    to: TEST_EMAIL,
    subject: 'Puerto Rico - Golf Cart Liability Waiver',
    html: emailHtml
  };

(async function() {
  try {
    const data = await resend.emails.send({
      ...emailPayload
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();