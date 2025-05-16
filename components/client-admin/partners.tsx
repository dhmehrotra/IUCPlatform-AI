import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function ClientAdminPartners() {
  const partners = [
    {
      id: 1,
      name: "CBRE",
      description: "Global installation and project management",
      logo: "/CBRE_logo.png",
      category: "Installation",
      website: "https://www.cbre.com",
    },
    {
      id: 2,
      name: "Dynamic",
      description: "EV electrical installations",
      logo: "/dynamic-logo.png",
      category: "Electrical",
      website: "https://www.dynamicelectric.com",
    },
    {
      id: 3,
      name: "Contract Signs",
      description: "On-site signage",
      logo: "/placeholder.svg?key=fziug",
      category: "Signage",
      website: "https://www.contractsigns.com",
    },
    {
      id: 4,
      name: "Stratus Unlimited",
      description: "Stall wraps and branding",
      logo: "/stratus-unlimited-logo.png",
      category: "Branding",
      website: "https://www.stratusunlimited.com",
    },
    {
      id: 5,
      name: "Travelstead",
      description: "Warehousing and logistics",
      logo: "/travelstead-logo.png",
      category: "Logistics",
      website: "https://www.travelstead.com",
    },
    {
      id: 6,
      name: "Putti",
      description: "Web and mobile software partner",
      logo: "/putti-logo.png",
      category: "Software",
      website: "https://www.putti.co.nz",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Partners</h1>
      <p className="text-muted-foreground">
        Our trusted partners help ensure seamless deployment and operation of your charging infrastructure.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <Card key={partner.id} className="card-hover overflow-hidden rounded-xl shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="bg-blue-50 text-primary border-primary/30">
                  {partner.category}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
                  <a href={partner.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Visit {partner.name} website</span>
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 flex items-center justify-center mb-4">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <CardTitle className="mb-2">{partner.name}</CardTitle>
                <CardDescription>{partner.description}</CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="card-hover overflow-hidden rounded-xl shadow-md mt-8">
        <CardHeader>
          <CardTitle>Partner Coverage</CardTitle>
          <CardDescription>Our partners provide nationwide coverage for all your EV charging needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-09%203.45.27%20AM-xp15exZ29MSTvh7mpBlcylxYsif3Ck.png"
              alt="Partner coverage map showing locations across the United States and Canada"
              className="w-full h-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
