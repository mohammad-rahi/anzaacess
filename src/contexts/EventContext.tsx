"use client";

import { EventTypes, TicketType } from '@/app/events/event.types';
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { useAuthContext } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';

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
  | { type: 'SET_EVENT_DATE'; payload: string }
  | { type: 'SET_EVENT_TIME'; payload: string }
  | { type: 'SET_EVENT_VENUE'; payload: string }
  | { type: 'SET_VENUE_DESCRIPTION'; payload: string }
  | { type: 'SET_TICKETS'; payload: TicketType[] };

// Reducer function
const eventReducer = (state: EventTypes, action: EventAction): EventTypes => {
  switch (action.type) {
    case 'SET_EVENT_NAME':
      return { ...state, event_name: action.payload, event_slug: `${action.payload.toLowerCase().replace(/\s+/g, '-')}-${uuidv4().replace(/-/g, '').slice(0, 5)}` };
    case 'SET_EVENT_DESCRIPTION':
      return { ...state, event_description: action.payload };
    case 'SET_EVENT_CATEGORY':
      return { ...state, event_category: action.payload };
    case 'SET_EVENT_IMAGE':
      return { ...state, event_image: action.payload };
    case 'SET_EVENT_DATE':
      return { ...state, event_date: action.payload };
    case 'SET_EVENT_TIME':
      return { ...state, event_time: action.payload };
    case 'SET_EVENT_VENUE':
      return { ...state, event_venue: action.payload };
    case 'SET_VENUE_DESCRIPTION':
      return { ...state, venue_description: action.payload };
    case 'SET_TICKETS':
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
  setEventCategory: (eventCategory: { category_name: string; category_slug: string }) => void;
  setEventImage: (eventImage: string) => void;
  setEventDate: (eventDate: string) => void;
  setEventTime: (eventTime: string) => void;
  setEventVenue: (eventVenue: string) => void;
  setVenueDescription: (venueDescription: string) => void;
  setTickets: (tickets: TicketType[]) => void;
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
      event_date: '',
      event_time: '',
      event_venue: '',
      venue_description: '',
      tickets: [
        {
          id: uuidv4(),
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
    setEventDate: (eventDate) => dispatch({ type: 'SET_EVENT_DATE', payload: eventDate }),
    setEventTime: (eventDate) => dispatch({ type: 'SET_EVENT_TIME', payload: eventDate }),
    setEventVenue: (eventVenue) => dispatch({ type: 'SET_EVENT_VENUE', payload: eventVenue }),
    setVenueDescription: (venueDescription) => dispatch({ type: 'SET_VENUE_DESCRIPTION', payload: venueDescription }),
    setTickets: (tickets) => dispatch({ type: 'SET_TICKETS', payload: tickets }),
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
