import React from 'react';

interface SkillBadgeProps {
  name: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name}) => {
  return (
    <div className="px-4 py-2 rounded-full bg-blue-900 text-blue-200">
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default SkillBadge;