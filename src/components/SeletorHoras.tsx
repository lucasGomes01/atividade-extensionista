import React, { useState } from 'react';
import { View, Platform, Text, TouchableOpacity, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface SeletorHorasProps {
    onHourChange: (hour: Date) => void;
}

export function SeletorHoras({
    onHourChange
}: SeletorHorasProps) {
    const [date, setDate] = useState(new Date(null));
    const [showPicker, setShowPicker] = useState(false);

    const handleChange = (event: any, selectedDate?: Date) => {
        setShowPicker(Platform.OS === 'ios'); // Manter o picker aberto no iOS, não testado
        if (selectedDate) {
            setDate(selectedDate);
            onHourChange(selectedDate);
            Keyboard.dismiss();
        }
    };

    const showTimePicker = () => {
        setShowPicker(true);
    };

    return (
        <View>
            <TouchableOpacity onPress={showTimePicker}>
                <Text
                    style={{
                        fontSize: 16,
                        width: '100%',
                        height: 40,
                        padding: 8,
                        borderRadius: 8,
                        color: '#7A7A7A',
                        backgroundColor: '#F5F5F5',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 10,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                        elevation: 6,
                    }}
                >
                    {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleChange}
                />
            )}
        </View>
    );
}
