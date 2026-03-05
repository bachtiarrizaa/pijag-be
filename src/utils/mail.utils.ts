import nodemailer from 'nodemailer'
import crypto from 'crypto'

export class MailerUtils {
  private static transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  static generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString()
  }

  static async sendOtpEmail(to: string, name: string, otp: string) {
    await this.transporter.sendMail({
      from: `"Pijag Coffee" <${process.env.MAIL_USER}>`,
      to,
      subject: 'Reset Password OTP - Pijag Coffee',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #4a2c2a;">Reset Password</h2>
          <p>Halo <strong>${name}</strong>,</p>
          <p>Gunakan kode OTP berikut untuk reset password kamu:</p>
          <div style="
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #4a2c2a;
            background: #f5f0ee;
            padding: 16px 24px;
            border-radius: 8px;
            text-align: center;
            margin: 24px 0;
          ">
            ${otp}
          </div>
          <p>Kode ini akan kadaluarsa dalam <strong>5 menit</strong>.</p>
          <p>Jika kamu tidak meminta reset password, abaikan email ini.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #888; font-size: 12px;">© ${new Date().getFullYear()} Pijag Coffee</p>
        </div>
      `,
    })
  }
}
