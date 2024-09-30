import { Certificate } from "./Certificate";
import { Description } from "./Description";
import { MechanicInfo } from "./MechanicInfo";
import { ProfileImages } from "./ProfileImages";
import { Services } from "./Services";
import { UserInfo } from "./UserInfo";

const UserDetailsModal: React.FC<{
  user: any;
  onClose: () => void;
  onImageClick: (imageUrl: string) => void;
}> = ({ user, onClose, onImageClick }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {user.name}'s Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserInfo user={user} />
        <MechanicInfo mechanicData={user.mechanicdataID} />
      </div>
      <Description description={user.mechanicdataID?.description} />
      <Services services={user.mechanicdataID?.services} />
      <ProfileImages
        images={user.mechanicdataID?.profileImages}
        onImageClick={onImageClick}
      />
      <Certificate certificateUrl={user.mechanicdataID?.certificate?.url} />
      <button
        onClick={onClose}
        className="mt-8 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
      >
        Close
      </button>
    </div>
  </div>
);

export  { UserDetailsModal };
