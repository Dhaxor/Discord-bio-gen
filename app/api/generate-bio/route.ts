import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
	console.error('OpenAI API key is not set')
    return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 })
  }

  const { input } = await req.json()
  console.log('Received input:', input)

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates creative Discord bios." },
        { role: "user", content: `Generate a creative Discord bio based on the following input: ${input}` }
      ],
      max_tokens: 60,
      temperature: 0.7,
    })

    const bio = completion.choices[0].message.content?.trim() || "Failed to generate bio"
	console.log('Generated bio:', bio)
    return NextResponse.json({ bio })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "An error occurred during bio generation" }, { status: 500 })
  }
}