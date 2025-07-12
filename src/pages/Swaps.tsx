import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Send, 
  Inbox, 
  MessageSquare,
  User,
  Calendar,
  ArrowRight
} from "lucide-react";
import { currentUser, mockSwapRequests } from "@/lib/mockData";
import { SwapRequest } from "@/types";

export default function Swaps() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Filter swaps based on current user
  const userSwaps = mockSwapRequests.filter(swap => 
    swap.fromUserId === currentUser.id || swap.toUserId === currentUser.id
  );
  
  const sentRequests = userSwaps.filter(swap => swap.fromUserId === currentUser.id);
  const receivedRequests = userSwaps.filter(swap => swap.toUserId === currentUser.id);
  const activeSwaps = userSwaps.filter(swap => swap.status === 'active' || swap.status === 'accepted');
  const completedSwaps = userSwaps.filter(swap => swap.status === 'completed');
  
  const filteredSwaps = (swaps: SwapRequest[]) => {
    if (!searchTerm) return swaps;
    return swaps.filter(swap => 
      swap.offeredSkill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      swap.requestedSkill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      swap.fromUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      swap.toUser.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getStatusColor = (status: SwapRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'accepted': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'rejected': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-400';
      default: return 'bg-gray-500';
    }
  };

  const handleAcceptSwap = (swapId: string) => {
    // In a real app, this would make an API call to update the swap status
    toast({
      title: "Swap request accepted!",
      description: "You can now start coordinating your skill exchange sessions.",
    });
  };

  const handleRejectSwap = (swapId: string) => {
    // In a real app, this would make an API call to update the swap status
    toast({
      title: "Swap request declined",
      description: "The request has been declined.",
      variant: "destructive",
    });
  };

  const SwapCard = ({ swap, showActions = false }: { swap: SwapRequest; showActions?: boolean }) => {
    const isFromCurrentUser = swap.fromUserId === currentUser.id;
    const otherUser = isFromCurrentUser ? swap.toUser : swap.fromUser;
    
    return (
      <Card className="sketch-border hover-lift">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden sketch-border bg-muted">
                {otherUser.avatar ? (
                  <img 
                    src={otherUser.avatar} 
                    alt={otherUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg font-bold text-muted-foreground">
                    {otherUser.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold">{otherUser.name}</h3>
                <p className="text-sm text-muted-foreground">{otherUser.location}</p>
              </div>
            </div>
            <Badge 
              className={`${getStatusColor(swap.status)} text-white`}
            >
              {swap.status}
            </Badge>
          </div>
          
          <div className="space-y-3">
            {/* Skill Exchange */}
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="flex-1 text-center">
                <div className="text-sm text-muted-foreground">
                  {isFromCurrentUser ? 'You offer' : 'They offer'}
                </div>
                <div className="font-medium">{swap.offeredSkill.name}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-center">
                <div className="text-sm text-muted-foreground">
                  {isFromCurrentUser ? 'You want' : 'They want'}
                </div>
                <div className="font-medium">{swap.requestedSkill.name}</div>
              </div>
            </div>
            
            {/* Message */}
            {swap.message && (
              <div className="p-3 bg-accent/50 rounded-lg">
                <p className="text-sm italic">"{swap.message}"</p>
              </div>
            )}
            
            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Requested {swap.createdAt.toLocaleDateString()}</span>
            </div>
            
            {/* Actions */}
            {showActions && swap.status === 'pending' && !isFromCurrentUser && (
              <div className="flex gap-3 pt-3">
                <Button size="sm" className="flex-1" onClick={() => handleAcceptSwap(swap.id)}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleRejectSwap(swap.id)}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Decline
                </Button>
              </div>
            )}
            
            {(swap.status === 'accepted' || swap.status === 'active') && (
              <div className="flex gap-3 pt-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Swaps</h1>
            <p className="text-muted-foreground">Manage your skill exchange requests and sessions</p>
          </div>
          <Button onClick={() => navigate('/browse')}>
            <Send className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search swaps..." 
            className="pl-10 sketch-border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="sketch-border">
            <CardContent className="p-4 text-center">
              <Inbox className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{receivedRequests.length}</div>
              <div className="text-sm text-muted-foreground">Received</div>
            </CardContent>
          </Card>
          <Card className="sketch-border">
            <CardContent className="p-4 text-center">
              <Send className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{sentRequests.length}</div>
              <div className="text-sm text-muted-foreground">Sent</div>
            </CardContent>
          </Card>
          <Card className="sketch-border">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{activeSwaps.length}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card className="sketch-border">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{completedSwaps.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Swap Lists */}
        <Tabs defaultValue="received" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="received" className="relative">
              Received
              {receivedRequests.filter(s => s.status === 'pending').length > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                  {receivedRequests.filter(s => s.status === 'pending').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {/* Received Requests */}
          <TabsContent value="received" className="space-y-4">
            {filteredSwaps(receivedRequests).length > 0 ? (
              filteredSwaps(receivedRequests).map((swap) => (
                <SwapCard key={swap.id} swap={swap} showActions />
              ))
            ) : (
              <Card className="sketch-border">
                <CardContent className="p-8 text-center">
                  <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No requests received</h3>
                  <p className="text-muted-foreground">
                    When someone wants to learn from you, their requests will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Sent Requests */}
          <TabsContent value="sent" className="space-y-4">
            {filteredSwaps(sentRequests).length > 0 ? (
              filteredSwaps(sentRequests).map((swap) => (
                <SwapCard key={swap.id} swap={swap} />
              ))
            ) : (
              <Card className="sketch-border">
                <CardContent className="p-8 text-center">
                  <Send className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No requests sent</h3>
                  <p className="text-muted-foreground">
                    Start learning by sending skill swap requests to other members.
                  </p>
                  <Button className="mt-4">
                    <User className="w-4 h-4 mr-2" />
                    Browse Skills
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Active Swaps */}
          <TabsContent value="active" className="space-y-4">
            {filteredSwaps(activeSwaps).length > 0 ? (
              filteredSwaps(activeSwaps).map((swap) => (
                <SwapCard key={swap.id} swap={swap} />
              ))
            ) : (
              <Card className="sketch-border">
                <CardContent className="p-8 text-center">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No active swaps</h3>
                  <p className="text-muted-foreground">
                    Accept received requests or wait for your sent requests to be accepted.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Completed Swaps */}
          <TabsContent value="completed" className="space-y-4">
            {filteredSwaps(completedSwaps).length > 0 ? (
              filteredSwaps(completedSwaps).map((swap) => (
                <SwapCard key={swap.id} swap={swap} />
              ))
            ) : (
              <Card className="sketch-border">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No completed swaps</h3>
                  <p className="text-muted-foreground">
                    Completed skill exchanges will appear here with review options.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}