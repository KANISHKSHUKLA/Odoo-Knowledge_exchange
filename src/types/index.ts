// Core types for the Skill Swap Platform

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  rating: number;
  reviewCount: number;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availability: Availability[];
  isOnline: boolean;
  lastSeen: Date;
  profileCompletion: number;
  joinedDate: Date;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description?: string;
}

export interface Availability {
  id: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
  timezone: string;
}

export interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUser: User;
  toUser: User;
  offeredSkillId: string;
  requestedSkillId: string;
  offeredSkill: Skill;
  requestedSkill: Skill;
  status: 'pending' | 'accepted' | 'rejected' | 'active' | 'completed' | 'cancelled';
  message: string;
  createdAt: Date;
  updatedAt: Date;
  scheduledSessions?: SwapSession[];
}

export interface SwapSession {
  id: string;
  swapRequestId: string;
  date: Date;
  duration: number; // in minutes
  type: 'online' | 'in-person';
  location?: string;
  meetingLink?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'system';
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  updatedAt: Date;
  swapRequestId?: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  revieweeId: string;
  swapRequestId: string;
  rating: number;
  comment: string;
  skillRatings: {
    skillId: string;
    rating: number;
  }[];
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'swap_request' | 'swap_accepted' | 'swap_rejected' | 'message' | 'review' | 'session_reminder';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// Search and filtering types
export interface SearchFilters {
  skills?: string[];
  categories?: string[];
  levels?: string[];
  location?: string;
  availability?: string;
  rating?: number;
}

export interface SearchResult {
  users: User[];
  totalCount: number;
  filters: SearchFilters;
}

// Form types
export interface ProfileFormData {
  name: string;
  bio: string;
  location: string;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  availability: Availability[];
}

export interface SwapRequestFormData {
  toUserId: string;
  offeredSkillId: string;
  requestedSkillId: string;
  message: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// Navigation types
export interface NavItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: number;
}

// Component prop types
export interface UserCardProps {
  user: User;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export interface SkillBadgeProps {
  skill: Skill;
  type: 'offered' | 'wanted';
  size?: 'sm' | 'md' | 'lg';
  showLevel?: boolean;
}

// Utility types
export type SwapStatus = SwapRequest['status'];
export type SkillLevel = Skill['level'];
export type NotificationType = Notification['type'];