import type { Metadata } from 'next'
import ContactForm from '~/components/contact/contact-form'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | PropertyPro',
  description: 'Get in touch with PropertyPro for any inquiries about our properties or services.',
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ContactForm />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Office</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-primary" />
                123 Property Street, Cityville, State 12345
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-primary" />
                (123) 456-7890
              </p>
              <p className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-primary" />
                info@propertypro.com
              </p>
              <p className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-primary" />
                Mon-Fri: 9am-5pm, Sat: 10am-3pm, Sun: Closed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">How do I schedule a property viewing?</h3>
                <p className="text-sm text-muted-foreground">You can schedule a viewing by contacting our office or using the form on this page.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">What documents do I need to apply for a rental?</h3>
                <p className="text-sm text-muted-foreground">Typically, you'll need proof of income, identification, and references. Specific requirements may vary.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">How do I report maintenance issues?</h3>
                <p className="text-sm text-muted-foreground">Tenants can report maintenance issues through their online account or by contacting our office directly.</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.74844797932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1616562308246!5m2!1sen!2sus" 
              width="600" 
              height="450" 
              style={{border:0}} 
              allowFullScreen={true} 
              loading="lazy"
              className="w-full h-full rounded-lg"
              title="PropertyPro Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

