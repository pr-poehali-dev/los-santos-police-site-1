import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface GalleryItem {
  id: number;
  image_url: string;
  caption: string;
}

interface GalleryTabProps {
  gallery: GalleryItem[];
  galleryForm: { image_url: string; caption: string };
  setGalleryForm: (form: any) => void;
  addGalleryItem: () => void;
  deleteItem: (type: string, id: number) => void;
}

export default function GalleryTab({ gallery, galleryForm, setGalleryForm, addGalleryItem, deleteItem }: GalleryTabProps) {
  return (
    <TabsContent value="gallery" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Добавить изображение</CardTitle>
          <CardDescription>Добавьте новое фото в галерею</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">URL изображения</label>
            <Input
              value={galleryForm.image_url}
              onChange={(e) => setGalleryForm({ ...galleryForm, image_url: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Описание (опционально)</label>
            <Textarea
              value={galleryForm.caption}
              onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
              placeholder="Краткое описание изображения"
              rows={2}
            />
          </div>
          <Button onClick={addGalleryItem} className="w-full">
            Добавить изображение
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Галерея</CardTitle>
        </CardHeader>
        <CardContent>
          {gallery.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Изображений пока нет</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((item: GalleryItem) => (
                <div key={item.id} className="relative group">
                  <img
                    src={item.image_url}
                    alt={item.caption || 'Gallery image'}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteItem('gallery', item.id)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                  {item.caption && (
                    <p className="text-xs text-muted-foreground mt-1">{item.caption}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
