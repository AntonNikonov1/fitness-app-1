"use client";

import React from "react";
import { useUser } from "../contexts/UserContext";
import { useNotifications } from "../contexts/NotificationContext";
import {
  Calendar,
  Dumbbell,
  Utensils,
  Droplet,
  Award,
  ArrowRight,
} from "lucide-react";

const Home: React.FC = () => {
  const { user } = useUser();
  const { addNotification } = useNotifications();

  const [waterIntake, setWaterIntake] = React.useState(0);
  const [dailyTip, setDailyTip] = React.useState("");

  React.useEffect(() => {
    const tips = [
      "Регулярные тренировки улучшают настроение благодаря выработке эндорфинов.",
      "Белок помогает восстанавливать мышцы после тренировок.",
      "Сон не менее 7 часов критически важен для восстановления и прогресса.",
      "Разнообразие в питании обеспечивает организм всеми необходимыми питательными веществами.",
      "Растяжка после тренировки помогает уменьшить мышечную боль.",
      "Постепенное увеличение нагрузки - ключ к безопасному прогрессу.",
      "Вода составляет около 60% массы тела и необходима для всех функций организма.",
    ];

    setDailyTip(tips[Math.floor(Math.random() * tips.length)]);

    // Добавляем уведомление с советом дня
    addNotification(tips[Math.floor(Math.random() * tips.length)], "tip");
  }, []);

  const increaseWater = () => {
    setWaterIntake((prev) => prev + 250);
    if (waterIntake === 1750) {
      addNotification(
        "Поздравляем! Вы достигли дневной нормы воды!",
        "achievement"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-16 md:pb-0">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Привет,{" "}
          {user?.goal === "weightLoss"
            ? "худеющий"
            : user?.goal === "muscleGain"
            ? "качок"
            : "спортсмен"}
          !
        </h1>
        <p className="text-zinc-400">
          Сегодня отличный день для достижения ваших целей!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Сегодня</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Тренировка</span>
              <span className="text-sm font-medium bg-yellow-500/20 text-yellow-400 py-1 px-3 rounded-full">
                Запланировано
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Калории</span>
              <span className="text-sm font-medium">1200 / 1800 ккал</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Вода</span>
              <span className="text-sm font-medium">
                {waterIntake} / 2000 мл
              </span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
              <Dumbbell className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Тренировка</h2>
          </div>
          <p className="text-zinc-400 mb-4">
            Сегодня:{" "}
            {user?.goal === "weightLoss"
              ? "Кардио 30 мин"
              : "Силовая тренировка"}
          </p>
          <button className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl transition duration-150 ease-in-out">
            Начать тренировку
          </button>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
              <Utensils className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Питание</h2>
          </div>
          <p className="text-zinc-400 mb-4">Следующий приём пищи: Обед</p>
          <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-xl transition duration-150 ease-in-out">
            Посмотреть меню
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-3">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Совет дня</h2>
          </div>
          <p className="text-zinc-400">{dailyTip}</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
              <Droplet className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Водный баланс</h2>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full bg-zinc-800 rounded-full h-4 mb-4">
              <div
                className="bg-gradient-to-r from-blue-400 to-cyan-500 h-4 rounded-full"
                style={{
                  width: `${Math.min((waterIntake / 2000) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <p className="text-zinc-400 mb-4">{waterIntake} / 2000 мл</p>
            <button
              onClick={increaseWater}
              className="py-2 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-medium rounded-xl transition duration-150 ease-in-out"
            >
              + 250 мл
            </button>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">
            Ближайшие челленджи
          </h2>
          <button className="text-green-400 hover:text-green-300 flex items-center text-sm">
            Все челленджи
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl">
            <div>
              <h3 className="font-medium text-white">7 дней без сладкого</h3>
              <p className="text-sm text-zinc-400">Начинается завтра</p>
            </div>
            <button className="py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-xl transition duration-150 ease-in-out">
              Участвовать
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl">
            <div>
              <h3 className="font-medium text-white">10,000 шагов в день</h3>
              <p className="text-sm text-zinc-400">Начинается через 3 дня</p>
            </div>
            <button className="py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-xl transition duration-150 ease-in-out">
              Участвовать
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">
            Быстрый доступ
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-600/20 hover:from-green-500/30 hover:to-emerald-600/30 rounded-xl flex flex-col items-center justify-center transition-colors">
              <Dumbbell className="w-8 h-8 text-green-400 mb-2" />
              <span className="text-white">Тренировки</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-600/20 hover:from-purple-500/30 hover:to-pink-600/30 rounded-xl flex flex-col items-center justify-center transition-colors">
              <Utensils className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-white">Рецепты</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 hover:from-blue-500/30 hover:to-cyan-600/30 rounded-xl flex flex-col items-center justify-center transition-colors">
              <Calendar className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-white">Календарь</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-amber-500/20 to-yellow-600/20 hover:from-amber-500/30 hover:to-yellow-600/30 rounded-xl flex flex-col items-center justify-center transition-colors">
              <Award className="w-8 h-8 text-amber-400 mb-2" />
              <span className="text-white">Достижения</span>
            </button>
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">
            Прогресс недели
          </h2>
          <div className="grid grid-cols-7 gap-2">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    index === 0 || index === 2
                      ? "bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-400"
                      : index < 5
                      ? "bg-zinc-800 text-zinc-300"
                      : "bg-zinc-800/50 text-zinc-500"
                  }`}
                >
                  {day}
                </div>
                <span className="text-xs text-zinc-500">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
