import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const recentPosts = [
  { id: 1, author: "Alice", content: "Just finished a great book!" },
  { id: 2, author: "Bob", content: "Check out my new photo album" },
  { id: 3, author: "Charlie", content: "Who's up for a game night?" },
]

export function RecentPosts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.id} className="border-b pb-2 last:border-b-0">
              <p className="font-semibold">{post.author}</p>
              <p className="text-sm text-gray-500">{post.content}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

