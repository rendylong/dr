export default function Resources({ data }) {
  return (
    <div>
      <h4>Resources</h4>
      <ul>
        {data.map((resource, index) => (
          <li key={index}>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              {resource.title}
            </a>
            <p>{resource.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
} 