/**
 * ChatComposer – Light tactile floating glass input
 */
import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export const ChatComposer = ({
  value, onChangeText, onSend, disabled,
}: { value: string; onChangeText: (t: string) => void; onSend: () => void; disabled?: boolean }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <TextInput value={value} onChangeText={onChangeText}
        placeholder="Ask about an algorithm..."
        placeholderTextColor="rgba(129,129,120,0.40)" style={styles.input} multiline />
      <Pressable disabled={disabled} onPress={onSend}
        style={[styles.sendButton, disabled && styles.disabled]}>
        <Ionicons color="#FFFFFF" name="send" size={16} />
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 6, borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.70)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.40)',
    shadowColor: 'rgba(0,0,0,0.10)', shadowOpacity: 1, shadowRadius: 25,
    shadowOffset: { width: 0, height: 12 }, elevation: 8,
  },
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  input: {
    flex: 1, minHeight: 40, maxHeight: 120,
    color: colors.textPrimary, fontSize: 14, lineHeight: 20,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  sendButton: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.primary,
    shadowColor: 'rgba(93,75,225,0.30)', shadowOpacity: 1, shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 }, elevation: 4,
  },
  disabled: { opacity: 0.4 },
});
