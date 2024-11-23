import { Input, FormControl } from "native-base";
import { SeletorHoras } from "./SeletorHoras";
import { Combox } from "./Combox";

interface InputProps {
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  value?: any;
  type?: string;
  opcional: boolean;
  colecao?: string;
  onChangeText?: (text: any) => void;
}

export function EntradaTexto({
  label,
  placeholder,
  secureTextEntry = false,
  value,
  type,
  opcional,
  colecao,
  onChangeText
}: InputProps): JSX.Element {
  return (
    <FormControl mt={3}>
      {label && <FormControl.Label>{label + (opcional ? " (Opcional)" : "")}</FormControl.Label>}
      {type === 'time' ? (
        <SeletorHoras
          onHourChange={onChangeText}
          value={value}
        />
      ) : type === 'combox' ? (
        <Combox
          colecao={colecao}
          value={value}
          onChangeSelect={onChangeText}
        />
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