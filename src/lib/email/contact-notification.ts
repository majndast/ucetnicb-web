import type { ContactFormData } from "@/lib/validations/contact";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildContactEmailHtml(data: ContactFormData): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <div style="background:#1a365d;padding:24px 32px;">
      <h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:600;">Nová poptávka z webu</h1>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:13px;width:100px;">Jméno</td>
          <td style="padding:8px 0;color:#1e293b;font-size:14px;font-weight:500;">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:13px;">E-mail</td>
          <td style="padding:8px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#1a365d;font-size:14px;">${escapeHtml(data.email)}</a></td>
        </tr>
        ${data.phone ? `<tr>
          <td style="padding:8px 0;color:#64748b;font-size:13px;">Telefon</td>
          <td style="padding:8px 0;color:#1e293b;font-size:14px;">${escapeHtml(data.phone)}</td>
        </tr>` : ""}
      </table>
      <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e2e8f0;">
        <p style="margin:0 0 8px;color:#64748b;font-size:13px;">Zpráva</p>
        <p style="margin:0;color:#1e293b;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
      </div>
    </div>
    <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
      <p style="margin:0;color:#94a3b8;font-size:12px;">Odesláno z kontaktního formuláře na webu ucetnicb.cz</p>
    </div>
  </div>
</body>
</html>`;
}
