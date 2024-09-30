const Services: React.FC<{ services: any }> = ({ services }) => (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Services:</h3>
      <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg">
        {services?.map((service: string, index: number) => (
          <li key={index} className="mb-1">
            {service}
          </li>
        ))}
      </ul>
    </div>
  );

  export {Services}