import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BarChart, PieChart, FileIcon as FilePdf, FileSpreadsheet } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ClientAdminReports() {
  const reports = [
    {
      id: 1,
      name: "April Usage Report",
      description: "Complete charging usage data for April 2023",
      format: "CSV",
      size: "2.4 MB",
      date: "May 1, 2023",
      icon: FileText,
      preview: "/chart-preview.png",
    },
    {
      id: 2,
      name: "Q1 Sustainability Report",
      description: "Environmental impact and carbon offset metrics",
      format: "PDF",
      size: "4.8 MB",
      date: "April 15, 2023",
      icon: PieChart,
      preview: "/sustainability-chart.png",
    },
    {
      id: 3,
      name: "March Financial Summary",
      description: "Revenue, costs, and profit breakdown",
      format: "XLSX",
      size: "1.7 MB",
      date: "April 5, 2023",
      icon: BarChart,
      preview: "/financial-chart.png",
    },
    {
      id: 4,
      name: "Q1 Station Performance",
      description: "Detailed performance metrics for all stations",
      format: "CSV",
      size: "3.2 MB",
      date: "April 10, 2023",
      icon: FileText,
      preview: "/performance-metrics.png",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Reports</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {reports.slice(0, 3).map((report) => (
          <Card key={report.id} className="card-hover rounded-xl shadow-md overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 bg-blue-50/50">
              <div>
                <CardTitle>{report.name}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </div>
              <report.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4 border-b bg-gray-50">
                <img
                  src={report.preview || "/placeholder.svg"}
                  alt={`Preview of ${report.name}`}
                  className="w-full h-24 object-cover rounded-md"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-gray-100">
                      {report.format}
                    </Badge>
                    <span className="text-muted-foreground">
                      {report.size} • {report.date}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <FilePdf className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <FileSpreadsheet className="mr-2 h-4 w-4" />
                      CSV
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="card-hover rounded-xl shadow-md">
        <CardHeader>
          <CardTitle>Custom Report</CardTitle>
          <CardDescription>Generate a custom report by selecting parameters and date range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end">
            <Button className="rounded-xl">Generate Custom Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
