import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Registration {
  id: number;
  first_name: string;
  last_name: string;
  user_id: string;
  created_at: string;
  is_admin: boolean;
  position?: string;
  department?: string;
}

interface RegistrationsTabProps {
  registrations: Registration[];
  fetchRegistrations: () => void;
  registerApiUrl: string;
}

export default function RegistrationsTab({ registrations, fetchRegistrations, registerApiUrl }: RegistrationsTabProps) {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ position: '', department: '' });

  const handleEditClick = (reg: Registration) => {
    setEditingId(reg.id);
    setEditForm({
      position: reg.position || 'Кадет',
      department: reg.department || 'Police Academy (PA)'
    });
  };

  const handleSavePosition = async (id: number) => {
    try {
      const response = await fetch(`${registerApiUrl}?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      
      if (response.ok) {
        toast({
          title: 'Успех',
          description: 'Должность и отдел обновлены'
        });
        setEditingId(null);
        fetchRegistrations();
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось обновить данные',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Проблема с подключением',
        variant: 'destructive'
      });
    }
  };

  return (
    <TabsContent value="registrations" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Список регистраций</CardTitle>
          <CardDescription>Управление пользователями, должностями и правами администратора</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {registrations.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Регистраций пока нет</p>
          ) : (
            <div className="space-y-4">
              {registrations.map((reg: Registration) => (
                <Card key={reg.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-xl">
                              {reg.first_name} {reg.last_name}
                            </h3>
                            {reg.is_admin && (
                              <Badge variant="default">
                                <Icon name="Star" size={14} className="mr-1" />
                                Администратор
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">Игровой ID: {reg.user_id}</p>
                          <p className="text-xs text-muted-foreground">
                            Зарегистрирован: {new Date(reg.created_at).toLocaleString('ru-RU')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {editingId === reg.id ? (
                            <>
                              <Button size="sm" onClick={() => handleSavePosition(reg.id)}>
                                <Icon name="Check" size={16} className="mr-1" />
                                Сохранить
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                                <Icon name="X" size={16} />
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => handleEditClick(reg)}>
                              <Icon name="Edit" size={16} className="mr-1" />
                              Изменить
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={async () => {
                              try {
                                const response = await fetch(`${registerApiUrl}?id=${reg.id}`, {
                                  method: 'DELETE'
                                });
                                
                                if (response.ok) {
                                  toast({ title: 'Успех', description: 'Регистрация удалена' });
                                  fetchRegistrations();
                                } else {
                                  toast({
                                    title: 'Ошибка',
                                    description: 'Не удалось удалить',
                                    variant: 'destructive'
                                  });
                                }
                              } catch (error) {
                                toast({
                                  title: 'Ошибка',
                                  description: 'Проблема с подключением',
                                  variant: 'destructive'
                                });
                              }
                            }}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>

                      {editingId === reg.id ? (
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Должность</label>
                            <Input
                              value={editForm.position}
                              onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                              placeholder="Введите должность"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Отдел</label>
                            <Input
                              value={editForm.department}
                              onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                              placeholder="Введите отдел"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                          <div>
                            <p className="text-sm text-muted-foreground">Должность</p>
                            <p className="font-semibold">{reg.position || 'Кадет'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Отдел</p>
                            <p className="font-semibold">{reg.department || 'Police Academy (PA)'}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-2 border-t">
                        <label className="text-sm font-medium">Права администратора</label>
                        <Switch
                          checked={reg.is_admin}
                          onCheckedChange={async (checked) => {
                            try {
                              const updateData = { is_admin: checked };
                              if (checked) {
                                Object.assign(updateData, {
                                  position: 'Администратор департамента',
                                  department: 'Административный'
                                });
                              }

                              const response = await fetch(`${registerApiUrl}?id=${reg.id}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(updateData)
                              });
                              
                              if (response.ok) {
                                toast({
                                  title: 'Успех',
                                  description: checked ? 'Роль администратора выдана' : 'Роль администратора удалена'
                                });
                                fetchRegistrations();
                              } else {
                                toast({
                                  title: 'Ошибка',
                                  description: 'Не удалось изменить роль',
                                  variant: 'destructive'
                                });
                              }
                            } catch (error) {
                              toast({
                                title: 'Ошибка',
                                description: 'Проблема с подключением',
                                variant: 'destructive'
                              });
                            }
                          }}
                        />
                        <Badge variant={reg.is_admin ? 'default' : 'outline'} className="ml-2">
                          {reg.is_admin ? 'Полный доступ' : 'Стандартный'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
