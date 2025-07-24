import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommunityState, FetchCommunityPayload } from '../types';

const initialState:CommunityState= {
        status: 'idle',
        data: [],
        loading: false,
        error: null,
        page:1,
        limit: 20,
        totalCount: 0,
      }
    const communitySlice = createSlice({
      name: 'community',
      initialState: initialState,
      reducers: {
        fetchCommunityRequest: (state,_action: PayloadAction<FetchCommunityPayload>) => {
          state.loading = true;
          state.error = null;
          state.status='loading'
        },
        fetchCommunitySuccess: (state, action) => {
          state.loading = false;
          state.data = [...state.data,...action.payload.communities];
          state.page= action.payload.page,
          state.limit= action.payload.limit,
          state.totalCount= action.payload.totalCount
          state.status='success'
        },
        fetchCommunityFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.status='error'
        },
      },
    });

    export const { fetchCommunityRequest, fetchCommunitySuccess, fetchCommunityFailure } = communitySlice.actions;
    export default communitySlice.reducer;