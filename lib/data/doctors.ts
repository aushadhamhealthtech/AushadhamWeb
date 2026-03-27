export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  reviewCount?: number;
  specialties: string[];
  avatarColor?: string;
  avatarInitials: string;
};
