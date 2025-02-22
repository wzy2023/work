import nodemailer from 'nodemailer'

const fromEmail = '15835196981@163.com'
const fromPass = 'KPTVCFBMRXJVTCGW'

const transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: fromEmail,
    pass: fromPass,
  },
})

export const sendMail = async (toEmail: string, title: string, content?: string) => {
  try {
    await transporter.sendMail({
      from: fromEmail, // 发件人邮箱
      to: toEmail, // 收件人邮箱
      subject: title, // 邮件主题
      text: content, // 邮件正文
    })
    return title + ' 邮件通知成功'
  } catch (error) {
    return title + '邮件通知失败' + JSON.stringify(error)
  }
}
