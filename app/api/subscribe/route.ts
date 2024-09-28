import { NextResponse } from 'next/server'
import { createTransport } from 'nodemailer'
import { supabase } from '@/lib/supabase'

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  try {
    // Check if email already exists
    const { data: existingSubscriber, error: fetchError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', email)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError
    }

    if (existingSubscriber) {
      return NextResponse.json({ message: "Email already subscribed", alreadySubscribed: true })
    }

    // Store the email in Supabase
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert({ email, subscribed_at: new Date().toISOString() })

    if (insertError) {
      throw insertError
    }

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Welcome to Discord Bio Generator Newsletter",
      text: "Thank you for subscribing to our newsletter! You can now generate your Discord bio.",
      html: "<p>Thank you for subscribing to our newsletter! You can now generate your Discord bio.</p>",
    })

    return NextResponse.json({ message: "Subscribed successfully", alreadySubscribed: false })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "An error occurred during subscription" }, { status: 500 })
  }
}