import { ITextProps, Button } from "native-base";
import { ReactNode } from "react";

interface ButtonProps extends ITextProps {
    children: ReactNode;
    autoSize?: boolean;
    bgColor?: string;
    ftColor?: string;
}

export function Botao({ children, autoSize = false, bgColor, ftColor, ...rest }: ButtonProps) {
    return (
        <Button
            w={autoSize ? 'auto' : '100%'}
            bg={bgColor || 'blue.800'}
            mt={10}
            color={'black'}
            borderRadius="lg"
            _text={{ color: ftColor || 'white' }}
            {...rest}
        >
            {children}
        </Button>
    );
}