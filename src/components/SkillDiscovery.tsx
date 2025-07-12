import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Grid, List, Star, MapPin, Clock, Users, TrendingUp, MessageSquare, UserPlus } from "lucide-react"
import { mockUsers, mockSkills } from "@/lib/mockData"
import { SkillBadge } from "./SkillBadge"
import { SwapRequestModal } from "./SwapRequestModal"
import { User } from "@/types"

const popularSkills = [
  "React", "Python", "Guitar", "Photography", "Spanish", "UI/UX Design", 
  "Digital Marketing", "Cooking", "Yoga", "TypeScript", "Data Science"
]

export function SkillDiscovery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [swapRequestModalOpen, setSwapRequestModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesSkill = selectedSkill === "" ||
      user.skillsOffered.some(skill => skill.name === selectedSkill) ||
      user.skillsWanted.some(skill => skill.name === selectedSkill)
    
    return matchesSearch && matchesSkill
  })

  const getStatusDot = (isOnline: boolean, lastSeen: Date) => {
    if (isOnline) return "bg-green-500";
    if (Date.now() - lastSeen.getTime() < 5 * 60 * 1000) return "bg-yellow-500";
    return "bg-gray-500";
  };

  const UserCard = ({ user }: { user: User }) => (
    <Card className="sketch-border hover-lift">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden sketch-border bg-muted">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-3 border-background ${getStatusDot(user.isOnline, user.lastSeen)}`} />
          </div>
          
          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Link to={`/profile/${user.id}`} className="hover:underline">
                <h3 className="font-semibold text-lg">{user.name}</h3>
              </Link>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{user.rating}</span>
                <span className="text-sm text-muted-foreground">({user.reviewCount})</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  {user.isOnline ? 'Online now' : `Active ${user.lastSeen.toLocaleDateString()}`}
                </span>
              </div>
            </div>
            
            {user.bio && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{user.bio}</p>
            )}
            
            {/* Skills */}
            <div className="space-y-3">
              {user.skillsOffered.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-skill-offered" />
                    <span className="text-sm font-medium">Offers</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.slice(0, 3).map((skill) => (
                      <SkillBadge key={skill.id} skill={skill} type="offered" />
                    ))}
                    {user.skillsOffered.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{user.skillsOffered.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {user.skillsWanted.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-skill-wanted" />
                    <span className="text-sm font-medium">Wants to learn</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.slice(0, 3).map((skill) => (
                      <SkillBadge key={skill.id} skill={skill} type="wanted" />
                    ))}
                    {user.skillsWanted.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{user.skillsWanted.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <Button size="sm" className="flex-1" onClick={() => handleRequestSwap(user.id)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Request Swap
              </Button>
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to={`/messages/${user.id}`}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const handleRequestSwap = (userId: string) => {
    const user = filteredUsers.find(u => u.id === userId)
    if (user) {
      setSelectedUser(user)
      setSwapRequestModalOpen(true)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Discover Skills</h2>
        <p className="text-muted-foreground">Find amazing people to learn from and teach</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search people or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 sketch-border"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Popular Skills */}
        <div>
          <h3 className="text-sm font-medium mb-3">Popular Skills</h3>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedSkill === "" ? "default" : "secondary"}
              className="cursor-pointer hover:scale-105 transition-smooth"
              onClick={() => setSelectedSkill("")}
            >
              All Skills
            </Badge>
            {popularSkills.map((skill) => (
              <Badge
                key={skill}
                variant={selectedSkill === skill ? "default" : "secondary"}
                className="cursor-pointer hover:scale-105 transition-smooth"
                onClick={() => setSelectedSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Found {filteredUsers.length} skill swappers
        </p>
      </div>

      {/* User Grid */}
      <div className={`grid gap-6 ${
        viewMode === "grid" 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
          : "grid-cols-1"
      }`}>
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="sketch-border bg-card p-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or browse all skills
            </p>
            <Button onClick={() => {
              setSearchTerm("")
              setSelectedSkill("")
            }}>
              Clear Filters
            </Button>
          </div>
        </div>
      )}

      {/* Swap Request Modal */}
      <SwapRequestModal
        open={swapRequestModalOpen}
        onOpenChange={setSwapRequestModalOpen}
        targetUser={selectedUser}
      />
    </div>
  )
}