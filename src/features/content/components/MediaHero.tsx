interface MediaHeroProps {
  mediaUrl: string;
}

export const MediaHero: React.FC<MediaHeroProps> = ({ mediaUrl }) => {
  const isVideo = /\.(mp4|webm|ogg)$/i.test(mediaUrl) || /youtube\.com|vimeo\.com/.test(mediaUrl);

  return (
    <div className="rounded-lg overflow-hidden bg-black/5">
      {isVideo ? (
        <video controls className="w-full h-auto max-h-[480px]">
          <source src={mediaUrl} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={mediaUrl} alt="content media" className="w-full h-auto object-cover rounded" />
      )}
    </div>
  );
};