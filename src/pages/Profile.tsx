import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar, 
  Star, 
  MessageSquare, 
  UserPlus, 
  Edit, 
  Clock,
  Trophy,
  TrendingUp,
  Users
} from "lucide-react";
import { currentUser, mockUsers, mockReviews, getSwapRequestsByUserId } from "@/lib/mockData";
import { SkillBadge } from "@/components/SkillBadge";
import { User } from "@/types";

export default function Profile() {
  const { userId } = useParams();
  const [isCurrentUser] = useState(!userId);
  const user: User = isCurrentUser ? currentUser : mockUsers.find(u => u.id === userId) || currentUser;
  
  const userSwaps = getSwapRequestsByUserId(user.id);
  const completedSwaps = userSwaps.filter(swap => swap.status === 'completed').length;
  const activeSwaps = userSwaps.filter(swap => swap.status === 'active').length;
  const userReviews = mockReviews.filter(review => review.revieweeId === user.id);

  const getStatusDot = (isOnline: boolean, lastSeen: Date) => {
    if (isOnline) return "bg-green-500";
    if (Date.now() - lastSeen.getTime() < 5 * 60 * 1000) return "bg-yellow-500";
    return "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <Card className="sketch-border shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden sketch-border bg-muted">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-muted-foreground">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  {/* Status indicator */}
                  <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-background ${getStatusDot(user.isOnline, user.lastSeen)}`} />
                </div>
                
                {isCurrentUser && (
                  <Button variant="outline" size="sm" className="mt-4">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {user.joinedDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {user.isOnline ? 'Online now' : `Last seen ${user.lastSeen.toLocaleTimeString()}`}
                      </span>
                    </div>
                  </div>
                </div>

                {user.bio && (
                  <p className="text-muted-foreground">{user.bio}</p>
                )}

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">{user.rating}</span>
                    <span className="text-muted-foreground">({user.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="font-semibold">{completedSwaps}</span>
                    <span className="text-muted-foreground">completed swaps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">{activeSwaps}</span>
                    <span className="text-muted-foreground">active swaps</span>
                  </div>
                </div>

                {/* Actions for non-current user */}
                {!isCurrentUser && (
                  <div className="flex gap-3">
                    <Button className="transition-bounce">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Request Swap
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                )}
              </div>

              {/* Profile Completion (current user only) */}
              {isCurrentUser && (
                <div className="min-w-64 space-y-4">
                  <div className="sketch-border p-4 bg-accent/50">
                    <h3 className="font-semibold mb-2">Profile Completion</h3>
                    <Progress value={user.profileCompletion} className="mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {user.profileCompletion}% complete
                    </p>
                    {user.profileCompletion < 100 && (
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        Complete your profile →
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Content Tabs */}
        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="swaps">Swap History</TabsTrigger>
          </TabsList>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Skills Offered */}
              <Card className="sketch-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-skill-offered" />
                    Skills I Offer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((skill) => (
                      <SkillBadge 
                        key={skill.id} 
                        skill={skill} 
                        type="offered"
                        showLevel
                      />
                    ))}
                    {isCurrentUser && (
                      <Button variant="outline" size="sm" className="h-auto p-2">
                        + Add Skill
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Skills Wanted */}
              <Card className="sketch-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-skill-wanted" />
                    Skills I Want to Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsWanted.map((skill) => (
                      <SkillBadge 
                        key={skill.id} 
                        skill={skill} 
                        type="wanted"
                        showLevel
                      />
                    ))}
                    {isCurrentUser && (
                      <Button variant="outline" size="sm" className="h-auto p-2">
                        + Add Skill
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability">
            <Card className="sketch-border">
              <CardHeader>
                <CardTitle>Weekly Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.availability.length > 0 ? (
                    user.availability.map((slot) => (
                      <div key={slot.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="capitalize font-medium">{slot.day}</div>
                        <div className="text-muted-foreground">
                          {slot.startTime} - {slot.endTime} ({slot.timezone})
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      No availability set
                      {isCurrentUser && (
                        <div>
                          <Button variant="outline" className="mt-2">
                            Set Availability
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card className="sketch-border">
              <CardHeader>
                <CardTitle>Reviews & Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userReviews.length > 0 ? (
                    userReviews.map((review) => (
                      <div key={review.id} className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating 
                                    ? 'text-yellow-500 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {review.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                        <Separator />
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      No reviews yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Swap History Tab */}
          <TabsContent value="swaps">
            <Card className="sketch-border">
              <CardHeader>
                <CardTitle>Swap History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userSwaps.length > 0 ? (
                    userSwaps.map((swap) => (
                      <div key={swap.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="space-y-1">
                          <div className="font-medium">
                            {swap.fromUserId === user.id ? swap.toUser.name : swap.fromUser.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {swap.offeredSkill.name} ↔ {swap.requestedSkill.name}
                          </div>
                        </div>
                        <Badge 
                          variant={
                            swap.status === 'completed' ? 'default' :
                            swap.status === 'active' ? 'secondary' :
                            swap.status === 'pending' ? 'outline' : 'destructive'
                          }
                        >
                          {swap.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      No swap history yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}