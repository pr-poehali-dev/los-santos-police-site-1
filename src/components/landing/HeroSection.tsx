import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  settings: {
    hero_title: string;
    hero_subtitle: string;
  };
  scrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ settings, scrollToSection }: HeroSectionProps) {
  return (
    <>
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
                  {settings.hero_title}
                </h1>
                <p className="text-2xl text-secondary mb-8 animate-fade-in">
                  {settings.hero_subtitle}
                </p>
                <div className="flex space-x-4">
                  <Button size="lg" variant="secondary" className="font-medium" onClick={() => scrollToSection('contacts')}>
                    Вступить в ряды
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white hover:text-primary" onClick={() => scrollToSection('about')}>
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
            <Card className="border-primary hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '#home'}>
              <CardHeader className="text-center">
                <Icon name="Newspaper" className="mx-auto mb-2 text-primary" size={40} />
                <CardTitle className="font-heading">Новости</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">Актуальные события департамента</p>
              </CardContent>
            </Card>
            <Card className="border-primary hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '#home'}>
              <CardHeader className="text-center">
                <Icon name="Trophy" className="mx-auto mb-2 text-secondary" size={40} />
                <CardTitle className="font-heading">Достижения</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">Награды и успехи офицеров</p>
              </CardContent>
            </Card>
            <Card className="border-primary hover:shadow-lg transition-shadow cursor-pointer" onClick={() => scrollToSection('departments')}>
              <CardHeader className="text-center">
                <Icon name="GraduationCap" className="mx-auto mb-2 text-primary" size={40} />
                <CardTitle className="font-heading">Академия</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">Обучение и подготовка кадетов</p>
              </CardContent>
            </Card>
            <Card className="border-primary hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = '#home'}>
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
    </>
  );
}
