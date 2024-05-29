// components/QRCodeComponent.js
import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = ({ value }) => {
  return (
    <div>
      <QRCode value={value} />
    </div>
  );
};

export default QRCodeComponent;