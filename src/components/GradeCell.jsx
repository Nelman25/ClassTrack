const GradeCell = ({ value, key, className }) => {
  return (
    <input
      key={key}
      type="number"
      className={`gradingSheetCell ${className}`}
      defaultValue={value}
    />
  );
};

export default GradeCell;
