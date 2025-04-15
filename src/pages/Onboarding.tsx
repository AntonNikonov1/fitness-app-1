"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../contexts/UserContext"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Onboarding: React.FC = () => {
  const navigate = useNavigate()
  const { completeOnboarding } = useUser()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    height: 170,
    weight: 70,
    age: 30,
    gender: "male",
    allergies: [] as string[],
    medicalConditions: [] as string[],
    goal: "weightLoss",
    assistantStyle: "friendly",
    fitnessLevel: "beginner",
  })

  const [allergyInput, setAllergyInput] = useState("")
  const [medicalInput, setMedicalInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addAllergy = () => {
    if (allergyInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        allergies: [...prev.allergies, allergyInput.trim()],
      }))
      setAllergyInput("")
    }
  }

  const removeAllergy = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index),
    }))
  }

  const addMedicalCondition = () => {
    if (medicalInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        medicalConditions: [...prev.medicalConditions, medicalInput.trim()],
      }))
      setMedicalInput("")
    }
  }

  const removeMedicalCondition = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      medicalConditions: prev.medicalConditions.filter((_, i) => i !== index),
    }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = () => {
    completeOnboarding(formData)
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Добро пожаловать в FitLife</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">Давайте настроим приложение под ваши цели</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-full h-1 ${
                  i <= step ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
                } ${i < 4 ? "mr-1" : ""}`}
              ></div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">Шаг {step} из 4</div>
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Основная информация</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Рост (см)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Вес (кг)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Возраст</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Пол</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                  <option value="other">Другой</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Здоровье</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Пищевые аллергии
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    placeholder="Например: орехи, молоко"
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    onKeyPress={(e) => e.key === "Enter" && addAllergy()}
                  />
                  <button
                    onClick={addAllergy}
                    className="p-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Добавить
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.allergies.map((allergy, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200"
                    >
                      <span>{allergy}</span>
                      <button
                        onClick={() => removeAllergy(index)}
                        className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Медицинские противопоказания
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={medicalInput}
                    onChange={(e) => setMedicalInput(e.target.value)}
                    placeholder="Например: проблемы с суставами"
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    onKeyPress={(e) => e.key === "Enter" && addMedicalCondition()}
                  />
                  <button
                    onClick={addMedicalCondition}
                    className="p-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Добавить
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.medicalConditions.map((condition, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-red-100 text-red-800 px-2 py-1 rounded dark:bg-red-900 dark:text-red-200"
                    >
                      <span>{condition}</span>
                      <button
                        onClick={() => removeMedicalCondition(index)}
                        className="ml-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ваши цели</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Основная цель</label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="weightLoss">Снижение веса</option>
                  <option value="muscleGain">Набор мышечной массы</option>
                  <option value="maintenance">Поддержание формы</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Уровень подготовки
                </label>
                <select
                  name="fitnessLevel"
                  value={formData.fitnessLevel}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="beginner">Начинающий</option>
                  <option value="intermediate">Средний</option>
                  <option value="advanced">Продвинутый</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Настройка ассистента</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Стиль общения ассистента
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="strict"
                      name="assistantStyle"
                      value="strict"
                      checked={formData.assistantStyle === "strict"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="strict" className="text-gray-700 dark:text-gray-300">
                      Строгий (дерзкий, требовательный)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="friendly"
                      name="assistantStyle"
                      value="friendly"
                      checked={formData.assistantStyle === "friendly"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="friendly" className="text-gray-700 dark:text-gray-300">
                      Дружелюбный (поддерживающий, мотивирующий)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="expert"
                      name="assistantStyle"
                      value="expert"
                      checked={formData.assistantStyle === "expert"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="expert" className="text-gray-700 dark:text-gray-300">
                      Эксперт (деловой, фактический)
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Пример сообщения в выбранном стиле:
                </h3>
                <p className="text-blue-700 dark:text-blue-300">
                  {formData.assistantStyle === "strict" &&
                    "Никаких оправданий! Тренировку пропускать нельзя. Выполни хотя бы базовые упражнения."}
                  {formData.assistantStyle === "friendly" &&
                    "Понимаю, что бывает тяжело, но даже небольшая тренировка лучше, чем ничего! Может, попробуешь короткую домашнюю тренировку?"}
                  {formData.assistantStyle === "expert" &&
                    "Согласно исследованиям, пропуск тренировки может снизить метаболизм на 7%. Рекомендую выполнить хотя бы базовые упражнения."}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Назад
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              onClick={nextStep}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Далее
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Завершить
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Onboarding
