import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "lawfirmnkmadvocates@gmail.com";

function getClient() {
  if (!RESEND_API_KEY) {
    console.error("[email] RESEND_API_KEY is not set");
    return null;
  }
  return new Resend(RESEND_API_KEY);
}

export async function sendLeadNotification(data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source?: string;
}) {
  const resend = getClient();
  if (!resend) return;

  const source = data.source === "widget" ? "AI Assistant Widget" : "Contact Form";

  try {
    await resend.emails.send({
      from: "NKM Advocates <onboarding@resend.dev>",
      to: NOTIFICATION_EMAIL,
      subject: `New Enquiry from ${data.name} — ${data.service || "General"}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1a1a3e; padding: 20px; text-align: center;">
            <h1 style="color: #c9a84c; margin: 0; font-size: 22px;">NKM ADVOCATES</h1>
            <p style="color: #999; margin: 5px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">New Enquiry Received</p>
          </div>
          <div style="background: #f8f8f8; padding: 20px; border: 1px solid #e0e0e0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 120px;">Name</td>
                <td style="padding: 8px 0; color: #1a1a3e; font-weight: 600;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                <td style="padding: 8px 0; color: #1a1a3e;"><a href="mailto:${data.email}" style="color: #1a1a3e;">${data.email}</a></td>
              </tr>
              ${data.phone ? `
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
                <td style="padding: 8px 0; color: #1a1a3e;"><a href="tel:${data.phone}" style="color: #1a1a3e;">${data.phone}</a></td>
              </tr>` : ""}
              ${data.service ? `
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service</td>
                <td style="padding: 8px 0; color: #1a1a3e; font-weight: 600;">${data.service}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Source</td>
                <td style="padding: 8px 0; color: #1a1a3e;">${source}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Date</td>
                <td style="padding: 8px 0; color: #1a1a3e;">${new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}</td>
              </tr>
            </table>
            ${data.message ? `
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e0e0e0;">
              <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Message</div>
              <div style="color: #333; line-height: 1.6; white-space: pre-wrap;">${data.message}</div>
            </div>` : ""}
          </div>
          <div style="padding: 16px; text-align: center; color: #999; font-size: 11px;">
            This enquiry was submitted through the NKM Advocates website.
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("[email] Failed to send lead notification:", err);
  }
}

export async function sendFeedbackNotification(data: {
  rating: number;
  comment?: string;
  email?: string;
}) {
  const resend = getClient();
  if (!resend) return;

  try {
    await resend.emails.send({
      from: "NKM Advocates <onboarding@resend.dev>",
      to: NOTIFICATION_EMAIL,
      subject: `New Feedback — ${data.rating}/5 Stars`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1a1a3e; padding: 20px; text-align: center;">
            <h1 style="color: #c9a84c; margin: 0; font-size: 22px;">NKM ADVOCATES</h1>
            <p style="color: #999; margin: 5px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">New Feedback Received</p>
          </div>
          <div style="background: #f8f8f8; padding: 20px; border: 1px solid #e0e0e0; text-align: center;">
            <div style="font-size: 36px; color: #c9a84c; margin-bottom: 8px;">${"★".repeat(data.rating)}${"☆".repeat(5 - data.rating)}</div>
            <div style="color: #666; font-size: 14px;">${data.rating} out of 5 stars</div>
            ${data.comment ? `
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e0e0e0; text-align: left;">
              <div style="color: #333; line-height: 1.6;">${data.comment}</div>
            </div>` : ""}
            ${data.email ? `
            <div style="margin-top: 12px; color: #999; font-size: 12px;">
              From: <a href="mailto:${data.email}" style="color: #1a1a3e;">${data.email}</a>
            </div>` : ""}
          </div>
          <div style="padding: 16px; text-align: center; color: #999; font-size: 11px;">
            This feedback was submitted through the NKM Advocates website.
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("[email] Failed to send feedback notification:", err);
  }
}
