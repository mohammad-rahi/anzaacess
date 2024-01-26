"use client";
import { Button } from "@/components";
import { TicketTypes } from "../../event.types";
import { useState, useEffect } from 'react';

interface TicketCardProps {
  ticket: TicketTypes;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  // const [isTicketInCart, setIsTicketInCart] = useState(false);

  // useEffect(() => {
  //   // Check if the ticket is already in the cart when the component mounts
  //   const existingCartItemsJson = localStorage.getItem('cartItems');
  //   const existingCartItems = existingCartItemsJson ? JSON.parse(existingCartItemsJson) : [];
  //   const ticketInCart = existingCartItems.some((item: TicketTypes) => item.id === ticket.id);
  //   setIsTicketInCart(ticketInCart);
  // }, [ticket.id]);

  // const handleAddToCart = () => {
  //   // Get existing cart items from local storage or initialize an empty array
  //   const existingCartItemsJson = localStorage.getItem('cartItems');
  //   const existingCartItems = existingCartItemsJson ? JSON.parse(existingCartItemsJson) : [];

  //   if (!isTicketInCart) {
  //     // Add the selected ticket to the cart
  //     const updatedCartItems = [...existingCartItems, ticket];

  //     // Update the local storage with the new cart items
  //     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

  //     // Update the state to reflect that the ticket is now in the cart
  //     setIsTicketInCart(true);

  //     // Optionally, you can provide feedback to the user (e.g., show a message)
  //     console.log('Ticket added to cart:', ticket);
  //   } else {
  //     // Optionally, provide feedback that the ticket is already in the cart
  //     console.log('Ticket is already in the cart:', ticket);
  //   }
  // };

  const handleBookTicket = async () => {
    // Implement checkout logic (API calls, ticket generation, etc.)
    // Update the database to deduct booked ticket quantity

    // Simulate generating QR code (replace with actual implementation)
    const qrCode = await generateQRCode(ticket);

    // Display confirmation page or trigger download
    showConfirmation(ticket, qrCode);
  };

  const generateQRCode = async (ticket: TicketTypes): Promise<string> => {
    // Implement QR code generation logic (using qr-image or another library)
    // Return the QR code data or image URL
    return 'example_qr_code_data';
  };

  const showConfirmation = (ticket: TicketTypes, qrCode: string) => {
    // Implement confirmation display logic (e.g., modal or new page)
    // Provide download links for each ticket
    console.log('Ticket booked:', ticket);
    console.log('QR Code:', qrCode);
    // You can use a state management library or component state to handle the UI
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-200 to-blue-300 p-6 rounded-md shadow-md">
      <h4 className="text-xl font-bold mb-2">{ticket.name}</h4>
      <p className="text-gray-600 mb-4">{ticket.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-gray-800">Price: ${ticket.price}</p>
        {/* <Button onClick={handleAddToCart} size="sm">
          {isTicketInCart ? 'Added' : 'Add to Cart'}
        </Button> */}
        <Button onClick={handleBookTicket} size="sm">Book Now</Button>
      </div>
      <div className="absolute top-0 right-0 p-2 bg-blue-500 text-white rounded-md">
        Best Value
      </div>
    </div>
  );
};

export default TicketCard;
