import { ArrowDown } from "lucide-react";

export default function WorkflowVisualizer({
  workflow,
}) {

  return (
    <div className="space-y-4">

      {workflow.map((step, index) => (

        <div key={index}>

          {/* Step Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-emerald-400 text-sm font-medium">
                  Step {step.step}
                </p>

                <h3 className="text-white text-xl font-semibold mt-1">
                  {step.tool}
                </h3>

                <p className="text-gray-400 mt-2">
                  {step.purpose}
                </p>

              </div>

              {/* Score */}
              {step.scoreOutOf100 && (

                <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-sm font-medium">
                  
                  {step.scoreOutOf100}/100

                </div>

              )}

            </div>

          </div>

          {/* Arrow */}
          {index !== workflow.length - 1 && (

            <div className="flex justify-center py-2">

              <ArrowDown
                className="text-gray-500"
                size={24}
              />

            </div>

          )}

        </div>

      ))}

    </div>
  );
}