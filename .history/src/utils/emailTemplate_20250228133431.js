const emailTemplate = (data) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f4f4f4; padding: 10px; text-align: center; }
          .content { padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Golf Cart Waiver</h1>
          </div>
          <div class="content">
            <p>Dear ${data.name},</p>
            <p>Thank you for your waiver submission.</p>
            <p>Details:</p>
            <ul>
              <li>Name: ${data.name}</li>
              <li>Email: ${data.email}</li>
              <li>Date: ${new Date().toLocaleDateString()}</li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = emailTemplate;
