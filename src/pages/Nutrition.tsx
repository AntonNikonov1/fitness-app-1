"use client"

import type React from "react"
import { useState } from "react"
import { useUser } from "../contexts/UserContext"
import { Camera, Plus, X, Calendar, ArrowRight } from "lucide-react"

interface MealPlan {
  day: string
  meals: {
    name: string
    time: string
    foods: string[]
    calories: number
    protein: number
    carbs: number
    fat: number
  }[]
}

const Nutrition: React.FC = () => {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState<"plan" | "calculator">("plan")
  const [showCamera, setShowCamera] = useState(false)
  const [analyzedFood, setAnalyzedFood] = useState<null | {
    name: string
    calories: number
    protein: number
    carbs: number
    fat: number
    sugar: number
    isHealthy: boolean
  }>(null)

  // Пример недельного плана питания
  const weeklyPlan: MealPlan[] = [
    {
      day: "Понедельник",
      meals: [
        {
          name: "Завтрак",
          time: "08:00",
          foods: ["Овсянка с ягодами", "Греческий йогурт", "Зеленый чай"],
          calories: 450,
          protein: 20,
          carbs: 65,
          fat: 10,
        },
        {
          name: "Обед",
          time: "13:00",
          foods: ["Куриная грудка на гриле", "Киноа с овощами", "Салат из свежих овощей"],
          calories: 550,
          protein: 40,
          carbs: 45,
          fat: 15,
        },
        {
          name: "Ужин",
          time: "19:00",
          foods: ["Запеченная рыба", "Брокколи на пару", "Бурый рис"],
          calories: 480,
          protein: 35,
          carbs: 40,
          fat: 15,
        },
      ],
    },
    {
      day: "Вторник",
      meals: [
        {
          name: "Завтрак",
          time: "08:00",
          foods: ["Омлет из яичных белков с овощами", "Цельнозерновой тост", "Фрукты"],
          calories: 420,
          protein: 25,
          carbs: 50,
          fat: 12,
        },
        {
          name: "Обед",
          time: "13:00",
          foods: ["Индейка с овощами", "Сладкий картофель", "Зеленый салат"],
          calories: 520,
          protein: 35,
          carbs: 50,
          fat: 15,
        },
        {
          name: "Ужин",
          time: "19:00",
          foods: ["Тушеная говядина", "Киноа", "Тушеные овощи"],
          calories: 510,
          protein: 40,
          carbs: 35,
          fat: 18,
        },
      ],
    },
  ]

  const takePicture = () => {
    // Имитация фотографирования и анализа еды
    setShowCamera(false)

    // Имитация задержки анализа
    setTimeout(() => {
      setAnalyzedFood({
        name: "Куриный салат с авокадо",
        calories: 320,
        protein: 25,
        carbs: 15,
        fat: 18,
        sugar: 3,
        isHealthy: true,
      })
    }, 1500)
  }

  const closeAnalysis = () => {
    setAnalyzedFood(null)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Питание</h1>
        <p className="text-gray-600 dark:text-gray-400">Управляйте своим рационом и отслеживайте потребление калорий</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("plan")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "plan"
                  ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              План питания
            </button>
            <button
              onClick={() => setActiveTab("calculator")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "calculator"
                  ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Калькулятор калорий
            </button>
          </nav>
        </div>

        <div className="p-4">
          {activeTab === "plan" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Недельный план питания</h2>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Неделя 1</span>
                </div>
              </div>

              <div className="space-y-6">
                {weeklyPlan.map((day, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {day.day}
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {day.meals.map((meal, mealIndex) => (
                        <div key={mealIndex} className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">{meal.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{meal.time}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900 dark:text-white">{meal.calories} ккал</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Б: {meal.protein}г • Ж: {meal.fat}г • У: {meal.carbs}г
                              </p>
                            </div>
                          </div>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {meal.foods.map((food, foodIndex) => (
                              <li key={foodIndex}>• {food}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Показать больше дней
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {activeTab === "calculator" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Калькулятор калорий</h2>
                <button
                  onClick={() => setShowCamera(true)}
                  className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  <Camera className="w-4 h-4 mr-1" />
                  Сфотографировать еду
                </button>
              </div>

              {showCamera && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-md w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Сделайте фото еды</h3>
                      <button
                        onClick={() => setShowCamera(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-video flex items-center justify-center mb-4">
                      <Camera className="w-16 h-16 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={takePicture}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Сделать фото
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {analyzedFood && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Результат анализа</h3>
                    <button
                      onClick={closeAnalysis}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{analyzedFood.name}</p>
                    <div
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        analyzedFood.isHealthy
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {analyzedFood.isHealthy ? "Полезно" : "Не рекомендуется"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Калории</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        {analyzedFood.calories} ккал
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Сахар</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{analyzedFood.sugar}г</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4">
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Белки</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{analyzedFood.protein}г</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(analyzedFood.protein / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4">
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Жиры</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{analyzedFood.fat}г</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${(analyzedFood.fat / 70) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Углеводы</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{analyzedFood.carbs}г</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(analyzedFood.carbs / 300) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white">Добавить продукт вручную</h3>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Название продукта
                    </label>
                    <input
                      type="text"
                      placeholder="Например: Яблоко"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Количество (г)
                      </label>
                      <input
                        type="number"
                        placeholder="100"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Калории</label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Белки (г)
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Жиры (г)
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Углеводы (г)
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-150 ease-in-out">
                    Добавить продукт
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">Сегодняшний дневник питания</h3>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Итого за день</h4>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">1250 / 1800 ккал</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Б: 85г • Ж: 45г • У: 120г</p>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Завтрак</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Овсянка с ягодами</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">350 ккал</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Б: 15г • Ж: 8г • У: 55г</p>
                      </div>
                    </div>

                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Обед</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Куриный салат с авокадо</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">320 ккал</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Б: 25г • Ж: 18г • У: 15г</p>
                      </div>
                    </div>

                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Перекус</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Протеиновый коктейль</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">180 ккал</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Б: 25г • Ж: 3г • У: 10г</p>
                      </div>
                    </div>

                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Ужин</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Запеченная рыба с овощами</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">400 ккал</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Б: 30г • Ж: 16г • У: 40г</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="flex items-center justify-center w-full py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                      <Plus className="w-4 h-4 mr-1" />
                      Добавить приём пищи
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Nutrition
