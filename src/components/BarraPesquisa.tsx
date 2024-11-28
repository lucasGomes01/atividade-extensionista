import { HStack, IconButton, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface BarraPesquisaProps {
    pesquisar?: (arg0: string) => void;
}

export function BarraPesquisa({pesquisar

} : BarraPesquisaProps) {
    const [searchValue, setSearchValue] = useState("");

    return (
        <HStack 
            w="93.5%" 
            borderRadius="full" 
            p={1} 
            m={3} 
            shadow={2} 
            bg="gray.100"
            alignItems="center"
        >
            <Input
                placeholder="Buscar"
                variant="unstyled"
                flex={1}
                pl={4}
                pr={2}
                fontSize="md"
                placeholderTextColor="#2D3DCE"
                value={searchValue}
                onChangeText={(text) => setSearchValue(text)}
            />
            <IconButton
                icon={<Ionicons name="search" size={20} color="white" />}
                borderRadius="full"
                bg="#2D3DCE"
                p={2.5}
                mr={1}
                onPress={() => { pesquisar(searchValue) }}
                _pressed={{ bg: '#2842C7' }}
            />
        </HStack>
    );
}
