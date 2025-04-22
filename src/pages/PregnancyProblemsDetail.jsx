import image from "@/assets/temp.png";
import image2 from "@/assets/temp2.png";
import image3 from "@/assets/temp3.png";

// Text content constants
const PREGNANCY_GUIDE_CONTENT = {
  title: "Pregnancy Problems from Beginning to End",
  introduction: {
    part1: "The pregnancy journey begins with physical and psychological changes that a mother experiences from the first month until the ninth. Each stage has its own challenges, such as morning sickness, mood swings, back pain, and a heavy belly. The goal here is to educate every mother about the normal problems she may face and provide simple advice to help her get through each month safely and comfortably until she arrives at the moment of delivery with confidence and peace of mind.",
    part2: "Follow us month by month and take steps to maintain your health and the health of your baby."
  },
  firstMonth: {
    description: "The First Month of Pregnancy: At the beginning of pregnancy, the mother's body begins to undergo significant changes due to hormonal changes. This can cause general fatigue, nausea, and frequent dizziness, which is very normal during this stage.",
    commonProblems: {
      title: "Common problems:",
      items: "morning sickness, fatigue, mood swings, and dizziness."
    },
    howToDeal: {
      title: "How to deal with it:",
      points: [
        "Rest is very important in the first month",
        "It is best to divide meals throughout the day, preferably light and easy to digest.",
        "Starting with a saltine cracker 🍪 or toast 🍞 before getting out of bed can reduce nausea.",
        "Drinking enough water 🥛 is essential to avoid dehydration."
      ]
    },
    healthyFoods: {
      title: "Healthy foods:",
      items: "Boiled potatoes 🥔, light soup 🍲, bananas 🍌 and apples 🍎, breadcrumbs, and toast 🍞."
    },
    suggestedDrinks: {
      title: "Suggested drinks:",
      items: [
        "Ginger (in moderate amounts) 🌿",
        "Warm water with a few drops of lemon 🥤",
        "Anise or milk with honey 🍯"
      ]
    },
    exercises: {
      title: "Appropriate exercises:",
      points: [
        "Deep breathing exercises",
        "Light walking indoors for 10 to 15 minutes daily. Avoid any excessive physical exertion."
      ]
    },
    seeDoctor: {
      title: "When should you see a doctor?",
      points: [
        "At the beginning of the month to confirm pregnancy.",
        "If you experience persistent vomiting that prevents you from eating or drinking.",
        "If you experience severe dizziness or fainting."
      ]
    }
  }
};

export default function PregnancyGuide() {
  return (
    <div className="p-4 md:p-6 rounded-lg">
      <div className="space-y-6">
        {/* Title Section */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {PREGNANCY_GUIDE_CONTENT.title}
        </h1>

        {/* Introduction */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="md:w-2/3">
            <p className="text-gray-700 text-lg max-w-4xl">
              {PREGNANCY_GUIDE_CONTENT.introduction.part1}
            </p>
            <p className="mt-6 text-gray-700 text-lg">
              {PREGNANCY_GUIDE_CONTENT.introduction.part2}
            </p>
          </div>
          <div className="lg:w-1/3 flex justify-center">
            <img
              src={image}
              alt="Pregnant woman with partner"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Month Section */}
        <div className="bg-white bg-opacity-50 rounded-lg">
          <div className="h-[1px] bg-gray-300 max-w-7xl mx-4 mb-12 mt-10" />
          <p className="text-gray-700 mt-2 max-w-4xl text-lg">
            {PREGNANCY_GUIDE_CONTENT.firstMonth.description}
          </p>

          {/* Common Problems */}
          <div className="mt-16 text-lg">
            <span className="font-bold text-gray-800">
              {PREGNANCY_GUIDE_CONTENT.firstMonth.commonProblems.title}
            </span>
            <span className="text-gray-700 max-w-4xl">
              {PREGNANCY_GUIDE_CONTENT.firstMonth.commonProblems.items}
            </span>
          </div>

          {/* How to Deal With It */}
          <div className="flex flex-col md:flex-row gap-4 items-center mt-4 text-lg">
            <div className="md:w-2/3">
              <span className="font-bold text-gray-800 mr-1">
                {PREGNANCY_GUIDE_CONTENT.firstMonth.howToDeal.title}
              </span>
              {PREGNANCY_GUIDE_CONTENT.firstMonth.howToDeal.points.map((point, index) => (
                <p key={index} className="text-gray-700 mt-2">
                  {point}
                </p>
              ))}
            </div>
            <div className="md:w-1/5 flex justify-center">
              <img
                src={image2}
                alt="Pregnant woman resting"
                className="rounded-lg bg-cover"
              />
            </div>
          </div>
        </div>

        {/* Healthy Foods */}
        <div className="bg-white bg-opacity-50 rounded-lg text-lg max-w-4xl">
          <span className="font-bold text-gray-800 mr-1">
            {PREGNANCY_GUIDE_CONTENT.firstMonth.healthyFoods.title}
          </span>
          <span className="text-gray-700">
            {PREGNANCY_GUIDE_CONTENT.firstMonth.healthyFoods.items}
          </span>

          {/* Suggested Drinks */}
          <h3 className="font-bold text-gray-800 mt-10">
            {PREGNANCY_GUIDE_CONTENT.firstMonth.suggestedDrinks.title}
          </h3>
          <ul className="text-gray-700 space-y-2 mt-2">
            {PREGNANCY_GUIDE_CONTENT.firstMonth.suggestedDrinks.items.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Appropriate Exercises */}
        <div className="bg-white bg-opacity-50 text-lg rounded-lg">
          <span className="font-bold text-gray-800 mr-1">
            {PREGNANCY_GUIDE_CONTENT.firstMonth.exercises.title}
          </span>
          {PREGNANCY_GUIDE_CONTENT.firstMonth.exercises.points.map((point, index) => (
            <p key={index} className="text-gray-700 mt-1">
              {point}
            </p>
          ))}

          <div className="grid grid-row-2 md:grid-cols-2 gap-4 mt-8">
            <img
              src={image3}
              alt="Pregnancy yoga pose 1"
              className="rounded-lg bg-cover w-full h-full"
            />
            <img
              src={image3}
              alt="Pregnancy yoga pose 2"
              className="rounded-lg bg-cover w-full h-full"
            />
          </div>
        </div>

        {/* When to See a Doctor */}
        <div className="bg-white bg-opacity-50 p-4 rounded-lg text-lg">
          <h3 className="font-bold text-gray-800">
            {PREGNANCY_GUIDE_CONTENT.firstMonth.seeDoctor.title}
          </h3>
          {PREGNANCY_GUIDE_CONTENT.firstMonth.seeDoctor.points.map((point, index) => (
            <p key={index} className="text-gray-700 mt-1">
              {point}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}