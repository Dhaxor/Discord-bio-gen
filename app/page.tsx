import DiscordBioGenerator from '@/components/discord-bio-generator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Discord Bio Template Generator</h1>
        <p className="text-center mb-8 max-w-2xl mx-auto">
          Create unique and engaging Discord bio templates with our AI-powered generator. 
          Perfect for gamers, streamers, and Discord enthusiasts looking to stand out.
        </p>
        <DiscordBioGenerator />
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Why Use Our Discord Bio Templates?</h2>
          <ul className="list-disc text-left max-w-md mx-auto">
            <li>Instantly generate unique bio templates for Discord</li>
            <li>Customize your Discord profile with engaging bios</li>
            <li>Stand out in Discord servers with creative descriptions</li>
            <li>Save time brainstorming the perfect Discord bio</li>
          </ul>
        </section>
      </div>
    </main>
  )
}