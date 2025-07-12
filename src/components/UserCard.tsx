import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SkillBadge } from "./SkillBadge"
import { Star, MapPin, Clock } from "lucide-react"

interface User {
  id: string
  name: string
  location?: string
  avatar?: string
  skillsOffered: string[]
  skillsWanted: string[]
  rating: number
  availability: string
}

interface UserCardProps {
  user: User
  onRequestSwap?: (userId: string) => void
}

export function UserCard({ user, onRequestSwap }: UserCardProps) {
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <Card className="gradient-card shadow-card hover-lift border-2 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 sketch-border">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{user.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{user.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{user.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{user.availability}</span>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2 text-skill-offered">Skills Offered</h4>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.map((skill) => (
              <SkillBadge key={skill} skill={skill} type="offered" />
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2 text-skill-wanted">Skills Wanted</h4>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.map((skill) => (
              <SkillBadge key={skill} skill={skill} type="wanted" />
            ))}
          </div>
        </div>
        
        <Button 
          variant="skill" 
          className="w-full"
          onClick={() => onRequestSwap?.(user.id)}
        >
          Request Skill Swap
        </Button>
      </CardContent>
    </Card>
  )
}