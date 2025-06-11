import { Input, FormControl, Checkbox, Switch, HStack } from "native-base";
import { SeletorHoras } from "./SeletorHoras";
import { Combox } from "./Combox";
import { TextInputMask } from "react-native-masked-text";

interface InputProps {
  data?: any,
  label?: string;
  placeholder: string;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactNode;
  value?: any;
  type?: string;
  opcional?: boolean;
  colecao?: string;
  condicaoBloqueio?: string;
  contextoBloqueio?: any;
  onChangeText?: (text: any) => void;
}

export function EntradaTexto({
  data,
  label,
  placeholder,
  secureTextEntry = false,
  value,
  type,
  opcional,
  colecao,
  condicaoBloqueio,
  contextoBloqueio,
  onChangeText
}: InputProps): JSX.Element {
  function avaliarCondicao(condicaoStr: string, contexto: Record<string, any>): boolean {
    try {
      return new Function(...Object.keys(contexto), `return (${condicaoStr});`)(...Object.values(contexto));
    } catch (e) {
      console.warn("Erro ao avaliar condição:", e);
      return false;
    }
  }

  const isDisabled = condicaoBloqueio
    ? avaliarCondicao(condicaoBloqueio, contextoBloqueio(data))
    : false;

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
      ) : type === 'phone' ? (
        <TextInputMask
          editable={!isDisabled}
          placeholder={placeholder}
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            padding: 10,
            marginVertical: 6,
            elevation: 2,
          }}
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
          }}
          value={value}
          onChangeText={onChangeText}
          keyboardType="phone-pad"
        />
      ) : type === 'checkbox' ? (
        <HStack>
          <Switch
            size="lg"
            borderRadius="lg"
            bgColor="gray.100"
            isChecked={value}
            onToggle={() => onChangeText(!value)}
            offTrackColor="gray.300"
            onTrackColor="green.400"
            isDisabled={isDisabled}
          />
        </HStack>
      ) : (
        <Input
          placeholder={placeholder}
          size="lg"
          w="100%"
          borderRadius="lg"
          bgColor="gray.100"
          secureTextEntry={secureTextEntry}
          shadow={3}
          keyboardType={type === "numeric" ? "number-pad" : "default"}
          value={value}
          isReadOnly={isDisabled}
          isDisabled={isDisabled}
          onChangeText={onChangeText}
        />
      )
      }
    </FormControl >
  );
};