export interface Material {
  id: string;
  title: string;
  subject: string;
  icon?: 'book' | 'calculator' | 'code' | 'science';
  fileUrl?: string;
  downloadCount?: number;
  createdAt?: string;
  updatedAt?: string;
  size?: number;
  type?: string;
}

export interface MateriaisData {
  materials: Material[];
  availableCount: number;
  courseName: string;
  description: string;
}