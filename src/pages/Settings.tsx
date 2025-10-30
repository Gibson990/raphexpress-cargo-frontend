import { useState } from 'react';
import { Bell, Lock, Globe, CreditCard, Save } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';

const Settings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    language: 'en',
    currency: 'USD',
    timezone: 'UTC+5:30',
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully!');
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Settings</h1>
          <p className="text-neutral-600">Manage your account preferences</p>
        </div>

        <Card variant="elevated" padding="lg">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
              <div>
                <div className="font-medium text-neutral-900">Email Notifications</div>
                <div className="text-sm text-neutral-600">Receive shipment updates via email</div>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                className="w-5 h-5 rounded border-neutral-300 text-primary focus:ring-primary"
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
              <div>
                <div className="font-medium text-neutral-900">SMS Notifications</div>
                <div className="text-sm text-neutral-600">Receive updates via SMS</div>
              </div>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                className="w-5 h-5 rounded border-neutral-300 text-primary focus:ring-primary"
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary transition-colors cursor-pointer">
              <div>
                <div className="font-medium text-neutral-900">Push Notifications</div>
                <div className="text-sm text-neutral-600">Receive browser notifications</div>
              </div>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                className="w-5 h-5 rounded border-neutral-300 text-primary focus:ring-primary"
              />
            </label>
          </div>
        </Card>

        <Card variant="elevated" padding="lg">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Regional Settings
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="UTC+5:30">IST (UTC+5:30)</option>
                <option value="UTC+0">GMT (UTC+0)</option>
                <option value="UTC-5">EST (UTC-5)</option>
                <option value="UTC+8">SGT (UTC+8)</option>
              </select>
            </div>
          </div>
        </Card>

        <Card variant="elevated" padding="lg">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security
          </h2>
          <div className="space-y-6">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••" />
            <Input label="Confirm New Password" type="password" placeholder="••••••••" />
            <Button variant="outline">Change Password</Button>
          </div>
        </Card>

        <Button
          variant="primary"
          size="lg"
          onClick={handleSave}
          isLoading={isSaving}
          leftIcon={<Save className="h-4 w-4" />}
        >
          Save All Settings
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
