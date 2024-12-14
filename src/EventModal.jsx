import React, { useState } from "react";
import './Modal.css';

const EventModal = ({
  selectedDate,
  selectedEvent,
  onClose,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
}) => {
  const [eventName, setEventName] = useState(selectedEvent?.title || "");
  const [startTime, setStartTime] = useState(selectedEvent?.start || "");
  const [endTime, setEndTime] = useState(selectedEvent?.end || "");

  const handleSave = () => {
    const eventDetails = {
      id: selectedEvent?.id || Date.now().toString(),
      title: eventName,
      start: selectedEvent?.start || `${selectedDate}T${startTime}`,
      end: selectedEvent?.end || `${selectedDate}T${endTime}`,
    };

    selectedEvent ? onUpdateEvent(eventDetails) : onAddEvent(eventDetails);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{selectedEvent ? "Edit Event" : "Add Event"}</h2>
        <label>Event Name:</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          {selectedEvent && (
            <button onClick={() => onDeleteEvent(selectedEvent.id)}>
              Delete
            </button>
          )}
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
