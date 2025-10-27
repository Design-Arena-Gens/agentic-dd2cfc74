import { useMemo, useState } from "react";
import type { Career, CareerCategory } from "@/data/careers";

type QuizProps = {
  careers: Career[];
};

type QuizOption = {
  label: string;
  value: CareerCategory;
  description: string;
};

type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

const questions: QuizQuestion[] = [
  {
    id: "strength",
    prompt: "Which activity feels most energizing to you?",
    options: [
      {
        label: "Designing digital products or experiences",
        value: "Creative",
        description: "You enjoy crafting visuals, interfaces, and storytelling.",
      },
      {
        label: "Solving complex technical challenges",
        value: "Technology",
        description: "You thrive when building systems and improving code.",
      },
      {
        label: "Helping people improve their well-being",
        value: "Healthcare",
        description: "You love supporting others through care and empathy.",
      },
      {
        label: "Analyzing data to guide business decisions",
        value: "Business",
        description: "You excel at interpreting trends and influencing growth.",
      },
    ],
  },
  {
    id: "environment",
    prompt: "What type of work environment do you prefer?",
    options: [
      {
        label: "Collaborating in cross-functional digital teams",
        value: "Technology",
        description: "You like fast-paced, iterative work styles.",
      },
      {
        label: "Hands-on settings with direct impact on people",
        value: "Healthcare",
        description: "You value personal connection and tangible outcomes.",
      },
      {
        label: "Structured environments focused on learning and growth",
        value: "Education",
        description: "You enjoy guiding others and continuous improvement.",
      },
      {
        label: "Fieldwork combining planning and on-site execution",
        value: "Engineering",
        description: "You appreciate building things that last.",
      },
    ],
  },
  {
    id: "skills",
    prompt: "Which skills would you love to use daily?",
    options: [
      {
        label: "Empathy, communication, and active listening",
        value: "Healthcare",
        description: "You are drawn to understanding and helping people.",
      },
      {
        label: "Logic, coding, and system architecture",
        value: "Technology",
        description: "You enjoy translating ideas into technical solutions.",
      },
      {
        label: "Visual storytelling and prototyping",
        value: "Creative",
        description: "You are inspired by crafting narratives and visuals.",
      },
      {
        label: "Strategic planning and stakeholder alignment",
        value: "Business",
        description: "You can see the big picture and drive initiatives.",
      },
    ],
  },
  {
    id: "impact",
    prompt: "How do you want your work to make an impact?",
    options: [
      {
        label: "Empower future generations through education",
        value: "Education",
        description: "You want to inspire and equip learners.",
      },
      {
        label: "Innovate solutions that scale globally",
        value: "Technology",
        description: "You aim to influence how people live and work.",
      },
      {
        label: "Improve health outcomes and quality of life",
        value: "Healthcare",
        description: "You are motivated by compassionate care.",
      },
      {
        label: "Design resilient infrastructure and systems",
        value: "Engineering",
        description: "You want to shape the spaces communities rely on.",
      },
    ],
  },
];

export function CareerQuiz({ careers }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<CareerCategory[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const progress = Math.round(((currentIndex + Number(isComplete)) / questions.length) * 100);

  const handleSelect = (category: CareerCategory) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = category;
    setAnswers(nextAnswers);

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setIsComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setIsComplete(false);
  };

  const recommendations = useMemo(() => {
    if (!isComplete) return [];
    const categoryScore = answers.reduce<Record<CareerCategory, number>>(
      (acc, category) => {
        acc[category] = (acc[category] ?? 0) + 1;
        return acc;
      },
      {
        Technology: 0,
        Healthcare: 0,
        Creative: 0,
        Business: 0,
        Education: 0,
        Engineering: 0,
      }
    );

    const sortedCategories = (Object.entries(categoryScore) as [
      CareerCategory,
      number,
    ][])
      .filter(([, score]) => score > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category]) => category);

    return careers.filter((career) =>
      sortedCategories.includes(career.category)
    );
  }, [answers, careers, isComplete]);

  return (
    <section
      aria-labelledby="career-quiz-heading"
      className="rounded-3xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-8 shadow-lg sm:p-12"
    >
      <div className="flex items-center justify-between gap-6">
        <div>
          <h2
            id="career-quiz-heading"
            className="text-3xl font-semibold text-slate-900"
          >
            Discover Your Career Path
          </h2>
          <p className="mt-2 max-w-2xl text-base text-slate-600 sm:text-lg">
            Answer a few quick questions to unlock personalized career
            recommendations aligned with your strengths and aspirations.
          </p>
        </div>
        <button
          type="button"
          onClick={resetQuiz}
          className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:inline-flex"
        >
          Restart
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3" aria-live="polite">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/70">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500 transition-all duration-700"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Quiz progress"
          />
        </div>
        <span className="text-sm font-medium text-slate-700">{progress}%</span>
      </div>

      {!isComplete ? (
        <div className="mt-8 space-y-6">
          <p className="text-lg font-medium text-slate-800">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <h3 className="text-2xl font-semibold text-slate-900">
            {questions[currentIndex].prompt}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {questions[currentIndex].options.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => handleSelect(option.value)}
                className="group flex h-full flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md focus-visible:-translate-y-1 focus-visible:border-emerald-300 focus-visible:shadow-md focus-visible:outline-none"
              >
                <span className="text-base font-semibold text-slate-900">
                  {option.label}
                </span>
                <span className="text-sm text-slate-600">
                  {option.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 space-y-6" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">
                Your Personalized Recommendations
              </h3>
              <p className="mt-1 text-base text-slate-600">
                Explore careers aligned with what inspires and motivates you.
              </p>
            </div>
            <button
              type="button"
              onClick={resetQuiz}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Retake Quiz
            </button>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {recommendations.length > 0 ? (
              recommendations.map((career) => (
                <div
                  key={career.id}
                  className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-emerald-100 transition hover:shadow-lg"
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                    {career.category}
                  </p>
                  <h4 className="mt-2 text-xl font-semibold text-slate-900">
                    {career.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    {career.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-emerald-700">
                    Typical salary: {career.salaryRange}
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-2xl bg-white/80 p-6 text-base text-slate-600">
                We couldn&apos;t generate a match yet. Try retaking the quiz to
                refine your interests.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
