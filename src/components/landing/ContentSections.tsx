import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface ContentSectionsProps {
  settings: {
    about_mission: string;
    about_history: string;
  };
  departments: Array<{
    title: string;
    icon: string;
    description: string;
  }>;
  news: any[];
  achievements: any[];
  gallery: any[];
}

export default function ContentSections({ settings, departments, news, achievements, gallery }: ContentSectionsProps) {
  return (
    <>
      <section id="about" className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-primary mb-8 text-center">
            О Департаменте
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h3 className="text-2xl font-heading font-semibold text-primary mb-4">Наша Миссия</h3>
              <p className="text-muted-foreground leading-relaxed">
                {settings.about_mission}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-heading font-semibold text-primary mb-4">История</h3>
              <p className="text-muted-foreground leading-relaxed">
                {settings.about_history}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="departments" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-primary mb-12 text-center">
            Отделы нашего доблестного департамента
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="border-primary hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <Icon name={dept.icon as any} className="text-primary mb-4" size={48} />
                  <CardTitle className="font-heading text-xl">{dept.title}</CardTitle>
                  <CardDescription>{dept.description}</CardDescription>
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Общие правила</TabsTrigger>
              <TabsTrigger value="conduct">Поведение</TabsTrigger>
              <TabsTrigger value="operations">Операции</TabsTrigger>
              <TabsTrigger value="ooc">OOC</TabsTrigger>
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
            <TabsContent value="ooc" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">OOC правила</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">1.</span>
                    <p className="text-muted-foreground">Фриковство строго запрещено на территории департамента и во время службы</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">2.</span>
                    <p className="text-muted-foreground">Соблюдайте ролевое отыгрывание в любых ситуациях</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">3.</span>
                    <p className="text-muted-foreground">Неадекватное поведение вне игровой роли влечет дисциплинарные меры</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-secondary font-bold mr-3">4.</span>
                    <p className="text-muted-foreground">Уважайте других игроков и соблюдайте правила сервера</p>
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
          {news.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Новостей пока нет</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {news.map((item: any) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{item.category}</Badge>
                      <span className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <CardTitle className="font-heading text-lg">{item.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-primary mb-12 text-center">
            Награды и Достижения
          </h2>
          {achievements.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Наград пока нет</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {achievements.map((achievement: any) => (
                <Card key={achievement.id} className="border-secondary hover:shadow-xl transition-all">
                  <CardHeader className="text-center">
                    <Icon name="Medal" className="mx-auto mb-4 text-secondary" size={48} />
                    <CardTitle className="font-heading text-lg">{achievement.title}</CardTitle>
                    <CardDescription>{achievement.recipient}</CardDescription>
                    <Badge variant="secondary" className="mt-2">{achievement.date}</Badge>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="gallery" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-primary mb-12 text-center">
            Галерея
          </h2>
          {gallery.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Изображений пока нет</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gallery.map((item: any) => (
                <div key={item.id} className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
                  <img
                    src={item.image_url}
                    alt={item.caption || 'Gallery image'}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="ZoomIn" className="text-white" size={32} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
