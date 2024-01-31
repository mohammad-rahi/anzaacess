import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const TicketValidation: React.FC = () => {
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      // Handle the scanned QR code data (e.g., validate ticket)
      console.log('Scanned QR code data:', data);
      setScannedResult(data);
    }
  };

  const handleError = (error: any) => {
    console.error('QR code scan error:', error);
  };

  return (
    <div>
      <h2>Event Ticket Validation</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {scannedResult && (
        <div>
          <p>Scanned QR code data: {scannedResult}</p>
          {/* Add logic to validate the ticket based on the scanned result */}
        </div>
      )}
    </div>
  );
};

export default TicketValidation;
