import { CheckCircle2, type LucideIcon } from 'lucide-react';
import Card from '../common/Card';

interface Step {
  number: number;
  title: string;
  icon: LucideIcon;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  return (
    <Card variant="elevated" padding="lg">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;

          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isActive
                    ? 'bg-primary text-white'
                    : 'bg-neutral-200 text-neutral-500'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                </div>
                <p className={`text-sm font-medium mt-2 text-center ${
                  isActive ? 'text-primary' : 'text-neutral-600'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 flex-1 mx-4 ${
                  isCompleted ? 'bg-green-500' : 'bg-neutral-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ProgressSteps;
