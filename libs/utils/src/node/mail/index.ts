import nodemailer from 'nodemailer'

const authMap = {
  163: {
    user: '15835196981@163.com',
    pass: 'KPTVCFBMRXJVTCGW', // 'FTi8B3ChdUuGaWit
  },
  gmail: {
    user: 'wangzhenzhen2023@gmail.com',
    pass: 'lkxtorbpdyrjjxjq',
  },
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: authMap.gmail,
})

export const sendMail = (config: { to: string, subject: string, text?: string, html?: string }) => {
  return transporter.sendMail({
    from: authMap.gmail.user, // 发件人邮箱
    ...config,
  })
}
