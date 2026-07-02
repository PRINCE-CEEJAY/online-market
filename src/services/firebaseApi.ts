import { auth, db } from '@/lib/firebase';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

export const firebaseApi = createApi({
  reducerPath: 'firebaseApi',
  tagTypes: ['products'],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // FIREBASE AUTHENTICATION
    registerUser: builder.mutation({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          return { data: userCredential.user };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),

    loginUser: builder.mutation({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          return { data: userCredential.user };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    logoutUser: builder.mutation({
      queryFn: async () => {
        try {
          await signOut(auth);
          return { data: true };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),

    // FIRESTORE CRUD
    getProducts: builder.query({
      queryFn: async () => {
        try {
          const querySnapShot = await getDocs(collection(db, 'products'));
          const products = querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data,
          }));
          return { data: products };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),

    createProduct: builder.mutation({
      queryFn: async (newProduct) => {
        try {
          const docRef = await addDoc(collection(db, 'products'), newProduct);
          return { data: { id: docRef.id, ...newProduct } };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['products'],
    }),

    updateProduct: builder.mutation({
      queryFn: async ({ id, ...updatedFields }) => {
        try {
          const docRef = doc(db, 'products', id);
          await updateDoc(docRef, updatedFields);
          return { data: 'success' };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['products'],
    }),

    deleteProduct: builder.mutation({
      queryFn: async (id) => {
        try {
          await deleteDoc(doc(db, 'products', id));
          return { data: id };
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} = firebaseApi;
export default firebaseApi;
