"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { profileService } from '@/lib/api/services/profile.service';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CompletarPerfilPage() {
  const router = useRouter();
  const { user, profileStatus, checkProfileCompletion, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    acronym: '',
    description: '',
    founded_year: '',
    location_map_url: '',
    phone_number: '',
    contact_emails: [''],
  });

  // Arquivos
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // Flag para evitar recarregar dados múltiplas vezes
  const [dataLoaded, setDataLoaded] = useState(false);

  // Verificar perfil ao carregar (apenas uma vez)
  useEffect(() => {
    // Evitar executar múltiplas vezes
    if (dataLoaded || !user) {
      return;
    }

    let isMounted = true; // Flag para verificar se o componente ainda está montado

    const checkProfile = async () => {
      try {
        await checkProfileCompletion();
        // Carregar dados existentes do perfil apenas se ainda não foram carregados
        if (isMounted && !dataLoaded) {
          try {
            const profile = await profileService.getProfile();
            // Só atualizar se os dados ainda não foram carregados E o componente ainda estiver montado
            if (isMounted) {
              setFormData(prev => {
                // NUNCA sobrescrever se o usuário já digitou algo
                // Verificar se algum campo já foi preenchido pelo usuário
                const hasUserData = prev.name.trim() || prev.acronym.trim() || prev.description.trim() || 
                                   prev.founded_year.trim() || prev.location_map_url.trim() || 
                                   prev.phone_number.trim() || (prev.contact_emails && prev.contact_emails.some((e: string) => e.trim() !== ''));
                
                if (hasUserData) {
                  console.log('FormData já tem dados do usuário, não sobrescrevendo');
                  return prev;
                }
                
                // Caso contrário, carregar do perfil apenas na primeira vez
                console.log('Carregando dados do perfil pela primeira vez');
                return {
                  name: profile.name || '',
                  acronym: profile.acronym || '',
                  description: profile.description || '',
                  founded_year: profile.founded_year?.toString() || '',
                  location_map_url: profile.location_map_url || '',
                  phone_number: profile.phone_number || '',
                  contact_emails: profile.contact_emails && profile.contact_emails.length > 0 
                    ? profile.contact_emails 
                    : [''],
                };
              });
              
              // Carregar previews de arquivos existentes apenas se ainda não foram carregados
              if (profile.logo_path && !logoPreview) setLogoPreview(profile.logo_path);
              if (profile.photos && profile.photos.length > 0 && photoPreviews.length === 0) {
                setPhotoPreviews(profile.photos);
              }
              if (profile.presentation_video_path && !videoPreview) {
                setVideoPreview(profile.presentation_video_path);
              }
              
              setDataLoaded(true);
            }
          } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            // Continuar mesmo se não conseguir carregar dados existentes
            if (isMounted) {
              setDataLoaded(true);
            }
          }
        }
      } catch (error) {
        console.error('Erro ao verificar perfil:', error);
      } finally {
        if (isMounted) {
          setChecking(false);
        }
      }
    };

    if (user?.role === 'school') {
      checkProfile();
    } else {
      setChecking(false);
      setDataLoaded(true);
    }

    // Cleanup: marcar como desmontado se o componente for desmontado
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]); // Executar apenas quando user.id mudar (ou seja, quando o usuário fizer login)

  // Se não for escola ou perfil já estiver completo, redirecionar
  useEffect(() => {
    if (!checking && !dataLoaded) {
      return; // Aguardar dados serem carregados
    }
    
    if (!checking && user?.role !== 'school') {
      router.push('/admin');
    } else if (!checking && profileStatus?.is_complete) {
      router.push('/admin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checking, dataLoaded, user?.role, profileStatus?.is_complete]); // Dependências específicas

  const handleInputChange = React.useCallback((field: string, value: any) => {
    setFormData(prev => {
      // Garantir que não estamos resetando acidentalmente
      const newData = { ...prev, [field]: value };
      return newData;
    });
  }, []);

  const handleContactEmailChange = (index: number, value: string) => {
    const newEmails = [...formData.contact_emails];
    newEmails[index] = value;
    setFormData(prev => ({ ...prev, contact_emails: newEmails }));
  };

  const addContactEmail = () => {
    setFormData(prev => ({
      ...prev,
      contact_emails: [...prev.contact_emails, '']
    }));
  };

  const removeContactEmail = (index: number) => {
    if (formData.contact_emails.length > 1) {
      const newEmails = formData.contact_emails.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, contact_emails: newEmails }));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFiles = [...photoFiles, ...files].slice(0, 10); // Máximo 10 fotos
      setPhotoFiles(newFiles);
      
      const newPreviews: string[] = [];
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === newFiles.length) {
            setPhotoPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    const newFiles = photoFiles.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    setPhotoFiles(newFiles);
    setPhotoPreviews(newPreviews);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validar campos obrigatórios antes de enviar
      if (!formData.name || !formData.acronym || !formData.description || 
          !formData.founded_year || !formData.location_map_url || 
          !formData.phone_number || formData.contact_emails.filter(e => e.trim()).length === 0) {
        toast.error('Por favor, preencha todos os campos obrigatórios');
        setLoading(false);
        return;
      }

      if (!logoFile && !logoPreview) {
        toast.error('É obrigatório fazer upload do logotipo');
        setLoading(false);
        return;
      }

      if (photoFiles.length < 2 && photoPreviews.length < 2) {
        toast.error('É obrigatório fazer upload de pelo menos 2 fotografias');
        setLoading(false);
        return;
      }

      if (!videoFile && !videoPreview) {
        toast.error('É obrigatório fazer upload do vídeo de apresentação');
        setLoading(false);
        return;
      }

      // 1. Atualizar dados básicos
      await profileService.updateProfile({
        name: formData.name,
        acronym: formData.acronym,
        description: formData.description,
        founded_year: formData.founded_year ? parseInt(formData.founded_year) : undefined,
        location_map_url: formData.location_map_url,
        phone_number: formData.phone_number,
        contact_emails: formData.contact_emails.filter(email => email.trim() !== ''),
      });

      // 2. Upload do logotipo (apenas se for novo arquivo)
      if (logoFile) {
        await profileService.uploadLogo(logoFile);
      }

      // 3. Upload das fotografias (apenas se houver novos arquivos)
      if (photoFiles.length >= 2) {
        await profileService.uploadPhotos(photoFiles);
      }

      // 4. Upload do vídeo (apenas se for novo arquivo)
      if (videoFile) {
        await profileService.uploadVideo(videoFile);
      }

      // 5. Verificar se o perfil está completo agora
      await checkProfileCompletion();
      await refreshUser();

      toast.success('Perfil atualizado com sucesso!');
      
      // Redirecionar após um breve delay
      setTimeout(() => {
        router.push('/admin');
      }, 1000);

    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar perfil. Tente novamente.');
      console.error('Erro ao atualizar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">A verificar perfil...</p>
        </div>
      </div>
    );
  }

  const completionPercentage = profileStatus?.completion_percentage || 0;
  const missingFields = profileStatus?.missing_fields || [];

  return (
    <ProtectedRoute requireCompleteProfile={false}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto" key="profile-form-container">
          <Card key="profile-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Completar Perfil da Instituição
              </CardTitle>
              <CardDescription>
                É obrigatório preencher todos os dados abaixo antes de acessar a plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Progresso */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progresso do Perfil</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {completionPercentage}%
                  </span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>

              {/* Alerta de campos faltantes */}
              {missingFields.length > 0 && (
                <Alert className="mb-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                    <strong>Campos obrigatórios faltantes:</strong>
                    <ul className="list-disc list-inside mt-2">
                      {missingFields.map((field, index) => (
                        <li key={index}>{field}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <form key="profile-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Nome completo */}
                <div>
                  <Label htmlFor="name">Nome Completo da Instituição *</Label>
                  <Input
                    id="name"
                    key="input-name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    placeholder="Ex: Instituto Médio de Luanda"
                  />
                </div>

                {/* Acrônimo */}
                <div>
                  <Label htmlFor="acronym">Acrônimo *</Label>
                  <Input
                    id="acronym"
                    value={formData.acronym}
                    onChange={(e) => handleInputChange('acronym', e.target.value)}
                    required
                    placeholder="Ex: IML"
                  />
                </div>

                {/* Logotipo */}
                <div>
                  <Label htmlFor="logo">Logotipo *</Label>
                  <div className="mt-2">
                    {logoPreview && (
                      <div className="mb-2 relative inline-block">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="h-24 w-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setLogoFile(null);
                            setLogoPreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                {/* Fotografias (mínimo 2) */}
                <div>
                  <Label htmlFor="photos">
                    2 Fotografias da Instituição * (mínimo 2)
                  </Label>
                  <div className="mt-2">
                    {photoPreviews.length > 0 && (
                      <div className="grid grid-cols-4 gap-4 mb-2">
                        {photoPreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Foto ${index + 1}`}
                              className="h-24 w-full object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <Input
                      id="photos"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotosChange}
                      className="cursor-pointer"
                    />
                    {photoFiles.length > 0 && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {photoFiles.length} foto(s) selecionada(s) 
                        {photoFiles.length < 2 && ' (necessário pelo menos 2)'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Vídeo de apresentação */}
                <div>
                  <Label htmlFor="video">Vídeo de Apresentação *</Label>
                  <div className="mt-2">
                    {videoPreview && (
                      <div className="mb-2">
                        <video
                          src={videoPreview}
                          controls
                          className="max-w-md rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setVideoFile(null);
                            setVideoPreview(null);
                          }}
                          className="mt-2 text-red-500 text-sm"
                        >
                          Remover vídeo
                        </button>
                      </div>
                    )}
                    <Input
                      id="video"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <Label htmlFor="description">Descrição *</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
                    placeholder="Descreva sua instituição..."
                  />
                </div>

                {/* Ano de fundação */}
                <div>
                  <Label htmlFor="founded_year">Ano de Fundação *</Label>
                  <Input
                    id="founded_year"
                    type="number"
                    value={formData.founded_year}
                    onChange={(e) => handleInputChange('founded_year', e.target.value)}
                    required
                    min="1900"
                    max={new Date().getFullYear()}
                    placeholder="Ex: 1990"
                  />
                </div>

                {/* Localização (Google Maps) */}
                <div>
                  <Label htmlFor="location_map_url">
                    Localização (Link do Google Maps) *
                  </Label>
                  <Input
                    id="location_map_url"
                    type="url"
                    value={formData.location_map_url}
                    onChange={(e) => handleInputChange('location_map_url', e.target.value)}
                    required
                    placeholder="https://maps.google.com/..."
                  />
                </div>

                {/* Telefone */}
                <div>
                  <Label htmlFor="phone_number">Número de Telefone *</Label>
                  <Input
                    id="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                    required
                    placeholder="Ex: +244 923 456 789"
                  />
                </div>

                {/* E-mails de contato */}
                <div>
                  <Label>E-mails de Contato * (mínimo 1)</Label>
                  {formData.contact_emails.map((email, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => handleContactEmailChange(index, e.target.value)}
                        required={index === 0}
                        placeholder="contato@instituicao.ao"
                        className="flex-1"
                      />
                      {formData.contact_emails.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeContactEmail(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addContactEmail}
                    className="mt-2"
                  >
                    Adicionar E-mail
                  </Button>
                </div>

                {/* Botão de submit */}
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="min-w-[150px]"
                  >
                    {loading ? 'A guardar...' : 'Guardar e Continuar'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}

