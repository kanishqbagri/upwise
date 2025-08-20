// Vercel serverless function for email subscriptions
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, preferences } = req.body;

    // Validate input
    if (!email || !preferences) {
      return res.status(400).json({ error: 'Email and preferences are required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // In production, you'd save to a database
    // For now, we'll just log the subscription
    console.log('New subscription:', { email, preferences });

    // You could integrate with services like:
    // - Mailchimp
    // - ConvertKit
    // - SendGrid
    // - Your own database

    res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed to Weekly Dose of History!' 
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Failed to process subscription' });
  }
}
