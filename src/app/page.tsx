import { supabase } from "@/config/supabase"
import { EventTypes } from "./events/event.types";
import EventsCategory from "./EventsCategory";
import { Button } from "@/components";

export const revalidate = 60

const fetchEvents: () => Promise<EventTypes[]>
  = async () => {
    try {
      let { data, error } = await supabase
        .from('events')
        .select('*')

      if (error) {
        throw error;
      }

      // return data as EventTypes[];
      return [...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[])];
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
      <section className='bg-blue-100 min-h-[50vh] flex items-center justify-center'>
        <div className="wrapper text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-800 mb-4">
            Discover and Book Exciting Events Near You
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-blue-600 mb-8">
            Explore a wide range of events and secure your tickets hassle-free.
          </p>

          <div className="w-fit mx-auto">
            <Button href="/events">
              See Events
            </Button>
          </div>
        </div>
      </section>

      {/* Events section */}
      <section >
        <div className="wrapper py-12">
          <div className="flex flex-col gap-8">
            {
              Object.keys(eventsWithCategory).map((category, index) => (
                <EventsCategory key={category} category={category} eventsWithCategory={eventsWithCategory} isEnd={index === Object.keys(eventsWithCategory).length - 1} />
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}
