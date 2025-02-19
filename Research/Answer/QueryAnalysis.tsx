export default function QueryAnalysis({ data }) {
  return (
    <div>
      <h4>Query Analysis</h4>
      <ul>
        {data.queries.map((query, index) => (
          <li key={index}>{query}</li>
        ))}
      </ul>
    </div>
  );
} 