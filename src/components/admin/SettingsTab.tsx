import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TabsContent } from '@/components/ui/tabs';

interface SettingsTabProps {
  settings: {
    hero_title: string;
    hero_subtitle: string;
    about_mission: string;
    about_history: string;
  };
  setSettings: (settings: any) => void;
  updateSettings: () => void;
}

export default function SettingsTab({ settings, setSettings, updateSettings }: SettingsTabProps) {
  return (
    <TabsContent value="settings" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Основные настройки сайта</CardTitle>
          <CardDescription>Измените тексты на главной странице</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Заголовок главной страницы</label>
            <Input
              value={settings.hero_title}
              onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
              placeholder="Los Santos Police Department"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Подзаголовок главной страницы</label>
            <Input
              value={settings.hero_subtitle}
              onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
              placeholder="Защищая и служа городу"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Наша Миссия</label>
            <Textarea
              value={settings.about_mission}
              onChange={(e) => setSettings({ ...settings, about_mission: e.target.value })}
              placeholder="Описание миссии департамента"
              rows={4}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">История</label>
            <Textarea
              value={settings.about_history}
              onChange={(e) => setSettings({ ...settings, about_history: e.target.value })}
              placeholder="История департамента"
              rows={4}
            />
          </div>
          <Button onClick={updateSettings} className="w-full">
            Сохранить изменения
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
