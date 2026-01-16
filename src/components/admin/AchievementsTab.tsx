import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Achievement {
  id: number;
  title: string;
  recipient: string;
  date: string;
}

interface AchievementsTabProps {
  achievements: Achievement[];
  achievementForm: { title: string; recipient: string; date: string };
  setAchievementForm: (form: any) => void;
  addAchievement: () => void;
  deleteItem: (type: string, id: number) => void;
}

export default function AchievementsTab({ achievements, achievementForm, setAchievementForm, addAchievement, deleteItem }: AchievementsTabProps) {
  return (
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
            achievements.map((item: Achievement) => (
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
  );
}
