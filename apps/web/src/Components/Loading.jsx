const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/90 dark:bg-black/90 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center p-8 rounded-2xl">
        <span className="loading loading-spinner text-warning"></span>
      </div>
    </div>
  );
};

export default Loading;
