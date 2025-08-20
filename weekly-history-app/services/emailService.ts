import { EmailSubscriber, EmailTemplate, WeeklySummary } from '../types';

// Simulated email service - in production, you'd use a real email service like SendGrid, Mailgun, etc.
export class EmailService {
  private subscribers: EmailSubscriber[] = [];

  async subscribe(email: string, preferences: { categories: string[], frequency: 'weekly' | 'monthly' }): Promise<boolean> {
    try {
      // Check if already subscribed
      const existingSubscriber = this.subscribers.find(sub => sub.email === email);
      if (existingSubscriber) {
        existingSubscriber.isActive = true;
        existingSubscriber.preferences = preferences;
        return true;
      }

      // Add new subscriber
      const newSubscriber: EmailSubscriber = {
        id: Date.now().toString(),
        email,
        subscribedAt: new Date().toISOString(),
        isActive: true,
        preferences
      };

      this.subscribers.push(newSubscriber);
      
      // In production, you'd save to a database
      console.log(`New subscriber added: ${email}`);
      
      return true;
    } catch (error) {
      console.error('Error subscribing:', error);
      return false;
    }
  }

  async unsubscribe(email: string): Promise<boolean> {
    try {
      const subscriber = this.subscribers.find(sub => sub.email === email);
      if (subscriber) {
        subscriber.isActive = false;
        console.log(`Subscriber unsubscribed: ${email}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error unsubscribing:', error);
      return false;
    }
  }

  async getActiveSubscribers(): Promise<EmailSubscriber[]> {
    return this.subscribers.filter(sub => sub.isActive);
  }

  async sendWeeklySummary(summary: WeeklySummary): Promise<boolean> {
    try {
      const activeSubscribers = await this.getActiveSubscribers();
      const emailTemplate = this.createEmailTemplate(summary);

      for (const subscriber of activeSubscribers) {
        await this.sendEmail(subscriber.email, emailTemplate);
      }

      console.log(`Weekly summary sent to ${activeSubscribers.length} subscribers`);
      return true;
    } catch (error) {
      console.error('Error sending weekly summary:', error);
      return false;
    }
  }

  private createEmailTemplate(summary: WeeklySummary): EmailTemplate {
    const subject = `Weekly Dose of History - ${summary.weekOf}`;
    
    const htmlContent = `
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

    const textContent = `
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

    return { subject, htmlContent, textContent };
  }

  private async sendEmail(to: string, template: EmailTemplate): Promise<void> {
    // In production, you'd integrate with a real email service
    // For now, we'll just log the email details
    console.log(`Email would be sent to: ${to}`);
    console.log(`Subject: ${template.subject}`);
    console.log('--- Email Content ---');
    console.log(template.textContent);
    console.log('--- End Email ---');
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

export const emailService = new EmailService();
