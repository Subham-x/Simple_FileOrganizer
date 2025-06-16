// feedbackHandler.js
const nodemailer = require("nodemailer");

function getFeedbackTypeLabel(type) {
    const map = {
        feedback: '💭 General Feedback',
        feature_request: '🚀 Feature Request',
        feature_like: '❤️ I Like a Feature'
    };
    return map[type] || type;
}

async function sendFeedbackEmail(data) {
    const transporter = nodemailer.createTransport({
        service: "hotmail", // or "hotmail"
        auth: {
            user: "YOUR_MAIL@MAIL.COM",  // your email
            pass: "PASSWORD" // replace with secure credentials
        }
    });

    const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 30px; border-radius: 12px; color: white; text-align: center; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 24px;">💬 New Feedback Received</h1>
      </div>

      <div style="background: #f8f9ff; padding: 30px; border-radius: 12px; border: 1px solid #e1e5f7;">
        <div style="margin-bottom: 20px;">
          <strong style="color: #667eea;">📧 Email:</strong>
          <span style="margin-left: 10px;">${data.email}</span>
        </div>

        <div style="margin-bottom: 20px;">
          <strong style="color: #667eea;">↩️ Reply Requested:</strong>
          <span style="margin-left: 10px;">${data.replyBack === 'true' ? '✅ Yes' : '❌ No'}</span>
        </div>

        <div style="margin-bottom: 20px;">
          <strong style="color: #667eea;">📝 Topic:</strong>
          <span style="margin-left: 10px;">${data.topic}</span>
        </div>

        <div style="margin-bottom: 20px;">
          <strong style="color: #667eea;">🏷️ Type:</strong>
          <span style="margin-left: 10px; padding: 4px 12px; background: #667eea; color: white; border-radius: 20px; font-size: 12px;">
            ${getFeedbackTypeLabel(data.feedbackType)}
          </span>
        </div>

        <div style="margin-bottom: 20px;">
          <strong style="color: #667eea;">💬 Description:</strong>
          <div style="margin-top: 10px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #667eea;">
            ${data.description}
          </div>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e1e5f7; color: #666; font-size: 12px;">
          <strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString()}
        </div>
      </div>
    </div>`;

    await transporter.sendMail({
        from: '"Feedback Bot" <YOUR_MAIL>',
        to: "YOUR_MAIL",
        subject: "📩 New Feedback Received",
        html: htmlContent
    });
}

module.exports = { sendFeedbackEmail };
