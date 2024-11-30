import Link from 'next/link'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Search, Home, Key, Wrench, DollarSign } from 'lucide-react'

export default async function HomePage() {
  return (
    <main className="flex-grow">
      <section className="bg-gradient-to-r from-background to-primary-foreground text-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Property</h1>
          <p className="text-xl mb-8">Discover a wide range of properties for sale and rent</p>
          <div className="max-w-2xl mx-auto flex">
            <Input type="text" placeholder="Search properties..." className="flex-grow" />
            <Button className="ml-2">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Beautiful Property {i}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={`/placeholder.svg?height=200&width=300`} alt={`Property ${i}`} className="w-full h-48 object-cover mb-4 rounded" />
                  <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/properties/${i}`} passHref>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Home, title: "Property Management" },
              { icon: Key, title: "Rentals" },
              { icon: Wrench, title: "Maintenance" },
              { icon: DollarSign, title: "Rent Collection" },
            ].map((service, i) => (
              <Card key={i} className="text-center">
                <CardHeader>
                  <service.icon className="mx-auto h-12 w-12 text-primary" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
//"use server"
//import { auth } from "~/auth"
//import Breadcrumb_Home from "~/components/home/breadcrumb/BreadcrumbHome"

//export default async function HomePage() {
  //const session = await auth()
  //if (!session?.user) return <></>
    //return (
      //<div className="w-2/3 flex flex-col p-6">
        //<div className="flex flex-row">
          //<div className="">
            //<Breadcrumb_Home />
          //</div>
        //</div>
      //</div>
    //);
//}
