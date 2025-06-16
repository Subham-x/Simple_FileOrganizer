const { sendFeedbackEmail } = require('./feedbackHandler');

sendFeedbackEmail({
    email: "test@example.com",
    replyBack: "true",
    topic: "Testing feedback",
    feedbackType: "feature_like",
    description: "This is just a test.",
    timestamp: new Date().toISOString()
}).then(() => {
    console.log("✅ Email sent!");
}).catch(err => {
    console.error("❌ Failed to send email:", err);
});
