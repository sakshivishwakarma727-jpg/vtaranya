export default function NotificationsSettings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Notification Settings</h1>

      <div className="mt-4 space-y-4">
        <label><input type="checkbox" /> Email Notifications</label><br />
        <label><input type="checkbox" /> Push Alerts</label><br />
        <label><input type="checkbox" /> SMS Alerts</label>
      </div>
    </div>
  );
}
