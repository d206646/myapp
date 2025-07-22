import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const ListCommunityCell = ({item,onCellPress}:any) => {
    
  return (
              <View style={styles.userRow} >
                <Image source={item.avatar} style={styles.avatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.community_name}</Text>
                  <Text style={styles.username}>{item.community_username}</Text>
                </View>
                <TouchableOpacity onPress={() => onCellPress(item.community_id)} style={{backgroundColor:"#0077ff", borderRadius:5}}>
                  <Text style={styles.removeIcon}>Chat</Text>
                </TouchableOpacity>
              </View>
  );
};

const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
  },
  username: {
    color: 'gray',
  },
  removeIcon: {
    padding:5,
    fontSize: 18,
    color: '#fff',
    paddingHorizontal: 8,
  },
});

export default ListCommunityCell;