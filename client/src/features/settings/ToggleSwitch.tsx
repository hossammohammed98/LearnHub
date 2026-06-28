interface ToggleSwitchProps {
  checked: boolean;
  onChange?: () => void;
}

export default function ToggleSwitch({
  checked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />

      <div
        className="
          h-6 w-11 rounded-full bg-gray-300
          after:absolute after:right-0.5 after:top-0.5
          after:h-5 after:w-5 after:rounded-full
          after:bg-white after:transition-all
          peer-checked:bg-primary
          peer-checked:after:-translate-x-full
          rtl:peer-checked:after:translate-x-full
        "
      />
    </label>
  );
}