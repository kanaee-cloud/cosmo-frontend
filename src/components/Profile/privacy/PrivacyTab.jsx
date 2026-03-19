import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

export default function PrivacyTab() {
  return (
    <div className="space-y-6">
      <ChangePassword />
      <DeleteAccount />
    </div>
  );
}