import React from 'react';

interface SkillBadgeProps {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name, level }) => {
  const getLevelColor = () => {
    switch (level) {
      case 'Advanced':
        return 'bg-green-900 text-green-200';
      case 'Intermediate':
        return 'bg-blue-900 text-blue-200';
      case 'Beginner':
        return 'bg-yellow-900 text-yellow-200';
      default:
        return 'bg-gray-800 text-gray-200';
    }
  };

  return (
    <div className={`px-4 py-2 rounded-full ${getLevelColor()}`}>
      <span className="font-medium">{name}</span>
      <span className="text-sm ml-2 opacity-75">• {level}</span>
    </div>
  );
};

export default SkillBadge;