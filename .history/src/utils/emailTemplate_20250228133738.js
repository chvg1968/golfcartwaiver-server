function generateEmailHTML(formData, pdfLink) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { color: #333; }
        .waiver-details { background-color: #f4f4f4; padding: 15px; border-radius: 5px; }
        .waiver-details p { margin: 10px 0; }
        footer { margin-top: 20px; font-size: 0.8em; color: #666; }
    </style>
</head>
<body>
    <h1>Golf Cart Liability Waiver</h1>
    
    <div class="waiver-details">
        <h2>Waiver Details</h2>
        <p><strong>Guest Name:</strong> ${formData.guestName}</p>
        <p><strong>License:</strong> ${formData.license}</p>
        <p><strong>Issuing State:</strong> ${formData.issuingState}</p>
        <p><strong>Address:</strong> ${formData.address}</p>
        <p><strong>Signature Date:</strong> ${formData.signatureDate}</p>
        <p><strong>Form ID:</strong> ${formData.formId}</p>
        <p><strong>Waiver PDF:</strong> <a href="${pdfLink}">Download Signed Waiver</a></p>
    </div>

    <footer>
        <p>Sent: ${new Date().toLocaleString('en-US', { 
            timeZone: 'America/New_York',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        })}</p>
    </footer>
</body>
</html>
  `;
}

function generateEmailText(formData, pdfLink) {
  return `Golf Cart Liability Waiver

Waiver Details:
- Guest Name: ${formData.guestName}
- License: ${formData.license}
- Issuing State: ${formData.issuingState}
- Address: ${formData.address}
- Signature Date: ${formData.signatureDate}
- Form ID: ${formData.formId}
- Waiver PDF: ${pdfLink}

Sent: ${new Date().toLocaleString('en-US', { 
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
})}`;
}

module.exports = { generateEmailHTML, generateEmailText };
