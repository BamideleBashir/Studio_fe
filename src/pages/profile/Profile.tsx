import { useNavigate } from 'react-router-dom';
import { GoSignOut } from 'react-icons/go';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, HiOutlineClock } from 'react-icons/hi2';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout } from '../../reducers/authSlice';
import { APP_LINKS } from '../../constants/appLinks';

type IUser = {
  byteId: string;
  country: string;
  dob: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  phoneNumber: string;
  photo: { url: string };
  profileImages?: { url: string; publicId: string }[];
  lastLogin?: string;
};

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-gray-500" />
    </div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value || '—'}</p>
    </div>
  </div>
);

const Profile = () => {
  const user: IUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const profileImages = user.profileImages || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 py-8">

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 text-center">
          <img
            src={user.photo?.url || 'https://avatar.iran.liara.run/public/boy?username=Ash'}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-gray-50"
          />
          <h1 className="text-xl font-bold text-gray-900">
            {user.firstName} {user.lastName}
          </h1>
          <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-500 text-xs font-mono rounded-full uppercase tracking-wide">
            {user.byteId}
          </span>
        </div>

        {/* Info */}
        <div className="bg-white rounded-2xl shadow-sm px-5 mb-4">
          <InfoRow icon={HiOutlineEnvelope} label="Email" value={user.email} />
          <InfoRow icon={HiOutlinePhone} label="Phone" value={user.phoneNumber} />
          <InfoRow icon={HiOutlineMapPin} label="Country" value={user.country} />
          {user.lastLogin && (
            <InfoRow
              icon={HiOutlineClock}
              label="Last Login"
              value={new Date(user.lastLogin).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            />
          )}
        </div>

        {/* Profile images strip */}
        {profileImages.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Profile Images</h2>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {profileImages.map((img) => (
                <img
                  key={img.publicId}
                  src={img.url}
                  alt="profile"
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
              ))}
            </div>
          </div>
        )}

        {/* Manage Account CTA */}
        <a
          href={APP_LINKS.digitizer}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3 bg-black text-white text-sm font-medium rounded-2xl hover:bg-gray-800 transition-colors mb-3"
        >
          Manage Account
        </a>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-500 text-sm font-medium rounded-2xl hover:bg-red-100 transition-colors"
        >
          <GoSignOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
