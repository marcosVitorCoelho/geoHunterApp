import { StatusBar } from 'react-native';
import { Loading } from '@components/Loading';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Routes } from '@routes/index';

export default function App() {

  const [fontsLoaded] = useFonts({ Poppins_300Light, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold });

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}

    </>
  );
}