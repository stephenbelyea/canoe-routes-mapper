import "./select.styles.css";

export type SelectOption = {
  value: string;
  label: string;
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: SelectOption[];
  selected?: string;
}

export const Select = ({
  options = [],
  label,
  className,
  ...props
}: SelectProps) => {
  const selectProps: React.SelectHTMLAttributes<HTMLSelectElement> = {
    className: ["select", className].join(" "),
    "aria-label": label,
    ...props,
  };

  return (
    <select {...selectProps}>
      {options.map((option: SelectOption) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
