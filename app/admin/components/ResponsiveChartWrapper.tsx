const ResponsiveChartWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="w-full overflow-x-auto">
    <div className="min-w-[300px] max-w-full md:max-w-2xl lg:max-w-4xl mx-auto">
      {children}
    </div>
  </div>
);

export default ResponsiveChartWrapper;
