import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ClientAdminUsers() {
  const users = [
    {
      name: "John Smith",
      email: "john.smith@example.com",
      accessLevel: "Admin",
      sessions: 12,
      lastActive: "Today, 10:23 AM",
    },
    {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      accessLevel: "Manager",
      sessions: 8,
      lastActive: "Yesterday, 4:45 PM",
    },
    {
      name: "Michael Brown",
      email: "m.brown@example.com",
      accessLevel: "User",
      sessions: 24,
      lastActive: "Today, 9:15 AM",
    },
    {
      name: "Emily Davis",
      email: "emily.d@example.com",
      accessLevel: "User",
      sessions: 16,
      lastActive: "2 days ago",
    },
    {
      name: "Robert Wilson",
      email: "r.wilson@example.com",
      accessLevel: "Manager",
      sessions: 5,
      lastActive: "Today, 11:30 AM",
    },
    {
      name: "Jennifer Lee",
      email: "j.lee@example.com",
      accessLevel: "User",
      sessions: 19,
      lastActive: "Yesterday, 2:10 PM",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Access Level</TableHead>
              <TableHead>Charging Sessions</TableHead>
              <TableHead>Last Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.accessLevel === "Admin"
                        ? "default"
                        : user.accessLevel === "Manager"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {user.accessLevel}
                  </Badge>
                </TableCell>
                <TableCell>{user.sessions}</TableCell>
                <TableCell>{user.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
