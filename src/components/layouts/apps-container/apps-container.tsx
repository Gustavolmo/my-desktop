type Props = {
  children: React.ReactNode;
};

export default function AppsContainer({ children }: Props) {
  return (
    <footer className="fixed flex items-center justify-center bottom-0 w-full pointer-events-none">
      <section className="h-16 px-8 rounded-t-lg flex items-center justify-center gap-4 bg-neutral-600 bg-opacity-20 mx-auto pointer-events-auto">
        {children}
      </section>
    </footer>
  );
}
