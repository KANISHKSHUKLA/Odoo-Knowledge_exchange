import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical,
  ArrowLeft,
  Clock,
  Check,
  CheckCheck
} from "lucide-react";
import { currentUser, mockConversations, mockMessages } from "@/lib/mockData";
import { Conversation, Message } from "@/types";

export default function Messages() {
  const { conversationId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  
  // Filter conversations for current user
  const userConversations = mockConversations.filter(conv => 
    conv.participants.some(p => p.id === currentUser.id)
  );
  
  const filteredConversations = userConversations.filter(conv => {
    if (!searchTerm) return true;
    const otherParticipant = conv.participants.find(p => p.id !== currentUser.id);
    return otherParticipant?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const selectedConversation = conversationId 
    ? userConversations.find(conv => conv.id === conversationId)
    : null;
    
  const conversationMessages = selectedConversation 
    ? mockMessages.filter(msg => msg.conversationId === selectedConversation.id)
    : [];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In real app, this would send the message via API
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const getMessageStatus = (message: Message) => {
    if (message.senderId !== currentUser.id) return null;
    
    return message.isRead ? (
      <CheckCheck className="w-4 h-4 text-blue-500" />
    ) : (
      <Check className="w-4 h-4 text-gray-400" />
    );
  };

  const ConversationList = () => (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Search conversations..." 
          className="pl-10 sketch-border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Conversations */}
      <div className="space-y-2">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => {
            const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
            const hasUnread = conversation.lastMessage && !conversation.lastMessage.isRead && 
                             conversation.lastMessage.senderId !== currentUser.id;
            
            return (
              <Link
                key={conversation.id}
                to={`/messages/${conversation.id}`}
                className={`block p-4 rounded-lg transition-smooth hover:bg-accent/50 ${
                  conversationId === conversation.id ? 'bg-accent' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden sketch-border bg-muted">
                      {otherParticipant?.avatar ? (
                        <img 
                          src={otherParticipant.avatar} 
                          alt={otherParticipant.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-muted-foreground">
                          {otherParticipant?.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    {otherParticipant?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium truncate ${hasUnread ? 'font-semibold' : ''}`}>
                        {otherParticipant?.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {conversation.lastMessage && (
                          <span className="text-xs text-muted-foreground">
                            {conversation.lastMessage.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        )}
                        {hasUnread && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>
                    {conversation.lastMessage && (
                      <p className={`text-sm truncate ${
                        hasUnread ? 'text-foreground font-medium' : 'text-muted-foreground'
                      }`}>
                        {conversation.lastMessage.senderId === currentUser.id ? 'You: ' : ''}
                        {conversation.lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );

  const ChatInterface = () => {
    if (!selectedConversation) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
            <p>Choose a conversation from the list to start messaging</p>
          </div>
        </div>
      );
    }

    const otherParticipant = selectedConversation.participants.find(p => p.id !== currentUser.id);

    return (
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Link to="/messages" className="md:hidden">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="w-10 h-10 rounded-full overflow-hidden sketch-border bg-muted">
              {otherParticipant?.avatar ? (
                <img 
                  src={otherParticipant.avatar} 
                  alt={otherParticipant.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm font-bold text-muted-foreground">
                  {otherParticipant?.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold">{otherParticipant?.name}</h3>
              <p className="text-xs text-muted-foreground">
                {otherParticipant?.isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversationMessages.map((message) => {
            const isFromCurrentUser = message.senderId === currentUser.id;
            
            return (
              <div
                key={message.id}
                className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    isFromCurrentUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center gap-1 mt-1 justify-end">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {getMessageStatus(message)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 min-h-[40px] max-h-32 resize-none sketch-border"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="self-end"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className={`${conversationId ? 'hidden md:block' : ''} md:col-span-1`}>
            <Card className="sketch-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ConversationList />
              </CardContent>
            </Card>
          </div>
          
          {/* Chat Interface */}
          <div className={`${!conversationId ? 'hidden md:block' : ''} md:col-span-2`}>
            <Card className="sketch-border h-full">
              <CardContent className="p-0 h-full">
                <ChatInterface />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}