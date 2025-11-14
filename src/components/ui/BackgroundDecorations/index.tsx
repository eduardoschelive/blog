export function BackgroundDecorations() {
  return (
    <>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="fixed top-1/3 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/3 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/3 pointer-events-none" />
    </>
  )
}
