import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [score, setScore] = useState(0);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const lessonBlocks = [
    { 
      id: 1, 
      title: 'Алфавит и произношение', 
      description: 'Основы английского языка', 
      completed: true, 
      day: 1,
      exercises: [
        {
          type: 'audio',
          question: 'Прослушайте и повторите звук буквы A',
          audio: 'letter-a',
          text: 'A [eɪ]'
        },
        {
          type: 'multiple-choice',
          question: 'Выберите правильное произношение буквы B',
          options: ['[biː]', '[beɪ]', '[baɪ]'],
          correct: 0
        }
      ]
    },
    { 
      id: 2, 
      title: 'Личные местоимения', 
      description: 'I, you, he, she, it, we, they', 
      completed: true, 
      day: 2,
      exercises: [
        {
          type: 'translation',
          question: 'Переведите: Я студент',
          correct: 'I am a student'
        },
        {
          type: 'multiple-choice',
          question: 'Выберите правильный перевод "Они работают"',
          options: ['They work', 'They works', 'They working'],
          correct: 0
        }
      ]
    },
    { 
      id: 3, 
      title: 'Глагол to be', 
      description: 'am, is, are - быть, являться', 
      completed: false, 
      day: 3,
      exercises: [
        {
          type: 'fill-blank',
          question: 'Заполните пропуск: She ___ a teacher',
          correct: 'is'
        },
        {
          type: 'multiple-choice',
          question: 'Выберите правильную форму: We ___ students',
          options: ['am', 'is', 'are'],
          correct: 2
        }
      ]
    },
    { id: 4, title: 'Числа 1-20', description: 'Основные числительные', completed: false, day: 4 },
    { id: 5, title: 'Цвета и формы', description: 'Colors and shapes vocabulary', completed: false, day: 5 },
    { id: 6, title: 'Семья', description: 'Family members vocabulary', completed: false, day: 6 }
  ];

  const sections = [
    { name: 'Уроки', icon: 'BookOpen', count: 365, action: () => {} },
    { name: 'Грамматика', icon: 'FileText', count: 45, action: () => {} },
    { name: 'Словарь', icon: 'Book', count: 3000, action: () => {} },
    { name: 'Тесты', icon: 'CheckSquare', count: 180, action: () => {} },
    { name: 'Прогресс', icon: 'TrendingUp', count: 0, action: () => setShowProgress(true) },
    { name: 'Аудирование', icon: 'Headphones', count: 120, action: () => {} },
    { name: 'Упражнения', icon: 'PenTool', count: 500, action: () => {} },
    { name: 'Профиль', icon: 'User', count: 0, action: () => {} },
    { name: 'Видео', icon: 'Play', count: 85, action: () => {} }
  ];

  const progressData = {
    weeklyProgress: [
      { week: 'Неделя 1', words: 45, grammar: 3, listening: 2 },
      { week: 'Неделя 2', words: 38, grammar: 2, listening: 3 },
      { week: 'Неделя 3', words: 52, grammar: 4, listening: 4 },
      { week: 'Неделя 4', words: 41, grammar: 3, listening: 3 }
    ],
    totalStats: {
      wordsLearned: 176,
      grammarLessons: 12,
      listeningHours: 8.5,
      testsCompleted: 24
    }
  };

  const vocabulary = [
    { word: 'Hello', translation: 'Привет', pronunciation: '[həˈloʊ]', audio: 'hello' },
    { word: 'Thank you', translation: 'Спасибо', pronunciation: '[θæŋk juː]', audio: 'thank-you' },
    { word: 'Good morning', translation: 'Доброе утро', pronunciation: '[ɡʊd ˈmɔːrnɪŋ]', audio: 'good-morning' },
    { word: 'Student', translation: 'Студент', pronunciation: '[ˈstuːdənt]', audio: 'student' },
    { word: 'Teacher', translation: 'Учитель', pronunciation: '[ˈtiːtʃər]', audio: 'teacher' }
  ];

  const handleExerciseAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentExercise]: answer }));
  };

  const nextExercise = () => {
    if (selectedLesson?.exercises && currentExercise < selectedLesson.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    } else {
      setExerciseCompleted(true);
    }
  };

  const playAudio = (audioId: string) => {
    setPlayingAudio(audioId);
    // Simulate audio playing
    setTimeout(() => setPlayingAudio(null), 1500);
  };

  const openLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setCurrentExercise(0);
    setAnswers({});
    setScore(0);
    setExerciseCompleted(false);
  };

  const renderExercise = (exercise: any) => {
    switch (exercise.type) {
      case 'audio':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <Button
                size="lg"
                className="bg-english-blue hover:bg-blue-600 text-white rounded-full w-20 h-20"
                onClick={() => playAudio(exercise.audio)}
                disabled={playingAudio === exercise.audio}
              >
                {playingAudio === exercise.audio ? (
                  <Icon name="Volume2" size={32} className="animate-pulse" />
                ) : (
                  <Icon name="Play" size={32} />
                )}
              </Button>
              <p className="mt-4 text-2xl font-bold text-english-blue">{exercise.text}</p>
            </div>
          </div>
        );
      
      case 'multiple-choice':
        return (
          <RadioGroup
            value={answers[currentExercise]}
            onValueChange={(value) => handleExerciseAnswer(value)}
          >
            {exercise.options.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-lg">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'translation':
        return (
          <Input
            placeholder="Введите перевод..."
            value={answers[currentExercise] || ''}
            onChange={(e) => handleExerciseAnswer(e.target.value)}
            className="text-lg p-4"
          />
        );
      
      case 'fill-blank':
        return (
          <Input
            placeholder="Введите слово..."
            value={answers[currentExercise] || ''}
            onChange={(e) => handleExerciseAnswer(e.target.value)}
            className="text-lg p-4"
          />
        );
      
      default:
        return null;
    }
  };

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
              <Card 
                key={section.name} 
                className="hover:shadow-md transition-shadow cursor-pointer group"
                onClick={section.action}
              >
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
              <Card 
                key={lesson.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${lesson.completed ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-blue-50'}`}
                onClick={() => lesson.exercises && openLesson(lesson)}
              >
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

      {/* Vocabulary Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">Словарь с произношением</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vocabulary.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-english-blue">{item.word}</h4>
                      <p className="text-gray-600">{item.translation}</p>
                      <p className="text-sm text-gray-500">{item.pronunciation}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-english-blue hover:bg-blue-50"
                      onClick={() => playAudio(item.audio)}
                      disabled={playingAudio === item.audio}
                    >
                      {playingAudio === item.audio ? (
                        <Icon name="Volume2" size={20} className="animate-pulse" />
                      ) : (
                        <Icon name="Volume2" size={20} />
                      )}
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

      {/* Interactive Lesson Dialog */}
      <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-english-blue">
              {selectedLesson?.title} - Интерактивное обучение
            </DialogTitle>
          </DialogHeader>
          
          {selectedLesson && !exerciseCompleted && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Badge variant="outline">
                  Упражнение {currentExercise + 1} из {selectedLesson.exercises?.length || 0}
                </Badge>
                <div className="text-sm text-gray-600">
                  Прогресс: {Math.round(((currentExercise) / (selectedLesson.exercises?.length || 1)) * 100)}%
                </div>
              </div>
              
              <Progress value={((currentExercise) / (selectedLesson.exercises?.length || 1)) * 100} className="h-2" />
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">
                  {selectedLesson.exercises?.[currentExercise]?.question}
                </h3>
                {selectedLesson.exercises?.[currentExercise] && renderExercise(selectedLesson.exercises[currentExercise])}
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedLesson(null)}
                >
                  Закрыть урок
                </Button>
                <Button 
                  onClick={nextExercise}
                  disabled={!answers[currentExercise]}
                  className="bg-english-blue hover:bg-blue-600"
                >
                  {currentExercise < (selectedLesson.exercises?.length || 1) - 1 ? 'Следующее' : 'Завершить'}
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
          
          {exerciseCompleted && (
            <div className="text-center space-y-6">
              <div className="text-6xl">🎉</div>
              <h3 className="text-2xl font-bold text-english-green">Урок завершен!</h3>
              <p className="text-gray-600">Отличная работа! Вы успешно прошли все упражнения.</p>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => setSelectedLesson(null)}>
                  Вернуться к урокам
                </Button>
                <Button variant="outline">
                  Скачать PDF урока
                  <Icon name="Download" size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Progress Dialog */}
      <Dialog open={showProgress} onOpenChange={setShowProgress}>
        <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-english-blue">Детальный прогресс обучения</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="charts">Графики</TabsTrigger>
              <TabsTrigger value="achievements">Достижения</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-english-blue">{progressData.totalStats.wordsLearned}</div>
                    <div className="text-sm text-gray-600">Слов изучено</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-english-green">{progressData.totalStats.grammarLessons}</div>
                    <div className="text-sm text-gray-600">Уроков грамматики</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-english-orange">{progressData.totalStats.listeningHours}</div>
                    <div className="text-sm text-gray-600">Часов аудирования</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-english-red">{progressData.totalStats.testsCompleted}</div>
                    <div className="text-sm text-gray-600">Тестов пройдено</div>
                  </CardContent>
                </Card>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Недельный прогресс</h4>
                <div className="space-y-4">
                  {progressData.weeklyProgress.map((week, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{week.week}</span>
                          <div className="flex space-x-4 text-sm">
                            <span className="text-english-blue">{week.words} слов</span>
                            <span className="text-english-green">{week.grammar} грамматика</span>
                            <span className="text-english-orange">{week.listening} аудирование</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="charts" className="space-y-6">
              <div className="text-center py-12">
                <Icon name="BarChart3" size={64} className="mx-auto mb-4 text-gray-400" />
                <h4 className="text-lg font-semibold mb-2">Графики прогресса</h4>
                <p className="text-gray-600">Здесь будут отображаться детальные графики вашего прогресса</p>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="text-2xl">🏆</div>
                    <div>
                      <h4 className="font-semibold">Первые шаги</h4>
                      <p className="text-sm text-gray-600">Завершили первый урок</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="text-2xl">📚</div>
                    <div>
                      <h4 className="font-semibold">Знаток слов</h4>
                      <p className="text-sm text-gray-600">Изучили 50+ слов</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

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