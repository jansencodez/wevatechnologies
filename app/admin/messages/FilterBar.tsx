// app/admin/messages/FilterBar.tsx
interface FilterBarProps {
  selectedCategory: string;
  onFilter: (category: string) => void;
}

export default function FilterBar({
  selectedCategory,
  onFilter,
}: FilterBarProps) {
  const categories = ["", "inquiry", "interested-in-service", "feedback"];

  return (
    <div className="flex space-x-2 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilter(category)}
          className={`px-4 py-2 rounded ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {category || "All"}
        </button>
      ))}
    </div>
  );
}
