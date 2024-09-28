"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function DiscordBioGenerator() {
  const [userInput, setUserInput] = useState("")
  const [generatedBio, setGeneratedBio] = useState("")
  const [email, setEmail] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to subscribe')
      }

      const data = await response.json()

      if (data.alreadySubscribed) {
        toast({
          title: "Already subscribed!",
          description: "You're already subscribed. You can generate your Discord bio.",
        })
      } else {
        toast({
          title: "Subscribed successfully!",
          description: "You can now generate your Discord bio.",
        })
      }
      setIsSubscribed(true)
    } catch (error: any) {
      toast({
        title: "Error subscribing",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubscribing(false)
    }
  }

  const handleGenerate = async () => {
    if (!isSubscribed) {
      toast({
        title: "Subscription required",
        description: "Please subscribe to our newsletter to generate a bio.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userInput }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate bio')
      }

      const data = await response.json()
      setGeneratedBio(data.bio)
      toast({
        title: "Bio generated successfully!",
        description: "Check out your new Discord bio below.",
      })
    } catch (error) {
      toast({
        title: "Error generating bio",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Discord Bio Generator</CardTitle>
          <CardDescription>Generate a unique Discord bio with AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Enter your email to generate your bio</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubscribing}>
                {isSubscribing ? "Checking..." : "Continue"}
              </Button>
            </form>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="user-input">What do you want in your bio?</Label>
                <Textarea
                  id="user-input"
                  placeholder="E.g., Passionate gamer, love RPGs and FPS"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </div>
              <Button onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Bio"}
              </Button>
              {generatedBio && (
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <h3 className="font-semibold mb-2">Your Generated Bio:</h3>
                  <p>{generatedBio}</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}