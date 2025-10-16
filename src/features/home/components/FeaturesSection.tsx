// TBU
const features = [
  { title: "Gamificação", desc: "Avance de nível e desbloqueie conquistas." },
  { title: "Feedback Instantâneo", desc: "Saiba onde melhorar a cada exercício." },
  { title: "Dashboard Inteligente", desc: "Visualize seu progresso em tempo real." },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
      {features.map((f, i) => (
        <div key={i} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
          <p className="text-muted-foreground">{f.desc}</p>
        </div>
      ))}
    </section>
  );
};
