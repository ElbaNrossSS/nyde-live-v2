
import React, { useState, useEffect } from 'react';

const statusColors = {
  'online': 'bg-green-600',
  'idle': 'bg-yellow-600',
  'dnd': 'bg-red-600',
  'invisible': 'bg-gray-600'
};

const DiscordStatusIndicator = ({ status }) => {
  const [bgColor, setBgColor] = useState(statusColors[status] || 'bg-gray-600');

  useEffect(() => {
    setBgColor(statusColors[status] || 'bg-gray-600');
  }, [status]);

  return (
    <div className={`w-4 h-4 rounded-full ${bgColor}`}></div>
  );
};

export default DiscordStatusIndicator;
