import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface RegistrationSectionProps {
  registrationForm: {
    first_name: string;
    last_name: string;
    user_id: string;
  };
  setRegistrationForm: (form: any) => void;
  registerApiUrl: string;
}

export default function RegistrationSection({ registrationForm, setRegistrationForm, registerApiUrl }: RegistrationSectionProps) {
  const { toast } = useToast();

  return (
    <>
      <section id="contacts" className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-heading font-bold mb-4 text-center">
            Регистрация
          </h2>
          <p className="text-center text-secondary mb-12">
            Хотите присоединиться к LSPD? Зарегистрируйтесь на сайте
          </p>
          <Card className="bg-white">
            <CardContent className="pt-6">
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const response = await fetch(registerApiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(registrationForm)
                  });
                  
                  if (response.ok) {
                    toast({
                      title: 'Успешно!',
                      description: 'Вы зарегистрированы на сайте LSPD'
                    });
                    setRegistrationForm({ first_name: '', last_name: '', user_id: '' });
                  } else {
                    const error = await response.json();
                    toast({
                      title: 'Ошибка',
                      description: error.error || 'Не удалось зарегистрироваться',
                      variant: 'destructive'
                    });
                  }
                } catch (error) {
                  toast({
                    title: 'Ошибка',
                    description: 'Проблема с подключением к серверу',
                    variant: 'destructive'
                  });
                }
              }}>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Имя</label>
                  <Input
                    value={registrationForm.first_name}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, first_name: e.target.value })}
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Фамилия</label>
                  <Input
                    value={registrationForm.last_name}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, last_name: e.target.value })}
                    placeholder="Введите вашу фамилию"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">ID</label>
                  <Input
                    value={registrationForm.user_id}
                    onChange={(e) => setRegistrationForm({ ...registrationForm, user_id: e.target.value })}
                    placeholder="Введите ваш игровой ID"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" variant="default">
                  Зарегистрироваться
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
    </>
  );
}
