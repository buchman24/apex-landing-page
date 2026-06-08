'use client';

import { useState, useRef } from 'react';

export default function AddMemberPage() {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!photo) { setStatus('error'); setMessage('Please select a photo.'); return; }
    setStatus('loading');
    setMessage('');
    try {
      const fd = new FormData();
      fd.append('password', password);
      fd.append('name', name);
      fd.append('linkedinUrl', linkedinUrl);
      fd.append('jobTitle', jobTitle);
      fd.append('photo', photo);

      const res = await fetch('/api/add-member', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('success');
      setMessage(`${name} was added to the community! The website will update in ~1 minute.`);
      setName(''); setLinkedinUrl(''); setJobTitle('');
      setPassword(''); setPhoto(null); setPreview(null);
      if (fileRef.current) fileRef.current.value = '';
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src="/logo.png" alt="APEX" className="h-12" />
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-2">Add Community Member</h1>
        <p className="text-gray-400 text-center text-sm mb-8">Submit a new member to the APEX website.</p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password <span className="text-red-400">*</span></label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              placeholder="Team password"
              className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Full Name <span className="text-red-400">*</span></label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required
              placeholder="e.g. Gal Chechik"
              className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">LinkedIn URL <span className="text-red-400">*</span></label>
            <input type="url" value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)} required
              placeholder="https://linkedin.com/in/username"
              className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Job Title <span className="text-red-400">*</span></label>
            <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} required
              placeholder="e.g. CEO at Acme"
              className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Photo <span className="text-red-400">*</span></label>
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full bg-[#1a1a2e] border-2 border-dashed border-gray-700 rounded-lg px-4 py-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="h-24 w-24 rounded-full object-cover mx-auto" />
              ) : (
                <div>
                  <p className="text-gray-400 text-sm">Click to upload a photo</p>
                  <p className="text-gray-600 text-xs mt-1">JPG, PNG, WebP</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
          </div>

          <button type="submit" disabled={status === 'loading'}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors mt-2">
            {status === 'loading' ? 'Adding...' : 'Add to Community'}
          </button>

          {message && (
            <p className={`text-sm text-center mt-2 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
