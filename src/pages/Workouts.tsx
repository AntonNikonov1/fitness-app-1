"use client"

import type React from "react"
import { useState } from "react"
import { useUser } from "../contexts/UserContext"
import { CheckCircle, Clock, Dumbbell, Play, X } from "lucide-react"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  rest: number
  description: string
  videoUrl?: string
}

interface Workout {
  id: string
  name: string
  day: string
  duration: number
  exercises: Exercise[]
  completed: boolean
}

const Workouts: React.FC = () => {
  const { user } = useUser()
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null)
  const [showExerciseDetails, setShowExerciseDetails] = useState<Exercise | null>(null)

  // Пример тренировок
  const workouts: Workout[] = [
    {
      id: "1",
      name: "Кардио + Силовая",
      day: "Понедельник",
      duration: 45,
      completed: false,
      exercises: [
        {
          id: "1-1",
          name: "Разминка (бег на месте)",
          sets: 1,
          reps: 1,
          rest: 0,
          description: "Бег на месте в течение 5 минут для разогрева мышц и суставов.",
        },
        {
          id: "1-2",
          name: "Приседания",
          sets: 3,
          reps: 15,
          rest: 60,
          description:
            "Встаньте прямо, ноги на ширине плеч. Опуститесь, сгибая колени, как будто садитесь на стул. Вернитесь в исходное положение.",
        },
        {
          id: "1-3",
          name: "Отжимания",
          sets: 3,
          reps: 10,
          rest: 60,
          description:
            "Примите упор лежа, руки на ширине плеч. Опуститесь, сгибая руки, пока грудь почти не коснется пола. Вернитесь в исходное положение.",
        },
        {
          id: "1-4",
          name: "Планка",
          sets: 3,
          reps: 1,
          rest: 60,
          description:
            "Примите положение упора на предплечьях. Удерживайте тело в прямой линии от головы до пяток. Держите 30 секунд.",
        },
        {
          id: "1-5",
          name: "Выпады",
          sets: 3,
          reps: 12,
          rest: 60,
          description:
            "Сделайте шаг вперед, опуститесь, сгибая оба колена до 90 градусов. Вернитесь в исходное положение и повторите с другой ногой.",
        },
      ],
    },
    {
      id: "2",
      name: "Верхняя часть тела",
      day: "Среда",
      duration: 40,
      completed: true,
      exercises: [
        {
          id: "2-1",
          name: "Разминка (круговые движения руками)",
          sets: 1,
          reps: 1,
          rest: 0,
          description: "Выполняйте круговые движения руками вперед и назад в течение 3 минут.",
        },
        {
          id: "2-2",
          name: "Отжимания",
          sets: 4,
          reps: 12,
          rest: 60,
          description:
            "Примите упор лежа, руки на ширине плеч. Опуститесь, сгибая руки, пока грудь почти не коснется пола. Вернитесь в исходное положение.",
        },
        {
          id: "2-3",
          name: "Подтягивания (или тяга с резинкой)",
          sets: 3,
          reps: 8,
          rest: 90,
          description:
            "Возьмитесь за перекладину хватом сверху. Подтянитесь, пока подбородок не окажется над перекладиной. Медленно опуститесь.",
        },
        {
          id: "2-4",
          name: "Отжимания на трицепс",
          sets: 3,
          reps: 12,
          rest: 60,
          description:
            "Сядьте на край стула, руки по бокам. Опуститесь, сгибая руки, пока локти не достигнут 90 градусов. Вернитесь в исходное положение.",
        },
        {
          id: "2-5",
          name: "Планка с подъемом руки",
          sets: 3,
          reps: 10,
          rest: 60,
          description: "Примите положение планки. Поочередно поднимайте каждую руку вперед, удерживая баланс.",
        },
      ],
    },
    {
      id: "3",
      name: "Нижняя часть тела",
      day: "Пятница",
      duration: 50,
      completed: false,
      exercises: [
        {
          id: "3-1",
          name: "Разминка (прыжки на месте)",
          sets: 1,
          reps: 1,
          rest: 0,
          description: "Выполняйте прыжки на месте в течение 3 минут для разогрева.",
        },
        {
          id: "3-2",
          name: "Приседания с собственным весом",
          sets: 4,
          reps: 15,
          rest: 60,
          description:
            "Встаньте прямо, ноги на ширине плеч. Опуститесь, сгибая колени, как будто садитесь на стул. Вернитесь в исходное положение.",
        },
        {
          id: "3-3",
          name: "Выпады",
          sets: 3,
          reps: 12,
          rest: 60,
          description:
            "Сделайте шаг вперед, опуститесь, сгибая оба колена до 90 градусов. Вернитесь в исходное положение и повторите с другой ногой.",
        },
        {
          id: "3-4",
          name: "Подъемы на носки",
          sets: 3,
          reps: 20,
          rest: 45,
          description: "Встаньте прямо, ноги на ширине плеч. Поднимитесь на носки, затем опуститесь.",
        },
        {
          id: "3-5",
          name: "Мостик",
          sets: 3,
          reps: 15,
          rest: 60,
          description:
            "Лягте на спину, согните колени, поставив ступни на пол. Поднимите таз, напрягая ягодицы. Задержитесь на секунду и вернитесь в исходное положение.",
        },
      ],
    },
  ]

  const startWorkout = (workout: Workout) => {
    setActiveWorkout(workout)
  }

  const closeWorkout = () => {
    setActiveWorkout(null)
  }

  const showExercise = (exercise: Exercise) => {
    setShowExerciseDetails(exercise)
  }

  const closeExerciseDetails = () => {
    setShowExerciseDetails(null)
  }

  const completeWorkout = (id: string) => {
    // В реальном приложении здесь был бы API-запрос для обновления статуса тренировки
    closeWorkout()
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Тренировки</h1>
        <p className="text-gray-600 dark:text-gray-400">Ваш персональный план тренировок на основе ваших целей</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border ${
              workout.completed ? "border-green-200 dark:border-green-900" : "border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{workout.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{workout.day}</p>
                </div>
                {workout.completed && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-200">
                    Выполнено
                  </span>
                )}
              </div>

              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                <Clock className="w-4 h-4 mr-1" />
                <span>{workout.duration} мин</span>
                <span className="mx-2">•</span>
                <Dumbbell className="w-4 h-4 mr-1" />
                <span>{workout.exercises.length} упражнений</span>
              </div>

              <div className="space-y-2 mb-4">
                {workout.exercises.slice(0, 3).map((exercise) => (
                  <div key={exercise.id} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <span className="w-4 h-4 mr-2 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0"></span>
                    <span>{exercise.name}</span>
                  </div>
                ))}
                {workout.exercises.length > 3 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    + еще {workout.exercises.length - 3} упражнений
                  </div>
                )}
              </div>

              <button
                onClick={() => startWorkout(workout)}
                className={`w-full py-2 px-4 rounded-lg transition duration-150 ease-in-out ${
                  workout.completed
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {workout.completed ? "Повторить тренировку" : "Начать тренировку"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Статистика тренировок</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Тренировок на этой неделе</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">2 / 5</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Общее время</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">85 мин</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Сожжено калорий</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">450</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Прогресс недели</h3>
          <div className="grid grid-cols-7 gap-2">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    index === 0 || index === 2
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : index < 5
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        : "bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                  }`}
                >
                  {index === 0 || index === 2 ? <CheckCircle className="w-5 h-5" /> : day}
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{activeWorkout.name}</h2>
                <button
                  onClick={closeWorkout}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                <Clock className="w-4 h-4 mr-1" />
                <span>{activeWorkout.duration} мин</span>
                <span className="mx-2">•</span>
                <Dumbbell className="w-4 h-4 mr-1" />
                <span>{activeWorkout.exercises.length} упражнений</span>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {activeWorkout.exercises.map((exercise, index) => (
                  <div key={exercise.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{exercise.name}</h3>
                      </div>
                      <button
                        onClick={() => showExercise(exercise)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                      >
                        Детали
                      </button>
                    </div>

                    <div className="ml-9 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Подходы</p>
                        <p className="font-medium text-gray-900 dark:text-white">{exercise.sets}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Повторения</p>
                        <p className="font-medium text-gray-900 dark:text-white">{exercise.reps}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Отдых</p>
                        <p className="font-medium text-gray-900 dark:text-white">{exercise.rest} сек</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => completeWorkout(activeWorkout.id)}
                  className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-150 ease-in-out"
                >
                  Завершить тренировку
                </button>
                <button
                  onClick={closeWorkout}
                  className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition duration-150 ease-in-out dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showExerciseDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{showExerciseDetails.name}</h2>
                <button
                  onClick={closeExerciseDetails}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg aspect-video flex items-center justify-center mb-4">
                {showExerciseDetails.videoUrl ? (
                  <video controls className="w-full h-full rounded-lg" src={showExerciseDetails.videoUrl}></video>
                ) : (
                  <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                    <Play className="w-12 h-12 mb-2" />
                    <p>Видео недоступно</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Подходы</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{showExerciseDetails.sets}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Повторения</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{showExerciseDetails.reps}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Отдых</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{showExerciseDetails.rest} сек</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Описание</h3>
                <p className="text-gray-600 dark:text-gray-400">{showExerciseDetails.description}</p>
              </div>

              <button
                onClick={closeExerciseDetails}
                className="w-full mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-150 ease-in-out"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Workouts
