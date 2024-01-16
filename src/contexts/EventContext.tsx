"use client";

import { EventTypes } from '@/app/events/event.types';
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';


type EventAction =
  | { type: 'SET_EVENT_NAME'; payload: string }
  | { type: 'SET_EVENT_DESCRIPTION'; payload: string }
  | { type: 'SET_EVENT_CATEGORY'; payload: string }
  | { type: 'SET_EVENT_IMAGE'; payload: string }
  | { type: 'SET_EVENT_DATE_TIME'; payload: string }
  | { type: 'SET_EVENT_VENUE'; payload: string }
  | { type: 'SET_TICKET_TYPES'; payload: string };

// Reducer function
const eventReducer = (state: EventTypes, action: EventAction): EventTypes => {
  switch (action.type) {
    case 'SET_EVENT_NAME':
      return { ...state, event_name: action.payload };
    case 'SET_EVENT_DESCRIPTION':
      return { ...state, event_description: action.payload };
    case 'SET_EVENT_CATEGORY':
      return { ...state, event_category: action.payload };
    case 'SET_EVENT_IMAGE':
      return { ...state, event_image: action.payload };
    case 'SET_EVENT_DATE_TIME':
      return { ...state, event_date_time: action.payload };
    case 'SET_EVENT_VENUE':
      return { ...state, event_venue: action.payload };
    case 'SET_TICKET_TYPES':
      return { ...state, ticket_types: action.payload };
    default:
      return state;
  }
};

// Define context types
interface EventContextProps {
  children: ReactNode;
}

interface EventContextValue {
  state: EventTypes;
  setEventName: (eventName: string) => void;
  setEventDescription: (eventDescription: string) => void;
  setEventCategory: (eventCategory: string) => void;
  setEventImage: (eventImage: string) => void;
  setEventDateTime: (eventDateTime: string) => void;
  setEventVenue: (eventVenue: string) => void;
  setTicketTypes: (ticketTypes: string) => void;
}

// Create context
const EventContext = createContext<EventContextValue | undefined>(undefined);

// Create provider component
const EventProvider: React.FC<EventContextProps> = ({ children }) => {
  const { user } = useAuth();

  const [state, dispatch] = useReducer(
    eventReducer,
    {
      profile_id: user?.id || "",
      event_name: '',
      event_description: '',
      event_category: '',
      event_image: '',
      event_date_time: '',
      event_venue: '',
      ticket_types: ''
    },
  );


  const contextValue: EventContextValue = {
    state,
    setEventName: (eventName) => dispatch({ type: 'SET_EVENT_NAME', payload: eventName }),
    setEventDescription: (eventDescription) => dispatch({ type: 'SET_EVENT_DESCRIPTION', payload: eventDescription }),
    setEventCategory: (eventCategory) => dispatch({ type: 'SET_EVENT_CATEGORY', payload: eventCategory }),
    setEventImage: (eventImage) => dispatch({ type: 'SET_EVENT_IMAGE', payload: eventImage }),
    setEventDateTime: (eventDate) => dispatch({ type: 'SET_EVENT_DATE_TIME', payload: eventDate }),
    setEventVenue: (eventVenue) => dispatch({ type: 'SET_EVENT_VENUE', payload: eventVenue }),
    setTicketTypes: (ticketTypes) => dispatch({ type: 'SET_TICKET_TYPES', payload: ticketTypes }),
  };

  return <EventContext.Provider value={contextValue}>{children}</EventContext.Provider>;
};

// Custom hook for using EventContext
const useEventContext = (): EventContextValue => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

export { EventProvider, useEventContext };
