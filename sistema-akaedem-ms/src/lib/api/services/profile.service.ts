import { schoolApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface ProfileCompletionStatus {
  is_complete: boolean;
  missing_fields: string[];
  completion_percentage: number;
  message: string;
}

export interface ProfileData {
  name?: string;
  acronym?: string;
  description?: string;
  founded_year?: number;
  location_map_url?: string;
  phone_number?: string;
  contact_emails?: string[];
}

class ProfileService {
  /**
   * Verifica se o perfil está completo
   */
  async checkCompletion(): Promise<ProfileCompletionStatus> {
    const response = await schoolApiClient.get<ProfileCompletionStatus>(
      API_ENDPOINTS.PROFILE.CHECK_COMPLETION
    );

    if (response.status === 'success' && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Erro ao verificar perfil');
  }

  /**
   * Obtém dados do perfil atual
   */
  async getProfile(): Promise<any> {
    const response = await schoolApiClient.get(API_ENDPOINTS.PROFILE.ME);

    if (response.status === 'success' && response.data) {
      // A API retorna { status: 'success', user: {...} }
      return (response.data as any).user || response.data;
    }

    throw new Error(response.message || 'Erro ao obter perfil');
  }

  /**
   * Atualiza dados do perfil
   */
  async updateProfile(data: ProfileData): Promise<void> {
    const response = await schoolApiClient.put(
      API_ENDPOINTS.PROFILE.UPDATE,
      data
    );

    if (response.status !== 'success') {
      throw new Error(response.message || 'Erro ao atualizar perfil');
    }
  }

  /**
   * Faz upload do logotipo
   */
  async uploadLogo(file: File): Promise<string> {
    const response = await schoolApiClient.upload<{ logo_path: string }>(
      API_ENDPOINTS.PROFILE.UPLOAD_LOGO,
      file,
      'logo'
    );

    if (response.status === 'success' && response.data) {
      return response.data.logo_path;
    }

    throw new Error(response.message || 'Erro ao fazer upload do logotipo');
  }

  /**
   * Faz upload de fotografias (mínimo 2)
   */
  async uploadPhotos(files: File[]): Promise<string[]> {
    if (files.length < 2) {
      throw new Error('É necessário fazer upload de pelo menos 2 fotografias');
    }

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`photos[${index}]`, file);
    });

    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('auth_token') 
      : null;

    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SCHOOL_API_URL || 'http://localhost:8003/api'}${API_ENDPOINTS.PROFILE.UPLOAD_PHOTOS}`,
        {
          method: 'POST',
          headers,
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao fazer upload das fotografias');
      }

      const data = await response.json();
      if (data.status === 'success' && data.photos) {
        return data.photos;
      }

      throw new Error('Erro ao processar upload das fotografias');
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer upload das fotografias');
    }
  }

  /**
   * Faz upload do vídeo de apresentação
   */
  async uploadVideo(file: File): Promise<string> {
    const response = await schoolApiClient.upload<{ presentation_video_path: string }>(
      API_ENDPOINTS.PROFILE.UPLOAD_VIDEO,
      file,
      'video'
    );

    if (response.status === 'success' && response.data) {
      return response.data.presentation_video_path;
    }

    throw new Error(response.message || 'Erro ao fazer upload do vídeo');
  }
}

export const profileService = new ProfileService();

