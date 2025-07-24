import React, { ReactNode } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ChatMessage } from '../types';
import CustomImage from './CustomImage';

const parseURL=(Arrayurl:string): string=>{
const urlArray= JSON.parse(Arrayurl)
return  urlArray[0];
}

const ListChatCell = ({ item ,handleReaction,handlePinned,handleDelete}:{item:ChatMessage, handleReaction:(id:string,value:string)=>void,handlePinned:(id:string)=>void,handleDelete:(id:string)=>void}) => (
    <>
{item.sender_name ? 
<ReceivedMessageCell item={item} handleReaction={handleReaction} handlePinned={handlePinned} handleDelete={handleDelete}/>:
<OwnMesssageCell  item={item} handleReaction={handleReaction} handlePinned={handlePinned} handleDelete={handleDelete}/>}
    </>
  );

  const styles = StyleSheet.create({
   
  
    messageRowReceive: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
    },

    messageRowOwn: {
      flexDirection: 'row',
      alignSelf:'flex-end',
      marginBottom: 10,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    messageBubbleReceive: {
      backgroundColor: '#f1f1f1',
      borderRadius: 8,
      padding: 10,
      maxWidth: '80%',
    },
    messageBubbleOwn: {
      backgroundColor: '#0084FF',
      borderRadius: 8,
      padding: 10,
      maxWidth: '80%',
    },

    senderName: {
      fontWeight: '600',
      marginBottom: 2,
    },
    messageTextOwn: {
      fontSize: 15,
      color:"#fff"
    },
    messageTextReceive: {
      fontSize: 15,
      color: "#000"
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
  });

export default ListChatCell;

const MessageChatCell = ({ isOwnMessage=false,children }: { isOwnMessage:boolean,children:ReactNode}) => {
  
  return <View style={isOwnMessage ? styles.messageRowOwn:styles.messageRowReceive}>
     {children}
    </View>;
};
const OwnMesssageCell =  ({ item,handleReaction,handlePinned,handleDelete }: { item: ChatMessage; handleReaction: (id:string,value:string)=>void,handlePinned: (id:string)=>void,handleDelete:(id:string)=>void }) => {
  
  return <MessageChatCell isOwnMessage={!item.sender_name}>
      <View style={styles.messageBubbleOwn }>
        <Text style={styles.senderName}>{item.sender_name}</Text>

        {item.content !== '' ? (
          <Text style={styles.messageTextOwn}>{item.content}</Text>
        ) : (
          <CustomImage imageUrl={parseURL(item.media_url)} isAvatar={false}/>
        )}

        

        <View style={styles.reactionRow}>
          <TouchableOpacity onPress={() => handleReaction(item.id, '❤️')}>
            <Text style={styles.reactionBtn}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleReaction(item.id, '👍')}>
            <Text style={styles.reactionBtn}>👍</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePinned(item.id)}>
            <Text style={styles.reactionBtn}>pin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={styles.reactionBtn}>delete</Text>
          </TouchableOpacity>
          {item.additional_fields && <Text style={[styles.userReaction,{color:"#fff"}]}>You: {JSON.parse(item?.additional_fields).total_reactions }</Text>}
        </View>
        <Text style={[styles.timestamp,{color:"#fff"}]}>{item.updated_at}</Text>
      </View>
     </MessageChatCell>;
};

const ReceivedMessageCell = ({ item,handleReaction,handlePinned,handleDelete }: { item: ChatMessage; handleReaction: (id:string,value:string)=>void,handlePinned: (id:string)=>void,handleDelete:(id:string)=>void }) => {

  return  <MessageChatCell isOwnMessage={!item.sender_name}>
       <CustomImage imageUrl={item.sender_avatar} isAvatar={true}/>
      <View style={styles.messageBubbleReceive }>
        <Text style={styles.senderName}>{item.sender_name}</Text>

        {item.content !== '' ? (
          <Text style={styles.messageTextReceive}>{item.content}</Text>
        ) : (
          <CustomImage imageUrl={parseURL(item.media_url)} isAvatar={false}/>
        )}

        <View style={styles.reactionRow}>
          <TouchableOpacity onPress={() => handleReaction(item.id, '❤️')}>
            <Text style={styles.reactionBtn}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleReaction(item.id, '👍')}>
            <Text style={styles.reactionBtn}>👍</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePinned(item.id)}>
            <Text style={styles.reactionBtn}>pin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={styles.reactionBtn}>delete</Text>
          </TouchableOpacity>
          {item.additional_fields && <Text style={[styles.userReaction,{color:"#000"}]}>You: {String(JSON.parse(item?.additional_fields).total_reactions) }</Text>}
        </View>
        <Text style={styles.timestamp}>{item.updated_at}</Text>
      </View>
     </MessageChatCell>;
};