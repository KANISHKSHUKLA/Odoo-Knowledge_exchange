import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SwapRequestModal } from "@/components/SwapRequestModal";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  TrendingUp,
  MessageSquare,
  UserPlus
} from "lucide-react";
import { mockUsers, mockSkills } from "@/lib/mockData";
import { SkillBadge } from "@/components/SkillBadge";
import { User, Skill } from "@/types";

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [swapRequestModalOpen, setSwapRequestModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Get unique categories and levels
  const categories = ["all", ...Array.from(new Set(mockSkills.map(skill => skill.category)))];
  const levels = ["all", "Beginner", "Intermediate", "Advanced", "Expert"];

  // Filter users based on search and filters
  const filteredUsers = mockUsers.filter(user => {
    // Search in name, skills, and location
    const matchesSearch = searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillsOffered.some(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      user.skillsWanted.some(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

    // Filter by category
    const matchesCategory = selectedCategory === "all" ||
      user.skillsOffered.some(skill => skill.category === selectedCategory) ||
      user.skillsWanted.some(skill => skill.category === selectedCategory);

    // Filter by level
    const matchesLevel = selectedLevel === "all" ||
      user.skillsOffered.some(skill => skill.level === selectedLevel) ||
      user.skillsWanted.some(skill => skill.level === selectedLevel);

    return matchesSearch && matchesCategory && matchesLevel;
  });

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
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => {
                  setSelectedUser(user);
                  setSwapRequestModalOpen(true);
                }}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Request Swap
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => navigate(`/messages`)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Browse Skills</h1>
          <p className="text-muted-foreground">
            Discover amazing people and the skills they're passionate about sharing
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search skills, people, or locations..." 
                className="pl-10 sketch-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-accent" : ""}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="sketch-border">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Skill Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="sketch-border">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level === "all" ? "All Levels" : level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'} found
            </h2>
            {searchTerm || selectedCategory !== "all" || selectedLevel !== "all" ? (
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                }}
              >
                Clear filters
              </Button>
            ) : null}
          </div>
          
          {filteredUsers.length > 0 ? (
            <div className="grid gap-6">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <Card className="sketch-border">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No users found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find more people.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedLevel("all");
                  }}
                >
                  Clear all filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Swap Request Modal */}
        <SwapRequestModal
          open={swapRequestModalOpen}
          onOpenChange={setSwapRequestModalOpen}
          targetUser={selectedUser}
        />
      </div>
    </div>
  );
}