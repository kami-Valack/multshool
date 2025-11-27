import { StaticImageData } from "next/image";

export interface Student {
  id: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  bilheteIdentidade: string;
  declaracaoMedio?: string;  
  certificadoSuperior?: string;  
  profilePhoto?: string | StaticImageData;      
}
