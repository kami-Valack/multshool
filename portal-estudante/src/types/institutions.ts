export interface Institution {
  id: string;
  name: string;
  fullName: string;
  courses: number;
  location: string;
  logo: string;
  color: string; 
  description?: string;
}

export interface InstituicaoData {
  title: string;
  totalCount: number;
  institutions: Institution[];
}

export interface CardOption {
  id: string;
  title: string;
  subtitle: string;
  available: number;
  image: string;
  bgColor: string;
  route: string;
}

export interface ContentSection {
  title: string;
  items: string[];
}