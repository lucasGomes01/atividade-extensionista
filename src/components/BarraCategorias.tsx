import { HStack, IconButton, Input, VStack, View } from 'native-base';
import { useEffect, useState } from 'react';
import { Entypo, FontAwesome6, MaterialIcons } from '@expo/vector-icons';

import { retornarListaSimplesColecao } from '../services/firestore';

export enum IconId {
    Artesanato = "VOYiyVGfb0mF2mshYuZz",
    Lanche = "i6Iau4nsMOh517qJeIUJ",
    Sorvete = "0eKXn3GhQCT8u45BIKkI",
    Bibidas = "0SSHjwT0Xhvm4ilTQqbJ",
  }

interface BarraCategoriasProps {
    categoriasSelecionadas?: string[];
    pesquisar?: (arg0: string) => void;
}

export function BarraCategorias({ 
    categoriasSelecionadas,
    pesquisar
}: BarraCategoriasProps) {
    const [dadosCategorias, setDadosCategorias] = useState(null);

    useEffect(() => {
        const recuperarDadosCategorias = async () => {
            const data = await retornarListaSimplesColecao("categoriaComercio");
            setDadosCategorias(data);
        };

        recuperarDadosCategorias();
    }, []);

    return (
        <HStack w="100%" borderRadius="xs" >
            {/* {
                dadosCategorias?.map((categoria) => {
                    return ( */}
                        <VStack
                            w="20%" h="60" p="2" borderRadius="xs" shadow="1" ml="4"
                            key={IconId.Artesanato} alignItems="center">

                            <IconButton
                                icon={<FontAwesome6 name="shirt" size={24} color="black" />}
                                borderRadius="full"
                                p={2.5}
                                mr={1}
                                background={ categoriasSelecionadas.filter(e => e == IconId.Artesanato).length === 1 ? "blue.300" : null}
                                onPress={() => { pesquisar(IconId.Artesanato) }}
                                _pressed={{ bg: 'gray.600' }}
                            />
                        </VStack>
                        <VStack
                            w="20%" h="60" p="2" borderRadius="xs" shadow="1" ml="4"
                            key={IconId.Lanche} alignItems="center">

                            <IconButton
                                icon={<MaterialIcons name="lunch-dining" size={24} color="black" />}
                                borderRadius="full"
                                p={2.5}
                                mr={1}
                                background={ categoriasSelecionadas.filter(e => e == IconId.Lanche).length === 1 ? "blue.300" : null}
                                onPress={() => { pesquisar(IconId.Lanche) }}
                                _pressed={{ bg: 'gray.600' }}
                            />
                        </VStack>
                        <VStack
                            w="20%" h="60" p="2" borderRadius="xs" shadow="1" ml="4"
                            key={IconId.Sorvete} alignItems="center">

                            <IconButton
                                icon={<MaterialIcons name="icecream" size={24} color="black" />}
                                borderRadius="full"
                                p={2.5}
                                mr={1}
                                background={ categoriasSelecionadas.filter(e => e == IconId.Sorvete).length === 1 ? "blue.300" : null}
                                onPress={() => { pesquisar(IconId.Sorvete) }}
                                _pressed={{ bg: 'gray.600' }}
                            />
                        </VStack>
                        <VStack
                            w="20%" h="60" p="2" borderRadius="xs" shadow="1" ml="4"
                            key={IconId.Bibidas} alignItems="center">

                            <IconButton
                                icon={<Entypo name="drink" size={24} color="black" />}
                                borderRadius="full"
                                p={2.5}
                                mr={1}
                                background={ categoriasSelecionadas.filter(e => e == IconId.Bibidas).length === 1 ? "blue.300" : null}
                                onPress={() => { pesquisar(IconId.Bibidas) }}
                                _pressed={{ bg: 'gray.600' }}
                            />
                        </VStack>
                    {/* );
                })
            } */}
        </HStack>
    );
}
