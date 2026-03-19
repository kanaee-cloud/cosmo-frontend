import React, { useState } from 'react';

export default function ChangePassword() {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const handleChange = () => {
    if (newPwd !== confirmPwd) return alert('New password and confirm do not match');
    // UI-only: just show success
    alert('Password changed (UI-only)');
    setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
  };

  return (
    <div className="p-4 border rounded border-[#3b2b5a] bg-transparent">
      <h3 className="font-primary text-sm mb-4">Change Password</h3>
      <div className="flex flex-col gap-3">
        <input type="password" placeholder="Current password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} className="p-2 bg-[#0a0514] border rounded" />
        <input type="password" placeholder="New password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} className="p-2 bg-[#0a0514] border rounded" />
        <input type="password" placeholder="Confirm new password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} className="p-2 bg-[#0a0514] border rounded" />
        <div className="pt-2">
          <button onClick={handleChange} className="bg-accent text-white px-4 py-2 rounded">Change Password</button>
        </div>
      </div>
    </div>
  );
}
