import { schoolApiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export type ActivityLog = {
  id: string;
  actor_id?: string | null;
  actor_name?: string | null;
  action: string;
  entity_type?: string | null;
  entity_id?: string | null;
  meta?: Record<string, unknown> | null;
  ip?: string | null;
  created_at: string;
};

export type PermissionProfile = {
  id: string;
  name: string;
  description?: string | null;
  permissions: string[];
  is_system?: boolean;
};

class SettingsService {
  async listActivityLogs(): Promise<ActivityLog[]> {
    const res = await schoolApiClient.get(API_ENDPOINTS.ACTIVITY_LOGS.LIST);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao listar logs');
    const data = res.data as any;
    return data.activity_logs || data || [];
  }

  async listPermissionProfiles(): Promise<PermissionProfile[]> {
    const res = await schoolApiClient.get(API_ENDPOINTS.PERMISSION_PROFILES.LIST);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao listar perfis');
    const data = res.data as any;
    return data.permission_profiles || data || [];
  }

  async createPermissionProfile(data: Partial<PermissionProfile>): Promise<PermissionProfile> {
    const res = await schoolApiClient.post(API_ENDPOINTS.PERMISSION_PROFILES.CREATE, data);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao criar perfil');
    return (res.data as any).permission_profile;
  }

  async updatePermissionProfile(id: string, data: Partial<PermissionProfile>): Promise<PermissionProfile> {
    const res = await schoolApiClient.put(API_ENDPOINTS.PERMISSION_PROFILES.UPDATE(id), data);
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao actualizar perfil');
    return (res.data as any).permission_profile;
  }

  async deletePermissionProfile(id: string): Promise<void> {
    const res = await schoolApiClient.delete(API_ENDPOINTS.PERMISSION_PROFILES.DELETE(id));
    if (res.status !== 'success') throw new Error(res.message || 'Erro ao eliminar perfil');
  }
}

export const settingsService = new SettingsService();
