import React from 'react';

const AboutUs = () => {
  return (
    <div className="wrapper py-8 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Welcome to AnzaAccess</h1>
      <p className="text-lg">
        Discover and attend extraordinary events with AnzaAccess, where seamless connections between event organizers and enthusiastic participants create memorable experiences.
      </p>
      <p className="text-lg">
        At AnzaAccess, our mission is to redefine the event booking landscape by providing a user-friendly interface, ensuring secure transactions, and offering a diverse range of events tailored to every interest.
      </p>
      <p className="text-lg">
        Whether you&apos;re an event organizer looking to showcase your talent or an attendee seeking exciting experiences, AnzaAccess is your ultimate platform.
      </p>
      <p className="text-lg font-semibold mt-4">What sets us apart:</p>
      <ul className="list-disc pl-6">
        <li>Explore a curated selection of events spanning entertainment, culture, sports, and more.</li>
        <li>Effortless ticket booking with our intuitive system for a seamless and secure transaction process.</li>
        <li>Experience hassle-free entry with our unique QR code technology, providing secure and convenient access to your chosen events.</li>
        <li>User-focused design, offering a responsive and enjoyable experience.</li>
        <li>Dedicated customer support team ready to assist you with any queries, ensuring a smooth journey from registration to event attendance.</li>
      </ul>
      <p className="text-lg mt-4">
        Join AnzaAccess today and embark on a journey where every event becomes an unforgettable memory. Thank you for choosing us as your trusted event companion.
      </p>
    </div>
  );
};

export default AboutUs;
