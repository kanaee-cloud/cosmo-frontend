import React, { useState } from 'react';

export default function PrivacySettings({ profile }) {
  const [isPublic, setIsPublic] = useState(profile?.public_profile ?? false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="p-4 border rounded border-[#3b2b5a] bg-transparent">
      <h3 className="font-primary text-sm mb-4">Privacy & Account Settings</h3>

      <div className="flex flex-col gap-4">
        <label className="flex items-center justify-between">
          <span className="text-sm">Public profile</span>
          <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
        </label>

        <label className="flex items-center justify-between">
          <span className="text-sm">Email notifications</span>
          <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
        </label>

        <div className="pt-2">
          <button className="bg-accent text-white px-4 py-2 rounded">Save Settings</button>
        </div>
      </div>
    </div>
  );
}
