import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";

import "react-big-calendar/lib/css/react-big-calendar.css";

export default function TrainingCalendar() {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch(import.meta.env.VITE_API_URL + "/gettrainings")
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error(
            "Error while fetching traingings." + response.statusText
          );
      })
      .then((trainings) => {
        const formattedTrainings = trainings.map((training) => ({
          id: training.id,
          title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
          start: new Date(training.date),
          end: moment(training.date).add(training.duration, "minutes").toDate(),
        }));
        setEvents(formattedTrainings);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 600, width: "90%" }}
        views={["month", "week", "day"]}
      />
    </div>
  );
}
