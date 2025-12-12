import React, { useState } from 'react'
import { format, addDays, startOfWeek, addWeeks, isSameDay } from 'date-fns'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const BookingCalendar = ({ onSelectSlot, facilityId }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedSlot, setSelectedSlot] = useState(null)

  // Generate time slots (8 AM to 10 PM)
  const timeSlots = []
  for (let hour = 8; hour <= 22; hour++) {
    timeSlots.push(`${hour}:00`)
  }

  // Generate week days
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 0 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  // Mock booked slots (in real app, fetch from API)
  const bookedSlots = [
    { date: format(new Date(), 'yyyy-MM-dd'), time: '14:00' },
    { date: format(new Date(), 'yyyy-MM-dd'), time: '15:00' },
    { date: format(addDays(new Date(), 1), 'yyyy-MM-dd'), time: '10:00' },
  ]

  const isSlotBooked = (date, time) => {
    return bookedSlots.some(
      slot => slot.date === format(date, 'yyyy-MM-dd') && slot.time === time
    )
  }

  const handleSlotClick = (date, time) => {
    if (!isSlotBooked(date, time)) {
      setSelectedSlot({ date: format(date, 'yyyy-MM-dd'), time })
      onSelectSlot && onSelectSlot({ date: format(date, 'yyyy-MM-dd'), time })
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Select Date & Time</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentWeek(addWeeks(currentWeek, -1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-medium text-gray-700 min-w-[120px] text-center">
            {format(weekStart, 'MMM dd')} - {format(addDays(weekStart, 6), 'MMM dd')}
          </span>
          <button
            onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekDays.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(day)}
            className={`p-3 rounded-lg text-center transition-all duration-200 ${
              isSameDay(day, selectedDate)
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <div className="text-xs font-medium mb-1">{format(day, 'EEE')}</div>
            <div className="text-lg font-bold">{format(day, 'd')}</div>
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <div className="border-t pt-6">
        <h4 className="font-semibold text-gray-900 mb-4">
          Available Times for {format(selectedDate, 'MMMM d, yyyy')}
        </h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
          {timeSlots.map((time, index) => {
            const isBooked = isSlotBooked(selectedDate, time)
            const isSelected = selectedSlot?.date === format(selectedDate, 'yyyy-MM-dd') && selectedSlot?.time === time

            return (
              <button
                key={index}
                onClick={() => handleSlotClick(selectedDate, time)}
                disabled={isBooked}
                className={`p-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isBooked
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isSelected
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-50 hover:bg-primary-50 text-gray-700 hover:text-primary-600 border-2 border-transparent hover:border-primary-200'
                }`}
              >
                {time}
              </button>
            )
          })}
        </div>
      </div>

      {selectedSlot && (
        <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <p className="text-sm font-medium text-primary-900">
            Selected: {selectedSlot.date} at {selectedSlot.time}
          </p>
        </div>
      )}
    </div>
  )
}

export default BookingCalendar
