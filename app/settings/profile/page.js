export default function ProfileSettings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Profile Settings</h1>

      <div className="mt-4 space-y-4">
        <input className="setting-input" placeholder="Update Name" />
        <input className="setting-input" placeholder="Update Email" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </div>

      <style jsx>{`
        .setting-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
