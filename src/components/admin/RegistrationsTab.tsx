import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
}

interface RegistrationsTabProps {
  registrations: Registration[];
  fetchRegistrations: () => void;
  registerApiUrl: string;
}

export default function RegistrationsTab({ registrations, fetchRegistrations, registerApiUrl }: RegistrationsTabProps) {
  const { toast } = useToast();

  return (
    <TabsContent value="registrations" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Список регистраций</CardTitle>
          <CardDescription>Управление пользователями и выдача роли администратора</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {registrations.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Регистраций пока нет</p>
          ) : (
            <div className="space-y-3">
              {registrations.map((reg: Registration) => (
                <div key={reg.id} className="flex items-center justify-between border rounded-lg p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">
                        {reg.first_name} {reg.last_name}
                      </h3>
                      {reg.is_admin && (
                        <Badge variant="default">Администратор</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">ID: {reg.user_id}</p>
                    <p className="text-xs text-muted-foreground">
                      Зарегистрирован: {new Date(reg.created_at).toLocaleString('ru-RU')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Админ</label>
                      <Switch
                        checked={reg.is_admin}
                        onCheckedChange={async (checked) => {
                          try {
                            const response = await fetch(`${registerApiUrl}?id=${reg.id}`, {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ is_admin: checked })
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
                    </div>
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
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
