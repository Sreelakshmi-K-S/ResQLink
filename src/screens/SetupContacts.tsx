import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const SetupContacts = ({navigation}: any) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');

  const addContact = () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Error', 'Please fill in name and phone number');
      return;
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      relationship: relationship.trim() || 'Emergency Contact',
    };

    setContacts([...contacts, newContact]);
    setName('');
    setPhone('');
    setRelationship('');
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const saveAndContinue = async () => {
    if (contacts.length === 0) {
      Alert.alert(
        'No Contacts',
        'Add at least one emergency contact to continue',
      );
      return;
    }

    try {
      await AsyncStorage.setItem('emergencyContacts', JSON.stringify(contacts));
      await AsyncStorage.setItem('hasLaunched', 'true');
      
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (error) {
      console.error('Error saving contacts:', error);
      Alert.alert('Error', 'Failed to save contacts. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Emergency Contacts</Text>
          <Text style={styles.subtitle}>
            These contacts will receive your emergency alerts
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., John Doe"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., +1 234 567 8900"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Relationship (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Spouse, Friend, Family"
              value={relationship}
              onChangeText={setRelationship}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={addContact}
            activeOpacity={0.8}>
            <Text style={styles.addButtonText}>+ Add Contact</Text>
          </TouchableOpacity>
        </View>

        {contacts.length > 0 && (
          <View style={styles.contactsList}>
            <Text style={styles.contactsTitle}>
              Emergency Contacts ({contacts.length})
            </Text>
            {contacts.map(contact => (
              <View key={contact.id} style={styles.contactCard}>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                  <Text style={styles.contactRelation}>{contact.relationship}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeContact(contact.id)}
                  style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            contacts.length === 0 && styles.continueButtonDisabled,
          ]}
          onPress={saveAndContinue}
          disabled={contacts.length === 0}
          activeOpacity={0.8}>
          <Text style={styles.continueButtonText}>
            Continue ({contacts.length} contacts)
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  form: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contactsList: {
    padding: 20,
  },
  contactsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  contactRelation: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  removeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  continueButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    borderRadius: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SetupContacts;
