// import React from 'react';
// import { View, TextInput, TouchableOpacity, Text } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';

// const LoginPage = () => {
//   const router = useRouter();

//   const handleLogin = async () => {
//     try {
//       // Save the login state in AsyncStorage
//       await AsyncStorage.setItem('loginname', 'userLogged');
//       // Navigate to the authenticated route
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Home' }],
//       });
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <TextInput placeholder="Email" style={{ marginBottom: 20, width: '80%' }} />
//       <TextInput placeholder="Password" secureTextEntry style={{ marginBottom: 20, width: '80%' }} />
//       <TouchableOpacity onPress={handleLogin} style={{ padding: 10, backgroundColor: '#34c2b3' }}>
//         <Text style={{ color: '#fff' }}>Login</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default LoginPage;
