const GradeCell = ({ value, key }) => {
  return (
    <input
      key={key}
      type="number"
      className="gradingSheetCell"
      defaultValue={value}
    />
  );
};

export default GradeCell;
