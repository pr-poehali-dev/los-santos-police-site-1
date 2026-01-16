import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const ranks = [
    { title: 'Chief of Police', badge: '⭐⭐⭐⭐', level: 10, description: 'Высшее руководство департамента' },
    { title: 'Deputy Chief', badge: '⭐⭐⭐', level: 9, description: 'Заместитель начальника полиции' },
    { title: 'Captain', badge: '⭐⭐', level: 8, description: 'Командир подразделения' },
    { title: 'Lieutenant', badge: '⭐', level: 7, description: 'Старший офицер' },
    { title: 'Sergeant', badge: '🔷', level: 6, description: 'Сержант полиции' },
    { title: 'Corporal', badge: '🔹', level: 5, description: 'Капрал полиции' },
    { title: 'Officer III', badge: '🔸', level: 4, description: 'Офицер III класса' },
    { title: 'Officer II', badge: '◽', level: 3, description: 'Офицер II класса' },
    { title: 'Officer I', badge: '◾', level: 2, description: 'Офицер I класса' },
    { title: 'Cadet', badge: '⬜', level: 1, description: 'Кадет академии' }
  ];

  const news = [
    { id: 1, title: 'Успешная операция по задержанию преступной группировки', date: '15.01.2026', category: 'Операция' },
    { id: 2, title: 'Новый набор в полицейскую академию', date: '12.01.2026', category: 'Академия' },
    { id: 3, title: 'Награждение лучших офицеров месяца', date: '10.01.2026', category: 'Награды' },
    { id: 4, title: 'Модернизация патрульных автомобилей', date: '08.01.2026', category: 'Обновление' }
  ];

  const achievements = [
    { title: 'Лучший офицер года', recipient: 'Officer John Smith', date: '2025' },
    { title: 'Героизм при исполнении', recipient: 'Sergeant Mike Johnson', date: '2025' },
    { title: 'За верность службе', recipient: 'Captain Sarah Williams', date: '2025' }
  ];

  const galleryImages = [
    'https://cdn.poehali.dev/projects/a03580d5-a1fd-4d9b-8638-987ce140bdec/files/f4d040e0-ea4d-4130-bc44-85c1cd77d927.jpg',
    'https://cdn.poehali.dev/projects/a03580d5-a1fd-4d9b-8638-987ce140bdec/files/a82c9030-4caf-42d6-8654-3b4683e01582.jpg',
    'https://cdn.poehali.dev/projects/a03580d5-a1fd-4d9b-8638-987ce140bdec/files/f89aaace-dea7-4916-a3f0-83dacd0a5aaf.jpg'
  ];

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
            <div className="hidden md:flex space-x-6">
              {['home', 'about', 'ranks', 'rules', 'contacts', 'gallery'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section ? 'text-secondary' : 'text-white hover:text-secondary'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'about' && 'О нас'}
                  {section === 'ranks' && 'Ранги'}
                  {section === 'rules' && 'Правила'}
                  {section === 'contacts' && 'Контакты'}
                  {section === 'gallery' && 'Галерея'}
                </button>
              ))}
            </div>
            <Button variant="secondary" className="hidden md:flex">
              Подать заявку
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="relative h-[600px] rounded-2xl overflow-hidden">
            <img
              src="https://cdn.poehali.dev/projects/a03580d5-a1fd-4d9b-8638-987ce140bdec/files/f4d040e0-ea4d-4130-bc44-85c1cd77d927.jpg"
              alt="LSPD Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 flex items-center">
              <div className="container mx-auto px-8">
                <h1 className="text-6xl md:text-7xl font-heading font-bold text-white mb-4 animate-fade-in">
                  Los Santos Police Department
                </h1>
                <p className="text-2xl text-secondary mb-8 animate-fade-in">
                  Защищая и служа городу
                </p>
                <div className="flex space-x-4">
                  <Button size="lg" variant="secondary" className="font-medium">
                    Вступить в ряды
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                    Узнать больше
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-primary hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Icon name="Newspaper" className="mx-auto mb-2 text-primary" size={40} />
                <CardTitle className="font-heading">Новости</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">Актуальные события департамента</p>
              </CardContent>
            </Card>
            <Card className="border-primary hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Icon name="Trophy" className="mx-auto mb-2 text-secondary" size={40} />
                <CardTitle className="font-heading">Достижения</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">Награды и успехи офицеров</p>
              </CardContent>
            </Card>
            <Card className="border-primary hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Icon name="GraduationCap" className="mx-auto mb-2 text-primary" size={40} />
                <CardTitle className="font-heading">Академия</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">Обучение и подготовка кадетов</p>
              </CardContent>
            </Card>
            <Card className="border-primary hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Icon name="Award" className="mx-auto mb-2 text-secondary" size={40} />
                <CardTitle className="font-heading">Премии</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">Система поощрений сотрудников</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-primary mb-8 text-center">
            О Департаменте
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-heading font-semibold text-primary mb-4">Наша Миссия</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Los Santos Police Department — это элитное подразделение на сервере Majestic RP, 
                  посвященное поддержанию порядка и защите граждан города. Мы стремимся создать 
                  безопасную среду для всех жителей и обеспечить справедливость.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-heading font-semibold text-primary mb-4">История</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Основанный в начале существования сервера, LSPD стал одной из самых уважаемых 
                  организаций. За годы службы наши офицеры провели тысячи операций и спасли 
                  бесчисленное количество жизней.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-heading font-semibold text-primary mb-4">Структура</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Icon name="CheckCircle" className="text-secondary mr-2 mt-1" size={20} />
                    <span className="text-muted-foreground">Патрульная служба</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="CheckCircle" className="text-secondary mr-2 mt-1" size={20} />
                    <span className="text-muted-foreground">Отдел расследований</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="CheckCircle" className="text-secondary mr-2 mt-1" size={20} />
                    <span className="text-muted-foreground">Спецподразделение SWAT</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="CheckCircle" className="text-secondary mr-2 mt-1" size={20} />
                    <span className="text-muted-foreground">Дорожная полиция</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="CheckCircle" className="text-secondary mr-2 mt-1" size={20} />
                    <span className="text-muted-foreground">Полицейская академия</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ranks" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-primary mb-12 text-center">
            Система Рангов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ranks.map((rank, index) => (
              <Card key={index} className="border-primary hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{rank.badge}</span>
                    <Badge variant="secondary">Уровень {rank.level}</Badge>
                  </div>
                  <CardTitle className="font-heading text-xl">{rank.title}</CardTitle>
                  <CardDescription>{rank.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="rules" className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-primary mb-12 text-center">
            Правила и Устав
          </h2>
          <Tabs defaultValue="general" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">Общие правила</TabsTrigger>
              <TabsTrigger value="conduct">Поведение</TabsTrigger>
              <TabsTrigger value="operations">Операции</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Основные положения</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">1.</span>
                    <p className="text-muted-foreground">Соблюдение субординации и уважение к вышестоящим офицерам обязательно</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">2.</span>
                    <p className="text-muted-foreground">Форма и внешний вид должны соответствовать регламенту департамента</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">3.</span>
                    <p className="text-muted-foreground">Применение силы разрешено только в рамках закона</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">4.</span>
                    <p className="text-muted-foreground">Конфиденциальность служебной информации должна строго соблюдаться</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="conduct" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Кодекс поведения</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">1.</span>
                    <p className="text-muted-foreground">Профессионализм в общении с гражданами и коллегами</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">2.</span>
                    <p className="text-muted-foreground">Запрет на коррупцию и злоупотребление служебным положением</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">3.</span>
                    <p className="text-muted-foreground">Честность и прозрачность во всех действиях</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">4.</span>
                    <p className="text-muted-foreground">Взаимопомощь и командная работа</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="operations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Оперативная деятельность</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">1.</span>
                    <p className="text-muted-foreground">Координация через радиосвязь обязательна во время патрулирования</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">2.</span>
                    <p className="text-muted-foreground">Документирование всех задержаний и инцидентов</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">3.</span>
                    <p className="text-muted-foreground">Соблюдение процедур при обыске и аресте</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">4.</span>
                    <p className="text-muted-foreground">Запрос подкрепления в опасных ситуациях</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-primary mb-12 text-center">
            Последние Новости
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {news.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{item.category}</Badge>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  <CardTitle className="font-heading text-lg">{item.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-primary mb-12 text-center">
            Награды и Достижения
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card key={index} className="border-secondary hover:shadow-xl transition-all">
                <CardHeader className="text-center">
                  <Icon name="Medal" className="mx-auto mb-4 text-secondary" size={48} />
                  <CardTitle className="font-heading text-lg">{achievement.title}</CardTitle>
                  <CardDescription>{achievement.recipient}</CardDescription>
                  <Badge variant="secondary" className="mt-2">{achievement.date}</Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-primary mb-12 text-center">
            Галерея
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Icon name="ZoomIn" className="text-white" size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-heading font-bold mb-4 text-center">
            Контакты
          </h2>
          <p className="text-center text-secondary mb-12">
            Хотите присоединиться к LSPD? Заполните форму ниже
          </p>
          <Card className="bg-white">
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Ваше имя</label>
                  <Input placeholder="Введите ваше имя в игре" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Discord</label>
                  <Input placeholder="Ваш Discord" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Опыт игры</label>
                  <Input placeholder="Сколько времени играете на сервере?" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Сообщение</label>
                  <Textarea placeholder="Расскажите, почему хотите вступить в LSPD" rows={4} />
                </div>
                <Button type="submit" className="w-full" variant="default">
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="Shield" className="text-primary" size={24} />
            </div>
            <span className="text-2xl font-heading font-bold">LSPD</span>
          </div>
          <p className="text-sm text-gray-400 mb-2">Los Santos Police Department</p>
          <p className="text-xs text-gray-500">Majestic RP | Защищая и служа городу</p>
        </div>
      </footer>
    </div>
  );
}
