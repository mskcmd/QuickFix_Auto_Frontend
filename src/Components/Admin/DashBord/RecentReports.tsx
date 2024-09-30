import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardBody } from '@nextui-org/react';

export const RecentReports: React.FC = () => (
  <Card className="bg-white col-span-2">
    <CardBody className="p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Reports</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
            <CheckCircle size={24} className="text-green-500 mr-4" />
            <div>
              <p className="font-medium">Report #{1000 + index}</p>
              <p className="text-sm text-gray-500">Resolved on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </CardBody>
  </Card>
);