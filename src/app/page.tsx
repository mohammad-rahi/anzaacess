import { supabase } from "@/config/supabase"
import { EventTypes } from "./events/event.types";
import EventCard from "./events/EventCard";

const fetchEvents: () => Promise<EventTypes[]>
  = async () => {
    try {
      let { data, error } = await supabase
        .from('events')
        .select('*')

      if (error) {
        throw error;
      }

      return data as EventTypes[];

    } catch (error) {
      console.log(`Error fetching events: ${error}`);
      return [];
    }
  }

export default async function Home() {
  const events = await fetchEvents();

  const eventsWithCategory: { [key: string]: EventTypes[] } = {};

  events.forEach((event) => {
    if (event.event_category) {
      if (!eventsWithCategory[event.event_category.category_name]) {
        eventsWithCategory[event.event_category.category_name] = [];
      }
      eventsWithCategory[event.event_category.category_name].push(event);
    }
  })

  return (
    <div>
      {/* Hero section */}
      <section className='bg-blue-100 min-h-[40vh]'>
        <div className="wrapper"></div>
      </section>

      {/* Events section */}
      <section >
        <div className="wrapper py-12">
          <div className="flex flex-col gap-8 divide-x-2">
            {
              Object.keys(eventsWithCategory).map((category) => (
                <div key={category}>
                  <h1 className='text-3xl font-bold'>{category}</h1>

                  <div className="grid grid-cols-3 gap-8">
                    {
                      eventsWithCategory[category].map((event) => (
                        <EventCard event={event} key={event.id} />
                      ))
                    }
                  </div>
                </div>
              ))
            }
            
            {
              Object.keys(eventsWithCategory).map((category) => (
                <div key={category}>
                  <h1 className='text-3xl font-bold'>{category}</h1>

                  <div className="grid grid-cols-3 gap-8">
                    {
                      eventsWithCategory[category].map((event) => (
                        <EventCard event={event} key={event.id} />
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}
