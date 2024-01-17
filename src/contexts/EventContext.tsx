"use client";

import { EventTypes, TicketType } from '@/app/events/event.types';
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { useAuthContext } from './AuthContext';


type EventAction =
  | { type: 'SET_EVENT_NAME'; payload: string }
  | { type: 'SET_EVENT_DESCRIPTION'; payload: string }
  | {
    type: 'SET_EVENT_CATEGORY'; payload: {
      category_name: string;
      category_slug: string
    }
  }
  | { type: 'SET_EVENT_IMAGE'; payload: string }
  | { type: 'SET_EVENT_DATE_TIME'; payload: string }
  | { type: 'SET_EVENT_VENUE'; payload: string }
  | { type: 'SET_TICKET_TYPES'; payload: TicketType[] };

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
      return { ...state, tickets: action.payload };
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
  setEventCategory: (eventCategory: {category_name: string; category_slug: string}) => void;
  setEventImage: (eventImage: string) => void;
  setEventDateTime: (eventDateTime: string) => void;
  setEventVenue: (eventVenue: string) => void;
  setTicketTypes: (ticketTypes: TicketType[]) => void;
}

// Create context
const EventContext = createContext<EventContextValue | undefined>(undefined);

// Create provider component
const EventProvider: React.FC<EventContextProps> = ({ children }) => {
  const { user } = useAuthContext();

  const [state, dispatch] = useReducer(
    eventReducer,
    {
      profile_id: user?.id || "",
      event_name: '',
      event_slug: '',
      event_description: '',
      event_category: {
        category_name: '',
        category_slug: '',
      },
      event_image: '',
      event_date_time: '',
      event_venue: '',
      tickets: [
        {
          id: '',
          name: '',
          price: 0,
          description: ''
        }
      ]
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
