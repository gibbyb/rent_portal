import Link from 'next/link'
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Home, Bed, Bath, Square, MapPin, Calendar, DollarSign } from 'lucide-react'

// This would typically come from your database
const property = {
  id: 1,
  title: "Luxurious Family Home",
  type: "House",
  bedrooms: 4,
  bathrooms: 3,
  area: 2500,
  price: 750000,
  address: "123 Main St, Anytown, USA",
  description: "This beautiful family home features spacious living areas, a modern kitchen, and a large backyard perfect for entertaining. Located in a quiet neighborhood with easy access to schools and shopping.",
  amenities: ["Central Air", "Garage", "Fireplace", "Hardwood Floors", "Swimming Pool"],
  yearBuilt: 2015,
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/properties" className="text-primary hover:underline mb-4 inline-block">
        &larr; Back to Properties
      </Link>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src="/placeholder.svg?height=400&width=600" alt={property.title} className="w-full h-[400px] object-cover rounded-lg" />
          <div className="mt-4 grid grid-cols-2 gap-4">
            <img src="/placeholder.svg?height=150&width=250" alt="Additional view 1" className="w-full h-[150px] object-cover rounded" />
            <img src="/placeholder.svg?height=150&width=250" alt="Additional view 2" className="w-full h-[150px] object-cover rounded" />
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4 text-primary">{property.title}</h1>
          <p className="text-xl font-semibold mb-4 text-primary">${property.price.toLocaleString()}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-muted-foreground">
              <Home className="mr-2" /> {property.type}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Bed className="mr-2" /> {property.bedrooms} Bedrooms
            </div>
            <div className="flex items-center text-muted-foreground">
              <Bath className="mr-2" /> {property.bathrooms} Bathrooms
            </div>
            <div className="flex items-center text-muted-foreground">
              <Square className="mr-2" /> {property.area} sqft
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-2" /> {property.address}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-2" /> Built in {property.yearBuilt}
            </div>
          </div>
          
          <p className="mb-6 text-muted-foreground">{property.description}</p>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-2">
                {property.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <DollarSign className="mr-2 h-4 w-4" /> {amenity}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Button className="w-full">Schedule a Viewing</Button>
        </div>
      </div>
    </div>
  )
}


