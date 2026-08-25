import { Resend } from "resend"
const resend = new Resend(process.env.RESEND_API_KEY!)

export const sendEmailAsync = async (
  toEmail: string,
  subject: string,
  text: string,
) => {
  resend.emails.send({
    from: "Randomio <randomio@rinini.dev>",
    to: [toEmail],
    subject: subject,
    html: text,
  })
}
