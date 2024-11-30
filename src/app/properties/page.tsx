'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Slider } from "~/components/ui/slider"
import { Search, Home, Bed, Bath, Square } from 'lucide-react'

// Mock data for properties
const properties = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Property ${i + 1}`,
  type: i % 3 === 0 ? 'House' : i % 3 === 1 ? 'Apartment' : 'Condo',
  bedrooms: Math.floor(Math.random() * 5) + 1,
  bathrooms: Math.floor(Math.random() * 3) + 1,
  area: Math.floor(Math.random() * 1000) + 500,
  price: Math.floor(Math.random() * 500000) + 100000,
}))

export default function PropertiesPage() {
  const [sortBy, setSortBy] = useState('price')
  const [filterType, setFilterType] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAndSortedProperties = properties
    .filter(property => 
      (filterType === 'All' || property.type === filterType) &&
      property.price >= priceRange[0] && property.price <= priceRange[1] &&
      property.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'bedrooms') return b.bedrooms - a.bedrooms
      return 0
    })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">Available Properties</h1>
      
      <div className="mb-8 flex flex-wrap gap-4">
        <Input 
          placeholder="Search properties..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price</SelectItem>
            <SelectItem value="bedrooms">Bedrooms</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setFilterType} defaultValue={filterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="House">House</SelectItem>
            <SelectItem value="Apartment">Apartment</SelectItem>
            <SelectItem value="Condo">Condo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-primary">Price Range</h2>
        <Slider
          min={0}
          max={1000000}
          step={10000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="max-w-md"
        />
        <div className="mt-2 text-sm text-muted-foreground">
          ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAndSortedProperties.map((property) => (
          <Card key={property.id}>
            <CardHeader>
              <CardTitle>{property.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={`/placeholder.svg?height=200&width=300`} alt={property.title} className="w-full h-48 object-cover mb-4 rounded" />
              <div className="flex justify-between text-muted-foreground">
                <span><Home className="inline mr-1" /> {property.type}</span>
                <span><Bed className="inline mr-1" /> {property.bedrooms}</span>
                <span><Bath className="inline mr-1" /> {property.bathrooms}</span>
                <span><Square className="inline mr-1" /> {property.area} sqft</span>
              </div>
              <p className="mt-4 text-xl font-bold text-primary">${property.price.toLocaleString()}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/properties/${property.id}`} passHref>
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

