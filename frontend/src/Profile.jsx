import { useState, useEffect } from "react";
import { Sidebar } from "./Transactions";
import {
  Bell,
  User,
  Mail,
  Phone,
  Briefcase,
  Building2,
  CreditCard,
  Plus,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function Profile() {

  const uid = localStorage.getItem("uid");

  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    picture: "",
    phone: "",
    city: "",
    accountType: "Student",
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/profile?uid=${uid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Profile:", data);

        setProfile({
          name: data.name || "",
          email: data.email || "",
          picture: data.picture || "",
          phone: data.phone || "",
          city: data.city || "",
          accountType: data.accountType || "Student",
        });
      });
  }, []);

  const saveProfile = async () => {

    const response = await fetch("http://127.0.0.1:8000/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid,
        ...profile,
      }),
    });

    const data = await response.json();

    console.log(data);

    localStorage.setItem("name", profile.name);

    alert("Profile Updated Successfully");

    setEditMode(false);
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex h-screen bg-moneta-dark font-sans overflow-hidden">

  <Sidebar activePage="profile" />

  <main className="flex-1 overflow-y-auto p-10 scrollbar-hide">

    <header className="flex justify-between items-end mb-10">
      <div>
        <p className="text-moneta-green text-sm font-semibold tracking-wider uppercase mb-2">
          Account Settings
        </p>

        <h1 className="text-4xl font-bold text-white mb-2">
          Profile
        </h1>

        <p className="text-gray-400">
          Manage your personal information and connections.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400">
          <Bell size={18} />
        </button>

        {profile.picture ? (

          <img
            src={profile.picture}
            alt=""
            className="w-10 h-10 rounded-full border border-moneta-green"
          />

        ) : (

          <div className="w-10 h-10 rounded-full bg-[#1a3636] text-moneta-green flex items-center justify-center font-bold">
            {profile.name
              ? profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "U"}
          </div>

        )}

      </div>
    </header>

    <div className="max-w-4xl flex flex-col gap-8">

      <div className="bg-moneta-card border border-gray-800 rounded-2xl p-8 flex items-center justify-between">

        <div className="flex items-center gap-6">

          {profile.picture ? (

            <img
              src={profile.picture}
              alt=""
              className="w-20 h-20 rounded-full border-2 border-moneta-green"
            />

          ) : (

            <div className="w-20 h-20 rounded-full bg-[#1a3636] border-2 border-moneta-green flex items-center justify-center text-moneta-green text-2xl font-bold">

              {profile.name
                ? profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "U"}

            </div>

          )}

          <div>

            <h2 className="text-2xl font-bold text-white">
              {profile.name}
            </h2>

            <div className="flex items-center gap-2 text-gray-400">

              <Mail size={14} />

              {profile.email}

            </div>

          </div>

        </div>

        {!editMode ? (

          <button
            onClick={() => setEditMode(true)}
            className="bg-[#1b252a] border border-gray-700 px-5 py-2 rounded-xl text-white"
          >
            Edit Profile
          </button>

        ) : (

          <button
            onClick={saveProfile}
            className="bg-moneta-green text-black px-5 py-2 rounded-xl font-semibold"
          >
            Save Changes
          </button>

        )}

      </div>
            <div className="grid grid-cols-2 gap-8">

        {/* Personal Details */}

        <div className="bg-moneta-card border border-gray-800 rounded-2xl p-8">

          <div className="flex items-center gap-2 mb-6">
            <User size={18} className="text-moneta-green" />
            <h3 className="text-lg font-semibold text-white">
              Personal Details
            </h3>
          </div>

          <div className="space-y-5">

            {/* Name */}

            <div>
              <label className="text-gray-400 text-sm">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full mt-2 bg-[#0b1317] border border-gray-700 rounded-xl px-4 py-3 text-white disabled:opacity-70"
              />
            </div>

            {/* Email */}

            <div>
              <label className="text-gray-400 text-sm">
                Email
              </label>

              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full mt-2 bg-[#0b1317] border border-gray-700 rounded-xl px-4 py-3 text-gray-400"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="text-gray-400 text-sm">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!editMode}
                placeholder="Enter phone"
                className="w-full mt-2 bg-[#0b1317] border border-gray-700 rounded-xl px-4 py-3 text-white"
              />
            </div>

            {/* City */}

            <div>
              <label className="text-gray-400 text-sm">
                City
              </label>

              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                disabled={!editMode}
                placeholder="Enter city"
                className="w-full mt-2 bg-[#0b1317] border border-gray-700 rounded-xl px-4 py-3 text-white"
              />
            </div>

            {/* Account Type */}

            <div>
              <label className="text-gray-400 text-sm">
                Account Type
              </label>

              <select
                name="accountType"
                value={profile.accountType}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full mt-2 bg-[#0b1317] border border-gray-700 rounded-xl px-4 py-3 text-white"
              >
                <option>Student</option>
                <option>Professional</option>
                <option>Business</option>
              </select>
            </div>

            <div className="flex items-center gap-3 text-moneta-green pt-2">
              <ShieldCheck size={18} />
              <span>Google Authenticated</span>
            </div>

          </div>

        </div>
                {/* Connected Banks */}

        <div className="bg-moneta-card border border-gray-800 rounded-2xl p-8">

          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-moneta-green" />
              <h3 className="text-lg font-semibold text-white">
                Connected Banks
              </h3>
            </div>

            <button className="text-moneta-green hover:text-white">
              <Plus size={20} />
            </button>

          </div>

          <div className="space-y-4">

            <BankCard
              icon={<Building2 size={18} />}
              color="bg-blue-900/40 text-blue-400"
              name="Primary Bank"
              status="Active"
            />

            <BankCard
              icon={<CreditCard size={18} />}
              color="bg-red-900/40 text-red-400"
              name="Credit Card"
              status="Active"
            />

          </div>

        </div>

      </div>

    </div>

  </main>

</div>

);
}

function BankCard({ icon, color, name, status }) {
  return (
    <div className="bg-[#1b252a] border border-gray-800 rounded-xl p-4 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm">
            {name}
          </h4>

          <p className="text-gray-500 text-xs">
            Connected Account
          </p>
        </div>

      </div>

      <span className="text-xs font-medium px-2 py-1 rounded bg-moneta-green/10 text-moneta-green flex items-center gap-1">

        <CheckCircle2 size={12} />

        {status}

      </span>

    </div>
  );
}