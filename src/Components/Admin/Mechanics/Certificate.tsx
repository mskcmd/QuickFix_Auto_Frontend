import { FaCertificate } from "react-icons/fa";

const Certificate: React.FC<{ certificateUrl: string | undefined }> = ({
    certificateUrl,
  }) => (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Certificate:</h3>
      {certificateUrl ? (
        <a
          href={certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:underline"
        >
          <FaCertificate className="mr-2" />
          View Certificate
        </a>
      ) : (
        <p>No certificate available</p>
      )}
    </div>
  );

  export {Certificate}