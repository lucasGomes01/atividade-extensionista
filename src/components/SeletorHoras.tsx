import React, { useState } from 'react';
import { View, Platform, Text, TouchableOpacity, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Timestamp } from 'firebase/firestore';

interface SeletorHorasProps {
    onHourChange: (hour: Date) => void;
    value: Timestamp;
}

export function SeletorHoras({
    onHourChange,
    value
}: SeletorHorasProps) {
    const [date, setDate] = useState(value || Timestamp.fromDate(new Date()));
    const [showPicker, setShowPicker] = useState(false);

    const handleChange = (event: any, selectedDate?: Date) => {
        setShowPicker(Platform.OS === 'ios'); // Manter o picker aberto no iOS, não testado
        if (selectedDate) {
            setDate(Timestamp.fromDate(selectedDate));
            onHourChange(selectedDate);
            Keyboard.dismiss();
        }
    };

    const showTimePicker = () => {
        setShowPicker(true);
    };

    function timestampToHour(timestamp: { seconds: number, nanoseconds: number }): string {
        const data = new Date(timestamp.seconds * 1000);
        return data.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    }

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
                    {timestampToHour(date)}
                </Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={new Date(date.seconds * 1000)}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleChange}
                />
            )}
        </View>
    );
}
