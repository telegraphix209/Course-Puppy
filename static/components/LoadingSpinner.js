function LoadingSpinner({ size = 24, className = '' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2Icon size={size} className="text-blue-600" />
    </div>
  );
}
