import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRequest } from '../slices/userSlice';
import { AppDispatch, RootState } from '../store/types'; // Adjust path as needed

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUserRequest(123)); // Simulate fetching user with ID 123
  }, [dispatch]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <Text>User Name: {data?.name}</Text>
      {/* Display other user data */}
    </View>
  );
};

export default UserProfile;