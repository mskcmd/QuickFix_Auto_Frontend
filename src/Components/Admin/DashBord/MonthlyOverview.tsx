import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardBody } from '@nextui-org/react';

interface MonthlyData {
  name: string;
  users: number;
  mechanics: number;
  reports: number;
}

interface MonthlyOverviewProps {
  data: MonthlyData[];
}

export const MonthlyOverview: React.FC<MonthlyOverviewProps> = ({ data }) => (
  <Card className="bg-white">
    <CardBody className="p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#8884d8" />
          <Bar dataKey="mechanics" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </CardBody>
  </Card>
);
