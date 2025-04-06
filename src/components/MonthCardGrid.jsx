import { Link } from "react-router-dom";

export default function MonthCardGrid({ months, topics }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {months.map((month) => (
        <MonthCard key={month} month={month} topics={topics} />
      ))}
    </div>
  );
}

function MonthCard({ month, topics }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-xl">
      <Link to={`/admin/content-management/${month}`}>
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="text-center font-medium text-gray-700 rounded-t-lg p-[3px] bg-gradient-to-r from-[#94c3fc] to-[#CBF3FF]">
            <div className="bg-white rounded-t-lg py-2 px-4">
              {month} month
            </div>
          </div>

          <div className="p-3 space-y-3">
            {topics.map((topic) => (
              <TopicItem key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

function TopicItem({ topic }) {
  return (
    <div className="flex items-center rounded-md p-2 text-sm text-gray-600">
      <span className="text-gray-500 mr-2">
        Topic {topic.id}:
      </span>
      <span className="bg-white border border-gray-400/20 rounded-full px-1 font-semibold">
        {topic.title}
      </span>
    </div>
  );
}