import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
}

interface NewsTabProps {
  news: NewsItem[];
  newsForm: { title: string; category: string; date: string };
  setNewsForm: (form: any) => void;
  addNews: () => void;
  deleteItem: (type: string, id: number) => void;
}

export default function NewsTab({ news, newsForm, setNewsForm, addNews, deleteItem }: NewsTabProps) {
  return (
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
            news.map((item: NewsItem) => (
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
  );
}
