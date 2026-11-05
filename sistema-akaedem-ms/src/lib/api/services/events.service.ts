import { schoolApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export type SchoolEvent = {
  id: string;
  title: string;
  description?: string | null;
  location?: string | null;
  starts_at: string;
  ends_at?: string | null;
  price: number | string;
  is_published: boolean;
  registrations_count?: number;
};

class EventsService {
  async list(): Promise<SchoolEvent[]> {
    const res = await schoolApiClient.get(API_ENDPOINTS.EVENTS.LIST);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao listar eventos');
    return (res.data as any).events || [];
  }

  async create(data: Partial<SchoolEvent>): Promise<SchoolEvent> {
    const res = await schoolApiClient.post(API_ENDPOINTS.EVENTS.CREATE, data);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao criar evento');
    return (res.data as any).event;
  }

  async remove(id: string): Promise<void> {
    const res = await schoolApiClient.delete(API_ENDPOINTS.EVENTS.DELETE(id));
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao eliminar evento');
  }
}

export const eventsService = new EventsService();
