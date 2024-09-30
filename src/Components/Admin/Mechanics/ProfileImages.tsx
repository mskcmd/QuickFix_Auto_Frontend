const ProfileImages: React.FC<{
    images: any;
    onImageClick: (imageUrl: string) => void;
  }> = ({ images, onImageClick }) => (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Profile Images:</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images?.map((image: any, index: number) => (
          <img
            key={index}
            src={image.url}
            alt={`Profile ${index + 1}`}
            className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition duration-300"
            onClick={() => onImageClick(image.url)}
          />
        ))}
      </div>
    </div>
  );

  export {ProfileImages}