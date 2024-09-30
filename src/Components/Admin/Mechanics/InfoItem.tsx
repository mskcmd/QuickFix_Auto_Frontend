const InfoItem: React.FC<{
    icon: React.ElementType;
    label: string;
    value: string | undefined;
  }> = ({ icon: Icon, label, value }) => (
    <p className="flex items-center mb-2">
      <Icon className="mr-2 text-blue-500" />
      <strong>{label}:</strong> {value}
    </p>
  );
  export { InfoItem };
