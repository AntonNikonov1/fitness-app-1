"use client";

import type React from "react";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import {
  Camera,
  LineChart,
  Plus,
  Scale,
  TrendingDown,
  Upload,
  X,
} from "lucide-react";

const Progress: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"weight" | "photos">("weight");
  const [showCamera, setShowCamera] = useState(false);

  // Пример данных о весе
  const weightData = [
    { date: "01.04", weight: 82.5 },
    { date: "08.04", weight: 81.8 },
    { date: "15.04", weight: 80.9 },
    { date: "22.04", weight: 80.2 },
    { date: "29.04", weight: 79.5 },
    { date: "06.05", weight: 78.8 },
    { date: "13.05", weight: 78.3 },
  ];

  // Пример фотографий прогресса
  const progressPhotos = [
    { id: "1", date: "01.04.2023", front: true, side: true, back: true },
    { id: "2", date: "01.05.2023", front: true, side: true, back: true },
    { id: "3", date: "01.06.2023", front: true, side: false, back: false },
  ];

  const takePicture = () => {
    // Имитация фотографирования
    setShowCamera(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Прогресс
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Отслеживайте изменения веса и внешнего вида
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("weight")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "weight"
                  ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Вес
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "photos"
                  ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Фото До/После
            </button>
          </nav>
        </div>

        <div className="p-4">
          {activeTab === "weight" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Динамика веса
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Последние 7 недель
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Текущий вес: {weightData[weightData.length - 1].weight} кг
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-64 mb-6">
                {/* Здесь был бы компонент графика */}
                <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <LineChart className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <TrendingDown className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Общее снижение
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    -
                    {(
                      weightData[0].weight -
                      weightData[weightData.length - 1].weight
                    ).toFixed(1)}{" "}
                    кг
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    За 7 недель
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Целевой вес
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    75.0 кг
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Осталось:{" "}
                    {(weightData[weightData.length - 1].weight - 75).toFixed(1)}{" "}
                    кг
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Добавить запись о весе
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Дата
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Вес (кг)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-150 ease-in-out">
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "photos" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Фотографии прогресса
                </h2>
                <button
                  onClick={() => setShowCamera(true)}
                  className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  <Camera className="w-4 h-4 mr-1" />
                  Добавить фото
                </button>
              </div>

              {showCamera && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-md w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Сделайте фото
                      </h3>
                      <button
                        onClick={() => setShowCamera(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Тип фото
                        </label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                          <option value="front">Спереди</option>
                          <option value="side">Сбоку</option>
                          <option value="back">Сзади</option>
                        </select>
                      </div>

                      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-square flex items-center justify-center">
                        <Camera className="w-16 h-16 text-gray-500 dark:text-gray-400" />
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={takePicture}
                          className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Сделать фото
                        </button>
                        <button className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                          <Upload className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {progressPhotos.map((entry) => (
                  <div
                    key={entry.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {entry.date}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                      {entry.front && (
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Спереди
                          </p>
                          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-[3/4] flex items-center justify-center">
                            <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                          </div>
                        </div>
                      )}

                      {entry.side && (
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Сбоку
                          </p>
                          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-[3/4] flex items-center justify-center">
                            <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                          </div>
                        </div>
                      )}

                      {entry.back && (
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Сзади
                          </p>
                          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-[3/4] flex items-center justify-center">
                            <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Загрузить фото
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;
