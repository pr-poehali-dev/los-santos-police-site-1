import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const REGISTER_API_URL = 'https://functions.poehali.dev/31833d3b-7eea-4b55-a913-2666e686a0ac';

export default function Profile() {
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(REGISTER_API_URL);
        const data = await response.json();
        
        if (data.length > 0) {
          setUserData(data[0]);
        }
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить данные профиля',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <p className="text-white text-xl">Загрузка...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Профиль не найден</CardTitle>
            <CardDescription>Пожалуйста, зарегистрируйтесь на главной странице</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/'} className="w-full">
              На главную
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const initials = `${userData.first_name?.[0] || ''}${userData.last_name?.[0] || ''}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <nav className="fixed top-0 left-0 right-0 bg-primary/95 backdrop-blur-sm border-b border-secondary/20 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="Shield" className="text-primary" size={24} />
              </div>
              <span className="text-xl font-heading font-bold text-white">LSPD</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="text-white border-white" onClick={() => window.location.href = '/'}>
                <Icon name="Home" size={20} className="mr-2" />
                На главную
              </Button>
              {userData.is_admin && (
                <Button variant="secondary" onClick={() => window.location.href = '/admin'}>
                  <Icon name="Settings" size={20} className="mr-2" />
                  Админ-панель
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto space-y-6">
          <Card className="border-secondary">
            <CardHeader className="bg-primary text-white">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24 border-4 border-secondary">
                  <AvatarFallback className="text-3xl bg-secondary text-primary font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-3xl font-heading mb-2">
                    {userData.first_name} {userData.last_name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-base">
                      ID: {userData.user_id}
                    </Badge>
                    {userData.is_admin && (
                      <Badge className="text-base bg-secondary text-primary">
                        <Icon name="Star" size={16} className="mr-1" />
                        Администратор
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Info" className="mr-2 text-primary" size={24} />
                  Личная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Имя</p>
                  <p className="text-lg font-semibold">{userData.first_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Фамилия</p>
                  <p className="text-lg font-semibold">{userData.last_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Игровой ID</p>
                  <p className="text-lg font-semibold">{userData.user_id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Дата регистрации</p>
                  <p className="text-lg font-semibold">
                    {new Date(userData.created_at).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Award" className="mr-2 text-secondary" size={24} />
                  Статус в департаменте
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Должность</p>
                  <p className="text-lg font-semibold">
                    {userData.is_admin ? 'Администратор департамента' : 'Кадет'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Отдел</p>
                  <p className="text-lg font-semibold">
                    {userData.is_admin ? 'Административный' : 'Police Academy (PA)'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Уровень доступа</p>
                  <Badge variant={userData.is_admin ? 'default' : 'outline'} className="text-base">
                    {userData.is_admin ? 'Полный доступ' : 'Стандартный'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Activity" className="mr-2 text-primary" size={24} />
                Активность
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <Icon name="Clock" className="mx-auto mb-2 text-primary" size={32} />
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-sm text-muted-foreground">Часов на службе</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Icon name="CheckCircle" className="mx-auto mb-2 text-secondary" size={32} />
                  <p className="text-2xl font-bold text-secondary">0</p>
                  <p className="text-sm text-muted-foreground">Выполнено заданий</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Icon name="Trophy" className="mx-auto mb-2 text-primary" size={32} />
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-sm text-muted-foreground">Получено наград</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="FileText" className="mr-2 text-primary" size={24} />
                История операций
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                История операций пуста. Начните службу, чтобы увидеть записи здесь.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
