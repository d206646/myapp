import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { fetchCommunityRequest } from '../slices/communitySlice';
import { AppDispatch, RootState } from '../store/types'; 
import { useDispatch, useSelector } from 'react-redux';
import ListCommunityCell from '../components/listCommunityCell';

const CommunityScreens = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error,page,limit,totalCount,status } = useSelector((state: RootState) => state.community);
  const [pageLoading, setPageLoading] = useState(true);
  const [communitySearchInput, setCommunitySearchInput]= useState('');

  useEffect(() => {
      dispatch(fetchCommunityRequest({ page, limit })); // Simulate fetching user with ID 123
    }, []);

  useEffect(() => {
      if(status==="success"||status==="error"){
        setPageLoading(false);
      }
    }, [status]);

  const loadMore=()=>{
if(!(data.length>=totalCount)){
dispatch(fetchCommunityRequest({ page: page+1, limit }));
} 
  }

  const onchangeTextInput=(text:string)=>{
    setCommunitySearchInput(text)
  }


if(pageLoading) return <ActivityIndicator size="large" />
  return (
    <React.Fragment>
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar usuarios o grupos"
        style={styles.searchInput}
        onChangeText={onchangeTextInput}
        value={communitySearchInput}
      />

      <View style={styles.recentHeader}>
        <Text style={styles.recentText}>Reciente</Text>
        <Text style={styles.viewAllText}>Ver todo</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item,index) => item.community_id+"_"+index.toString()}
        renderItem={({ item}) => (
            <ListCommunityCell
            item={item}
            onCellPress={(id:any)=> router.navigate('/chat')} 
            /> 
        )}
        onEndReached={loadMore}
        initialNumToRender={20}   // how many item to display first
        onEndReachedThreshold={0.1}
        ListFooterComponent={<ListFooter loading={loading} hasMore={data.length < totalCount} />}
      />
    </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f1f1f1',
    marginBottom: 10,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recentText: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewAllText: {
    color: '#007bff',
    fontWeight: '500',
  },
});

export default CommunityScreens;

const ListFooter = ({ loading, hasMore }: { loading: boolean; hasMore: boolean }) => {
  if (loading) return <ActivityIndicator size="small" style={{ margin: 16 }} />;
  if (!hasMore) return <Text style={{ textAlign: 'center', padding: 16 }}>No more data</Text>;
  return null;
};