import type { APIRoute } from 'astro'
import { SMTPClient } from 'emailjs'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {  
  const data = await request.formData()
  const name = data.get('name')
  const emailAddress = data.get('email')
  const subject = data.get('subject')
  const message = data.get('message')

  const client = new SMTPClient({
    host: 'smtp.gmail.com',
    port: 465,
    user: import.meta.env.GOOGLE_ACCOUNT,
    password: import.meta.env.GOOGLE_PASSWORD,
    ssl: true
  })

  const response = await client.sendAsync({
    text: `<h1>Mensaje de: ${name}</h1>
      <h3>Emisor: ${emailAddress}</h3>
      <p>${message}</p>`,
    to: 'david.vergara.dev@gmail.com',
    from: 'david.vergara.dev@gmail.com',
    subject: JSON.stringify(subject),
    attachment: [
      {
        data: `
      <html>
        <h1>Mensaje de: ${name}</h1>
        <h3>Emisor: ${emailAddress}</h3>
        <p>${message}</p>
      </html>`,
        alternative: true
      }
    ]
  })

  if (response.checkValidity().isValid) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200
    })
  } else {
    return new Response(JSON.stringify({ success: false }))
  }
}
