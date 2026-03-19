import React from 'react';

export default function DeleteAccount() {
  const handleDelete = () => {
    const ok = window.confirm('Are you sure you want to delete your account? This action is irreversible.');
    if (ok) {
      // UI-only: show message
      alert('Account deletion requested (UI-only)');
    }
  };

  return (
    <div className="p-4 border rounded border-[#3b2b5a] bg-transparent">
      <h3 className="font-primary text-sm mb-4">Delete Account</h3>
      <p className="text-sm text-[#bdb2d6] mb-4">Warning: Deleting your account will remove all data. This is a UI-only demo.</p>
      <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete Account</button>
    </div>
  );
}
