const Description: React.FC<{ description: string | undefined }> = ({
    description,
  }) => (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Description:</h3>
      <div
        dangerouslySetInnerHTML={{ __html: description ?? "" }}
        className="bg-gray-100 p-4 rounded-lg"
      />
    </div>
  );

  export {Description}