import { ActivityIndicator ,Text} from "react-native";


const ListFooter = ({ loading, hasMore }: { loading: boolean; hasMore: boolean }) => {
  if (loading) return <ActivityIndicator size="small" style={{ margin: 16 }} />;
  if (!hasMore) return <Text style={{ textAlign: 'center', padding: 16 }}>No more data</Text>;
  return null;
};

export default ListFooter;