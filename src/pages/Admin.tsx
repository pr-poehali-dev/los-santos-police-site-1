import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import SettingsTab from '@/components/admin/SettingsTab';
import RegistrationsTab from '@/components/admin/RegistrationsTab';
import NewsTab from '@/components/admin/NewsTab';
import AchievementsTab from '@/components/admin/AchievementsTab';
import GalleryTab from '@/components/admin/GalleryTab';

const API_URL = 'https://functions.poehali.dev/4718630c-6af3-4ca4-851c-1ea12eebe66e';
const REGISTER_API_URL = 'https://functions.poehali.dev/31833d3b-7eea-4b55-a913-2666e686a0ac';

export default function Admin() {
  const { toast } = useToast();
  const [news, setNews] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [settings, setSettings] = useState({
    hero_title: '',
    hero_subtitle: '',
    about_mission: '',
    about_history: ''
  });

  const [newsForm, setNewsForm] = useState({ title: '', category: '', date: '' });
  const [achievementForm, setAchievementForm] = useState({ title: '', recipient: '', date: '' });
  const [galleryForm, setGalleryForm] = useState({ image_url: '', caption: '' });

  useEffect(() => {
    fetchContent();
    fetchRegistrations();
  }, []);

  const fetchContent = async () => {
    try {
      const [newsRes, achievementsRes, galleryRes, settingsRes] = await Promise.all([
        fetch(`${API_URL}?type=news`),
        fetch(`${API_URL}?type=achievements`),
        fetch(`${API_URL}?type=gallery`),
        fetch(`${API_URL}?type=settings`)
      ]);

      setNews(await newsRes.json());
      setAchievements(await achievementsRes.json());
      setGallery(await galleryRes.json());
      setSettings(await settingsRes.json());
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить данные',
        variant: 'destructive'
      });
    }
  };

  const updateSettings = async () => {
    try {
      const response = await fetch(`${API_URL}?type=settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Настройки сайта обновлены' });
      } else {
        toast({ title: 'Ошибка', description: 'Не удалось обновить настройки', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Проблема с подключением', variant: 'destructive' });
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

        <Tabs defaultValue="settings">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="settings">Настройки</TabsTrigger>
            <TabsTrigger value="registrations">Регистрации</TabsTrigger>
            <TabsTrigger value="news">Новости</TabsTrigger>
            <TabsTrigger value="achievements">Награды</TabsTrigger>
            <TabsTrigger value="gallery">Галерея</TabsTrigger>
          </TabsList>

          <SettingsTab
            settings={settings}
            setSettings={setSettings}
            updateSettings={updateSettings}
          />

          <RegistrationsTab
            registrations={registrations}
            fetchRegistrations={fetchRegistrations}
            registerApiUrl={REGISTER_API_URL}
          />

          <NewsTab
            news={news}
            newsForm={newsForm}
            setNewsForm={setNewsForm}
            addNews={addNews}
            deleteItem={deleteItem}
          />

          <AchievementsTab
            achievements={achievements}
            achievementForm={achievementForm}
            setAchievementForm={setAchievementForm}
            addAchievement={addAchievement}
            deleteItem={deleteItem}
          />

          <GalleryTab
            gallery={gallery}
            galleryForm={galleryForm}
            setGalleryForm={setGalleryForm}
            addGalleryItem={addGalleryItem}
            deleteItem={deleteItem}
          />
        </Tabs>
      </div>
    </div>
  );
}
