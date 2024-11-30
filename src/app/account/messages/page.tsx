'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Avatar, AvatarFallback } from "~/components/ui/avatar"

// Mock data for messages
const initialMessages = [
  { id: 1, sender: 'Property Manager', content: 'Your maintenance request has been received and scheduled for next Tuesday.', timestamp: '2023-06-20T10:30:00Z' },
  { id: 2, sender: 'Tenant', content: 'Thank you for the quick response. I&apos;ll make sure to be available on Tuesday.', timestamp: '2023-06-20T11:15:00Z' },
  { id: 3, sender: 'Property Manager', content: 'Great! The maintenance team will arrive between 9 AM and 12 PM. Please ensure they have access to the affected area.', timestamp: '2023-06-20T14:00:00Z' },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'Tenant',
        content: newMessage,
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'Tenant' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex ${message.sender === 'Tenant' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-3 ${message.sender === 'Tenant' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="text-sm font-medium">{message.sender}</p>
                    <p className="mt-1">{message.content}</p>
                    <p className="mt-1 text-xs opacity-70">{new Date(message.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="mt-4 flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
