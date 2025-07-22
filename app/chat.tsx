import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';

const avatars = {
  'Ana Morales': 'https://randomuser.me/api/portraits/women/44.jpg',
  'Carlos Herrera': 'https://randomuser.me/api/portraits/men/45.jpg',
  'Laura Gómez': 'https://randomuser.me/api/portraits/women/46.jpg',
  'Luis Rodríguez': 'https://randomuser.me/api/portraits/men/47.jpg',
  'Tú': 'https://randomuser.me/api/portraits/lego/1.jpg',
};

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      name: 'Ana Morales',
      text: '¿Alguien ya probó el nuevo café de temporada?',
      timestamp: '4:21 PM',
      type: 'text',
    },
    {
      id: '2',
      name: 'Carlos Herrera',
      text: 'El blend de Colombia es perfecto para espresso.',
      timestamp: '4:21 PM',
      type: 'text',
    },
    {
      id: '3',
      name: 'Laura Gómez',
      text: '¿Y para un cold brew? Estoy buscando algo más suave pero con buen sabor.',
      timestamp: '4:21 PM',
      type: 'text',
    },
    {
      id: '4',
      name: 'Tú',
      text: '¡Ese café suena delicioso! ¿Dónde lo han probado?',
      timestamp: '4:21 PM',
      type: 'text',
    },
    {
      id: '5',
      name: 'Luis Rodríguez',
      text: 'Te recomendaría el café de altura salvadoreño. Tiene notas frutales perfectas para cold brew.',
      timestamp: '4:22 PM',
      type: 'text',
    },
  ]);

  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const newMessage = {
      id: Date.now().toString(),
      name: 'Tú',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const sendImage = () => {
    const newMessage = {
      id: Date.now().toString(),
      name: 'Tú',
      imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=60',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'image',
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleReaction = (messageId, emoji) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, reaction: msg.reaction === emoji ? null : emoji }
          : msg
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageRow}>
      <Image source={{ uri: avatars[item.name] }} style={styles.avatar} />
      <View style={styles.messageBubble}>
        <Text style={styles.senderName}>{item.name}</Text>

        {item.type === 'text' ? (
          <Text style={styles.messageText}>{item.text}</Text>
        ) : (
          <Image source={{ uri: item.imageUrl }} style={styles.imageMessage} />
        )}

        <Text style={styles.timestamp}>{item.timestamp}</Text>

        <View style={styles.reactionRow}>
          <TouchableOpacity onPress={() => handleReaction(item.id, '❤️')}>
            <Text style={styles.reactionBtn}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleReaction(item.id, '👍')}>
            <Text style={styles.reactionBtn}>👍</Text>
          </TouchableOpacity>
          {item.reaction && <Text style={styles.userReaction}>You: {item.reaction}</Text>}
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Escribe un mensaje..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sendImage} style={styles.sendImageButton}>
          <Text style={styles.sendText}>📷</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageList: {
    padding: 10,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageBubble: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    maxWidth: '80%',
  },
  senderName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 15,
  },
  imageMessage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginVertical: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  reactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  reactionBtn: {
    marginRight: 10,
    fontSize: 18,
  },
  userReaction: {
    marginLeft: 10,
    fontSize: 14,
    color: '#007AFF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  sendImageButton: {
    marginLeft: 6,
    backgroundColor: '#4CD964',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
});
