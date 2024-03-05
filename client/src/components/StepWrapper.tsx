import React from 'react'

interface StepWrapperProps {
  activeStep: number
  children: React.ReactNode
}

export default function StepWrapper({
  activeStep,
  children,
}: StepWrapperProps) {
  const steps = ['Song information', 'Ipload image', 'Upload audio']

  return (
    <div className="container mt-20 mb-10 mx-auto">
      <div className="flex justify-center">
        <div className="w-full">
          <ul className="flex justify-between">
            {steps.map((step, index) => (
              <li key={index}>
                <div
                  className={`w-8 h-8 text-center rounded-full border-2 ${
                    activeStep >= index
                      ? 'border-rafton-orange'
                      : 'border-white'
                  }`}
                >
                  <span
                    className={`${
                      activeStep >= index
                        ? 'border-rafton-orange'
                        : 'text-white'
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>
                {/* <span
                  className={`${
                    activeStep >= index ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  {step}
                </span> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center mt-14 text-rafton-blue">
        <div className="w-full max-w-3xl">
          <div className="bg-white p-8 rounded-lg shadow-md">{children}</div>
        </div>
      </div>
    </div>
  )
}
