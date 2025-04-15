"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useUser } from "../contexts/UserContext"
import { Send, Mic, MicOff, User, ArrowRight } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

const Chat: React.FC = () => {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Имитация ответов ИИ в зависимости от выбранного стиля
  const getAIResponse = (message: string): string => {
    const style = user?.assistantStyle || "friendly"

    const responses = {
      strict: {
        workout: "Никаких оправданий! Тренировку пропускать нельзя. Выполни хотя бы базовые упражнения.",
        diet: "Сладкое? Забудь об этом. Твоя цель важнее минутного удовольствия.",
        motivation: "Слабость - это выбор. Ты сильнее, чем думаешь. Докажи это сегодня.",
      },
      friendly: {
        workout:
          "Понимаю, что бывает тяжело, но даже небольшая тренировка лучше, чем ничего! Может, попробуешь короткую домашнюю тренировку?",
        diet: "Иногда хочется чего-то вкусненького, и это нормально! Может, найдем здоровую альтернативу?",
        motivation: "Ты уже проделал отличный путь! Каждый день - это шаг к твоей цели. Я верю в тебя!",
      },
      expert: {
        workout:
          "Согласно исследованиям, пропуск тренировки может снизить метаболизм на 7%. Рекомендую выполнить хотя бы базовые упражнения.",
        diet: "Потребление сахара вызывает скачки инсулина, что может привести к увеличению жировых отложений. Рекомендую заменить на продукты с низким гликемическим индексом.",
        motivation:
          "Статистически, 80% успеха в фитнесе зависит от регулярности. Придерживайтесь плана для достижения оптимальных результатов.",
      },
    }

    if (message.toLowerCase().includes("тренировк")) {
      return responses[style].workout
    } else if (
      message.toLowerCase().includes("еда") ||
      message.toLowerCase().includes("сладк") ||
      message.toLowerCase().includes("пита")
    ) {
      return responses[style].diet
    } else {
      return responses[style].motivation
    }
  }

  const handleSendMessage = () => {
    if (input.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Имитация ответа ИИ с небольшой задержкой
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input),
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      // Имитация распознавания речи
      setTimeout(() => {
        setInput("Как мне не пропускать тренировки?")
        setIsRecording(false)
      }, 3000)
    }
  }

  // Автоматическая прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Добавление приветственного сообщения при первой загрузке
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        text: `Привет! Я твой фитнес-ассистент. Как я могу помочь тебе сегодня?`,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages([welcomeMessage])
    }
  }, [messages])

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto pb-16 md:pb-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">FitLife AI</h1>
          <p className="text-zinc-400">Ваш персональный фитнес-ассистент</p>
        </div>
        <div className="hidden md:flex space-x-4">
          <button className="py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl flex items-center">
            Создать план питания
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <button className="py-2 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl flex items-center">
            Создать тренировку
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-lg overflow-hidden flex-1 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Чат с ассистентом</h2>
          <p className="text-zinc-400 text-sm">Задайте вопрос о тренировках, питании или получите мотивацию</p>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs md:max-w-md p-4 rounded-2xl shadow-lg ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : "bg-zinc-800 text-white"
                  }`}
                >
                  <div className="flex items-start">
                    {message.sender === "ai" && (
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                          AI
                        </div>
                      </div>
                    )}
                    <div>
                      <p>{message.text}</p>
                      <p className={`text-xs mt-2 ${message.sender === "user" ? "text-green-200" : "text-zinc-400"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <div className="flex-shrink-0 ml-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                          <User className="w-4 h-4 text-zinc-300" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Напишите сообщение..."
              className="flex-1 p-3 bg-zinc-800 border border-zinc-700 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
            />
            <button
              onClick={handleSendMessage}
              className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-tr-xl rounded-br-xl"
            >
              <Send className="w-5 h-5" />
            </button>
            <button
              onClick={toggleRecording}
              className={`p-3 ml-2 rounded-full ${
                isRecording ? "bg-red-600 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 md:hidden">
        <button className="py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl text-center">
          Создать план питания
        </button>
        <button className="py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl text-center">
          Создать тренировку
        </button>
      </div>
    </div>
  )
}

export default Chat
