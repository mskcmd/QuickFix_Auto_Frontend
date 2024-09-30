import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardBody } from '@nextui-org/react';

interface DailyData {
  name: string;
  active: number;
}

interface DailyActiveUsersProps {
  data: DailyData[];
}

export const DailyActiveUsers: React.FC<DailyActiveUsersProps> = ({ data }) => (
  <Card className="bg-white">
    <CardBody className="p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Daily Active Users</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="active" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </CardBody>
  </Card>
);
