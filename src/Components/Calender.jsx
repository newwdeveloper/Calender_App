import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date

  // Helper function to get the first day of the month
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Helper function to get total days in a month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Generate the grid for the calendar
  const generateCalendarDates = () => {
    const firstDay = getFirstDayOfMonth(currentDate); // Day index (0 = Sunday)
    const daysInMonth = getDaysInMonth(currentDate);

    const prevMonthDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    const calendarDays = [];
    const today = new Date().getDate(); // Get today's date

    // Add previous month's overflow days
    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isCurrentDate: false,
      });
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDate = i === today;
      calendarDays.push({
        day: i,
        isCurrentMonth: true,
        isCurrentDate: isCurrentDate,
      });
    }

    // Add next month's overflow days to complete the grid
    const totalCells = 42; // 6 rows * 7 days
    const nextMonthDays = totalCells - calendarDays.length;

    for (let i = 1; i <= nextMonthDays; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    return calendarDays;
  };

  const calendarDays = generateCalendarDates();

  // Handle navigation for previous/next month
  const goToPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };
  const handleEdit = () => {};
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPrevMonth}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button
          onClick={goToNextMonth}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 text-center font-bold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => (
          <div
            onClick={handleEdit}
            key={index}
            className={`p-4 text-center border ${
              date.isCurrentMonth ? "bg-white" : "bg-gray-100 text-gray-400"
            } ${date.isCurrentDate ? "border-4 border-red-500" : ""}`}
          >
            {date.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
