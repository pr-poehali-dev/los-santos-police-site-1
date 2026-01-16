import { useState, useEffect } from 'react';
import NavigationBar from '@/components/landing/NavigationBar';
import HeroSection from '@/components/landing/HeroSection';
import ContentSections from '@/components/landing/ContentSections';
import RegistrationSection from '@/components/landing/RegistrationSection';

const API_URL = 'https://functions.poehali.dev/4718630c-6af3-4ca4-851c-1ea12eebe66e';
const REGISTER_API_URL = 'https://functions.poehali.dev/31833d3b-7eea-4b55-a913-2666e686a0ac';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [news, setNews] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [settings, setSettings] = useState({
    hero_title: 'Los Santos Police Department',
    hero_subtitle: 'Защищая и служа городу',
    about_mission: '',
    about_history: ''
  });
  const [registrationForm, setRegistrationForm] = useState({
    first_name: '',
    last_name: '',
    user_id: ''
  });

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const departments = [
    { title: 'Police Academy (PA)', icon: 'GraduationCap', description: 'Обучение и подготовка новых кадетов для службы в LSPD' },
    { title: 'Central Patrol Division (CPD)', icon: 'Car', description: 'Патрулирование улиц и обеспечение общественной безопасности' },
    { title: 'Police Academy Instructors (PAI)', icon: 'BookOpen', description: 'Опытные инструкторы по подготовке будущих офицеров' },
    { title: 'Internal Affairs Division (IAD)', icon: 'FileText', description: 'Контроль соблюдения дисциплины и расследование внутренних нарушений' },
    { title: 'Detective Bureau (DB)', icon: 'Search', description: 'Раскрытие сложных преступлений и проведение детективных расследований' },
    { title: 'Special Weapons And Tactical (SWAT)', icon: 'Shield', description: 'Элитное подразделение для проведения специальных операций' }
  ];

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [newsRes, achievementsRes, galleryRes, settingsRes] = await Promise.all([
          fetch(`${API_URL}?type=news`),
          fetch(`${API_URL}?type=achievements`),
          fetch(`${API_URL}?type=gallery`),
          fetch(`${API_URL}?type=settings`)
        ]);

        const newsData = await newsRes.json();
        const achievementsData = await achievementsRes.json();
        const galleryData = await galleryRes.json();
        const settingsData = await settingsRes.json();

        setNews(newsData);
        setAchievements(achievementsData);
        setGallery(galleryData);
        setSettings(settingsData);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <NavigationBar 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />

      <HeroSection 
        settings={settings} 
        scrollToSection={scrollToSection} 
      />

      <ContentSections 
        settings={settings}
        departments={departments}
        news={news}
        achievements={achievements}
        gallery={gallery}
      />

      <RegistrationSection 
        registrationForm={registrationForm}
        setRegistrationForm={setRegistrationForm}
        registerApiUrl={REGISTER_API_URL}
      />
    </div>
  );
}
