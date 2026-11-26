import nodemailer from 'nodemailer'

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

  async function getTransporter() {
    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

      if (host && user && pass) {
        return {
          isTest: false,
          transporter: nodemailer.createTransport({
            host,
            port,
            secure: process.env.SMTP_SECURE === 'true' || port === 465,
            auth: { user, pass },
          }),
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        const testAccount = await nodemailer.createTestAccount()
        return {
          isTest: true,
          testUser: testAccount.user,
          transporter: nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
              user: testAccount.user,
              pass: testAccount.pass,
            },
          }),
        }
      }

      return null
    }

    export function buildApplicationEmailHtml({
      name,
      email,
      phone,
      position,
      experience,
      coverLetter,
      resumeFileName,
      resumeUrl,
      submittedAt,
    }) {
      const formattedCover = escapeHtml(coverLetter || 'No cover letter provided.').replace(
        /\r?\n/g,
        '<br />'
      )

      return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Career Application — MaxBuild Infrastructure</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6fb;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:6px;overflow:hidden;">
            <tr>
              <td style="background-color:#1A1B5D;padding:28px 32px;border-bottom:3px solid #00AEEF;">
                <p style="margin:0;font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:#00AEEF;font-weight:700;">
                  MaxBuild Infrastructure Pvt Ltd
                </p>
                <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;color:#ffffff;font-weight:600;">
                  New Job Application Received
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 32px;">
                <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#475569;">
                  A candidate has submitted an application via the MaxBuild Careers portal. Below are the full details:
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:4px;">
                  <tr>
                    <td style="padding:12px 16px;background-color:#f8fafc;border-bottom:1px solid #e2e8f0;width:36%;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#475569;">
                      Position Applied For
                    </td>
                    <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;font-weight:700;color:#1A1B5D;">
                      ${escapeHtml(position)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;background-color:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#475569;">
                      Candidate Name
                    </td>
                    <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;">
                      ${escapeHtml(name)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;background-color:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#475569;">
                      Email Address
                    </td>
                    <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;">
                      <a href="mailto:${escapeHtml(email)}" style="color:#0088CE;text-decoration:none;">${escapeHtml(email)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;background-color:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#475569;">
                      Phone Number
                    </td>
                    <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;">
                      <a href="tel:${escapeHtml(phone)}" style="color:#0088CE;text-decoration:none;">${escapeHtml(phone)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;background-color:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#475569;">
                      Experience
                    </td>
                    <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;">
                      ${escapeHtml(experience)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;background-color:#f8fafc;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#475569;">
                      Resume
                    </td>
                    <td style="padding:12px 16px;font-size:14px;color:#0f172a;">
                      ${resumeUrl
          ? `<a href="${escapeHtml(resumeUrl)}" style="display:inline-block;padding:6px 12px;background-color:#0088CE;color:#ffffff;text-decoration:none;border-radius:3px;font-size:12px;font-weight:600;">Download Resume (${escapeHtml(resumeFileName)})</a>`
          : `${escapeHtml(resumeFileName || 'Attached')} (see email attachment)`
        }
                    </td>
                  </tr>
                </table>

                <div style="margin-top:24px;">
                  <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#475569;">
                    Cover Letter
                  </p>
                  <div style="padding:16px;background-color:#f8fafc;border:1px solid #e2e8f0;border-left:3px solid #00AEEF;border-radius:4px;font-size:14px;line-height:1.65;color:#1e293b;">
                    ${formattedCover}
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 32px;background-color:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;">
                Submitted on ${escapeHtml(submittedAt)} · MaxBuild Infrastructure Careers Portal
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
    }

    export async function sendCareerApplicationEmail(payload) {
        const transportConfig = await getTransporter()
        if (!transportConfig) {
          const err = new Error(
            'Email service is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in environment variables.'
          )
          err.status = 503
          throw err
        }

        const { transporter, isTest, testUser } = transportConfig
        const to = process.env.CAREERS_EMAIL_TO || 'info@maxbuildinfra.com'
        const from =
        process.env.SMTP_FROM ||
          `"MaxBuild Careers" <${process.env.SMTP_USER || testUser}>`

        const submittedAt = new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'medium',
          timeStyle: 'short',
        })

        const html = buildApplicationEmailHtml({ ...payload, submittedAt })

        const attachments = payload.resumeBuffer
          ? [
        {
          filename: payload.resumeFileName || 'resume.pdf',
            content: payload.resumeBuffer,
              contentType: payload.resumeMimeType,
        },
      ]
    : []

          const info = await transporter.sendMail({
            from,
            to,
            replyTo: payload.email,
            subject: `New Job Application: ${payload.position} — ${payload.name}`,
            html,
            attachments,
          })

  const previewUrl = isTest ? nodemailer.getTestMessageUrl(info) : null
  if(previewUrl) {
            console.info('Careers email test preview URL:', previewUrl)
          }

  return { previewUrl }
        }
