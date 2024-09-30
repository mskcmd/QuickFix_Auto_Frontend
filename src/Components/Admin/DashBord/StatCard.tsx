import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardBody } from '@nextui-org/react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend }) => (
  <Card className="bg-white overflow-hidden">
    <CardBody className="p-6 flex items-center">
      <div className="mr-4">
        <Icon size={40} className="text-blue-500" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      {trend && (
        <div className="ml-auto">
          <TrendingUp size={24} className="text-green-500" />
          <span className="text-sm font-medium text-green-500">{trend}%</span>
        </div>
      )}
    </CardBody>
  </Card>
);