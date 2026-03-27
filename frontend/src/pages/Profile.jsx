import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { fetchProfile } from '../services/employee.js';
import Loader from '../components/Loader.jsx';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchProfile();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex">
        <Sidebar role="employee" />
        <main className="flex-1 p-6">
          <div className="glass-card rounded-xl p-6 max-w-xl">
            <h3 className="text-2xl font-semibold mb-4">Profile</h3>
            {!profile ? (
              <Loader />
            ) : (
              <div className="space-y-3 text-sm">
                <div><span className="text-slate-400">Name:</span> {profile.name}</div>
                <div><span className="text-slate-400">Email:</span> {profile.email}</div>
                <div><span className="text-slate-400">Role:</span> {profile.role}</div>
                <div><span className="text-slate-400">Employee ID:</span> {profile.employeeId}</div>
                {profile.department && <div><span className="text-slate-400">Department:</span> {profile.department}</div>}
                <div><span className="text-slate-400">Joined:</span> {new Date(profile.createdAt).toLocaleDateString()}</div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
