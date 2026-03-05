'use client'

import { useState } from 'react'

type Step = 'account' | 'employee' | 'knowledge' | 'integrations' | 'voice' | 'deploy' | 'success'

const steps: { id: Step; title: string; number: number }[] = [
  { id: 'account', title: 'Account Setup', number: 1 },
  { id: 'employee', title: 'Create Digital Employee', number: 2 },
  { id: 'knowledge', title: 'Knowledge Base', number: 3 },
  { id: 'integrations', title: 'Integrations', number: 4 },
  { id: 'voice', title: 'Voice & Tone', number: 5 },
  { id: 'deploy', title: 'Deploy to Slack', number: 6 },
  { id: 'success', title: 'Success', number: 7 },
]

interface FormData {
  // Account
  email: string
  password: string
  companyName: string
  // Employee
  employeeName: string
  employeeRole: string
  employeeContext: string
  // Knowledge
  knowledgeFiles: File[]
  // Integrations
  selectedIntegrations: string[]
  // Voice
  voiceTone: number
  voiceSamples: string
  // Deploy
  selectedWorkspace: string
}

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('account')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<FormData>>({
    selectedIntegrations: [],
    voiceTone: 50,
    knowledgeFiles: [],
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNext = async () => {
    setError(null)
    setLoading(true)

    try {
      if (currentStep === 'account') {
        // Submit account signup
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            companyName: formData.companyName,
          }),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Signup failed')
        }
      } else if (currentStep === 'employee') {
        // Create digital employee
        const res = await fetch('/api/employees/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.employeeName,
            role: formData.employeeRole,
            context: formData.employeeContext,
          }),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Failed to create employee')
        }
      }

      // Move to next step
      const currentIndex = steps.findIndex(s => s.id === currentStep)
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1].id)
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id)
    }
  }

  const currentStepNumber = steps.findIndex(s => s.id === currentStep) + 1

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Step Progress */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex-1 mx-1 rounded-full h-2 ${
                steps.indexOf(step) < currentStepNumber
                  ? 'bg-blue-600'
                  : steps.indexOf(step) === currentStepNumber - 1
                  ? 'bg-blue-600'
                  : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
        <p className="text-slate-300 text-sm">
          Step {currentStepNumber} of {steps.length}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6 text-red-300">
          {error}
        </div>
      )}

      {/* Content */}
      <div className="bg-slate-800 rounded-lg p-8 mb-8">
        {currentStep === 'account' && <AccountSetup formData={formData} onChange={handleInputChange} />}
        {currentStep === 'employee' && <CreateEmployee formData={formData} onChange={handleInputChange} />}
        {currentStep === 'knowledge' && <KnowledgeBase formData={formData} onChange={handleInputChange} />}
        {currentStep === 'integrations' && <Integrations formData={formData} onChange={handleInputChange} />}
        {currentStep === 'voice' && <VoiceTraining formData={formData} onChange={handleInputChange} />}
        {currentStep === 'deploy' && <DeployToSlack formData={formData} onChange={handleInputChange} />}
        {currentStep === 'success' && <SuccessScreen />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStepNumber === 1 || loading}
          className="px-6 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === 'success' || loading}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : currentStep === 'deploy' ? 'Launch' : 'Next'}
        </button>
      </div>
    </div>
  )
}

function AccountSetup({ formData, onChange }: { formData: Partial<FormData>; onChange: (field: string, value: any) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Account Setup</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-slate-300 mb-2">Company Name</label>
          <input
            type="text"
            placeholder="Acme Corp"
            value={formData.companyName || ''}
            onChange={(e) => onChange('companyName', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500"
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-2">Email</label>
          <input
            type="email"
            placeholder="hello@acme.com"
            value={formData.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500"
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-2">Password</label>
          <input
            type="password"
            value={formData.password || ''}
            onChange={(e) => onChange('password', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500"
          />
        </div>
      </form>
    </div>
  )
}

function CreateEmployee({ formData, onChange }: { formData: Partial<FormData>; onChange: (field: string, value: any) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Create Your Digital Employee</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-slate-300 mb-2">Employee Name</label>
          <input
            type="text"
            placeholder="e.g., Alex"
            value={formData.employeeName || ''}
            onChange={(e) => onChange('employeeName', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500"
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-2">Role / Title</label>
          <input
            type="text"
            placeholder="e.g., Customer Success Manager"
            value={formData.employeeRole || ''}
            onChange={(e) => onChange('employeeRole', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500"
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-2">Initial Context</label>
          <textarea
            placeholder="Brief description of their responsibilities and context..."
            rows={4}
            value={formData.employeeContext || ''}
            onChange={(e) => onChange('employeeContext', e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500"
          />
        </div>
      </form>
    </div>
  )
}

function KnowledgeBase({ formData, onChange }: { formData: Partial<FormData>; onChange: (field: string, value: any) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Knowledge Base</h2>
      <p className="text-slate-300 mb-6">Upload documents and procedures so your digital employee can learn your business.</p>
      <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center mb-6">
        <p className="text-slate-400">Drag files here or click to upload</p>
        <p className="text-slate-500 text-sm mt-2">PDF, DOCX, TXT, or CSV</p>
      </div>
      <div className="space-y-2">
        <label className="flex items-center text-slate-300">
          <input type="checkbox" className="mr-3" />
          <span>Slack history (auto-import)</span>
        </label>
        <label className="flex items-center text-slate-300">
          <input type="checkbox" className="mr-3" />
          <span>Salesforce / CRM data</span>
        </label>
        <label className="flex items-center text-slate-300">
          <input type="checkbox" className="mr-3" />
          <span>Email archives</span>
        </label>
      </div>
    </div>
  )
}

function Integrations({ formData, onChange }: { formData: Partial<FormData>; onChange: (field: string, value: any) => void }) {
  const integrations = [
    { name: 'Slack', icon: '💬' },
    { name: 'Email', icon: '📧' },
    { name: 'Salesforce', icon: '📊' },
    { name: 'Google Calendar', icon: '📅' },
    { name: 'GitHub', icon: '🐙' },
    { name: 'Notion', icon: '📝' },
  ]

  const toggleIntegration = (name: string) => {
    const current = formData.selectedIntegrations || []
    if (current.includes(name)) {
      onChange('selectedIntegrations', current.filter((i) => i !== name))
    } else {
      onChange('selectedIntegrations', [...current, name])
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Connect Integrations</h2>
      <p className="text-slate-300 mb-6">Let your digital employee interact with your tools.</p>
      <div className="space-y-3">
        {integrations.map((integration) => (
          <button
            key={integration.name}
            onClick={() => toggleIntegration(integration.name)}
            className={`w-full flex items-center p-4 rounded-lg border transition ${
              (formData.selectedIntegrations || []).includes(integration.name)
                ? 'border-blue-600 bg-blue-900/30 text-blue-300'
                : 'border-slate-600 hover:bg-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <span className="text-2xl mr-4">{integration.icon}</span>
            <span className="flex-1 text-left">{integration.name}</span>
            <span className="text-slate-500">
              {(formData.selectedIntegrations || []).includes(integration.name) ? '✓' : '→'}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function VoiceTraining({ formData, onChange }: { formData: Partial<FormData>; onChange: (field: string, value: any) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Voice & Tone Training</h2>
      <p className="text-slate-300 mb-6">Teach your digital employee to write like your brand.</p>
      
      <div className="mb-6">
        <label className="block text-slate-300 mb-3">Tone Slider</label>
        <input
          type="range"
          min="0"
          max="100"
          value={formData.voiceTone || 50}
          onChange={(e) => onChange('voiceTone', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>Professional</span>
          <span>Casual</span>
        </div>
      </div>

      <div>
        <label className="block text-slate-300 mb-2">Sample Voice Inputs</label>
        <textarea
          placeholder="Paste examples of your writing style (emails, blog posts, etc.)..."
          rows={4}
          value={formData.voiceSamples || ''}
          onChange={(e) => onChange('voiceSamples', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500"
        />
      </div>
    </div>
  )
}

function DeployToSlack({ formData, onChange }: { formData: Partial<FormData>; onChange: (field: string, value: any) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Deploy to Slack</h2>
      <p className="text-slate-300 mb-6">Your digital employee is ready. Deploy them to your Slack workspace.</p>
      
      <div className="bg-slate-700 rounded-lg p-6 mb-6">
        <p className="text-slate-300 mb-4">Select which Slack workspace to deploy to:</p>
        <select
          value={formData.selectedWorkspace || ''}
          onChange={(e) => onChange('selectedWorkspace', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white"
        >
          <option value="">Choose workspace...</option>
          <option value="my-workspace">My Workspace</option>
          <option value="team-workspace">Team Workspace</option>
        </select>
      </div>

      <p className="text-slate-400 text-sm">
        Your digital employee will appear as a new bot member in your workspace. 
        Invite them to channels and start delegating work!
      </p>
    </div>
  )
}

function SuccessScreen() {
  return (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-3xl font-bold text-white mb-4">Welcome to Digital Employees</h2>
      <p className="text-slate-300 mb-8">
        Your digital employee is live and learning. You'll see them grow stronger every day.
      </p>
      
      <div className="bg-slate-700 rounded-lg p-6 mb-8">
        <h3 className="text-white font-bold mb-4">Next Steps</h3>
        <ul className="text-slate-300 space-y-2 text-left">
          <li>✓ Check your email for Slack login credentials</li>
          <li>✓ Invite your digital employee to relevant channels</li>
          <li>✓ Start with small tasks to build their confidence</li>
          <li>✓ Review their work and provide feedback</li>
        </ul>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg">
        Go to Dashboard
      </button>
    </div>
  )
}
