"use client";

import React, { useState } from 'react';
import "../Suivi/suivi.css";

const MentorshipTracker = () => {
  const [goals, setGoals] = useState("");
  const [progress, setProgress] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState("");
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState("");

  const handleAddAppointment = () => {
    if (newAppointment.trim()) {
      setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
      setNewAppointment("");
    }
  };

  const handleAddSession = () => {
    if (newSession.trim()) {
      setSessions((prevSessions) => [...prevSessions, { title: newSession, completed: false }]);
      setNewSession("");
    }
  };

  const toggleSessionCompletion = (index) => {
    setSessions((prevSessions) =>
      prevSessions.map((session, i) =>
        i === index ? { ...session, completed: !session.completed } : session
      )
    );
  };

  return (
    <div className="mentorship-tracker">
      <div className="card">
        <div className="card-header">
          <h1>Mentorship Tracker</h1>
        </div>
        <div className="card-content">
          <div className="form-section">
            <label htmlFor="goals">Define Your Goals</label>
            <textarea
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Enter your mentorship goals here..."
            />
          </div>

          <div className="form-section">
            <label htmlFor="progress">Update Your Progress</label>
            <textarea
              id="progress"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              placeholder="Describe your progress..."
            />
          </div>

          <div className="form-section">
            <label htmlFor="appointments">Schedule Appointments</label>
            <input
              type="text"
              id="appointments"
              value={newAppointment}
              onChange={(e) => setNewAppointment(e.target.value)}
              placeholder="Enter a date/time for the appointment"
            />
            <button onClick={handleAddAppointment}>Add Appointment</button>
          </div>

          <div className="appointments-list">
            <h2>Scheduled Appointments</h2>
            {appointments.length > 0 ? (
              <ul>
                {appointments.map((appt, index) => (
                  <li key={index}>{appt}</li>
                ))}
              </ul>
            ) : (
              <p>No appointments scheduled.</p>
            )}
          </div>

          <div className="form-section">
            <label htmlFor="sessions">Track Sessions</label>
            <input
              type="text"
              id="sessions"
              value={newSession}
              onChange={(e) => setNewSession(e.target.value)}
              placeholder="Enter session title"
            />
            <button onClick={handleAddSession}>Add Session</button>
          </div>

          <div className="sessions-list">
            <h2>Mentorship Sessions</h2>
            {sessions.length > 0 ? (
              <ul>
                {sessions.map((session, index) => (
                  <li key={index}>
                    <span style={{ textDecoration: session.completed ? 'line-through' : 'none' }}>
                      {session.title}
                    </span>
                    <button onClick={() => toggleSessionCompletion(index)}>
                      {session.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No sessions tracked yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipTracker;
