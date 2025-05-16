"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Settings, BarChart3, Zap, Leaf } from "lucide-react"
import { useRef } from "react"

export function HomePage() {
  const personaSectionRef = useRef<HTMLDivElement>(null)

  const scrollToPersonaSection = () => {
    personaSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Image
              src="/images/iuc-logo-blue.png"
              alt="IUC Platform Logo"
              width={180}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </div>
          <Button onClick={scrollToPersonaSection} className="rounded-full px-6">
            Get Started
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              The Future of EV Charging Starts Here
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Powerful tools for property owners, operators, and drivers — all in one seamless platform. Deploy. Manage.
              Monetize.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-xl text-lg h-14 px-8 shadow-md hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/dashboard?persona=client-admin">🔐 Enter as Client Admin</Link>
              </Button>
              <Button
                size="lg"
                className="rounded-xl text-lg h-14 px-8 shadow-md hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/dashboard?persona=iuc-ops">🛠 Enter as IUC Ops</Link>
              </Button>
              <Button
                size="lg"
                className="rounded-xl text-lg h-14 px-8 shadow-md hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/dashboard?persona=driver">🚗 Enter as Driver</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose IUC Platform</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Settings className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Full Operational Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Monitor live stations, issue remote commands, and maintain uptime across your network.
                  </p>
                </CardContent>
              </Card>

              {/* Card 2 */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Insights That Drive Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    View detailed energy usage, session analytics, and performance trends.
                  </p>
                </CardContent>
              </Card>

              {/* Card 3 */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Simple Driver Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Easy start/stop flows, transparent pricing, and usage summaries for every EV driver.
                  </p>
                </CardContent>
              </Card>

              {/* Card 4 */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Leaf className="w-6 h-6 text-success" />
                  </div>
                  <CardTitle>Sustainable, Scalable, Smart</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Designed to grow with your infrastructure and reduce carbon footprint.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Persona Entry Section */}
        <section ref={personaSectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Choose How You'd Like to Enter</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Client Admin Card */}
              <Card className="card-hover overflow-hidden h-full">
                <div className="h-3 bg-primary w-full"></div>
                <CardHeader className="pt-8">
                  <div className="mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-3xl">🏢</span>
                    </div>
                  </div>
                  <CardTitle className="text-center text-2xl">Client Admin Portal</CardTitle>
                  <CardDescription className="text-center">
                    View usage, manage pricing, download reports
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-8">
                  <Button variant="outline" className="rounded-full group" asChild>
                    <Link href="/dashboard?persona=client-admin">
                      Enter Portal
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* IUC Ops Card */}
              <Card className="card-hover overflow-hidden h-full">
                <div className="h-3 bg-warning w-full"></div>
                <CardHeader className="pt-8">
                  <div className="mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-3xl">🛠</span>
                    </div>
                  </div>
                  <CardTitle className="text-center text-2xl">IUC Ops Portal</CardTitle>
                  <CardDescription className="text-center">
                    Monitor health, push firmware, handle incidents
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-8">
                  <Button variant="outline" className="rounded-full group" asChild>
                    <Link href="/dashboard?persona=iuc-ops">
                      Enter Portal
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Driver Card */}
              <Card className="card-hover overflow-hidden h-full">
                <div className="h-3 bg-success w-full"></div>
                <CardHeader className="pt-8">
                  <div className="mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-3xl">🚗</span>
                    </div>
                  </div>
                  <CardTitle className="text-center text-2xl">Driver View</CardTitle>
                  <CardDescription className="text-center">Start charging, view rates, track sessions</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-8">
                  <Button variant="outline" className="rounded-full group" asChild>
                    <Link href="/dashboard?persona=driver">
                      Enter Portal
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">© 2025 IUC Platform. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-1">Built with ♥ in the US</p>
        </div>
      </footer>
    </div>
  )
}
