import { Link, useLocation } from '@remix-run/react'
import React from 'react'

const steps = [
  { label: 'Add your resume' },
  { label: 'Add job offer' },
  { label: 'Enhance resume' },
]

export default function Stepper() {
  const location = useLocation()
  const currentStep = location.pathname.split('/').pop() // e.g. "step1", "step2"

  return (
    <div className="flex items-center justify-center w-full max-w-md mx-auto mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <Link to={`step${index + 1}`}>
            <div className="flex flex-col items-center relative">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                  `step${index + 1}` === currentStep
                    ? 'border-gray-800'
                    : 'border-gray-300'
                } bg-transparent`}
              >
                <span
                  className={`text-sm font-medium ${
                    `step${index + 1}` === currentStep
                      ? 'text-gray-800'
                      : 'text-gray-400'
                  }`}
                >
                  {index + 1}
                </span>
              </div>
              <span
                className={`mt-2 text-xs ${
                  `step${index + 1}` === currentStep
                    ? 'text-gray-800 font-medium'
                    : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          </Link>

          {index < steps.length - 1 && (
            <div
              className="flex-1 h-px bg-gray-300 mx-2"
              style={{ marginTop: '1rem' }}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
