import React from 'react';
import type { CoverflowCardItem } from '@/entities/CoverflowCard';

interface CardProps {
  item: CoverflowCardItem;
}

export const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div
      style={{
        width: 300,
        height: 400,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        style={{ width: '100%', height: '70%', objectFit: 'cover' }}
      />
      <div style={{ padding: 16 }}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
};
