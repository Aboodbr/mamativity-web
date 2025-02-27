/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export function StatsCard({ title, value, children }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-3xl font-bold text-muted-foreground">{title}</CardTitle>
        <div className="text-6xl font-bold">{value}</div>
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  )
}

