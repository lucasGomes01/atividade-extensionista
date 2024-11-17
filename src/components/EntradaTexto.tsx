import { Input, FormControl } from "native-base";
import { SeletorHoras } from "./SeletorHoras";
import { useState } from "react";

interface InputProps {
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  value?: any;
  type?: string;
  onChangeText?: (text: string) => void;
}

export function EntradaTexto({
  label,
  placeholder,
  secureTextEntry = false,
  value,
  type,
  onChangeText
}: InputProps): JSX.Element {
  const [selectedHour, setSelectedHour] = useState<Date | null>(null);

  const handleHourChange = (hour: Date) => {
      setSelectedHour(hour);
  };

  return (
    <FormControl mt={3}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      {type === 'time' ? (
            <SeletorHoras onHourChange={handleHourChange} />
      ) : (
        <Input
          placeholder={placeholder}
          size="lg"
          w="100%"
          borderRadius="lg"
          bgColor="gray.100"
          secureTextEntry={secureTextEntry}
          shadow={3}
          value={value}
          onChangeText={onChangeText}
        />
      )}
    </FormControl>
  );
};