import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { trackEvent } from '@/services/analytics'

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Welcome to Yamaha Bahrain! How can I help you today?',
      time: new Date().toLocaleTimeString('en-BH', { hour: '2-digit', minute: '2-digit' }),
    }
  ])

  const isEnabled = import.meta.env.VITE_ENABLE_CHAT === 'true'

  useEffect(() => {
    // Show chat widget after 5 seconds
    const timer = setTimeout(() => {
      if (!isOpen && isEnabled) {
        setIsOpen(true)
        trackEvent.track('chat_widget_auto_show')
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [isEnabled])

  if (!isEnabled) return null

  const handleSend = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: message,
      time: new Date().toLocaleTimeString('en-BH', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages([...messages, newMessage])
    setMessage('')
    
    trackEvent.track('chat_message_sent', { message_length: message.length })

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        'Thank you for your message! Our team will get back to you shortly.',
        'I can help you with information about our motorcycles, test drives, or service appointments.',
        'Would you like to know more about our YZF-R1 or VMAX models?',
        'You can visit our showroom in Manama or call us at +973 1234 5678.',
      ]
      
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString('en-BH', { hour: '2-digit', minute: '2-digit' }),
      }
      
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      trackEvent.track('chat_opened')
    } else {
      trackEvent.track('chat_closed')
    }
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
    trackEvent.track('chat_minimized')
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={handleToggle}
              size="lg"
              className="rounded-full w-16 h-16 bg-red-600 hover:bg-red-700 shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 z-50 ${
              isMinimized ? 'w-80' : 'w-96'
            } bg-gray-900 rounded-lg shadow-2xl border border-gray-800`}
          >
            {/* Header */}
            <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <div>
                  <h3 className="font-semibold">Yamaha Support</h3>
                  <p className="text-xs opacity-90">We typically reply instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMinimize}
                  className="text-white hover:bg-red-700"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggle}
                  className="text-white hover:bg-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.type === 'user'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-800 text-gray-100'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-800">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSend()
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-gray-800 border-gray-700 text-white"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    By using this chat, you agree to our privacy policy
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default LiveChat
