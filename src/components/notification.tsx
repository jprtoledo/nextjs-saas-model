import { Transition } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useState } from 'react'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface NotificationProps {
  type?: NotificationType
  title: string
  message?: string
  show: boolean
  onClose: () => void
  duration?: number
}

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  info: InformationCircleIcon,
  warning: ExclamationTriangleIcon,
}

const styles = {
  success: 'bg-green-50 text-green-800',
  error: 'bg-red-50 text-red-800',
  info: 'bg-blue-50 text-blue-800',
  warning: 'bg-yellow-50 text-yellow-800',
}

const iconStyles = {
  success: 'text-green-400',
  error: 'text-red-400',
  info: 'text-blue-400',
  warning: 'text-yellow-400',
}

export function Notification({
  type = 'info',
  title,
  message,
  show,
  onClose,
  duration = 5000,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(show)
  const Icon = icons[type]

  useEffect(() => {
    setIsVisible(show)
  }, [show])

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  return (
    <Transition
      show={isVisible}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed right-4 top-4 z-50 w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
        <div className={`p-4 ${styles[type]}`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className={`h-6 w-6 ${iconStyles[type]}`} aria-hidden="true" />
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium">{title}</p>
              {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className={`inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${iconStyles[type]}`}
                onClick={() => {
                  setIsVisible(false)
                  onClose()
                }}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
} 