interface CompanionDetailProps {
  data: Companion;
}

export default function CompanionDetail({ data: companion }: CompanionDetailProps) {

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-2xl">
      <h1 className="text-2xl font-bold">{companion.name}</h1>
      <p className="text-gray-600">Subject: {companion.subject}</p>
      <p className="text-gray-600">Topic: {companion.topic}</p>
      <p className="text-gray-600">Voice: {companion.voice}</p>
      <p className="text-gray-600">Style: {companion.style}</p>
      <p className="text-gray-600">Duration: {companion.duration} minutes</p>

      <div className="mt-4">
        {companion.bookmarked ? (
          <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full">
            ★ Bookmarked
          </span>
        ) : (
          <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full">
            Not Bookmarked
          </span>
        )}
      </div>
    </div>
  );
}
