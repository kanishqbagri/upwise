// Vercel serverless function for sending weekly newsletters
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { summary } = req.body;

    if (!summary) {
      return res.status(400).json({ error: 'Summary data is required' });
    }

    // In production, you'd:
    // 1. Get subscribers from your database
    // 2. Use a real email service (SendGrid, Mailgun, etc.)
    // 3. Send emails to each subscriber

    console.log('Sending newsletter to subscribers:', summary);

    // Example integration with SendGrid (you'd need to install @sendgrid/mail)
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const subscribers = await getSubscribersFromDatabase();
    
    for (const subscriber of subscribers) {
      const msg = {
        to: subscriber.email,
        from: 'noreply@yourdomain.com',
        subject: `Weekly Dose of History - ${summary.weekOf}`,
        html: generateEmailHTML(summary),
        text: generateEmailText(summary)
      };
      
      await sgMail.send(msg);
    }
    */

    res.status(200).json({ 
      success: true, 
      message: `Newsletter sent to subscribers for week of ${summary.weekOf}` 
    });

  } catch (error) {
    console.error('Newsletter sending error:', error);
    res.status(500).json({ error: 'Failed to send newsletter' });
  }
}

function generateEmailHTML(summary) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Weekly Dose of History</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .event { margin-bottom: 30px; padding: 20px; border-left: 4px solid #667eea; background: #f8f9fa; }
        .event-title { font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 10px; }
        .event-date { color: #666; font-size: 14px; margin-bottom: 10px; }
        .event-description { margin-bottom: 10px; }
        .event-significance { font-style: italic; color: #555; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; }
        .unsubscribe { color: #999; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📚 Weekly Dose of History</h1>
          <p>Week of ${summary.weekOf}</p>
        </div>
        <div class="content">
          <h2>${summary.theme}</h2>
          <p>${summary.summary}</p>
          
          ${summary.events.map(event => `
            <div class="event">
              <div class="event-title">${event.title}</div>
              <div class="event-date">${event.date} (${event.year})</div>
              <div class="event-description">${event.description}</div>
              <div class="event-significance"><strong>Significance:</strong> ${event.significance}</div>
            </div>
          `).join('')}
          
          <div class="footer">
            <p>Thanks for reading! 📖</p>
            <p class="unsubscribe">
              <a href="[UNSUBSCRIBE_URL]">Unsubscribe</a> | 
              <a href="[WEBSITE_URL]">View on Website</a>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateEmailText(summary) {
  return `
Weekly Dose of History - ${summary.weekOf}

${summary.theme}

${summary.summary}

${summary.events.map(event => `
${event.title}
${event.date} (${event.year})

${event.description}

Significance: ${event.significance}

`).join('')}

Thanks for reading!

View on website: [WEBSITE_URL]
Unsubscribe: [UNSUBSCRIBE_URL]
  `;
}
