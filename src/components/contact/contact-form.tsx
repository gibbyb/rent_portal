'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus('submitting')

    // Here you would typically send the form data to your server
    // For this example, we'll just simulate a submission
    setTimeout(() => {
      setFormStatus('success')
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send us a message</CardTitle>
        <CardDescription>We&apos;ll get back to you as soon as possible.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your name" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="Your email" type="email" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" placeholder="Your phone number" type="tel" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Select name="subject" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="viewing">Property Viewing</SelectItem>
                  <SelectItem value="application">Rental Application</SelectItem>
                  <SelectItem value="maintenance">Maintenance Request</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Your message" required />
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4 px-0">
            <Button type="submit" disabled={formStatus === 'submitting'}>
              {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
            </Button>
            {formStatus === 'success' && (
              <p className="text-sm text-green-600">Message sent successfully!</p>
            )}
            {formStatus === 'error' && (
              <p className="text-sm text-red-600">There was an error sending your message. Please try again.</p>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

