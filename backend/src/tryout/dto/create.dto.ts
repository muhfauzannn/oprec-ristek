// src/tryout/dto/create-tryout.dto.ts
export class CreateTryoutDto {
  name: string;
  // Sesuai enum TryOutCategories di schema: Math, Programming, Calculus, Business, Physics
  category: 'Math' | 'Programming' | 'Calculus' | 'Business' | 'Physics';
  duration: number;
}
