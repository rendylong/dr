export default function Images({ data }) {
  return (
    <div>
      <h4>Related Images</h4>
      <div className="image-grid">
        {data.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.link} alt={image.title} />
            <p>{image.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 