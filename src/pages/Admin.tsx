import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const API_URL = 'https://functions.poehali.dev/4718630c-6af3-4ca4-851c-1ea12eebe66e';
const REGISTER_API_URL = 'https://functions.poehali.dev/31833d3b-7eea-4b55-a913-2666e686a0ac';

export default function Admin() {
  const { toast } = useToast();
  const [news, setNews] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [newsForm, setNewsForm] = useState({ title: '', category: '', date: '' });
  const [achievementForm, setAchievementForm] = useState({ title: '', recipient: '', date: '' });
  const [galleryForm, setGalleryForm] = useState({ image_url: '', caption: '' });

  useEffect(() => {
    fetchContent();
    fetchRegistrations();
  }, []);

  const fetchContent = async () => {
    try {
      const [newsRes, achievementsRes, galleryRes] = await Promise.all([
        fetch(`${API_URL}?type=news`),
        fetch(`${API_URL}?type=achievements`),
        fetch(`${API_URL}?type=gallery`)
      ]);

      setNews(await newsRes.json());
      setAchievements(await achievementsRes.json());
      setGallery(await galleryRes.json());
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить данные',
        variant: 'destructive'
      });
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await fetch(REGISTER_API_URL);
      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить регистрации',
        variant: 'destructive'
      });
    }
  };

  const addNews = async () => {
    try {
      const response = await fetch(`${API_URL}?type=news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsForm)
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Новость добавлена' });
        setNewsForm({ title: '', category: '', date: '' });
        fetchContent();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить новость', variant: 'destructive' });
    }
  };

  const addAchievement = async () => {
    try {
      const response = await fetch(`${API_URL}?type=achievements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(achievementForm)
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Награда добавлена' });
        setAchievementForm({ title: '', recipient: '', date: '' });
        fetchContent();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить награду', variant: 'destructive' });
    }
  };

  const addGalleryItem = async () => {
    try {
      const response = await fetch(`${API_URL}?type=gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryForm)
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Изображение добавлено' });
        setGalleryForm({ image_url: '', caption: '' });
        fetchContent();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить изображение', variant: 'destructive' });
    }
  };

  const deleteItem = async (type: string, id: number) => {
    try {
      const response = await fetch(`${API_URL}?type=${type}&id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Удалено' });
        fetchContent();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary">
            Панель администратора LSPD
          </h1>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            <Icon name="Home" size={20} className="mr-2" />
            На главную
          </Button>
        </div>

        <Tabs defaultValue="registrations">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="registrations">Регистрации</TabsTrigger>
            <TabsTrigger value="news">Новости</TabsTrigger>
            <TabsTrigger value="achievements">Награды</TabsTrigger>
            <TabsTrigger value="gallery">Галерея</TabsTrigger>
          </TabsList>

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
                    {registrations.map((reg: any) => (
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
                                  const response = await fetch(`${REGISTER_API_URL}?id=${reg.id}`, {
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
                                const response = await fetch(`${REGISTER_API_URL}?id=${reg.id}`, {
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


          <TabsContent value="news" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Добавить новость</CardTitle>
                <CardDescription>Создайте новую запись для раздела новостей</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Заголовок</label>
                  <Input
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    placeholder="Введите заголовок новости"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Категория</label>
                  <Input
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    placeholder="Например: Операция, Академия"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Дата (YYYY-MM-DD)</label>
                  <Input
                    type="date"
                    value={newsForm.date}
                    onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                  />
                </div>
                <Button onClick={addNews} className="w-full">
                  Добавить новость
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Список новостей</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {news.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">Новостей пока нет</p>
                ) : (
                  news.map((item: any) => (
                    <div key={item.id} className="flex items-start justify-between border-b pb-3">
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.category} • {item.date}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteItem('news', item.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Добавить награду</CardTitle>
                <CardDescription>Создайте новую запись для раздела наград</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Название награды</label>
                  <Input
                    value={achievementForm.title}
                    onChange={(e) => setAchievementForm({ ...achievementForm, title: e.target.value })}
                    placeholder="Например: Лучший офицер года"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Получатель</label>
                  <Input
                    value={achievementForm.recipient}
                    onChange={(e) => setAchievementForm({ ...achievementForm, recipient: e.target.value })}
                    placeholder="Имя получателя"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Год</label>
                  <Input
                    value={achievementForm.date}
                    onChange={(e) => setAchievementForm({ ...achievementForm, date: e.target.value })}
                    placeholder="2026"
                  />
                </div>
                <Button onClick={addAchievement} className="w-full">
                  Добавить награду
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Список наград</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">Наград пока нет</p>
                ) : (
                  achievements.map((item: any) => (
                    <div key={item.id} className="flex items-start justify-between border-b pb-3">
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.recipient} • {item.date}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteItem('achievements', item.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Добавить изображение</CardTitle>
                <CardDescription>Добавьте новое фото в галерею</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">URL изображения</label>
                  <Input
                    value={galleryForm.image_url}
                    onChange={(e) => setGalleryForm({ ...galleryForm, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Описание (опционально)</label>
                  <Textarea
                    value={galleryForm.caption}
                    onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                    placeholder="Краткое описание изображения"
                    rows={2}
                  />
                </div>
                <Button onClick={addGalleryItem} className="w-full">
                  Добавить изображение
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Галерея</CardTitle>
              </CardHeader>
              <CardContent>
                {gallery.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">Изображений пока нет</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gallery.map((item: any) => (
                      <div key={item.id} className="relative group">
                        <img
                          src={item.image_url}
                          alt={item.caption || 'Gallery image'}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => deleteItem('gallery', item.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                        {item.caption && (
                          <p className="text-xs text-muted-foreground mt-1">{item.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}