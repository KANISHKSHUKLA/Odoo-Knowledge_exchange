// Mock data for the Skill Swap Platform
import { User, Skill, SwapRequest, Conversation, Message, Review, Notification } from '@/types';

export const mockSkills: Skill[] = [
  { id: '1', name: 'JavaScript', category: 'Programming', level: 'Advanced', description: 'Modern ES6+ JavaScript development' },
  { id: '2', name: 'Python', category: 'Programming', level: 'Expert', description: 'Python for web development and data science' },
  { id: '3', name: 'React', category: 'Frontend', level: 'Advanced', description: 'React.js with hooks and modern patterns' },
  { id: '4', name: 'Node.js', category: 'Backend', level: 'Intermediate', description: 'Server-side JavaScript development' },
  { id: '5', name: 'Guitar', category: 'Music', level: 'Intermediate', description: 'Acoustic and electric guitar playing' },
  { id: '6', name: 'Photography', category: 'Creative', level: 'Advanced', description: 'Portrait and landscape photography' },
  { id: '7', name: 'Spanish', category: 'Language', level: 'Expert', description: 'Native Spanish speaker and tutor' },
  { id: '8', name: 'Cooking', category: 'Lifestyle', level: 'Intermediate', description: 'Italian and French cuisine' },
  { id: '9', name: 'Yoga', category: 'Fitness', level: 'Advanced', description: 'Hatha and Vinyasa yoga instruction' },
  { id: '10', name: 'Drawing', category: 'Creative', level: 'Beginner', description: 'Pencil sketching and digital art basics' },
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'sarah.dev@example.com',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer passionate about teaching and learning new technologies. Love sharing knowledge!',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviewCount: 24,
    skillsOffered: [mockSkills[0], mockSkills[2], mockSkills[3]],
    skillsWanted: [mockSkills[4], mockSkills[6]],
    availability: [
      { id: '1', day: 'monday', startTime: '18:00', endTime: '20:00', timezone: 'PST' },
      { id: '2', day: 'wednesday', startTime: '18:00', endTime: '20:00', timezone: 'PST' },
      { id: '3', day: 'saturday', startTime: '10:00', endTime: '14:00', timezone: 'PST' },
    ],
    isOnline: true,
    lastSeen: new Date(),
    profileCompletion: 95,
    joinedDate: new Date('2024-01-15'),
  },
  {
    id: '2',
    email: 'alex.music@example.com',
    name: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop&crop=face',
    bio: 'Professional musician and music teacher. I love helping people discover the joy of making music.',
    location: 'Austin, TX',
    rating: 4.9,
    reviewCount: 45,
    skillsOffered: [mockSkills[4], mockSkills[6]],
    skillsWanted: [mockSkills[0], mockSkills[5]],
    availability: [
      { id: '4', day: 'tuesday', startTime: '16:00', endTime: '19:00', timezone: 'CST' },
      { id: '5', day: 'thursday', startTime: '16:00', endTime: '19:00', timezone: 'CST' },
      { id: '6', day: 'sunday', startTime: '12:00', endTime: '16:00', timezone: 'CST' },
    ],
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    profileCompletion: 88,
    joinedDate: new Date('2023-11-20'),
  },
  {
    id: '3',
    email: 'maria.chef@example.com',
    name: 'Maria Gonzalez',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
    bio: 'Professional chef specializing in Mediterranean cuisine. Always excited to learn about different cultures!',
    location: 'Miami, FL',
    rating: 4.7,
    reviewCount: 32,
    skillsOffered: [mockSkills[7], mockSkills[6]],
    skillsWanted: [mockSkills[8], mockSkills[9]],
    availability: [
      { id: '7', day: 'friday', startTime: '19:00', endTime: '21:00', timezone: 'EST' },
      { id: '8', day: 'saturday', startTime: '15:00', endTime: '18:00', timezone: 'EST' },
    ],
    isOnline: true,
    lastSeen: new Date(),
    profileCompletion: 92,
    joinedDate: new Date('2024-02-08'),
  },
  {
    id: '4',
    email: 'david.photo@example.com',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=150&h=150&fit=crop&crop=face',
    bio: 'Photography enthusiast and yoga instructor. Believe in the power of mindful living and creative expression.',
    location: 'Portland, OR',
    rating: 4.6,
    reviewCount: 18,
    skillsOffered: [mockSkills[5], mockSkills[8]],
    skillsWanted: [mockSkills[1], mockSkills[9]],
    availability: [
      { id: '9', day: 'wednesday', startTime: '17:00', endTime: '19:00', timezone: 'PST' },
      { id: '10', day: 'sunday', startTime: '09:00', endTime: '12:00', timezone: 'PST' },
    ],
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    profileCompletion: 85,
    joinedDate: new Date('2024-03-12'),
  },
];

export const mockSwapRequests: SwapRequest[] = [
  {
    id: '1',
    fromUserId: '1',
    toUserId: '2',
    fromUser: mockUsers[0],
    toUser: mockUsers[1],
    offeredSkillId: '1',
    requestedSkillId: '5',
    offeredSkill: mockSkills[0],
    requestedSkill: mockSkills[4],
    status: 'pending',
    message: 'Hi Alex! I\'d love to learn guitar from you. I can help you with JavaScript in return. Let me know if you\'re interested!',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    fromUserId: '3',
    toUserId: '1',
    fromUser: mockUsers[2],
    toUser: mockUsers[0],
    offeredSkillId: '7',
    requestedSkillId: '3',
    offeredSkill: mockSkills[6],
    requestedSkill: mockSkills[2],
    status: 'accepted',
    message: 'Hola Sarah! I\'d love to teach you Spanish. Your React skills would be amazing to learn!',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: '3',
    fromUserId: '4',
    toUserId: '3',
    fromUser: mockUsers[3],
    toUser: mockUsers[2],
    offeredSkillId: '6',
    requestedSkillId: '8',
    offeredSkill: mockSkills[5],
    requestedSkill: mockSkills[7],
    status: 'completed',
    message: 'Hi Maria! I\'d love to learn cooking from you. I can teach you photography techniques!',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: {
      id: '1',
      conversationId: '1',
      senderId: '2',
      content: 'Sounds good! When would you like to start our first session?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      type: 'text'
    },
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    swapRequestId: '1',
  },
  {
    id: '2',
    participants: [mockUsers[0], mockUsers[2]],
    lastMessage: {
      id: '2',
      conversationId: '2',
      senderId: '1',
      content: '¡Perfecto! I\'m excited to start learning Spanish with you.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      type: 'text'
    },
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    swapRequestId: '2',
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    conversationId: '1',
    senderId: '1',
    content: 'Hi Alex! Thanks for accepting my guitar lesson request. I\'m really excited to get started!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: true,
    type: 'text'
  },
  {
    id: '2',
    conversationId: '1',
    senderId: '2',
    content: 'Hey Sarah! I\'m excited too. I\'ve been wanting to learn JavaScript for a while now.',
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
    isRead: true,
    type: 'text'
  },
  {
    id: '3',
    conversationId: '1',
    senderId: '2',
    content: 'Sounds good! When would you like to start our first session?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isRead: false,
    type: 'text'
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    reviewerId: '3',
    revieweeId: '4',
    swapRequestId: '3',
    rating: 5,
    comment: 'David is an amazing photography teacher! Very patient and knowledgeable. Highly recommend!',
    skillRatings: [
      { skillId: '6', rating: 5 }
    ],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    reviewerId: '4',
    revieweeId: '3',
    swapRequestId: '3',
    rating: 4,
    comment: 'Maria taught me some incredible cooking techniques. The paella was amazing!',
    skillRatings: [
      { skillId: '8', rating: 4 }
    ],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'swap_request',
    title: 'New Swap Request',
    message: 'Maria wants to learn React from you in exchange for Spanish lessons',
    isRead: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    actionUrl: '/swaps/2',
  },
  {
    id: '2',
    userId: '1',
    type: 'message',
    title: 'New Message',
    message: 'Alex sent you a message about your JavaScript lesson',
    isRead: false,
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
    actionUrl: '/messages/1',
  },
  {
    id: '3',
    userId: '1',
    type: 'review',
    title: 'New Review',
    message: 'David left you a 5-star review for your React teaching',
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    actionUrl: '/profile',
  },
];

// Current user (mock authenticated user)
export const currentUser: User = mockUsers[0];

// Helper functions for mock data
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getSkillById = (id: string): Skill | undefined => {
  return mockSkills.find(skill => skill.id === id);
};

export const getSwapRequestsByUserId = (userId: string): SwapRequest[] => {
  return mockSwapRequests.filter(swap => 
    swap.fromUserId === userId || swap.toUserId === userId
  );
};

export const getUnreadNotificationCount = (userId: string): number => {
  return mockNotifications.filter(notification => 
    notification.userId === userId && !notification.isRead
  ).length;
};