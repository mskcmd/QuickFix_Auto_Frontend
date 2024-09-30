import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardBody } from '@nextui-org/react';

interface MechanicsData {
  name: string;
  value: number;
}

interface MechanicServicesProps {
  data: MechanicsData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const MechanicServices: React.FC<MechanicServicesProps> = ({ data }) => (
  <Card className="bg-white">
    <CardBody className="p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Mechanic Services</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </CardBody>
  </Card>
);