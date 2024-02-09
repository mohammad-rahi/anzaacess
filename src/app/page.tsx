import { supabase } from "@/config/supabase"
import { EventTypes } from "./events/event.types";
import EventsCategory from "./EventsCategory";
import { Button } from "@/components";
import HomePageHero from "./HomePageHero";

export const revalidate = 60

const fetchEvents: () => Promise<EventTypes[]>
  = async () => {
    try {
      let { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')

      if (error) {
        throw error;
      }

      // return data as EventTypes[];
      return [...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[])];
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
      <HomePageHero />

      {/* Events section */}
      <section className="pt-16">
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
