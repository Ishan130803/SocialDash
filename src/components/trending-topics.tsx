import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const trendingTopics = [
  "#SummerVibes",
  "#TechTalk",
  "#FoodieFriday",
  "#FitnessGoals",
  "#WeekendGetaway",
]

export function TrendingTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <Badge key={topic} variant="secondary">
              {topic}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

