import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationBarProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export default function NavigationBar({ activeSection, scrollToSection }: NavigationBarProps) {
  return (
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
            {['home', 'about', 'departments', 'rules', 'contacts', 'gallery'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === section ? 'text-secondary' : 'text-white hover:text-secondary'
                }`}
              >
                {section === 'home' && 'Главная'}
                {section === 'about' && 'О нас'}
                {section === 'departments' && 'Отделы'}
                {section === 'rules' && 'Правила'}
                {section === 'contacts' && 'Контакты'}
                {section === 'gallery' && 'Галерея'}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="hidden md:flex text-white border-white hover:bg-white hover:text-primary" onClick={() => window.location.href = '/profile'}>
              <Icon name="User" size={20} className="mr-2" />
              Профиль
            </Button>
            <Button variant="secondary" className="hidden md:flex" onClick={() => scrollToSection('contacts')}>
              Подать заявку
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}