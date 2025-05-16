"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Settings, BarChart3, Zap, Leaf } from "lucide-react"

export default function Home() {
  const personaSectionRef = useRef<HTMLDivElement>(null)

  const scrollToPersonaSection = () => {
    personaSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-md px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
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
          <Button onClick={scrollToPersonaSection} className="rounded-xl">
            Get Started
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              The Future of EV Charging Starts Here
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Powerful tools for property owners, operators, and drivers — all in one seamless platform. Deploy. Manage.
              Monetize.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button
                className="bg-[#1E5EFF] text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition h-auto"
                asChild
              >
                <Link href="/dashboard?persona=client-admin">
                  <span className="flex items-center">
                    <span className="mr-2">🔐</span>
                    Enter as Client Admin
                  </span>
                </Link>
              </Button>

              <Button
                className="bg-[#1E5EFF] text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition h-auto"
                asChild
              >
                <Link href="/dashboard?persona=iuc-ops">
                  <span className="flex items-center">
                    <span className="mr-2">🛠</span>
                    Enter as IUC Ops
                  </span>
                </Link>
              </Button>

              <Button
                className="bg-[#1E5EFF] text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition h-auto"
                asChild
              >
                <Link href="/dashboard?persona=driver">
                  <span className="flex items-center">
                    <span className="mr-2">🚗</span>
                    Enter as Driver
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why IUC Platform?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-10">
              {/* Card 1 */}
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Settings className="w-6 h-6 text-[#1E5EFF]" />
                  </div>
                  <CardTitle>Full Operational Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Monitor stations, issue remote actions, and optimize uptime.</p>
                </CardContent>
              </Card>

              {/* Card 2 */}
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-[#1E5EFF]" />
                  </div>
                  <CardTitle>Insights That Drive Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Track sessions, energy delivery, pricing performance.</p>
                </CardContent>
              </Card>

              {/* Card 3 */}
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-[#1E5EFF]" />
                  </div>
                  <CardTitle>Simple Driver Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Seamless charging with clear pricing and live updates.</p>
                </CardContent>
              </Card>

              {/* Card 4 */}
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Leaf className="w-6 h-6 text-[#00C48C]" />
                  </div>
                  <CardTitle>Sustainable, Scalable, Smart</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Scale your network while reducing carbon impact.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              {/* Step 1 */}
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#1E5EFF] text-white flex items-center justify-center mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Install & Connect</h3>
                <p className="text-gray-600">Set up hardware using trusted partners</p>
              </div>

              {/* Step 2 */}
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#1E5EFF] text-white flex items-center justify-center mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Configure & Monitor</h3>
                <p className="text-gray-600">Manage pricing and uptime via dashboard</p>
              </div>

              {/* Step 3 */}
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#1E5EFF] text-white flex items-center justify-center mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Plug & Go</h3>
                <p className="text-gray-600">Drivers charge easily with real-time updates</p>
              </div>
            </div>
          </div>
        </section>

        {/* Persona Entry Section */}
        <section ref={personaSectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">Choose How You'd Like to Enter</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              No login needed — just pick your role to enter the platform
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Client Admin Card */}
              <Card className="border p-6 rounded-xl shadow-md hover:shadow-lg transition text-left cursor-pointer overflow-hidden h-full">
                <div className="h-3 bg-[#1E5EFF] w-full absolute top-0 left-0 right-0"></div>
                <CardHeader className="pt-8">
                  <div className="mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-3xl">🏢</span>
                    </div>
                  </div>
                  <CardTitle className="text-center text-2xl">Client Admin</CardTitle>
                  <CardDescription className="text-center">View usage, set pricing, export reports</CardDescription>
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
              <Card className="border p-6 rounded-xl shadow-md hover:shadow-lg transition text-left cursor-pointer overflow-hidden h-full">
                <div className="h-3 bg-amber-500 w-full absolute top-0 left-0 right-0"></div>
                <CardHeader className="pt-8">
                  <div className="mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-3xl">🛠️</span>
                    </div>
                  </div>
                  <CardTitle className="text-center text-2xl">IUC Ops</CardTitle>
                  <CardDescription className="text-center">
                    Monitor network, handle incidents, push firmware
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
              <Card className="border p-6 rounded-xl shadow-md hover:shadow-lg transition text-left cursor-pointer overflow-hidden h-full">
                <div className="h-3 bg-[#00C48C] w-full absolute top-0 left-0 right-0"></div>
                <CardHeader className="pt-8">
                  <div className="mb-4 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-3xl">🚗</span>
                    </div>
                  </div>
                  <CardTitle className="text-center text-2xl">Driver View</CardTitle>
                  <CardDescription className="text-center">Start charging, see pricing, view sessions</CardDescription>
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
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p>© 2025 IUC Platform. All rights reserved. Built with ⚡ by Invisible Urban Charging.</p>
        </div>
      </footer>
    </div>
  )
}
