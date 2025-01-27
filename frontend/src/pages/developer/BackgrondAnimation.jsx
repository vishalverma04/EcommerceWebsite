import React, { useState, useEffect } from 'react';

const AnimatedBackground = () => {
  const [dots, setDots] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initialize dots
    const initialDots = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));

    setDots(initialDots);

    const animate = () => {
      setDots(prevDots => 
        prevDots.map(dot => ({
          ...dot,
          x: (dot.x + dot.vx + window.innerWidth) % window.innerWidth,
          y: (dot.y + dot.vy + window.innerHeight) % window.innerHeight,
        }))
      );
    };

    const interval = setInterval(animate, 50);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearInterval(interval);
    };
  }, []);

  // Calculate connections between dots
  const getConnections = () => {
    const connections = [];
    const maxDistance = 150;

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = 1 - (distance / maxDistance);
          connections.push({
            x1: dots[i].x,
            y1: dots[i].y,
            x2: dots[j].x,
            y2: dots[j].y,
            opacity
          });
        }
      }
    }

    return connections;
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0">
        <g>
          {getConnections().map((connection, index) => (
            <line
              key={index}
              x1={connection.x1}
              y1={connection.y1}
              x2={connection.x2}
              y2={connection.y2}
              stroke="#3b82f6"
              strokeOpacity={connection.opacity * 0.2}
              strokeWidth="1"
            />
          ))}
          {dots.map((dot, index) => (
            <circle
              key={index}
              cx={dot.x}
              cy={dot.y}
              r="2"
              fill="#3b82f6"
              className="animate-pulse"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default AnimatedBackground;