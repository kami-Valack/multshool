import { schoolApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export type Announcement = {
  id: string;
  title: string;
  body: string;
  audience: 'all' | 'students' | 'teachers' | 'staff';
  published_at?: string | null;
  is_published: boolean;
  created_at?: string;
};

class CommunicationService {
  async listAnnouncements(): Promise<Announcement[]> {
    const res = await schoolApiClient.get(API_ENDPOINTS.ANNOUNCEMENTS.LIST);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao listar anúncios');
    const data = res.data as any;
    return data.announcements || data || [];
  }

  async createAnnouncement(data: Partial<Announcement>): Promise<Announcement> {
    const res = await schoolApiClient.post(API_ENDPOINTS.ANNOUNCEMENTS.CREATE, data);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao criar anúncio');
    return (res.data as any).announcement;
  }

  async updateAnnouncement(id: string, data: Partial<Announcement>): Promise<Announcement> {
    const res = await schoolApiClient.put(API_ENDPOINTS.ANNOUNCEMENTS.UPDATE(id), data);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao actualizar anúncio');
    return (res.data as any).announcement;
  }

  async deleteAnnouncement(id: string): Promise<void> {
    const res = await schoolApiClient.delete(API_ENDPOINTS.ANNOUNCEMENTS.DELETE(id));
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao eliminar anúncio');
  }
}

export const communicationService = new CommunicationService();
