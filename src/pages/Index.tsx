import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const lessonBlocks = [
    { id: 1, title: 'Алфавит и произношение', description: 'Основы английского языка', completed: true, day: 1 },
    { id: 2, title: 'Личные местоимения', description: 'I, you, he, she, it, we, they', completed: true, day: 2 },
    { id: 3, title: 'Глагол to be', description: 'am, is, are - быть, являться', completed: false, day: 3 },
    { id: 4, title: 'Числа 1-20', description: 'Основные числительные', completed: false, day: 4 },
    { id: 5, title: 'Цвета и формы', description: 'Colors and shapes vocabulary', completed: false, day: 5 },
    { id: 6, title: 'Семья', description: 'Family members vocabulary', completed: false, day: 6 }
  ];

  const sections = [
    { name: 'Уроки', icon: 'BookOpen', count: 365 },
    { name: 'Грамматика', icon: 'FileText', count: 45 },
    { name: 'Словарь', icon: 'Book', count: 3000 },
    { name: 'Тесты', icon: 'CheckSquare', count: 180 },
    { name: 'Прогресс', icon: 'TrendingUp', count: 0 },
    { name: 'Аудирование', icon: 'Headphones', count: 120 },
    { name: 'Упражнения', icon: 'PenTool', count: 500 },
    { name: 'Профиль', icon: 'User', count: 0 },
    { name: 'Видео', icon: 'Play', count: 85 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-english-blue">ENGLISH 365</h1>
              <Badge variant="secondary" className="bg-english-green text-white">
                День 2 из 365
              </Badge>
            </div>
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" size="sm">
                <Icon name="Menu" size={20} />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Английский язык за 365 дней
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Достигните уровня B2 за год с помощью структурированных уроков, интерактивных упражнений и постоянной практики
          </p>
          
          {/* Progress Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-english-blue mb-2">2</div>
                <div className="text-gray-600">Дней изучения</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-english-green mb-2">45</div>
                <div className="text-gray-600">Слов выучено</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-english-orange mb-2">0.5%</div>
                <div className="text-gray-600">Прогресс к B2</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Общий прогресс</span>
                <span>2/365 дней</span>
              </div>
              <Progress value={0.5} className="h-3" />
            </div>
          </div>

          <Button size="lg" className="bg-english-blue hover:bg-blue-600 text-white px-8 py-3 text-lg">
            Продолжить обучение
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Navigation Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">Разделы обучения</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {sections.map((section) => (
              <Card key={section.name} className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 text-english-blue group-hover:scale-110 transition-transform">
                    <Icon name={section.icon as any} size={32} />
                  </div>
                  <h4 className="font-semibold mb-2">{section.name}</h4>
                  <p className="text-sm text-gray-600">{section.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lesson Blocks */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-2xl font-bold">Текущие уроки</h3>
            <Button variant="outline">
              Все уроки
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessonBlocks.map((lesson) => (
              <Card key={lesson.id} className={`cursor-pointer transition-all hover:shadow-lg ${lesson.completed ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-blue-50'}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant={lesson.completed ? "default" : "secondary"} className={lesson.completed ? 'bg-english-green text-white' : ''}>
                      День {lesson.day}
                    </Badge>
                    {lesson.completed && (
                      <Icon name="CheckCircle" size={20} className="text-english-green" />
                    )}
                  </div>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{lesson.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Icon name="BookOpen" size={16} className="text-gray-400" />
                      <Icon name="Headphones" size={16} className="text-gray-400" />
                      <Icon name="Mic" size={16} className="text-gray-400" />
                      <Icon name="Download" size={16} className="text-gray-400" />
                    </div>
                    <Button size="sm" variant={lesson.completed ? "secondary" : "default"}>
                      {lesson.completed ? 'Повторить' : 'Начать'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-english-blue to-english-green text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Полный курс английского языка</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Icon name="Target" size={48} className="mx-auto mb-4 opacity-90" />
              <h4 className="font-semibold mb-2">Структурированный план</h4>
              <p className="text-sm opacity-90">365 дней до уровня B2</p>
            </div>
            <div className="text-center">
              <Icon name="Volume2" size={48} className="mx-auto mb-4 opacity-90" />
              <h4 className="font-semibold mb-2">Аудио и произношение</h4>
              <p className="text-sm opacity-90">Озвучка всех материалов</p>
            </div>
            <div className="text-center">
              <Icon name="Brain" size={48} className="mx-auto mb-4 opacity-90" />
              <h4 className="font-semibold mb-2">Интерактивные тесты</h4>
              <p className="text-sm opacity-90">Запоминание и практика</p>
            </div>
            <div className="text-center">
              <Icon name="FileDown" size={48} className="mx-auto mb-4 opacity-90" />
              <h4 className="font-semibold mb-2">PDF материалы</h4>
              <p className="text-sm opacity-90">Скачивание уроков</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h4 className="text-2xl font-bold mb-4">ENGLISH 365</h4>
          <p className="text-gray-400 mb-8">Английский язык за 365 дней до уровня B2</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">О проекте</a>
            <a href="#" className="hover:text-white transition-colors">Методика</a>
            <a href="#" className="hover:text-white transition-colors">Поддержка</a>
            <a href="#" className="hover:text-white transition-colors">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;