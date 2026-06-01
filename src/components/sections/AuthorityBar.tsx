const stats = [
  { value: "10+", label: "Anos de experiência" },
  { value: "5.000+", label: "Pacientes atendidas" },
  { value: "15+", label: "Procedimentos especializados" },
  { value: "98%", label: "Taxa de satisfação" },
];

export function AuthorityBar() {
  return (
    <section className="bg-km-gold py-8">
      <div className="container-km px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-heading text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
